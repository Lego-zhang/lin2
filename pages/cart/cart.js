const { Calculator } = require("../../model/Calculator");
const { Cart } = require("../../model/Cart");
const cart = new Cart();
// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false,
    totalPrice: 0,
    totalSkuCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cartItems = cart.getAllCartItemFromLocal().items;
    if (cart.isEmpty()) {
      this.empty();
      return;
    }
    this.setData({
      cartItems,
    });
    this.notEmpty();
    this.isAllChecked();
    this.refreshCartData();
  },
  onDeleteItem() {
    this.isAllChecked();
  },
  onSingleCheck() {
    this.isAllChecked();
  },
  refreshCartData() {
    const checkedItems = cart.getCheckedItems();
    const calculator = new Calculator(checkedItems);
    calculator.calc();
    this.setCalcData(calculator);
  },
  setCalcData(calculator) {
    const totalPrice = calculator.getTotalPrice();
    const totalSkuCount = calculator.getTotalSkuCount();
    this.setData({
      totalPrice,
      totalSkuCount,
    });
  },
  isAllChecked() {
    const allChecked = cart.isAllChecked();
    console.log(allChecked);
    this.setData({
      allChecked,
    });
  },
  onCheckAll(event) {
    const checked = event.detail.checked;
    cart.checkAll(checked);
    this.setData({
      cartItems: this.data.cartItems,
    });
  },
  empty() {
    this.setData({
      isEmpty: true,
    });
    wx.hideTabBarRedDot({
      index: 2,
    });
  },

  notEmpty() {
    this.setData({
      isEmpty: false,
    });
    wx.showTabBarRedDot({
      index: 2,
    });
  },

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
