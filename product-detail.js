document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const _id = params.get('_id');
    console.log(_id);

    if (_id) {
        productDetail(_id);
    }
});

async function productDetail(_id) {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';
    const url = `https://striveschool-api.herokuapp.com/api/product/${_id}`;
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}` }
    });
    const product = await response.json();

    if (product) {
        showDetail(product);
    }
}
