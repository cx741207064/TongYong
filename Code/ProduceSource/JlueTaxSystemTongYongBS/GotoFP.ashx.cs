using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JlueTaxSystemTongYongBS
{
    /// <summary>
    /// GotoFP 的摘要说明
    /// </summary>
    public class GotoFP : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string sessionId = context.Request.QueryString["sessionId"].ToString();
            string questionId = context.Request.QueryString["questionId"].ToString();
            string happenDate = context.Request.QueryString["happenDate"].ToString();
            string userId = context.Request.QueryString["userId"].ToString();
            string classId = context.Request.QueryString["classId"].ToString();
            string companyId = context.Request.QueryString["companyId"].ToString();
            string sortid = context.Request.QueryString["sortid"].ToString();
            string name = context.Request.QueryString["name"].ToString();
            if (name == "业务一")
            {
                name = "1";
            }
            else if (name == "业务二")
            {
                name = "2";
            }
            else
            {
                name = "3";
            }
            publicmethod p = new publicmethod();
            string coursepath = System.Web.Configuration.WebConfigurationManager.AppSettings["Practicepath"] + "/APIPractice/BILJXFP.asmx/getbyquestionid?questionId=" + questionId;
            string courseId = p.HttpGetFunction(coursepath);
            string path = System.Web.Configuration.WebConfigurationManager.AppSettings["FPpath"] + "/index.php?sessionId=" + sessionId + "&questionId=" + questionId + "&happenDate=" + happenDate + "&userId=" + userId + "&classId=" + classId + "&companyId=" + companyId + "&courseId=" + courseId + "&sortid=" + sortid + "&name=" + name;
            context.Response.Redirect(path);
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