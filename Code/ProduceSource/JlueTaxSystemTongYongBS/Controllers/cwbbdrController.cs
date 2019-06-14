using JlueTaxSystemTongYongBS.Code;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace JlueTaxSystemTongYongBS.Controllers
{
    [RoutePrefix("cwbbdr-web")]
    public class cwbbdrController : ApiController
    {
        YsbqcSetting set { get; set; }

        public cwbbdrController(YsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("finance/import-tax-report/views/index.html")]
        [HttpGet]
        public HttpResponseMessage reportTip()
        {
            HttpResponseMessage rm = new HttpResponseMessage();
            string str = set.FunctionNotOpen;

            rm.Content = new StringContent(str, Encoding.UTF8, "text/html");
            return rm;
        }

    }
}