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
using System.Xml;
using JlueTaxSystemTongYongBS.Code;
using JlueTaxSystemTongYongBS.Models;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/common")]
    public class commonController : ApiController
    {
        IYsbqcSetting set { get; set; }

        GDTXDate date { get; set; }

        string BDDM { get; set; }

        GDTXTongYongUserYSBQC qc { get; set; }

        public commonController(IYsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("get/hdxx")]
        public JObject hdxx()
        {
            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            date = set.getGDTXDate(sbzlDm);

            JObject re_json = new JObject();
            string str = "";
            qc = set.getUserYSBQC(sbzlDm);

            switch (sbzlDm)
            {
                case "10103":
                case "29836":
                    if (qc.SBZT == set.ysbzt)
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.ysb.json"));
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                    }
                    else
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx." + sbzlDm + ".json"));
                        re_json = JsonConvert.DeserializeObject<JObject>(str);

                        JObject sbzl = (JObject)re_json.SelectToken("value.sbzl[0]");
                        sbzl["sksssqQ"] = date.skssqq;
                        sbzl["sksssqZ"] = date.skssqz;
                        sbzl["tbrq"] = date.tbrq;
                    }

                    break;
                case "10442":
                    if (qc.SBZT == set.ysbzt)
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.ysb.json"));
                        re_json = JsonConvert.DeserializeObject<JObject>(str);
                    }
                    else
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx." + sbzlDm + ".json"));
                        re_json = JsonConvert.DeserializeObject<JObject>(str);

                        re_json = set.getQysdsyjADataConfig(re_json, sbzlDm);
                        JObject sbzl = (JObject)re_json.SelectToken("value.sbzl[0]");
                        sbzl["sksssqQ"] = date.skssqq;
                        sbzl["sksssqZ"] = date.skssqz;
                        sbzl["tbrq"] = date.tbrq;
                    }
                    break;
            }
            return re_json;
        }

        [Route("fnb/getSbsj")]
        [HttpPost]
        public JObject getSbsj()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("getSbsj.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("fnb/sbzc")]
        public JObject sbzc()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbzc.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            JObject htmlData = JsonConvert.DeserializeObject<JObject>(in_jo.SelectToken("jsonData.htmlData").Value<string>());
            string _001 = htmlData.SelectToken("001").Value<string>();

            return re_json;
        }

        [Route("submit/sbcl")]
        public JObject sbcl()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbcl.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            JArray htmlData = JsonConvert.DeserializeObject<JArray>(in_jo.SelectToken("sbwjs").Value<string>());
            string guid = Guid.NewGuid().ToString();
            set.saveUserYSBQCReportData(htmlData, qc.Id.ToString(), qc.sbzlDm, guid);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.ysbzt);
            return re_json;
        }

    }
}