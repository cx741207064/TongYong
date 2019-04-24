using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace JlueTaxSystemTongYongBS.bszm_web.apps.views_zj.home
{
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string questionId = (Request.QueryString["questionId"] == null ? "" : Request.QueryString["questionId"].ToString());
            if (questionId != "")
            {
                string userquestionId = Request.QueryString["userquestionId"].ToString();
                string companyId = Request.QueryString["companyId"].ToString();
                string classId = Request.QueryString["classid"].ToString();
                string courseId = Request.QueryString["courseid"];
                string userId = Request.QueryString["userid"];
                string Name = Request.QueryString["Name"];

                Session["questionId"] = questionId;
                Session["userquestionId"] = userquestionId;
                Session["companyId"] = companyId;
                Session["classId"] = classId;
                Session["courseId"] = courseId;
                Session["userId"] = userId;
                Session["Name"] = Name;
            }

        }
    }
}