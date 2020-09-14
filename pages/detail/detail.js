// pages/detail/detail.js
import { Spu } from "../../model/Spu";
import { ShoppingWay } from "../../core/enum";
import { SaleExplain } from "../../model/Sale-explain";
Page({
  /**
   * 页面的初始数据
   */
  data: { spu: null, showRealm: false },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid;
    const spu = await Spu.getDetail(pid);

    const explain = await SaleExplain.getFixed();

    this.setData({
      spu,
      explain,
    });
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
