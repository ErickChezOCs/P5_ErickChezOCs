console.log("la page confirmation.html a bien chargé le fichier confirmation.js!");

const searchParams = new URLSearchParams(window.location.search); 
const order_Id = searchParams.get("orderId"); 
let numCommande = document.getElementById('orderId');
numCommande.textContent = order_Id;

localStorage.clear();

