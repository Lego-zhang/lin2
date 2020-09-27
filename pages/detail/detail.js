// pages/detail/detail.js
import { Spu } from "../../model/Spu";
import { ShoppingWay } from "../../core/enum";
import { SaleExplain } from "../../model/Sale-explain";
import { getWindowHeightRpx } from "../../utils/system";
import { Cart } from "../../model/Cart";
import { CartItem } from "../../model/Cart-item";
Page({
  /**
   * 页面的初始数据
   */
  data: { spu: null, showRealm: false, cartItemCount: 0 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);

    const explain = await SaleExplain.getFixed();
    const windowHeight = await getWindowHeightRpx();
    const h = windowHeight - 100;
    console.log(h);

    this.setData({
      spu,
      explain,
      h,
    });
    this.updateCartItemCount();
  },
  onGoToHome(e) {
    wx.switchTab({
      url: "/pages/home/home",
    });
  },
  onAddToCart(e) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART,
    });
  },
  onBuy(e) {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY,
    });
  },
  onSpecChange(e) {
    this.setData({
      specs: e.detail,
    });
  },
  onShopping(event) {
    const chosenSku = event.detail.sku;
    const skuCount = event.detail.skuCount;
    console.log(skuCount);
    if (event.detail.orderWay === ShoppingWay.CART) {
      const cart = new Cart();
      const cartItem = new CartItem(chosenSku, skuCount);
      cart.addItem(cartItem);
      this.updateCartItemCount();
    }
  },
  updateCartItemCount() {
    const cart = new Cart();
    let cartItemCount = cart.getCartItemCount();
    console.log(cartItemCount);
    this.setData({
      cartItemCount,
      showRealm: false,
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
