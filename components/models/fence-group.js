import { Fence } from "./fence";

const { Matrix } = require("./matrix");

class FenceGrouo {
  spu;
  skuList = [];
  constructor(spu) {
    this.spu = spu;
    this.skuList = spu.sku_list;
  }

  initFences() {
    const matrix = this._createMatrix(this.skuList);
    const fences = [];
    const AT = matrix.transpose();
    AT.forEach((r) => {
      const fence = new Fence(r);
      fence.init();
      fences.push(fence);
    });
    this.fences = fences;
  }

  _createFence(element) {
    const fence = new Fence();

    return fence;
  }

  _createMatrix(skuList) {
    const m = [];
    skuList.forEach((sku) => {
      m.push(sku.specs);
    });
    return new Matrix(m);
  }
}

export { FenceGrouo };
