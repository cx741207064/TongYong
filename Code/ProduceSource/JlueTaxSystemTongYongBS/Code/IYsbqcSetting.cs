using JlueTaxSystemTongYongBS.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JlueTaxSystemTongYongBS.Code
{
    public interface IYsbqcSetting
    {
        /// <summary>
        /// 已申报状态
        /// </summary>
        string ysbzt { get; set; }

        /// <summary>
        /// 未申报状态
        /// </summary>
        string wsbzt { get; set; }

        /// <summary>
        /// 功能未开放提示信息
        /// </summary>
        string FunctionNotOpen { get; set; }

        List<GDTXTongYongUserYSBQC> getUserYSBQC();

        GDTXTongYongUserYSBQC getUserYSBQC(Type controller);

        GDTXTongYongUserYSBQC getUserYSBQC(string dm);

        /// <summary>
        /// 获取已申报的清册
        /// </summary>
        /// <returns></returns>
        List<GDTXTongYongUserYSBQC> getYsbUserYSBQC();

        /// <summary>
        /// 获取未申报的清册
        /// </summary>
        /// <returns></returns>
        List<GDTXTongYongUserYSBQC> getWsbUserYSBQC();

        GTXResult saveUserYSBQCReportData(JToken json, string userYsbqcId, string reportCode, string dataKey = "data");

        GTXResult saveUserYSBQCReportData(string strJson, string userYsbqcId, string reportCode, string dataKey = "data");

        string getUserYSBQCReportData_String(int id, string reportCode, string dataKey = "data");

        JToken getUserYSBQCReportData(int id, string reportCode, string dataKey = "data");

        JToken getUserYSBQCReportData(int id, string reportCode, out string sbxh);

        Nsrxx getNsrxx();

        void getYbnsrzzsBnlj(ref JObject in_jo, string dm);

        JObject getYbnsrzzsDataConfig(object in_obj, string dm);

        GDTXDate getGDTXDate(Type type);

        GDTXDate getGDTXDate(string dm);

        void deleteYhsData(int id, string reportCode, string xh);

        string getBDDMFromTABLE_NAME(string TABLE_NAME);

        string getSBSE(string sbzlDm, JToken jt);

    }
}
