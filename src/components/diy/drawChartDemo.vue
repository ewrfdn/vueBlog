<template></template>

<script>
import echarts from "echart";
export default {
  data() {
    return {
      symbolSize: 20,

      // 这个 data 变量在这里单独声明，在后面也会用到。
      data: [
        [15, 0],
        [-50, 10],
        [-56.5, 20],
        [-46.5, 30],
        [-22.1, 40],
      ],
      option: {
        xAxis: {
          min: -100,
          max: 80,
          type: "value",
          axisLine: { onZero: false },
        },
        yAxis: {
          min: -30,
          max: 60,
          type: "value",
          axisLine: { onZero: false },
        },
        series: [
          {
            id: "a",
            type: "line",
            smooth: true,
            symbolSize: symbolSize, // 为了方便拖拽，把 symbolSize 尺寸设大了。
            data: data,
          },
        ],
      },

      graphic: echarts.util.map(data, function (dataItem, dataIndex) {
        return {
          // 'circle' 表示这个 graphic element 的类型是圆点。
          type: "circle",

          shape: {
            // 圆点的半径。
            r: symbolSize / 2,
          },
          // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
          // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
          position: myChart.convertToPixel("grid", dataItem),

          // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
          invisible: true,
          // 这个属性让圆点可以被拖拽。
          draggable: true,
          // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
          z: 100,
          // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
          // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
          // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
          ondrag: echarts.util.curry(onPointDragging, dataIndex),
        };
      }),
    };
  },
};
</script>

<style>
</style>