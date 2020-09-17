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
      this.option.series[0].data=this.dataList
    //   this.option.graphic=this.$echarts.util.map(this.dataList,(dataItem, dataIndex)=> {
    //           console.log(this.myChart.convertToPixel("grid",[300,200]))
    //         return {
    //           // 'circle' 表示这个 graphic element 的类型是圆点。
    //           type: "circle",

    //           shape: {
    //             // 圆点的半径。
    //             r:  50,
    //           },
    //           // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
    //           // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
    //           position: [300,300],

    //           // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
    //           invisible: false,
    //           // 这个属性让圆点可以被拖拽。
    //           draggable: true,
    //           // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
    //           z: 100,
    //           // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
    //           // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
    //           // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
    //           ondrag: this.$echarts.util.curry(this.onPointDragging, dataIndex),
    //         };
    //       }),
    this.drawLine();
    this.myChart.setOption({
        graphic:this.$echarts.util.map(this.dataList,(dataItem, dataIndex)=> {
            //   console.log(this.myChart.convertToPixel("grid",[300,200]))
            return {
              // 'circle' 表示这个 graphic element 的类型是圆点。
              type: "circle",

              shape: {
                // 圆点的半径。
                r:  50,
              },
              // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
              // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
              position: [300,300],

              // 这个属性让圆点不可见（但是不影响他响应鼠标事件）。
              invisible: false,
              // 这个属性让圆点可以被拖拽。
              draggable: true,
              // 把 z 值设得比较大，表示这个圆点在最上方，能覆盖住已有的折线图的圆点。
              z: 100,
              // 此圆点的拖拽的响应事件，在拖拽过程中会不断被触发。下面介绍详情。
              // 这里使用了 echarts.util.curry 这个帮助方法，意思是生成一个与 onPointDragging
              // 功能一样的新的函数，只不过第一个参数永远为此时传入的 dataIndex 的值。
              ondrag: this.$echarts.util.curry(this.onPointDragging, dataIndex),
            };
          }),
    })
    console.log(this.option)
  },
  data(){
   return {
     myChart : null,
    dataList: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
     option : {
         graphic:[],
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
            id:"g1",
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
                list.push("11月" + i + "日");
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
              data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
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
              data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
            },
          ],
        }
   }  
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // var bar_dv = document.getElementById('bar_dv');
        
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
       
        this.myChart.setOption(this.option);
      
    },
    onPointDragging(dataIndex) {
    // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
    // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
    // data[dataIndex] = this.myChart.convertFromPixel('grid', this.position);
    // 用更新后的 data，重绘折线图。
    // this.myChart.setOption({
    //     series: [{
    //         id: 'a',
    //         data: data
    //     }]
    // });
}
  },
};
</script>