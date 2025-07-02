const headerDiv = document.getElementById("header");
const mainHeading = document.getElementById("main-heading");

const subHeading = document.createElement("h3");
subHeading.textContent = "Buy high quality organic fruits online";
subHeading.style.fontStyle = "italic";
headerDiv.appendChild(subHeading);

const basketDiv = document.getElementById("basket-heading").parentNode;
const totalFruits = document.createElement("p");
totalFruits.textContent = "Total fruits: 4";
totalFruits.id = "fruits-total";

basketDiv.insertBefore(totalFruits, basketDiv.querySelector(".fruits"));
