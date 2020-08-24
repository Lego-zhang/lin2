import {Http} from "./http";

class Paging {

  // 需要保存状态
  // 需要进行实例化

  start;
  count;
  req;
  url;
  moreData = true;
  // 锁
  locker = false;
  // 累加的数据状态
  accumulator = [];


  constructor(req, count = 10, start = 0) {
    this.start = start;
    this.count = count;
    this.req = req;
    this.url = req.url;
  }

  async getMoreDate() {
    if (!this.moreData) {
      return
    }

    if (!this._getLocker()) {
      return
    }
    const data = await this._actualGetData();

    this._releaseLocker();
    return data;
  }

  // 获取数据f
  async _actualGetData() {
    const req = this._getCurrentReq();
    let paging = await Http.request(this.req);

    if (!paging) {
      return null
    }

    if (paging.total === 0) {
      return {
        empty: true,
        items: [],
        moreData: false,
        accumulator: []
      }
    }
    this.moreData = Paging._moreData(paging.total_page, paging.page);
    if (this.moreData) {
      this.start += this.count;
    }
    this._accumulate(paging.items);
    return {
      empty: false,
      items: paging.items,
      moreData: this.moreData,
      accumulator: this.accumulator
    }
  }

  _accumulate(items) {
    this.accumulator = this.accumulator.concat(items)
  }

  static _moreData(totalPage, pageNum) {
    return pageNum < totalPage - 1;
  }

  // 获取当前的req

  _getCurrentReq() {
    let url = this.url;
    const params = `start=${this.start}&count=${this.count}`;
    if (url.includes('?')) {
      url += '&' + params
    } else {
      url += '?' + params
    }

    this.req.url = url
    return this.req;

  }

  // 打开数据锁
  _getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true;
    return true
  }

  // 关闭数据锁
  _releaseLocker() {
    this.locker = false
  }

}

export {
  Paging
}