'use strict';

function loadJsonP(url){
    const functionName = 'callback'+Math.round(10000*Math.random());
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url+'?callback='+functionName;
    window[functionName] = done;
    document.body.appendChild(script);
}

function done(res){
    for(let item in res){
        console.log(item)
        let userItem = document.querySelector('[data-'+item+']');
        if(userItem.tagName == 'IMG'){
            userItem.src = cleanImgSrc(res[item]);
        }
        else {
            userItem.textContent = res[item];
        }
    }
}


    function cleanImgSrc(src){
        return src.replace(/[0-9]{5}/g, '');
    }
 loadJsonP("https://neto-api.herokuapp.com/twitter/jsonp");