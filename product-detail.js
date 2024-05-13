document.addEventListener('DOMContentLoaded', () => {
    //recupero il parametro dell'URL
    const urlParam = new URLSearchParams(window.location.search);
    // estraggo il valore assegnato a bookAsin dalla Query String
    const productId = urlParam.get('_id');
    // console.log(productId); // verifico di aver preso correttamente il parametro passato

    if(productId) {
        ottieniProdotti(productId);
    }

    async function ottieniProdotti() {
        // Puntatore URL
        const url = 'https://striveschool-api.herokuapp.com/api/product/';
        // Puntatore apiKey
        const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYTQwNWIxYzc3ZjAwMTUwNjgzZWMiLCJpYXQiOjE3MTUxODQ2NDUsImV4cCI6MTcxNjM5NDI0NX0.sXShtyZXMpQO7jCPkI6kklxE5ib3BiXQL-QAMCfIgmU';

        const res = await fetch(url + productId, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const data = await res.json();
        // console.log(data);

        let products = [];
        // Se la risposta è un array, lo assegniamo direttamente a products
        // Altrimenti, mettiamo il singolo oggetto in un array
        if (Array.isArray(data)) {
            products = data;
        } else {
            products.push(data);
        }

        console.log(products);

        showProducts(products);
    }

    function showProducts(products) {
        // Mi occupo della pulizia del contenitore
        // console.log(product);
        containerCards.innerHTML = '';
        products.forEach(prod => {

            // Creazione della card del prodotto
            const card = document.createElement("div");
            card.className = "card-detail mx-auto"; // Applica CSS

            // Creazione degli elementi per la card
            // IMMAGINE
            const image = creaElementoConImg("img", prod.imageUrl); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
            image.className = 'product-card-img';

            // NOME
            const name = creaElementoConTesto("h3", prod.name); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

            // DESCRIZIONE
            const description = creaElementoConTesto("p", prod.description); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

            // BRAND
            const brand = creaElementoConTesto("span", prod.brand); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
            brand.className = 'me-3';
            const price = creaElementoConTesto("span", prod.price); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML

            // Aggiunge gli elementi alla card
            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(brand);
            card.appendChild(price);

            // Appendo la card al contenitore dei prodotti
            containerCards.appendChild(card);
        });
    };

    // Creazione delle funzioni che andranno a modificare il contenuto della card
    function creaElementoConTesto(tipoDiTag, testo) {
        const tag = document.createElement(tipoDiTag);
        tag.textContent = testo;
        tag.className = 'mt-3';
        return tag;
    }    
    function creaElementoConImg(tipoDiTag, testo) {
        const tag = document.createElement(tipoDiTag);
        tag.src = testo;
        return tag;
    }  
    // Fine creazione delle funzioni che andranno a modificare il contenuto della card

});
        
    
























// // Creo la funzione per la chiamata con metodo GET
// async function ottieniProdotti() {
//     // Effettuo la chiamata all'endpoint
//     const response = await fetch(url + productId, {
//       headers: {
//         'Authorization': `Bearer ${apiKey}` // Inserisco il token per l'autorizzazione
//       }
//     });
//     // Converto la risposta in un file JSON
//     const products = await response.json();
//     products.forEach(prod => {
//       console.log("ID del prodotto:", prod._id);
//     });
//     showProduct(products);
//   }

// // Funzione per mostrare i prodotti
// function showProduct(products) {
//     // Mi occupo della pulizia del contenitore
//     containerCards.innerHTML = '';
//     products.forEach(prod => {
  
//       // Creazione della card del prodotto
//       const card = document.createElement("div");
//       card.className = "product-card col flex-column me-4"; // Applica CSS
  
//       // Creazione degli elementi per la card
//       // IMMAGINE
//       const image = creaElementoConImg("img", prod.imageUrl); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
//       image.className = 'product-card-img';
  
//       // NOME
//       const name = creaElementoConTesto("h3", prod.name); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
  
//       // DESCRIZIONE
//       const description = creaElementoConTesto("p", prod.description); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
  
//       // BRAND
//       const brand = creaElementoConTesto("span", prod.brand); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
//       brand.className = 'me-3';
//       const price = creaElementoConTesto("span", prod.price); // Creo e richiamo delle funzioni per la creazione degli elementi per non utilizzare innerHTML
  
//       // Creazione del container dei bottoni
//       const buttonContainer = document.createElement('div')
//       buttonContainer.className = 'd-flex gap-2 mt-3'
  
//       // Creo e stilizzo il bottone di UPDATE
//       const buttonUpdate = document.createElement('button');
//       buttonUpdate.textContent = "Modifica";
//       buttonUpdate.className = 'btn btn-secondary w-50 mx-auto';
//       buttonUpdate.onclick = () => getValueForm(prod._id); // Passa l'ID del prodotto
  
//       // Creo e stilizzo il bottone di DELETE
//       const buttonDelete = document.createElement('button');
//       buttonDelete.textContent = "Delete";
//       buttonDelete.className = 'btn btn-danger w-50 mx-auto';
//       buttonDelete.onclick = () => deleteProduct(prod._id); // Passa l'ID del prodotto
  
//       // Buton Detail
//       const buttonDetail = document.createElement('button');
//       buttonDetail.textContent = "Detail";
//       buttonDetail.className = 'btn btn-warning w-50 mx-auto';
//       buttonDetail.onclick = () => {
//         window.location = `product-detail.html?_id=${prod._id}`
//       };
  
//       // Aggiunge gli elementi alla card
//       card.appendChild(image);
//       card.appendChild(name);
//       card.appendChild(description);
//       card.appendChild(brand);
//       card.appendChild(price);
  
//       // Aggiungo al container dei bottoni i bottoni creati
//       buttonContainer.appendChild(buttonUpdate);
//       buttonContainer.appendChild(buttonDelete);
//       buttonContainer.appendChild(buttonDetail);
//       card.appendChild(buttonContainer); // Appendo il contenitore dei bottoni alla card
  
  
//       // Appendo la card al contenitore dei prodotti
//       containerCards.appendChild(card);
//     });
// }
// // Fine funzione per mostrare i prodotti

    




