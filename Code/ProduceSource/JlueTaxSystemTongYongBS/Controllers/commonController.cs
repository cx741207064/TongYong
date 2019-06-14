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
        YsbqcSetting set { get; set; }

        GDTXDate date { get; set; }

        string BDDM { get; set; }

        GDTXUserYSBQC qc { get; set; }
        GDTXUserYSBQC qj { get; set; }
        public commonController(YsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("hdxx/canBeRemove")]
        public JObject canBeRemove()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("canBeRemove.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("initrules")]
        public JObject initrules()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("initrules.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("nb/getSbsj")]
        [HttpPost]
        public JObject nb_getSbsj()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("getSbsj.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string bbid = in_jo["bbid"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            JToken jsonData = set.getUserYSBQCReportData(qc.Id, sbzlDm, bbid);
            re_json["value"]["jsonData"] = jsonData;
            return re_json;
        }

        [Route("nb/sbzc")]
        public JObject nb_sbzc()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbzc.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            saveYbnsrZzs(in_jo);
            return re_json;
        }

        [Route("nb/sbbc")]
        public JObject sbbc()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbbc.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            saveYbnsrZzs(in_jo);
            return re_json;
        }

        [Route("get/hdxx")]
        public JObject hdxx()
        {
            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string typename = CurrentUser.GetInstance().GetTypeName.ToString();
            date = set.getGDTXDate(sbzlDm);

            JObject re_json = new JObject();
            string str = "";
            qc = set.getUserYSBQC(sbzlDm);

            switch (sbzlDm)
            {
                case "10101":
                    string HY = set.getHangYeName();
                    str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.10101." + HY + ".json"));
                    re_json = JsonConvert.DeserializeObject<JObject>(str);

                    JObject sbzl2 = (JObject)re_json.SelectToken("value.sbzl[0]");
                    sbzl2["sksssqQ"] = date.skssqq;
                    sbzl2["sksssqZ"] = date.skssqz;
                    sbzl2["tbrq"] = date.tbrq;
                    break;
                case "10103":
                case "10444":
                    if (qc.SBZT == set.ysbzt)
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.10444.json"));
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
                case "21201":
                    if (qc.SBZT == set.ysbzt)
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.21201.json"));
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
                case "21102":
                    if (qc.SBZT == set.ysbzt)
                    {
                        str = File.ReadAllText(HttpContext.Current.Server.MapPath("hdxx.21102.json"));
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

        [Route("dsnsrxx/get")]
        [HttpPost]
        public JObject getDsnsrxx()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            str = GTXMethod.getCompanyinfo(str);
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
        [HttpPost]
        public JObject sbcl()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbcl.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
           // string srr1 = sr.ReadToEnd();
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            JArray htmlData = JsonConvert.DeserializeObject<JArray>(in_jo.SelectToken("sbwjs").Value<string>());
            string guid = Guid.NewGuid().ToString();
            set.saveUserYSBQCReportData(htmlData, qc.Id.ToString(), qc.sbzlDm, guid);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.ysbzt);
            return re_json;
        }
        [Route("batch/sbcl")]
        public JObject sbcltwo()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbcl.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            string srr = sr.ReadToEnd().ToString();
            //srr= srr.Replace("@[","").Replace("]@","");
            var mJobj = JArray.Parse(srr);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(mJobj[1].ToString());
            JObject in_jo1 = JsonConvert.DeserializeObject<JObject>(mJobj[0].ToString());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string sbzlDm1 = in_jo1["sbzlDm"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            qj = set.getUserYSBQC(sbzlDm1);
            JArray htmlData = JsonConvert.DeserializeObject<JArray>(in_jo.SelectToken("sbwjs").Value<string>());
            string guid = Guid.NewGuid().ToString();
            set.saveUserYSBQCReportData(htmlData, qc.Id.ToString(), qc.sbzlDm, guid);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.ysbzt);
            GTXMethod.UpdateYSBQC(qj.Id.ToString(), set.ysbzt);
            return re_json;
        }
        [Route("submit/sbcll/zlk")]
        public JObject zlk()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("zlk.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.ysbzt);
            return re_json;
        }

        void saveYbnsrZzs(JObject in_jo)
        {
            string sbzlDm = in_jo["sbzlDm"].ToString();
            string bbid = in_jo["bbid"].ToString();
            qc = set.getUserYSBQC(sbzlDm);
            JToken jsonData = in_jo.SelectToken("jsonData");
            set.saveUserYSBQCListReportData(jsonData, qc.Id.ToString(), qc.sbzlDm, bbid);

            JArray ja = new JArray();
            JObject add_jo = new JObject();
            if (!string.IsNullOrEmpty(qc.TBZT))
            {
                ja = JsonConvert.DeserializeObject<JArray>(qc.TBZT);
                foreach (JObject jo in ja)
                {
                    if (jo["bbid"].ToString().Equals(bbid))
                    {
                        jo["status"] = 1;
                        GTXMethod.UpdateYSBQCtbzt(qc.Id.ToString(), "", JsonConvert.SerializeObject(ja));
                    }
                }

                add_jo.Add("bbid", bbid);
                add_jo.Add("status", 1);
                ja.Add(add_jo);

                GTXMethod.UpdateYSBQCtbzt(qc.Id.ToString(), "", JsonConvert.SerializeObject(ja));
            }
            else
            {
                add_jo.Add("bbid", bbid);
                add_jo.Add("status", 1);
                ja.Add(add_jo);

                GTXMethod.UpdateYSBQCtbzt(qc.Id.ToString(), "", JsonConvert.SerializeObject(ja));
            }

        }

    }
}