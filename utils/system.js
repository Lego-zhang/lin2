import { promisic } from "./util";
import { px2rpx } from "../miniprogram_npm/lin-ui/utils/util";

const getSystemSize = async function () {
  const res = await wx.getSystemInfo();
  //   console.log(res);
  return {
    windowHeight: res.windowHeight,
    windowWidth: res.windowWidth,
    screenWidth: res.screenWidth,
    screenHeight: res.screenHeight,
  };
};

const getWindowHeightRpx = async function () {
  const res = await getSystemSize();
  return px2rpx(res.windowHeight);
};

export { getSystemSize, getWindowHeightRpx };
