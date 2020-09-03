const { FenceGrouo } = require("../models/fence-group");
const { Judger } = require("../models/judger");
const { Spu } = require("../../model/Spu");
const { Cell } = require("../models/cell");

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
        this.processNoSpec(spu);
      } else {
        this.processHasSpec(spu);
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData({
        noSpec: true,
      });
      this.bindSpuData(spu.sku_list[0]);
      return;
    },
    processHasSpec(spu) {
      const fenceGroup = new FenceGrouo(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
      } else this.bindSpuData();
      this.bindTipData();
      this.bindFenceGroupData(fenceGroup);
    },
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
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      });
    },
    bindTipData() {
      this.setData({
        skuIntact: this.data.judger.isSkuInTact(),
      });
    },
    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
      });
    },
    onCellTap(e) {
      const data = e.detail.cell;
      const x = e.detail.x;
      const y = e.detail.y;

      const cell = new Cell(data.spec);

      const judger = this.data.judger;
      judger.judge(cell, x, y);
      const skuIntact = judger.isSkuInTact();
      if (skuIntact) {
      }
      this.bindFenceGroupData(judger.fenceGroup);
    },
  },
});
