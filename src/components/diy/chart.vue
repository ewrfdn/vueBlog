<template>
  <div id="myChart" ref="chart" style="width:100%;min-height:400px"></div>
</template>
<script>
export default {
  //   updated(){
  //       this.changeView();
  //     },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.drawLine()
    this.resetGraphic();
  },
  data() {
    return {
      myChart: null,
      Y: [],
      resetTimer: null,
      timer: true,
      dataList: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
      series1Value: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
      series2Value: ["-", "-", "-", 108, 154, '-', "-", "-", 119, 361, 203],
      option: {
        graphic: [],
        title: {
          text: "阶梯瀑布图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // formatter: function (params) {
          //   var tar;
          //   if (params[1].value != "-") {
          //     tar = params[1];
          //   } else {
          //     tar = params[0];
          //   }
          //   return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          // },
        },
        legend: {
          data: ["支出", "收入"],
        },
        grid: {
          left: "3%",
          id: "g1",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "category",
          splitLine: { show: false },
          data: (function () {
            var list = [];
            for (var i = 1; i <= 11; i++) {
              list.push(i);
            }
            return list;
          })(),
        },
        xAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [],
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            data: [],
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "bottom",
              },
            },
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // var bar_dv = document.getElementById('bar_dv');

      // 基于准备好的dom，初始化echarts实例
      // let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
    this.option.series[0].data = this.dataList;
    this.option.series[1].data = this.series1Value;
    this.option.series[2].data = this.series2Value;
      this.myChart.setOption(this.option);
    },
    onFontDragging(dataIndex, that) {
      // console.log(that.position);
      // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
      // 这里的 that 就是被拖拽的圆点。that.position 就是圆点当前的位置。
      const afterChangeValue = this.myChart.convertFromPixel(
        "grid",
        that.position
      )[0];
      if (this.series1Value[dataIndex] !== "-") {
        this.series1Value[dataIndex] =
          this.series1Value[dataIndex] +
          this.dataList[dataIndex] -
          afterChangeValue;
      }
      if (this.series2Value[dataIndex] !== "-") {
        this.series2Value[dataIndex] =
          this.series2Value[dataIndex] +
          this.dataList[dataIndex] -
          afterChangeValue;
      }
      this.dataList[dataIndex] = afterChangeValue;
      // console.log(this.dataList)
      // console.log(this.dataList);
      // 用更新后的 data，重绘。
      if (this.timer) {
        this.timer = false;
        window.setTimeout(() => {
          this.setChart();
          this.timer = true;
        }, 30);
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.resetGraphic();
        }, 500);
      }
    },
    onMiddleDragging(dataIndex, that) {
      // console.log(that.position);
      // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
      // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
      const value=this.series1Value[dataIndex]==="-"?this.series2Value[dataIndex]:this.series1Value[dataIndex]
      this.dataList[dataIndex] = this.myChart.convertFromPixel(
        "grid",
        that.position
      )[0]-value/2;
      // console.log(this.dataList);
      // 用更新后的 data，重绘。
      if (this.timer) {//节流防抖控制
        this.timer = false;
        console.log(this.dataList);
        window.setTimeout(() => {
          this.setChart();
          this.timer = true;
        }, 30);
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.resetGraphic();
        }, 500);
      }
    },
    onEndDragging(dataIndex, that) {
      // console.log(that.position);
      // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
      // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
      if(this.series1Value[dataIndex]!=="-"){
          this.series1Value[dataIndex] = this.myChart.convertFromPixel(
        "grid",
        that.position
      )[0]-this.dataList[dataIndex];
      }
      if(this.series2Value[dataIndex]!=="-"){
        this.series2Value[dataIndex] = this.myChart.convertFromPixel(
        "grid",
        that.position
      )[0]-this.dataList[dataIndex];
      }
      // console.log(this.dataList);
      // 用更新后的 data，重绘。
      if (this.timer) {
        this.timer = false;
        // console.log(this.dataList);
        window.setTimeout(() => {
          this.setChart();
          this.timer = true;
        }, 30);
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(() => {
          this.resetGraphic();
        }, 500);
      }
    },
    setChart() {
      this.myChart.setOption({
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
              emphasis: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: this.dataList,
          },
          {
            name: "group1",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            data: this.series1Value,
          },
          {
            name: "group2",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "bottom",
              },
            },
            data: this.series2Value,
          },
        ],
      });
    },
    resetGraphic() {
      this.setMoveGraphic();
    },
    setMoveGraphic() {
      let graphicList = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let step = i * 3;
        let value =
          this.series1Value[i] === "-"
            ? this.series2Value[i]
            : this.series1Value[i];
        graphicList[step] = {
          // 'circle' 表示这个 graphic element 的类型是圆点。
          type: "circle",

          shape: {
            // 圆点的半径。
            r: 10,
          },
          // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
          // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
          position: this.myChart.convertToPixel("grid", [
            this.dataList[i],
            this.option.yAxis.data[i] - 1,
          ]),

          // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
          invisible: true,
          // 这个属性让圆点可以被拖拽。
          draggable: true,
          // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
          z: 100,
          // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
          // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
          // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
          ondrag: this.$echarts.util.curry(
            function (dataIndex, that) {
              that.onFontDragging(dataIndex, this);
            },
            i,
            this
          ),
        };
        graphicList[step + 1] = {
          // 'circle' 表示这个 graphic element 的类型是圆点。
          type: "circle",

          shape: {
            // 圆点的半径。
            r: 10,
          },
          // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
          // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
          position: this.myChart.convertToPixel("grid", [
            this.dataList[i] + value / 2,
            this.option.yAxis.data[i] - 1,
          ]),

          // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
          invisible: true,
          // 这个属性让圆点可以被拖拽。
          draggable: true,
          // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
          z: 100,
          // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
          // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
          // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
          ondrag: this.$echarts.util.curry(
            function (dataIndex, that) {
              that.onMiddleDragging(dataIndex, this);
            },
            i,
            this
          ),
        };
        graphicList[step + 2] = {
          // 'circle' 表示这个 graphic element 的类型是圆点。
          type: "circle",

          shape: {
            // 圆点的半径。
            r: 10,
          },
          // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
          // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
          position: this.myChart.convertToPixel("grid", [
            this.dataList[i]+value,
            this.option.yAxis.data[i] - 1,
          ]),

          // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
          invisible: true,
          // 这个属性让圆点可以被拖拽。
          draggable: true,
          // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
          z: 100,
          // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
          // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
          // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
          ondrag: this.$echarts.util.curry(
            function (dataIndex, that) {
              that.onEndDragging(dataIndex, this);
            },
            i,
            this
          ),
        };
      }
      this.myChart.setOption({
        graphic: graphicList,
      });
    },
  },
};
</script>