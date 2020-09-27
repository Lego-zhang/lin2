// pages/home.js

import { Theme } from "../../model/Theme";
import { Banner } from "../../model/Banner";
import { Category } from "../../model/Category";
import { Activity } from "../../model/Activity";
import { SpuPaging } from "../../model/Spu-paging";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA: null,
    bannerB: null,
    themeE: null,
    bannerG: null,
    grid: [],
    activityD: null,
    themeEspu: null,
    themeF: null,
    themeH: null,
    spuPaging: null,
    loadingType: "loading",
  },
  async initBottonSpuList() {
    const paging = await SpuPaging.getLatest();
    this.setData({
      spuPaging: paging,
    });
    const data = await paging.getMoreData();
    if (!data) {
      return;
    }

    wx.lin.renderWaterFlow(data.items);
  },
  initAllData: async function () {
    const theme = new Theme();
    await theme.getThemes();

    const themeA = theme.getHomeLocationA();
    const themeE = theme.getHomeLocationE();
    const themeF = theme.getHomeLocationF();
    const themeH = theme.getHomeLocationH();

    let themeEspu = [];

    if (themeE.online) {
      const data = await Theme.getHomeLocationESpu();
      if (data) {
        themeEspu = data.spu_list.slice(0, 8);
      }
    }
    const bannerB = await Banner.getHomeLocationB();
    const bannerG = await Banner.getHomeLocationG();
    const grid = await Category.getHomeLocationC();
    const activityD = await Activity.getHomeLocationD();

    this.setData({
      themeA,
      bannerB,
      themeE,
      themeEspu,
      themeF,
      themeH,
      bannerG,
      grid,
      activityD,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initAllData();
    this.initBottonSpuList();
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
  onReachBottom: async function () {
    const data = await this.data.spuPaging.getMoreData();
    if (!data) {
      return;
    }

    wx.lin.renderWaterFlow(data.items);
    if (!data.moreData) {
      this.setData({
        loadingType: "end",
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
