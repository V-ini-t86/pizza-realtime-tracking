function cartController() {
  return {
    cart(req, res) {
      res.render("customers/cart");
    },
    update(req, res) {
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalPrice: 0,
          totalQuantity: 0,
        };
      }
      let cart = req.session.cart;
      console.log(cart);

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          items: req.body,
          qty: 1,
        };
        cart.totalQuantity = cart.totalQuantity + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQuantity = cart.totalQuantity + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      // res.render("layout", { qty: cart.totalQuantity });
      console.log(req.session.cart.items);
      return res.json({ qty: req.session.cart.totalQuantity });
    },
  };
}

module.exports = cartController;
