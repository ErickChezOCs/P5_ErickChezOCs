/* affichage du Product sélectionné par l'utiliateur */
console.log('La page product.html  a correctement chargé le fichier product.js!')

let routeProduct = window.location.href;
/* console.log('voici l url du Product de laquelle il faut récupérer _id: ',routeProduct); */

var url =new URL(routeProduct);
let idProduct =url.searchParams.get("id");
/* console.log('voici l id du Product:' , idProduct); */
/* préparation des données pour l'envoi au panier */

localStorage.setItem("objId", idProduct);


let nomDomaine ='http://localhost';
let pisteProduct = `:3000/api/products/${idProduct}`;
const endPointProduct = nomDomaine + pisteProduct;
/* console.log('voici le end point du Product: ', endPointProduct);*/

let colorChoice = document.getElementById('colors');


function getProduct() {
    // cette fonction se sert de fetch pour récupérer un Product de l'API en fonction de son id contenu dans le endPointProduct //
    
    fetch(endPointProduct)
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            // res est un objet JavaScript contenant tous les elements qui seront récupérés pour afficher le Product //
        displayProduct(res);
       /* console.log('voici le Product retourné: ',res); */
        })
        .catch(function (err) {
            console.log("Une erreur s'est Produite",err);
        })
}
getProduct()

function displayProduct(product) {
    /* cette fonction reçoit un objet en argument et extrait les propriétés nécessaires pour
     remplir dynamiquement les differents éléments de la page product.html
   */
  document.title = product.name;

  let img = document.createElement('img');
  img.setAttribute('src' , product.imageUrl);
  let img_container = document.getElementsByClassName("item__img")[0];
  img_container.append(img);

let productTitle = document.getElementById('title');
productTitle.textContent = product.name;

let productPrice = document.getElementById('price');
productPrice.textContent = product.price;

let productDescription = document.getElementById('description');
productDescription.textContent = product.description;

/* Rajout dynamique des couleurs du produit dans la zone de selection d'une couleur*/
let colors = product.colors;

console.log("nombres de couleurs disponibles :" , colors.length) ;

for (let i = 0; i < colors.length; i++) {
 colorOption =document.createElement("option");
 colorOption.innerHTML = colors[i];
 colorChoice.appendChild(colorOption);
}
/* capture du choix de la couleur par l'utilisateur*/
colorChoice.addEventListener('change' , (event) => {
    let selectedColor = event.target.value;
    currentColor(selectedColor);
})
 function currentColor(color) {
     colorOption.innerHTML = color;
     /*console.log("voici la couleur choisie" , colorOption.innerHTML); */
     localStorage.setItem('objCol',color);
 }
/* PENSER A SAUVEGARDER LA COULEUR AU RECHARGEMENT DE LA PAGE COMME POUR LA QUANTITE */

let productQuantity = document.getElementById('quantity');
let currentQuantity = productQuantity.value;
/* console.log("quantités choisies : ",currentQuantity); */
localStorage.setItem('objQ',currentQuantity);
console.log('nombre de valeurs stockées en localstorage:',localStorage.length);
}
  console.log('L identifiant du produit choisit est : ',localStorage.objId);  
  console.log('la quantité choisie est :' , localStorage.objQ);  
  console.log('La couleur choisie est :',localStorage.objCol) ; 



