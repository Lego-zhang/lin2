const { Cart } = require("../../model/Cart");
const { parseSpecValue } = require("../../utils/sku");

// components/cart-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: Object,
  },
  observers: {
    cartItem: function (cartItem) {
      if (!cartItem) {
        return;
      }
      const specStr = parseSpecValue(cartItem.sku.specs);
      const discount = cartItem.sku.discount_price ? true : false;
      const soldOut = Cart.isSoldOut(cartItem);
      const online = Cart.isOnline(cartItem);

      this.setData({
        specStr,
        discount,
        soldOut,
        online,
        stock: cartItem.sku.stock,
        skuCount: cartItem.count,
      });
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    specStr: String,
    discount: Boolean,
    soldOut: Boolean,
    online: Boolean,
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
