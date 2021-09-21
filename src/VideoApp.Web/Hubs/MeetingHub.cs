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

            await Clients.OthersInGroup(meetingId).SendAsync("UserJoined", userId);

            return MeetingHubData.Connections.Values.Select(tuple => tuple.userId).ToList();
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

            if (exception != null)
            {
                var log = $"{userId} got disconnected from meeting {meetingId}";
                logger.LogError(exception, log);

                await Clients.OthersInGroup(meetingId).SendAsync("UserGotDisconnected", log);
            }
            else
            {
                var log = $"{userId} has left the group {meetingId}.";
                logger.LogInformation(log);

                await Clients.OthersInGroup(meetingId).SendAsync("UserLeft", log);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}