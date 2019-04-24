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
using System.Text;
using JlueTaxSystemTongYongBS.Code;
using JlueTaxSystemTongYongBS.Models;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("sbzx-web/apps")]
    public class sbzx_appsController : ApiController
    {
        IYsbqcSetting set { get; set; }

        GDTXDate date { get; set; }

        public sbzx_appsController(IYsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("views/sb_gdlh_yhs_2019/sb_gdlh_yhs.html")]
        [AcceptVerbs("post", "get")]
        public HttpResponseMessage sb_gdlh_yhs()
        {
            date = set.getGDTXDate("yhsqc");
            HttpResponseMessage rm = new HttpResponseMessage();
            string str = File.ReadAllText(HttpContext.Current.Server.MapPath("sb_gdlh_yhs"));

            rm.Content = new StringContent(str, Encoding.UTF8, "text/html");
            rm.Headers.Add("tbrq", date.tbrq);
            //rm.Headers.Date = DateTimeOffset.MinValue;
            return rm;
        }

        [Route("views/cwbbCallOcx/reportTip.html")]
        [HttpGet]
        public HttpResponseMessage reportTip()
        {
            HttpResponseMessage rm = new HttpResponseMessage();
            string str = set.FunctionNotOpen;

            rm.Content = new StringContent(str, Encoding.UTF8, "text/html");
            return rm;
        }

        [Route("views/sb_ybnsr/sb_ybnsr.html")]
        [HttpGet]
        public HttpResponseMessage sb_ybnsr()
        {
            HttpResponseMessage rm = new HttpResponseMessage();
            string str = set.FunctionNotOpen;

            rm.Content = new StringContent(str, Encoding.UTF8, "text/html");
            return rm;
        }

    }
}