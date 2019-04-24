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
    [RoutePrefix("sbzx-web/api/sb/xgmsb")]
    public class xgmsbController : ApiController
    {
        [Route("validateYqwrd")]
        public JObject validateYqwrd()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("validateYqwrd.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("validatePkZg")]
        public JObject validatePkZg()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("validatePkZg.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

    }
}