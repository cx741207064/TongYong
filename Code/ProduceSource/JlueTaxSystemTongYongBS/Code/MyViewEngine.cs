using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JlueTaxSystemTongYongBS.Code
{
    public sealed class MyViewEngine : RazorViewEngine
    {
        public MyViewEngine()
        {
            ViewLocationFormats = new[]
            {
                "~/Views/{1}/{0}.cshtml",
                "~/Views/Shared/{0}.cshtml"
            };
        }

        public override ViewEngineResult FindView(ControllerContext controllerContext, string viewName, string masterName, bool useCache)
        {
            string action = controllerContext.RouteData.Values["action"].ToString();
            string controller = controllerContext.RouteData.Values["controller"].ToString();
            List<string> list = ViewLocationFormats.ToList();
            if (controller == "MainServlet")
            {
                list.Add("~/Views/" + controller + "/{0}.cshtml");
            }
            ViewLocationFormats = list.ToArray();
            return base.FindView(controllerContext, viewName, masterName, useCache);
        }

    }
}