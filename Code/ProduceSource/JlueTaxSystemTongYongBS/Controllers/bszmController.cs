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
    [RoutePrefix("bszm-web")]
    public class bszmController : ApiController
    {
        YsbqcSetting set { get; set; }

        public bszmController(YsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("api/desktop/userInfo/get")]
        [HttpGet]
        public JObject userInfo()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            JToken NsrInfo = re_json.SelectToken("data.NsrInfo");
            JToken data = re_json.SelectToken("data");
            Nsrxx x = set.getNsrxx();
            NsrInfo["nsrsbhGs"] = x.NSRSBH;
            NsrInfo["gsNsrmc"] = x.NSRMC;
            data["swjgMc"] = x.ZGDSSWJFJMC;
            return re_json;
        }

        [Route("api/desktop/allFunctionsEX/get")]
        [HttpGet]
        public JObject allFunctionsEX()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            JToken company = re_json.SelectToken("data").Where(a => a["menuName"].ToString() == "企业").FirstOrDefault();

            JToken LEFT = company["subMenus"].Where(a => a["menuName"].ToString() == "LEFT").FirstOrDefault();
            foreach (JToken jt in LEFT["subMenus"])
            {
                Uri uri_icon = new Uri(jt["icon"].ToString());
                jt["icon"] = uri_icon.PathAndQuery;
                foreach (JObject jo in jt["functions"])
                {
                    JToken jp = jo.Property("url");
                    if (jp != null)
                    {
                        jp.Remove();
                    }
                }
            }

            JToken CONTENT = company["subMenus"].Where(a => a["menuName"].ToString() == "CONTENT").FirstOrDefault();
            foreach (JToken jt in CONTENT["subMenus"])
            {
                switch (jt["menuName"].ToString())
                {
                    case "我要申报":
                        foreach (JObject jo in jt["subMenus"])
                        {
                            Uri uri_icon = new Uri(jo["icon"].ToString());
                            jo["icon"] = uri_icon.PathAndQuery;

                            JArray ja = (JArray)jo.SelectToken("subMenus[0].functions");
                            foreach (JObject jt_url in ja)
                            {
                                Uri uri = new Uri(jt_url["url"].Value<string>());
                                jt_url["url"] = uri.PathAndQuery;
                            }
                        }
                        JToken zzs = jt["subMenus"].Where(a => a["menuName"].ToString() == "增值税").FirstOrDefault().SelectToken("subMenus[0].functions[0]");
                        GDTXUserYSBQC qc = set.getUserYSBQC("10101");
                        if (qc != null)
                        {
                            zzs["name"] = qc.TaskName;
                            zzs["code"] = qc.sbzlDm;
                            zzs["url"] = qc.Url;
                        }
                        break;
                    case "我要办税":
                    case "我要查询":
                    case "互动中心":
                        foreach (JObject jo in jt["subMenus"])
                        {
                            Uri uri_icon = new Uri(jo["icon"].ToString());
                            jo["icon"] = uri_icon.PathAndQuery;

                            JObject jt_url = (JObject)jo.SelectToken("subMenus[0].functions[0]");
                            if (jt_url != null)
                            {
                                Uri uri = new Uri(jt_url["url"].Value<string>());
                                jt_url.Property("url").Remove();
                            }
                        }
                        break;
                    case "我的信息":
                        foreach (JObject jo in jt["functions"])
                        {
                            Uri uri_icon = new Uri(jo["icon"].ToString());
                            jo["icon"] = uri_icon.PathAndQuery;

                            JToken url = jo.SelectToken("url");
                            Uri uri_url = new Uri(url.ToString());
                            jo["url"] = uri_url.PathAndQuery;

                        }
                        break;
                    case "公众服务":
                        foreach (JObject jo in jt["subMenus"])
                        {
                            Uri uri_icon = new Uri(jo["icon"].ToString());
                            jo["icon"] = uri_icon.PathAndQuery;
                        }
                        break;
                }
            }

            return re_json;
        }

        [Route("api/desktop/customizedFuctionsEX/usertype/get")]
        [HttpGet]
        public JObject customizedFuctionsEX()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("api/desktop/todoList/get")]
        [HttpGet]
        public JObject todoList()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            JArray data = new JArray();
            List<GDTXUserYSBQC> listqc = set.getUserYSBQC();
            foreach (GDTXUserYSBQC qc in listqc)
            {
                JObject jo = new JObject();
                if (qc.SBZT == set.ysbzt)
                {
                    jo.Add("ysbbz", "Y");
                }
                else
                {
                    jo.Add("ysbbz", "N");
                }
                jo.Add("id", "");
                jo.Add("name", qc.TaskName);
                jo.Add("url", qc.Url);
                jo.Add("category", "sb");
                jo.Add("code", qc.zsxmDm);
                jo.Add("content", null);
                jo.Add("required", qc.Required);
                jo.Add("status", null);
                jo.Add("statusName", null);
                jo.Add("priority", 0);
                jo.Add("blqx", null);
                jo.Add("sbqx", qc.SBQX);
                jo.Add("gdsBz", "1");
                data.Add(jo);
            }
            re_json["data"] = data;

            return re_json;
        }

        [Route("api/xxzx/queryUserMessage/WEB/20/0/5")]
        [HttpGet]
        public JObject queryUserMessage()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("5.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

    }
}