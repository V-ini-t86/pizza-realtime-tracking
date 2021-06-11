// console.log("hello form asdfioapdsiciasd");
const axios = require("axios");
const Noty = require("noty");
let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");
const updateCart = (pizza) => {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerHTML = res.data.qty;
      new Noty({
        type: "success",
        timeout: 1000,
        progressBar: false,
        text: "Item added to cart ",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 1000,
        progressBar: false,
        text: "Something went wrong",
      }).show();
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
    console.log(pizza);
  });
});
