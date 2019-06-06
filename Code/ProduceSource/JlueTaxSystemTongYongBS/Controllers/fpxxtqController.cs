using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;
using System.IO;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/fpxxtq")]
    public class fpxxtqController : ApiController
    {
        [Route("queryFpHzxx")]
        public JObject canBeRemove()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("queryFpHzxx.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("getXxfpGjxx")]
        [HttpPost]
        public JObject getXxfpGjxx()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("getXxfpGjxx.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

    }
}
