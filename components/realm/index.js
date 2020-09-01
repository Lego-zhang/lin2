const { FenceGrouo } = require("../models/fence-group");
const { Judger } = require("../models/judger");
const { Spu } = require("../../model/Spu");

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    judger: Object,
    previewImg: null,
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return;
      }
      if (Spu.isNoSpec(spu)) {
        this.setData({
          noSpec: true,
        });
        this.bindSpuData(spu.sku_list[0]);
        return;
      }
      const fenceGroup = new FenceGrouo(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
      } else this.bindSpuData();
      this.bindInitData(fenceGroup);
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindSpuData() {
      const spu = this.properties.spu;
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      });
    },
    bindSkuData(sku) {
      console.log(sku);
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      });
    },
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      });
    },

    onCellTap(e) {
      const cell = e.detail.cell;
      const x = e.detail.x;
      const y = e.detail.y;

      const judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fences: judger.fenceGroup.fences,
      });
    },
  },
});
