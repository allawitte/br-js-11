'use strict';
const functionName = function () {
    return 'callback' + Math.round(10000 * Math.random())
};
function loadData(callbackName, url) {

    return new Promise((done, fail) => {
        const script = document.createElement('script');
        script.src = `${url}?callback=${callbackName}`;
        document.body.appendChild(script);
        window[callbackName] = done;
    });
}

Promise.all([loadData(functionName(), 'https://neto-api.herokuapp.com/food/42'), loadData(functionName(), 'https://neto-api.herokuapp.com/food/42/rating'), loadData(functionName(), 'https://neto-api.herokuapp.com/food/42/consumers')])
    .then(makeInterface);

function makeInterface(res) {
    buildReceipt(res[0]);
    buildRating(res[1]);
    buildConsumer(res[2]);
}

function buildReceipt(data) {
    let title = document.querySelector('[data-title]');
    title.textContent = data.title;
    let pic = document.querySelector('[data-pic]');
    pic.style.background = 'url(' + cleanImgSrc(data.pic) + ')no-repeat center center';
    let tdIngr = document.querySelector('td[data-ingredients]');
    tdIngr.textContent = data.ingredients.join(', ');


}
function buildRating(data) {
    let rating = document.querySelector('[data-rating]');
    rating.textContent = data.rating;
    let votes = document.querySelector('[data-votes]');
    votes.textContent = data.votes
    let stars = document.querySelector('[data-star]');
    stars.style.width = data.rating * 10 + '%';
}
function buildConsumer(data) {
    let consumer = document.querySelector('.consumers');
    for (var i = 0; i < data.list.length; i++) {
        let td = consumer.cloneNode();
        let img = document.createElement('img');
        img.src = cleanImgSrc(data.list[i].pic);
        img.title = data.list[i].name;
        consumer.appendChild(img);
    }
    let span = document.createElement('span');
    span.textContent = '(+' + (data.total - i)+')';
    consumer.appendChild(span);

}
function cleanImgSrc(src) {
    return src.replace(/[0-9]{5}/g, '');
}
