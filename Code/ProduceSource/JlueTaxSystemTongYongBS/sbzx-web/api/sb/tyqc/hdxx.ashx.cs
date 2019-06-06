using JlueTaxSystemTongYongBS.Code;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace JlueTaxSystemTongYongBS.sbzx_web.api.sb.tyqc
{
    /// <summary>
    /// hdxx 的摘要说明
    /// </summary>
    public class hdxx : IHttpHandler,IReadOnlySessionState
    {

        public void ProcessRequest(HttpContext context)
        {

            string skssqq = "", skssqz = "",sbzt="";
            string url = HttpContext.Current.Request.Url.ToString();
            string[] value = url.Split('?');
            var pos = value[value.Length - 1].IndexOf('=');
            var sbzldm = value[value.Length - 1].Substring(pos + 1);
            GTXResult json = GTXMethod.GetUserYSBQC();
            if (json.IsSuccess)
            {
                List<GDTXUserYSBQC> ysbqclist = JsonConvert.DeserializeObject<List<GDTXUserYSBQC>>(json.Data.ToString());
                if (ysbqclist.Count > 0)
                {
                    foreach (GDTXUserYSBQC item in ysbqclist)
                    {
                        if (item.sbzlDm == sbzldm)
                        {
                            skssqq = item.SKSSQQ;
                            skssqz = item.SKSSQZ;
                            sbzt = item.SBZT;
                            break;
                        }

                    }
                }
            }
            if (sbzt == "已申报")
            {
                var result = File.ReadAllText(context.Server.MapPath("hdxx1.json"));
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
            }
            else
            {
                var result = File.ReadAllText(context.Server.MapPath("hdxx.json"));
                result = result.Replace("@@skssqq", skssqq).Replace("@@skssqz", skssqz);
                context.Response.ContentType = "text/plain";
                context.Response.Write(result);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}