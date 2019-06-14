using JlueTaxSystemTongYongBS.Code;
using JlueTaxSystemTongYongBS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace JlueTaxSystemTongYongBS.Controllers
{
    public class JlueTaxSystemController : ApiController
    {
        YsbqcSetting set { get; set; }

        public JlueTaxSystemController(YsbqcSetting _is)
        {
            this.set = _is;
        }

        [Route("getGDTXDate")]
        [HttpGet]
        public GDTXDate getGDTXDate()
        {
            GDTXDate date = set.getGDTXDate(typeof(yhsqcController));
            return date;
        }

    }
}
