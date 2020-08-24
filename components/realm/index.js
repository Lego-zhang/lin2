const { FenceGrouo } = require("../models/fence-group");

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
  data: {},
  observers: {
    spu: function (spu) {
      if (!spu) {
        return;
      }
      const fenceGroup = new FenceGrouo(spu);
      // fenceGroup.initFences();
      fenceGroup.initFences1();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {},
});
