(function(){
    function loadJs(url, callback) {
        var script = document.createElement('script');
        script.type = "text/javascript";
        if (typeof (callback) != "undefined") {
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                }
            } else {
                script.onload = function () {
                    callback();
                }
            }
        }
        script.src = url;
        document.body.appendChild(script);
    }
    function loadCss(url){
        var link=document.createElement("link");
        link.rel="stylesheet";
        link.href=url;
        document.body.appendChild(link);
    }

    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        } else {  
          window.onload = function() {
            oldonload();
            func();
          }
        }
    }

    var mydriver=function () {
        //用户引导
        var driver = new Driver();
        // Define the steps for introduction
        driver.defineSteps([
          {
              element: 'li[data-tag-panel="panel-22005"]',
              popover: {
                  className: 'first-step-popover-class',
                  title: '我要申报',
                  description: '税费申报及缴纳在这里',
                  position: 'left'
              }
          },
          {
              element: 'li[data-tag-panel="wddb-panel"]',
              popover: {
                  title: '我的待办',
                  description: '本月待办事项在这里',
                  position: 'top'
              }
          },
        ]);
        // Start the introduction
        driver.start();
    }

    addLoadEvent(mydriver);

    loadJs("dist/driver.min.js", function () {
    })
    loadCss("dist/driver.min.css")
})()
