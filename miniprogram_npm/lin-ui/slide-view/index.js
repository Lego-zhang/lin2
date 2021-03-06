const _windowWidth = wx.getSystemInfoSync().windowWidth;
Component({
  options: { multipleSlots: !0 },
  properties: {
    width: { type: Number, value: _windowWidth },
    height: { type: Number, value: 100 },
    slideWidth: { type: Number, value: 0 },
    threshold: { type: Number, value: 0 },
    disabled: { type: Boolean, value: !1 },
    autoClose: { type: Boolean, value: !1 },
    close: {
      type: Boolean,
      value: !1,
      observer: function (t) {
        t && (this.setData({ popup: !1, x: 0 }), this.onCloseTap());
      },
    },
  },
  data: { viewWidth: _windowWidth, x: 0, out: !1 },
  ready() {
    this.updateRight();
  },
  methods: {
    updateRight() {
      const t = this;
      wx.createSelectorQuery()
        .in(this)
        .select(".right")
        .boundingClientRect(function (e) {
          t._slideWidth = e.width;
          let i = e.width <= 50 ? e.width : 50;
          (t._threshold = t.properties.threshold ? t.properties.threshold : i),
            (t._viewWidth = t.data.width + e.width * (750 / _windowWidth)),
            t.setData({ viewWidth: t._viewWidth });
        })
        .exec();
    },
    onTouchStart(t) {
      this._startX = t.changedTouches[0].pageX;
    },
    onTouchEnd(t) {
      if (this.properties.disabled) return;
      (this._endX = t.changedTouches[0].pageX),
        (this._length = this._endX - this._startX);
      const { _endX: e, _startX: i, _threshold: s } = this;
      this._length > s &&
        (this.setData({ popup: !1, x: 0 }), this.onCloseTap()),
        (e > i && !1 === this.data.out) ||
          (i - e >= s
            ? (this.setData({ x: -this._slideWidth, popup: !0, close: !1 }),
              this.onOpenTap())
            : (i - e < s && i - e > 0 && !0 !== this.data.popup) || e - i >= s
            ? (this.setData({ x: 0 }), this.onCloseTap())
            : e - i < s &&
              e - i > 0 &&
              (this.setData({ x: -this._slideWidth, close: !1 }),
              this.onOpenTap()));
    },
    onChange(t) {
      !this.data.out && t.detail.x < -this._threshold
        ? this.setData({ out: !0 })
        : this.data.out &&
          t.detail.x >= -this._threshold &&
          this.setData({ out: !1 });
    },
    onRightTap() {
      this.properties.autoClose &&
        (this.setData({ popup: !1, x: 0 }), this.onCloseTap()),
        this.triggerEvent("lintap", "click right", {
          bubbles: !0,
          composed: !0,
        });
    },
    onOpenTap() {
      this.triggerEvent("slideopen", !0, { bubbles: !0, composed: !0 });
    },
    onCloseTap() {
      this.triggerEvent("slideclose", !1, { bubbles: !0, composed: !0 });
    },
  },
});
