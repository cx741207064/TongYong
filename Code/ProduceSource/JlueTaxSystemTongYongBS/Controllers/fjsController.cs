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
using JlueTaxSystemTongYongBS.Code;
using JlueTaxSystemTongYongBS.Models;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/fjs")]
    public class fjsController : ApiController
    {
        IYsbqcSetting set { get; set; }

        GDTXDate date { get; set; }

        GDTXTongYongUserYSBQC qc { get; set; }

        public fjsController(IYsbqcSetting _is)
        {
            this.set = _is;
            date = set.getGDTXDate(this.GetType());
        }

        [Route("hdxx")]
        public JObject fjs()
        {
            JObject re_json = new JObject();

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string str = "";
            qc = set.getUserYSBQC(sbzlDm);
            if (qc.SBZT == set.ysbzt)
            {
                str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.ysb.json"));
                re_json = JsonConvert.DeserializeObject<JObject>(str);
            }
            else
            {
                str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.json"));
                re_json = JsonConvert.DeserializeObject<JObject>(str);

                JToken sbzl = re_json.SelectToken("value.sbzl[0]");
                sbzl["sksssqQ"] = date.skssqq;
                sbzl["sksssqZ"] = date.skssqz;
            }

            return re_json;
        }

    }
}
