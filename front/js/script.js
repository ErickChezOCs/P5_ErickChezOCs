/* Intégration des produits de l'API dans la page index.html */
console.log('La page index.html a correctement chargé le fichier script.js!')

//ici on définit la fonction getAllProducts
// cette fonction se sert de fetch pour récupérer tous les produits de l'API  //

function getAllProducts() {   
    const apiURL = "http://localhost:3000/api/products";
    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            // res est un array contenant tous les produits récupérés de l'API, cet array est passé en argument à displayProducts //
         displayProducts(res);
        })
        .catch(function (err) {
            console.log("Une erreur s'est produite",err);
        })
}

// ici on invoque la fonction getAllProducts
getAllProducts()

// ici on définit la fonction displayProducts
/* cette fonction boucle (for--of) sur l'array qui lui est passé en argument et pour chaque élément de l'array
crée dynamiquement un lien(anchor) vers la page du produit.Ce lien comprend un article contenant l'image,le nom et la description du produit, ce lien est ensuite rajouté à la section items de notre page index.html
   */
function displayProducts(products) {
    for (let product of products) {
        let a = document.createElement('a');
        a.setAttribute('href' , `./product.html?id=${product._id}`);      
        let article = document.createElement('article');
        let img = document.createElement('img');
        img.setAttribute('src' , product.imageUrl);
        img.setAttribute('alt' , product.altTxt);
        let h3 = document.createElement('h3');
        h3.setAttribute('class' , 'productName');
        h3.textContent = product.name;
        let p = document.createElement('p');
        p.setAttribute('class' , 'productDescription');
        p.textContent = product.description;        
        article.append(img, h3, p);
        a.append(article);
        document.getElementById('items').append(a);
    }
}