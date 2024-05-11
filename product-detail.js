document.addEventListener('DOMContentLoaded', () => {
    //recupero il parametro dell'URL
    const urlParam = new URLSearchParams(window.location.search);
    // estraggo il valore assegnato a bookAsin dalla Query String
    const productId = urlParam.get('productId');
    console.log(productId); // verifico di aver preso correttamente il parametro passato

    // Puntatore apiKey
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';

    
})



