const { Cart } = require("../../model/Cart");
const { parseSpecValue } = require("../../utils/sku");
const cart = new Cart();
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
    stock: Cart.SKU_MAX_COUNT,
    skuCount: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDelete() {
      const skuId = this.properties.cartItem.skuId;

      cart.removeItem(skuId);
      this.setData({
        cartItem: null,
      });
      this.triggerEvent("itemdelete", {
        skuId,
      });
    },
    checkedItem(event) {
      const checked = event.detail.checked;
      cart.checkItem(this.properties.cartItem.skuId);
      this.properties.cartItem.checked = checked;
      this.triggerEvent("itemcheck", {});
    },
    onSelectCount(event) {
      let newCount = event.detail.count;
      console.log(newCount);
      cart.replaceItemCount(this.properties.cartItem.skuId, newCount);
      this.triggerEvent("countfloat");
    },
  },
});
