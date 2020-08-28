const { FenceGrouo } = require("../models/fence-group");
const { Judger } = require("../models/judger");

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
  },
  observers: {
    spu: function (spu) {
      if (!spu) {
        return;
      }
      const fenceGroup = new FenceGrouo(spu);
      fenceGroup.initFences();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      this.bindInitData(fenceGroup);
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
