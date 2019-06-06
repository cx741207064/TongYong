using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;
using JlueTaxSystemTongYongBS.Controllers;
using JlueTaxSystemTongYongBS.Models;

namespace JlueTaxSystemTongYongBS.Code
{
    public class YsbqcSetting : IYsbqcSetting
    {
        public string ysbzt
        {
            get
            {
                return "已申报";
            }
            set { }
        }
        public string wsbzt
        {
            get { return "未申报"; }
            set { }
        }

        public string FunctionNotOpen
        {
            get { return "此功能暂未开放"; }
            set { }
        }

        public List<GDTXUserYSBQC> getUserYSBQC()
        {
            GTXResult resultq = GTXMethod.GetUserYSBQC();
            if (resultq.IsSuccess)
            {
                List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(resultq.Data.ToString());
                return ysbqclist;
            }
            else
            {
                return null;
            }
        }

        public GDTXUserYSBQC getUserYSBQC(Type controller)
       {
           string s = controller.Name;
           s = s.Substring(0, s.IndexOf("Controller"));
           GTXResult resultq = GTXMethod.GetUserYSBQC();
           if (resultq.IsSuccess)
           {
               List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(resultq.Data.ToString());

               ysbqclist = ysbqclist.Where(a => a.BDDM.ToUpper() == s.ToUpper()).ToList();
               if (ysbqclist.Count == 0)
               {
                   return null;
               }
               return ysbqclist[0];
           }
           else
           {
               //return new GDTXBeiJingUserYSBQC();
               return null;
           }
       }

        public GDTXUserYSBQC getUserYSBQC(string dm)
       {
           string s = dm.ToUpper();
           switch (s)
           {
               case "YBNSRZZSXBSZ":
                   s = "YBNSRZZS";
                   break;
           }
           GTXResult resultq = GTXMethod.GetUserYSBQC();
           if (resultq.IsSuccess)
           {
               List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(resultq.Data.ToString());

               ysbqclist = ysbqclist.Where(a => a.BDDM.ToUpper() == s || a.sbzlDm == s || a.zsxmDm == s).ToList();
               if (ysbqclist.Count == 0)
               {
                   return null;
               }
               return ysbqclist[0];
           }
           else
           {
               return null;
           }
       }

        public List<GDTXUserYSBQC> getYsbUserYSBQC()
       {
           GTXResult resultq = GTXMethod.GetUserYSBQC();
           if (resultq.IsSuccess)
           {
               List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(resultq.Data.ToString());

               ysbqclist = ysbqclist.Where(a => a.SBZT == "已申报").ToList();
               return ysbqclist;
           }
           else
           {
               return null;
           }
       }

        public List<GDTXUserYSBQC> getWsbUserYSBQC()
        {
            GTXResult resultq = GTXMethod.GetUserYSBQC();
            if (resultq.IsSuccess)
            {
                List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(resultq.Data.ToString());

                ysbqclist = ysbqclist.Where(a => a.SBZT == "未申报").ToList();
                return ysbqclist;
            }
            else
            {
                return null;
            }
        }

        public GTXResult saveUserYSBQCReportData(JToken json, string userYsbqcId, string reportCode, string dataKey = "data")
       {
           List<GTXNameValue> nameList = new List<GTXNameValue>();
           GTXNameValue nv = new GTXNameValue();
           nv.key = dataKey;
           byte[] bytes = Encoding.Default.GetBytes(JsonConvert.SerializeObject(json, Newtonsoft.Json.Formatting.None));
           string _result = HttpUtility.UrlEncode(Convert.ToBase64String(bytes));
           nv.value = _result;
           nameList.Add(nv);
           GTXResult saveresult = GTXMethod.SaveUserReportData(JsonConvert.SerializeObject(nameList), userYsbqcId, reportCode);
           return saveresult;
       }

        public GTXResult saveUserYSBQCListReportData(JToken json, string userYsbqcId, string reportCode, string dataKey = "data")
        {
            List<GTXNameValue> nameList = new List<GTXNameValue>();
            GTXNameValue nv = new GTXNameValue();
            nv.key = dataKey;
            byte[] bytes = Encoding.Default.GetBytes(JsonConvert.SerializeObject(json, Newtonsoft.Json.Formatting.None));
            string _result = HttpUtility.UrlEncode(Convert.ToBase64String(bytes));
            nv.value = _result;
            nameList.Add(nv);

            GTXResult gr = GTXMethod.GetUserReportData(userYsbqcId, reportCode);
            if (gr.IsSuccess)
            {
                List<GDTXUserYSBQCReportData> dataList = JsonConvert.DeserializeObject<List<GDTXUserYSBQCReportData>>(gr.Data.ToString());
                foreach (GDTXUserYSBQCReportData data in dataList)
                {
                    if (data.DataKey == dataKey)
                    {
                        continue;
                    }
                    GTXNameValue data_nv = new GTXNameValue();
                    data_nv.key = data.DataKey;
                    data_nv.value = HttpUtility.UrlEncode(data.DataValue);
                    nameList.Add(data_nv);
                }
            }
            GTXResult saveresult = GTXMethod.SaveUserReportData(JsonConvert.SerializeObject(nameList), userYsbqcId, reportCode);
            return saveresult;
        }

        public string getUserYSBQCReportData_String(int id, string reportCode, string dataKey = "data")
       {
           string re_str = "";
           GTXResult gr = GTXMethod.GetUserReportData(id.ToString(), reportCode);
           if (gr.IsSuccess)
           {
               List<GDTXUserYSBQCReportData> dataList = JsonConvert.DeserializeObject<List<GDTXUserYSBQCReportData>>(gr.Data.ToString());
               if (dataList.Count > 0)
               {
                   byte[] outputb = Convert.FromBase64String(dataList[0].DataValue);
                   string dataValue = Encoding.Default.GetString(outputb);
                   re_str = dataValue;
               }
           }
           return re_str;
       }

       public JToken getUserYSBQCReportData(int id, string reportCode, string dataKey = "data")
       {
           GTXResult gr = GTXMethod.GetUserReportData(id.ToString(), reportCode);
           if (gr.IsSuccess)
           {
               List<GDTXUserYSBQCReportData> dataList = JsonConvert.DeserializeObject<List<GDTXUserYSBQCReportData>>(gr.Data.ToString());
               if (dataList.Count > 0)
               {
                   GDTXUserYSBQCReportData data = dataList.Where(a => a.DataKey == dataKey).FirstOrDefault();
                   byte[] outputb = Convert.FromBase64String(data.DataValue);
                   string dataValue = Encoding.Default.GetString(outputb);
                   JToken re_json = JsonConvert.DeserializeObject<JToken>(dataValue);
                   return re_json;
               }
           }
           return JToken.FromObject(new object());
       }

       public JToken getUserYSBQCReportData(int id, string reportCode, out string sbxh)
       {
           sbxh = "";
           GTXResult gr = GTXMethod.GetUserReportData(id.ToString(), reportCode);
           if (gr.IsSuccess)
           {
               List<GDTXUserYSBQCReportData> dataList = JsonConvert.DeserializeObject<List<GDTXUserYSBQCReportData>>(gr.Data.ToString());
               if (dataList.Count > 0)
               {
                   GDTXUserYSBQCReportData data = dataList[0];
                   byte[] outputb = Convert.FromBase64String(data.DataValue);
                   string dataValue = Encoding.Default.GetString(outputb);
                   JToken re_json = JsonConvert.DeserializeObject<JToken>(dataValue);
                   sbxh = data.DataKey;
                   return re_json;
               }
           }
           return JToken.FromObject(new object());
       }

       public Nsrxx getNsrxx()
       {
           Nsrxx X = new Nsrxx();
           GTXResult gr1 = GTXMethod.GetCompany();
           if (gr1.IsSuccess)
           {
               JObject jo = new JObject();
               jo = JsonConvert.DeserializeObject<JObject>(gr1.Data.ToString());
               if (jo.HasValues)
               {
                   JObject data_jo = jo;
                   X.NSRMC = data_jo["NSRMC"].ToString();
                   X.NSRSBH = data_jo["NSRSBH"].ToString();
                   X.DJZCLX = data_jo["DJZCLX"].ToString();
                   X.ZCDZ = data_jo["ZCDZ"].ToString();
                   X.SCJYDZ = data_jo["SCJYDZ"].ToString();
                   X.LXDH = data_jo["LXDH"].ToString();
                   X.GBHY = data_jo["GBHY"].ToString();
                   X.ZGDSSWJFJMC = data_jo["ZGDSSWJFJMC"].ToString();
               }
           }

           GTXResult gr2 = GTXMethod.GetCompanyPerson();
           if (gr2.IsSuccess)
           {
               JArray ja = new JArray();
               ja = JsonConvert.DeserializeObject<JArray>(gr2.Data.ToString());
               if (ja.Count > 0)
               {
                   JObject data_jo = (JObject)ja[0];
                   X.Name = data_jo["Name"].ToString();
                   X.IDCardNum = data_jo["IDCardNum"].ToString();
               }
           }
           return X;
       }

       public void getYbnsrzzsBnlj(ref JObject in_jo, string dm)
       {
           string Name = HttpContext.Current.Session["Name"].ToString();
           XmlDocument doc = new XmlDocument();
           doc.LoadXml(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "industry.xml"));
           JToken industry = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(doc));
           industry = industry.SelectToken("root.industry").Where(a => a["name"].ToString() == Name).ToList()[0];

           XmlDocument xml_bnlj = new XmlDocument();
           xml_bnlj.LoadXml(File.ReadAllText(HttpContext.Current.Server.MapPath(dm + "." + industry["value"] + ".xml")));
           JToken bnlj = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(xml_bnlj));
           bnlj = bnlj.SelectToken("root." + dm);
           in_jo.Merge(bnlj, new JsonMergeSettings { MergeArrayHandling = MergeArrayHandling.Union });
       }

       public JObject getYbnsrzzsDataConfig(object in_obj, string dm)
       {
           string Name = HttpContext.Current.Session["Name"].ToString();
           XmlDocument doc = new XmlDocument();
           doc.LoadXml(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "industry.xml"));
           JToken industry = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(doc));
           industry = industry.SelectToken("root.industry").Where(a => a["name"].ToString() == Name).ToList()[0];

           JObject in_jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeObject(in_obj));

           XmlDocument xml_config = new XmlDocument();
           xml_config.LoadXml(File.ReadAllText(HttpContext.Current.Server.MapPath(dm + "." + industry["value"] + ".xml")));
           JToken config = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(xml_config));
           config = config.SelectToken("root." + dm);
           in_jo.Merge(config, new JsonMergeSettings { MergeArrayHandling = MergeArrayHandling.Union });
           return in_jo;
       }

       public JObject getQysdsyjADataConfig(JObject in_jo, string dm)
       {
           string Name = HttpContext.Current.Session["Name"].ToString();
           XmlDocument doc = new XmlDocument();
           doc.LoadXml(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "industry.xml"));
           JToken industry = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(doc));
           industry = industry.SelectToken("root.industry").Where(a => a["name"].ToString() == Name).ToList()[0];

           XmlDocument xml_config = new XmlDocument();
           xml_config.LoadXml(File.ReadAllText(HttpContext.Current.Server.MapPath(dm + ".dataconfig.xml")));
           JToken config = JsonConvert.DeserializeObject<JToken>(JsonConvert.SerializeXmlNode(xml_config));
           config = config.SelectToken("root." + industry["value"] + ".YJJE");
           in_jo.SelectToken("value.sbzl[0].wsxxs.wsxx").Where(a => a["code"].ToString() == "YJJE").FirstOrDefault()["value"] = config.ToString();
           return in_jo;
       }

       public GDTXDate getGDTXDate(Type type)
       {
           GDTXDate gd = new GDTXDate();
           GDTXUserYSBQC qc = getUserYSBQC(type);
           gd.sbrqq = qc.HappenDate.Substring(0, 8) + "01";
           gd.sbrqz = qc.SBQX;
           gd.sbNd = qc.HappenDate.Substring(0, 4);
           gd.sbYf = qc.HappenDate.Substring(5, 2);
           gd.skssq = qc.SKSSQQ.Substring(0, 7);
           gd.skssqq = qc.SKSSQQ;
           gd.skssqz = qc.SKSSQZ;
           gd.tbrq = qc.HappenDate;
           return gd;
       }

       public GDTXDate getGDTXDate(string dm)
       {
           GDTXDate gd = new GDTXDate();
           GDTXUserYSBQC qc = getUserYSBQC(dm);
           gd.sbrqq = qc.HappenDate.Substring(0, 8) + "01";
           gd.sbrqz = qc.SBQX;
           gd.sbNd = qc.HappenDate.Substring(0, 4);
           gd.sbYf = qc.HappenDate.Substring(5, 2);
           gd.skssq = qc.SKSSQQ.Substring(0, 7);
           gd.skssqq = qc.SKSSQQ;
           gd.skssqz = qc.SKSSQZ;
           gd.tbrq = qc.HappenDate;
           gd.skssNd = qc.SKSSQQ.Substring(0, 4);
           gd.skssYf = qc.SKSSQQ.Substring(5, 2);
           return gd;
       }

       public void deleteYhsData(int id, string reportCode, string xh)
       {
           JArray data_ja = (JArray)getUserYSBQCReportData(id, reportCode);
           data_ja.Where(a => a["guid"].ToString() == xh).FirstOrDefault().Remove();
           saveUserYSBQCReportData(data_ja, id.ToString(), reportCode);
       }

       public string getBDDMFromTABLE_NAME(string TABLE_NAME)
       {
           JObject jo = JsonConvert.DeserializeObject<JObject>(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "wssb/TABLE_NAME.json"));
           foreach (JProperty jp in jo.Properties())
           {
               int count = jp.Value.Where(a => a.ToString() == TABLE_NAME).Count();
               if (count > 0)
               {
                   return jp.Name;
               }
           }
           return "";
       }

       public string getSBSE(string sbzlDm, JToken jt)
       {
           decimal sum = 0;
           JValue jv = new JValue("");
           XmlDocument xml = new XmlDocument();
           JObject jo = new JObject();
           JArray ja = new JArray();
           string a;
           switch (sbzlDm)
           {
               case "10101":
                   jv = (JValue)jt.SelectToken("j3xmlData");
                   //a= jv.Value<string>().Split(',')[1];
                   //a = a.Replace("}]\"", "");
                   a = jv.Value<string>().Replace("{", "").Replace("}", "").Replace("[", "").Replace("]", "");
                   JObject jo1 = (JObject)JsonConvert.DeserializeObject("{"+a+"}");
                   a= jo1["bbxml"].ToString();
                   xml.LoadXml(a);
                   jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeXmlNode(xml));
                   ja = (JArray)jo.SelectToken("zzssyyybnsr_zb.zbGrid.zbGridlbVO");
                   foreach (JObject j in ja)
                   {
                       sum += decimal.Parse(j["bqybtse"].ToString());
                   }
                   break;
               case "21101":
                   jv = (JValue)jt.SelectToken("[0].bbxml");
                   xml.LoadXml(jv.Value<string>());
                   jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeXmlNode(xml));
                   ja = (JArray)jo.SelectToken("yhssb.yhssbGrid.yhssbGridlb");
                   foreach (JObject j in ja)
                   {
                       sum += decimal.Parse(j["bqybtse"].ToString());
                   }
                   break;
               case "10115":
                   jv = (JValue)jt.SelectToken("[0].bbxml");
                   xml.LoadXml(jv.Value<string>());
                   jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeXmlNode(xml));
                   ja = (JArray)jo.SelectToken("fjssbb.sbxxGrid.sbxxGridlbVO");
                   foreach (JObject j in ja)
                   {
                       sum += decimal.Parse(j["bqybtse"].ToString());
                   }
                   break;
               case "10442":
                   jv = (JValue)jt.SelectToken("[0].bbxml");
                   xml.LoadXml(jv.Value<string>());
                   jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeXmlNode(xml));
                   sum = decimal.Parse(jo.SelectToken("A200000Ywbd.sbbxxForm.ybtsdseLj").ToString());
                   break;
               case "10103":
                   jv = (JValue)jt.SelectToken("[0].bbxml");
                   xml.LoadXml(jv.Value<string>());
                   jo = JsonConvert.DeserializeObject<JObject>(JsonConvert.SerializeXmlNode(xml));
                   ja = (JArray)jo.SelectToken("zzssyyxgmnsr.zzsxgmGrid.zzsxgmGridlb");
                   for (int i = 0; i < 2; i++)
                   {
                       sum += decimal.Parse(ja[i]["bqybtse"].ToString());
                   }
                   break;
           }
           return sum.ToString();
       }

    }
}