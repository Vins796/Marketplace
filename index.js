// Puntatore URL
const url = 'https://striveschool-api.herokuapp.com/api/product/';
// Puntatore apiKey
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';

document.addEventListener('DOMContentLoaded', () => {
    const containerCards = document.getElementById('containerCards'); // Puntatore del container dove stamperò i prodotti

    // Funzione che di chiamata all'endpoint
    async function ottieniProdotti() {
        // Effettuo la chiamata all'endpoint
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        // Converto la risposta in un JSON
        const products = await res.json();
        showProduct(products);
    }


    // Funzione per la creazione della struttura della card
    function showProduct(products) {
        // Svuoto il contenitore
        containerCards.innerHTML = '';
        containerCards.className = 'mt-5 row row-gap-5';
        products.forEach(prod => {
        
        // Creo il div della card del prodotto
        const card = document.createElement("div");
        card.className = "product-card col flex-column me-4 text-center"; // Applico CSS
        
        // Creo gli elementi che popoleranno la card
        // IMAGE
        const image = creaElementoConImg("img", prod.imageUrl);
        image.className = 'product-card-img';
        // NAME
        const name = creaElementoConTesto("h3", prod.name);
        // DESCRIPTION
        const description = creaElementoConTesto("p", prod.description);
        description.className = "mt-3"
        // BRAND
        const brand = creaElementoConTesto("span", prod.brand);
        brand.className = 'me-3';
        const price = creaElementoConTesto("span", prod.price);
        // LINK al backoffice
        const link = document.createElement('a');
        link.className = "text-black d-block text-decoration-none btn btn-outline-primary w-50 mx-auto mt-4";
        link.href = "backoffice.html"
        link.textContent = 'BackOffice';
    
        // Aggiungo gli elementi creati alla card
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(brand);
        card.appendChild(price);
        card.appendChild(link);        
        
        // Aggiungo la card al contenitore dei prodotti
        containerCards.appendChild(card);
        });
    }
    // Fine funzione per la creazione della struttura della card

    // Creazione delle funzioni che andranno a modificare il contenuto della card
    function creaElementoConTesto(tipoDiTag, testo) {
        const tag = document.createElement(tipoDiTag);
        tag.textContent = testo;
        return tag;
    }

    function creaElementoConImg(tipoDiTag, testo) {
        const tag = document.createElement(tipoDiTag);
        tag.src = testo;
        return tag;
    }  
    // Fine creazione delle funzioni che andranno a modificare il contenuto della card

    ottieniProdotti();
})