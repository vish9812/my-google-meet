using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VideoApp.Web.Data
{
    public static class MeetingHubData
    {
        public static IDictionary<string, (string meetingId, string userId)> Connections { get; set; } = new Dictionary<string, (string, string)>();
    }
}