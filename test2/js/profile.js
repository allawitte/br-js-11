'use strict';
const content = document.querySelector('.content');
const badgescard = document.querySelector('.badgescard');
const functionName = 'callback'+Math.round(10000*Math.random());
function loadData(callbackName, url) {
    return new Promise((done, fail) => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);
        window[callbackName] = done;
    });
}
loadData(functionName, 'https://neto-api.herokuapp.com/profile/me').then(res => {
    let url = 'https://neto-api.herokuapp.com/profile/:id/technologies'.replace(':id', res.id);
    let card = document.querySelector('.card');
    console.log(res)
    for(let key in res){
        let item = card.querySelector('[data-'+key+']');
        if(item){
            if(item.tagName == 'IMG'){
                item.src = cleanImgSrc(res[key]);
            }
            else {
                item.textContent = res[key];
            }
        }
    }
    content.style.display = 'block';
    console.log(content)
    loadData(functionName, url).then(res => {
        res.forEach(item => {
            let span = document.createElement('span');
            span.classList.add('devicons');
            span.classList.add('devicons-'+item);
            badgescard.appendChild(span);
        });
    });
});

function cleanImgSrc(src){
    return src.replace(/[0-9]{5}/g, '');
}