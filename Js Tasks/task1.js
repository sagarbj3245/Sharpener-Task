document.getElementById("main-heading").textContent = "Fruit World";
document.getElementById("main-heading").style.color = "orange";
document.getElementById("header").style.backgroundColor = "green";
document.getElementById("header").style.borderBottom = "5px solid orange";
document.getElementById("basket-heading").style.color = "green";

let paragraph = document.createElement("p");
paragraph.textContent = "Please visit us again";
document.getElementById("thanks").appendChild(paragraph);
