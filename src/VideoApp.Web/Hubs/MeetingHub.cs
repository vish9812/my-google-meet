using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VideoApp.Web.Data;

namespace VideoApp.Web.Hubs
{
    public class SdpDataModel
    {
        public object Offer { get; set; }
        public object Answer { get; set; }
        public object Icecandidate { get; set; }
    }

    public class MeetingHub : Hub
    {
        private readonly ILogger<MeetingHub> logger;

        public MeetingHub(ILogger<MeetingHub> logger)
        {
            this.logger = logger;
        }

        public async Task<List<string>> UserJoining(string userId, string meetingId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, meetingId);

            var log = $"{userId} has joined the group {meetingId}.";
            logger.LogInformation(log);

            MeetingHubData.Connections.TryAdd(Context.ConnectionId, (meetingId, userId));
            MeetingHubData.Users.TryAdd(userId, (meetingId, Context.ConnectionId));

            await Clients.OthersInGroup(meetingId).SendAsync("AnotherUserJoined", userId);

            var otherUsers = MeetingHubData.Connections.Values
                .Where(tuple => tuple.meetingId == meetingId && tuple.userId != userId)
                .Select(tuple => tuple.userId)
                .ToList();

            return otherUsers;
        }

        public async Task SdpProcess(string toUserId, SdpDataModel sdpData)
        {
            var fromUserId = MeetingHubData.Connections[Context.ConnectionId].userId;
            logger.LogInformation($"Sdp Processing>>> to: {toUserId}, from: {fromUserId}");

            var toConnection = MeetingHubData.Users[toUserId].connectionId;
            var toClient = Clients.Client(toConnection);

            await toClient.SendAsync("sdpProcess", fromUserId, sdpData);
        }

        public override async Task OnConnectedAsync()
        {
            var log = "User is connected";
            logger.LogInformation(log);

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var (meetingId, userId) = MeetingHubData.Connections[Context.ConnectionId];

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, meetingId);

            MeetingHubData.Connections.Remove(Context.ConnectionId);
            MeetingHubData.Users.Remove(userId);

            if (exception == null)
            {
                var log = $"{userId} has left the group {meetingId}.";
                logger.LogInformation(log);
            }
            else
            {
                var log = $"{userId} got disconnected from meeting {meetingId}";
                logger.LogError(exception, log);
            }

            await Clients.OthersInGroup(meetingId).SendAsync("UserLeft", userId);

            await base.OnDisconnectedAsync(exception);
        }
    }
}