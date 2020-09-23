class HistoryKeyword {
  static MAX_ITEM_COUNT = 20;
  static KEY = "keywords";
  keywords = [];
  constructor() {
    // 每次实例化就要调用获取缓存
    if (typeof HistoryKeyword.instance === "object") {
      return HistoryKeyword.instance;
    }
    this.keywords = this._getLocalKeywords();
    HistoryKeyword.instance = this;
    return this;
  }
  /*
      存储缓存
      获取缓存
      删除缓存
      */

  save(keyword) {
    /*
      写入最大数值
      去重
      */
    // 去重
    const items = this.keywords.filter((k) => {
      return k === keyword;
    });
    if (items.length !== 0) {
      return;
    }
    if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      // 当数组满了可以将后添加的字符串添加到数组的最前面，将最后一个元素剔除掉
      this.keywords.pop();
    }
    // 插入到数组最前面
    this.keywords.unshift(keyword);
    this._refreshLocal();
  }
  get() {
    return this.keywords;
  }

  clear() {
    this.keywords = [];
    this._refreshLocal();
  }
  // 保存缓存
  _refreshLocal() {
    wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
  }
  // 获取缓存
  _getLocalKeywords() {
    const keywords = wx.getStorageSync(HistoryKeyword.KEY);
    if (!keywords) {
      wx.setStorageSync(HistoryKeyword.KEY, []);
      return [];
    }
    return keywords;
  }
}
export { HistoryKeyword };
