<template>
  <a-card>
    <a-card>
      <a-form>
        <a-row :gutter="12">
          <a-col :span="2">
            <a-form-item>新增系列</a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="系列名称" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-model="series.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="系列颜色" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input v-model="series.color"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button type="primary" @click="addSeries()">新增</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="2">
            <a-form-item>删除系列</a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select>
                <a-select-option
                  v-for="(item,key) in seriesOptions"
                  :key="key"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button type="danger" @click="deleteSeries">删除</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="2">
            <a-form-item>新增系列项目</a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="系列名字" required :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select v-model="seriesItem.series">
                <a-select-option
                  v-for="(item,key) in seriesOptions"
                  :key="key"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="起始值" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input-number v-model="seriesItem.startValue" style="width:100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="跨度值" required :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-input-number v-model="seriesItem.spanValue" style="width:100%"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button type="primary" @click="addSeriesItem()">新增</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="2">
            <a-form-item>删除系列值</a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="系列" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select>
                <a-select-option
                  v-for="(item,key) in seriesOptions"
                  :key="key"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="项目" :labelCol="{span:8}" :wrapperCol="{span:16}">
              <a-select>
                <a-select-option
                  v-for="(item,key) in seriesOptions"
                  :key="key"
                  :value="item"
                >{{item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-button type="danger" @click="deleteSeries">删除</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <div id="myChart" ref="chart" style="width:100%;min-height:400px"></div>
  </a-card>
</template>
<script>
import mixin from "./chartMixin";
export default {
  //   updated(){
  //       this.changeView();
  //     },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.setChart();
    this.resetGraphic();
  },
  mixins: [mixin],
  data() {
    return {
      series: {},
      seriesItem: {},
      myChart: null,
      seriesList: [
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
          name: "group1",
          type: "bar",
          stack: "总量",
          // label: {
          //   normal: {
          //     show: true,
          //     position: "top",
          //   },
          // },
          data: [],
        },
        {
          name: "group2",
          type: "bar",
          stack: "总量",
          // label: {
          //   normal: {
          //     show: true,
          //     position: "bottom",
          //   },
          // },
          data: [],
        },
      ],
      seriesOptions: ["group1", "group2"],
      seriesValueList: [
        ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
        [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
      ],
      yAxisData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      resetTimer: null,
      timer: true,
      dataList: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292],
      series1Value: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"],
      series2Value: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203],
      option: {
        graphic: [],
        title: {
          text: "甘特图",
        },
        animation:false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [],
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
          data: [],
        },
        xAxis: {
          type: "value",
        },
        series: [],
      },
    };
  },
  methods: {
    deleteSeries() {},
    addSeries() {
      if (!(this.series.name && this.series.color)) {
        this.$message.warning("请填写必输项");
        return;
      }
      this.seriesOptions.push(this.series.name)
      const initValue=[];
      for(let count in this.dataList){
        initValue.push("-")
      }
      this.seriesValueList.push(initValue)
      this.seriesList.push({
        name: this.series.name,
        type: "bar",
        stack: "总量",
        // label: {
        //   normal: {
        //     show: true,
        //     position: "top",
        //   },
        // },
        itemStyle: {
          normal: {
            color: this.series.color,
          },
        },
        data: [],
      });
      this.setChart();
    },
    addSeriesItem() {
      if (!this.seriesItem.spanValue || !this.seriesItem.series) {
        this.$message.warning("请输入必输项");
        return;
      }
      for (let i in this.seriesValueList) {
        this.seriesValueList[i].push("-");
      }
      this.yAxisData.push(this.yAxisData.length + 1);
      if (this.seriesItem.startValue) {
        this.dataList.push(this.seriesItem.startValue);
      } else {
        this.dataList.push(0);
      }
      console.log(this.seriesValueList)
      for (let k = 1; k < this.seriesList.length; k++) {
        if (this.seriesList[k].name === this.seriesItem.series) {
          this.seriesValueList[k - 1][
            this.seriesValueList[k - 1].length - 1
          ] = this.seriesItem.spanValue;
          break;
        }
      }
      this.setChart();
      this.setMoveGraphic();
    },
  },
};
</script>