module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375,   // 视窗的宽度，对应设计稿的宽度，一般是750
      viewportHeight: 667,  // 视窗的高度，对应设计稿的高度，一般指定1334
      unitPrecision: 3,     // 指定`px`转换为视窗单位值的小数位数
      viewportUnit: 'vw',   // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['-px-to-vw-ignore'], // 指定不转换为视窗单位的类
      minPixelValue: 1,     // 小于或等于`1px`不转换为视窗单位
      mediaQuery: true     // 在媒体查询中转换`px`
    }
  }
}
