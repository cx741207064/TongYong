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
using System.Xml;

namespace JlueTaxSystemHeBeiBS.Controllers
{
    [RoutePrefix("sbzx-web/api/sb/jgcx")]
    public class jgcxController : ApiController
    {
        YsbqcSetting set { get; set; }

        public jgcxController(YsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("sbqkcx")]
        public JObject sbqkcx()
        {
            string sbxh = "";
            JObject re_json = new JObject();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sbqkcx.json"));
            re_json = JsonConvert.DeserializeObject<JObject>(str);

            JArray value = new JArray();
            List<GDTXUserYSBQC> listqc = set.getYsbUserYSBQC();
            StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream);
            JObject in_jo = JsonConvert.DeserializeObject<JObject>(sr.ReadToEnd());
            string zsxmDm = in_jo["zsxmDm"].ToString();
            if (!string.IsNullOrEmpty(zsxmDm))
            {
                if (zsxmDm == "10101") { sbxh = "001"; }else{ sbxh = ""; }
                listqc = listqc.Where(a => a.zsxmDm == zsxmDm).ToList();
            }
            foreach (GDTXUserYSBQC qc in listqc)
            {
                
                JToken jt = set.getUserYSBQCReportData(qc.Id, qc.sbzlDm, out sbxh);
                string sbse = set.getSBSE(qc.sbzlDm, jt);
                JObject jo = new JObject();
                jo.Add("sbxh", sbxh);
                jo.Add("djxh", "");
                jo.Add("nsrsbh", "");
                jo.Add("zsxmDm", qc.zsxmDm);
                jo.Add("sbzlDm", qc.sbzlDm);
                jo.Add("sbzlMc", qc.ZSXM);
                jo.Add("sbse", sbse);
                jo.Add("skssqq", qc.SKSSQQ);
                jo.Add("skssqz", qc.SKSSQZ);
                jo.Add("sbztDm", "0000");
                jo.Add("sbztms", "申报成功");
                jo.Add("sbrq", qc.HappenDate);
                jo.Add("lrsj", qc.HappenDate);
                jo.Add("sblxDm", "11");
                jo.Add("pzxh", "");
                jo.Add("qqwjm", "");
                jo.Add("sbny", "");
                jo.Add("scpzxh", "");
                jo.Add("qdid", "ServyouClient");
                jo.Add("yzpzzlDm", "");
                jo.Add("czDmList", new JArray { "04" });
                jo.Add("sl", "");
                jo.Add("sbuuid", "");
                jo.Add("gzlxDm", "1");
                jo.Add("zsZsxmDm", "");
                jo.Add("zsSbzlDm", "");
                jo.Add("ybjcbz", "");
                jo.Add("gdsBz", "1");
                jo.Add("sbzlDlDm", "");
                jo.Add("wbtbsbbz", "");
                jo.Add("yhsBz", "");
                value.Add(jo);
            }
            re_json["value"] = value;
            return re_json;
        }

    }
}
