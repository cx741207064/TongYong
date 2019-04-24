using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Xml;

namespace JlueTaxSystemTongYongBS.Code
{
    public class GTXMethod
    {
        /// <summary>
        /// 获取企业联系人
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetCompanyPerson()
        {
            string companyId = CurrentUser.GetInstance().GetCurrentCompanyId;
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/CompanyPerson.asmx/GetByCompanyId?CompanyId=" + companyId;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取企业信息表记录
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetCompany()
        {
            string companyId = CurrentUser.GetInstance().GetCurrentCompanyId;
            string path = System.Configuration.ConfigurationManager.AppSettings["Practicepath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/APIPractice/Company.asmx/GetByCompanyId?CompanyId=" + companyId;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取学员题目信息
        /// </summary>
        /// <param name="id">用户题目id</param>
        /// <returns></returns>
        public static GTXResult GetUserQuestion(string id)
        {
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GTXUserQuestion/GetEnter?userid=" + userid + "&questionid=" + id + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }


        /// <summary>
        /// 获取通用(河北改)国地税的的应申报清册记录
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetUserYSBQC()
        {
            string userid = CurrentUser.GetInstance().GetCurrentUserId;
            string questionId = CurrentUser.GetInstance().GetCurrentQuestionId;
            string classid = CurrentUser.GetInstance().GetCurrentClassId;

            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXTYTAXUserYSBQC/GetList?userid=" + userid + "&questionId=" + questionId + "&classid=" + classid;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 通用(河北改)国地税通用的保存报表数据
        /// </summary>
        /// <param name="jsonReportData">报表中的name value</param>
        /// <returns></returns>
        public static GTXResult SaveUserReportData(string jsonReportData, string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userId = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXTYTAXUserYSBQCReportData/Add", string.Format("classid={0}&jsonReportData={1}&userYsbqcId={2}&reportCode={3}&userId={4}"
                , classid, jsonReportData, userYsbqcId, reportCode, userId));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 获取通用(河北改)国地税已保存的报表数据
        /// </summary>
        /// <returns></returns>
        public static GTXResult GetUserReportData(string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXTYTAXUserYSBQCReportData/Get", string.Format("classid={0}&userYsbqcId={1}&reportCode={2}"
                , classid, userYsbqcId, reportCode));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 更新应申报清册的状态,已申报
        /// </summary>
        public static GTXResult UpdateYSBQC(string userYSBQCId, string SBZT)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXTYTAXUserYSBQC/UpdateSBZT?Id=" + userYSBQCId + "&classid=" + classid + "&SBZT=" + SBZT;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }


        /// <summary>
        /// 更新应申报清册的申报税额
        /// </summary>
        public static GTXResult UpdateSBSE(string userYSBQCId, string SBSE)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string fullpath = path + "/GTX/GDTXTYTAXUserYSBQC/UpdateSBSE?Id=" + userYSBQCId + "&classid=" + classid + "&SBSE=" + SBSE;
            string json = p.Get(fullpath);
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

        /// <summary>
        /// 删除用户报表数据
        /// </summary>
        /// <returns></returns>
        public static GTXResult DeleteUserReportData(string userYsbqcId, string reportCode)
        {
            string classid = CurrentUser.GetInstance().GetCurrentClassId;
            string userId = CurrentUser.GetInstance().GetCurrentUserId;
            string path = System.Configuration.ConfigurationManager.AppSettings["tikupath"];
            publicmethod p = new publicmethod();
            string json = p.HttpPost(path + "/GTX/GDTXTYTAXUserYSBQCReportData/Delete", string.Format("classid={0}&userYsbqcId={1}&userId={2}&reportCode={3}"
                , classid, userYsbqcId, userId, reportCode));
            return JsonConvert.DeserializeObject<GTXResult>(json);
        }

    }
}