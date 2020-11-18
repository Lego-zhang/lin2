const { Cart } = require("./model/Cart");

//app.js
App({
  onLaunch: function () {
    // const cart = new Cart();
    // if (!cart.isEmpty()) {
    //   wx.showTabBarRedDot({
    //     index: 2,
    //   });
    // }
  },
  globalData: {
    userInfo: null,
  },
});
