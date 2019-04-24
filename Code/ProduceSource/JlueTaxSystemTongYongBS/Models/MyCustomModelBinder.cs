using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace JlueTaxSystemXiaMenBS.Models
{
    public class MyCustomModelBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            object obj = getModelObject(ref  controllerContext, ref  bindingContext);
            return obj;
        }

        public object getModelObject(ref ControllerContext controllerContext, ref ModelBindingContext bindingContext)
        {
            object obj = new object();
            NameValueCollection form = controllerContext.HttpContext.Request.Form;
            string Name = bindingContext.ModelType.Name;
            switch (Name)
            {
                case "YhsData":
                    bool b = bindingContext.ModelMetadata.Properties.Where(a => a.PropertyName == "zspm").First().IsRequired;
                    if (form["sbbVo['zspmdm']"] == null)
                    {
                        bindingContext.ModelState.AddModelError("zspm", "不能为空");
                    }
                    obj = new YhsData()
                    {
                        guid = Guid.NewGuid(),
                        zspm = form["sbbVo['zspmdm']"],
                        yrksfe = form["sbbVo['bqybtse']"],
                        jsje = form["sbbVo['jsje']"],
                        sfl = form["sbbVo['sysl']"],
                        ynsfe = form["sbbVo['bqynse']"],
                        bajmsfe = form["sbbVo['jmse']"],
                        basxdm = form["sbbVo['ssjmxzdm']"],
                    };
                    break;
                case "FjsData":
                    string xh = controllerContext.HttpContext.Request.QueryString["xh"];
                    string mdse = form["sbbVo['zzsmdse']"] == null ? form["sbbList[0]['zzsmdse']"] : form["sbbVo['zzsmdse']"];
                    string jme = form["sbbVo['jme']"] == null ? form["sbbList[0]['jme']"] : form["sbbVo['jme']"];
                    jme = string.IsNullOrEmpty(jme) ? "0" : jme;

                    string bqyjse = form["sbbVo['bqyjse']"] == null ? form["sbbList[0]['bqyjse']"] : form["sbbVo['bqyjse']"];
                    string jyffjyjse = form["sbbVo['jyffjyjse']"] == null ? form["sbbList[1]['bqyjse']"] : form["sbbVo['jyffjyjse']"];
                    jyffjyjse = jyffjyjse == null || jyffjyjse == "" ? "0" : jyffjyjse;

                    string dffjyjse = form["sbbVo['dffjjyjse']"] == null ? form["sbbList[2]['bqyjse']"] : form["sbbVo['dffjjyjse']"];
                    dffjyjse = dffjyjse == null || dffjyjse == "" ? "0" : dffjyjse;

                    string bqynse = form["sbbVo['bqynse']"] == null ? form["sbbList[0]['bqynse']"] : form["sbbVo['bqynse']"];
                    string bqybtse = form["sbbVo['bqybtse']"] == null ? form["sbbList[0]['bqybtse']"] : form["sbbVo['bqybtse']"];

                    string zzsxselx_dm = form["sbbVo['zzsxselx_dm']"];
                    string hj = form["sbbVo['hj']"] == null ? form["sbbList[0]['hj']"] : form["sbbVo['hj']"];
                    hj = hj == null || hj == "" ? "0" : hj;

                    decimal bqynse1 = decimal.Parse(hj) * new decimal(.03);
                    decimal jme1 = 0;
                    if (zzsxselx_dm == "13")
                    {
                        jme1 = decimal.Parse(jme);
                    }
                    else
                    {
                        jme1 = bqynse1;
                    }
                    decimal bqybtse1 = bqynse1 - jme1 - decimal.Parse(jyffjyjse);

                    decimal bqynse2 = decimal.Parse(hj) * new decimal(.02);
                    decimal jme2 = 0;
                    if (zzsxselx_dm == "13")
                    {
                        jme2 = decimal.Parse(jme);
                    }
                    else
                    {
                        jme2 = bqynse2;
                    }
                    decimal bqybtse2 = bqynse2 - jme2 - decimal.Parse(dffjyjse);

                    obj = new FjsData()
                    {
                        OP = xh == null ? OP.Add : OP.Modify,
                        zspm = form["sbbVo['zspmDm']"],
                        zzsxselx_dm = form["sbbVo['zzsxselx_dm']"],
                        ybzzs = form["sbbVo['ybzzs']"] == null ? form["sbbList[0]['ybzzs']"] : form["sbbVo['ybzzs']"],
                        mdse = mdse == null || mdse == "" ? 0 : decimal.Parse(mdse),
                        hj = hj,
                        bqynse = bqynse == null || bqynse == "" ? 0 : decimal.Parse(bqynse),
                        jme = jme == null || jme == "" ? 0 : decimal.Parse(jme),
                        bqyjse = bqyjse == null || bqyjse == "" ? 0 : decimal.Parse(bqyjse),
                        jyffjyjse = decimal.Parse(jyffjyjse),
                        dffjyjse = decimal.Parse(dffjyjse),
                        bqybtse = bqybtse == null || bqybtse == "" ? 0 : decimal.Parse(bqybtse),
                        jmxzdm = form["sbbVo['jmxzDm']"],
                        bqynse1 = bqynse1,
                        bqynse2 = bqynse2,
                        bqybtse1 = bqybtse1,
                        bqybtse2 = bqybtse2,
                    };
                    break;
            }
            return obj;
        }

    }
}