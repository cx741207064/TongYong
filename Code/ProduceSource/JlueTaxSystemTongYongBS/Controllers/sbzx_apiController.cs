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
using JlueTaxSystemTongYongBS.Models;
using JlueTaxSystemTongYongBS.Code;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/api")]
    public class sbzx_apiController : ApiController
    {
        YsbqcSetting set { get; set; }

        Nsrxx x { get; set; }

        public sbzx_apiController(YsbqcSetting _is)
        {
            this.set = _is;
            x = set.getNsrxx();
        }

        [Route("base/nsrxx/get")]
        public JObject nsrxx()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            JToken value = re_json.SelectToken("value");
            JToken nsrxxKzVO = re_json.SelectToken("value.nsrxxKzVO");

            value["nsrsbh"] = x.NSRSBH;
            value["nsrmc"] = x.NSRMC;
            value["fddbrsfzjhm"] = x.IDCardNum;
            nsrxxKzVO["fddbryddh"] = x.LXDH;
            nsrxxKzVO["scjydlxdh"] = x.LXDH;

            return re_json;
        }

        [Route("baseCode/get/getBaseCodeValueByName/DM_DJ_DJZCLX")]
        [HttpGet]
        public JObject DM_DJ_DJZCLX(string dm)
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_DJ_DJZCLX." + dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            re_json["MC"] = x.DJZCLX;

            return re_json;
        }

        [Route("baseCode/get/getBaseCodeValueByName/DM_GY_HY")]
        [HttpGet]
        public JObject DM_GY_HY(string dm)
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_GY_HY." + dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            re_json["MC"] = x.GBHY;

            return re_json;
        }

        [Route("baseCode/get/getBaseCodeValueByName/DM_GY_SFZJLX")]
        [HttpGet]
        public JObject DM_GY_SFZJLX(string dm)
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_GY_SFZJLX." + dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("baseCode/get/getBaseCodeValueByName/DM_GY_SWJG_GT3")]
        [HttpGet]
        public JObject DM_GY_SWJG_GT3(string dm)
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_GY_SWJG_GT3." + dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

        [Route("baseCode/get/dsJmxxZsxm/{dm}")]
        [HttpGet]
        public JArray dsJmxxZsxm(string dm)
        {
            JArray re_json = new JArray();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath(dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JArray>(str);

            return re_json;
        }

        [Route("baseCode/get/dsJmxx/{dm}")]
        [HttpGet]
        public JArray dsJmxx(string dm)
        {
            JArray re_json = new JArray();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath(dm + ".json"));
            re_json = JsonConvert.DeserializeObject<JArray>(str);

            return re_json;
        }

        [Route("baseCode/get/baseCode2CombSelect/DM_SB_BMZD_YPXHALL")]
        [HttpGet]
        public JArray DM_SB_BMZD_YPXHALL()
        {
            JArray re_json = new JArray();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_SB_BMZD_YPXHALL.json"));
            re_json = JsonConvert.DeserializeObject<JArray>(str);

            return re_json;
        }

        [Route("baseCode/get/baseCode2CombSelect2/DM_GY_SFZJLX")]
        [HttpGet]
        public JArray DM_GY_SFZJLX()
        {
            JArray re_json = new JArray();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("DM_GY_SFZJLX.json"));
            re_json = JsonConvert.DeserializeObject<JArray>(str);

            return re_json;
        }

        [Route("sbzf/submit/sbzf")]
        public JObject sbzf()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbzf.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzlDm = in_jo["sbzlDm"].ToString();
            GDTXUserYSBQC qc = set.getUserYSBQC(sbzlDm);
            GTXMethod.DeleteUserReportData(qc.Id.ToString(), qc.sbzlDm);
            GTXMethod.UpdateYSBQC(qc.Id.ToString(), set.wsbzt);
            return re_json;
        }

        [Route("ysbqc/queryysb")]
        public JObject queryysb()
        {
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("queryysb.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            return re_json;
        }

        [Route("hb/sb/fjs/compareGdsNsrxx")]
        public JObject compareGdsNsrxx()
        {
            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string sbzldm = in_jo["sbzldm"].ToString();

            Nsrxx x = set.getNsrxx();
            JObject re_json = new JObject();
            string str = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("compareGdsNsrxx.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);
            JObject value = JsonConvert.DeserializeObject<JObject>(re_json["value"].Value<string>());
            JObject gs = (JObject)value["gs"];
            JObject ds = (JObject)value["ds"];
            gs["nsrsbh"] = x.NSRSBH;
            gs["nsrmc"] = x.NSRMC;
            gs["fddbrsfzjhm"] = x.IDCardNum;
            gs["fddbrxm"] = x.Name;
            gs["shxydm"] = x.NSRSBH;
            gs["ssdabh"] = x.NSRSBH;

            ds["nsrsbh"] = x.NSRSBH;
            ds["nsrmc"] = x.NSRMC;
            ds["fddbrsfzjhm"] = x.IDCardNum;
            ds["fddbrxm"] = x.Name;
            ds["shxydm"] = x.NSRSBH;
            ds["ssdabh"] = x.NSRSBH;

            switch (sbzldm)
            {
                case "10101":
                    re_json["value"] = "null";
                    break;
                case "10103":
                    re_json["value"] = new JValue(JsonConvert.SerializeObject(value));
                    break;
            }
            return re_json;
        }

        [Route("base/nsrckzhxx/get")]
        [HttpGet]
        public JObject nsrckzhxx()
        {
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("get.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            return re_json;
        }

    }
}