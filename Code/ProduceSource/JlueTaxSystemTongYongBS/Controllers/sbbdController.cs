using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Web;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/sbbd")]
    public class sbbdController : ApiController
    {
        [Route("needBd")]
        [HttpGet]
        public JObject needBd()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("needBd.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("zzsbd")]
        public JObject zzsbd()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("zzsbd.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

    }
}
