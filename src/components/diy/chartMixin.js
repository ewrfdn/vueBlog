export default {
    data(){
        return {
            switchTimer:true
        }
    },
    methods: {
        //   drawLine() {
        //     // 基于准备好的dom，初始化echarts实例
        //     // var bar_dv = document.getElementById('bar_dv');

        //     // 基于准备好的dom，初始化echarts实例
        //     // let myChart = this.$echarts.init(document.getElementById('myChart'))
        //     // 绘制图表
        //     this.option.series[0].data = this.dataList;
        //     this.option.series[1].data = this.series1Value;
        //     this.option.series[2].data = this.series2Value;

        //     this.myChart.setOption(this.option);
        //   },
        onFontDragging(dataIndex, that) {
            // console.log(that.position);
            // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
            // 这里的 that 就是被拖拽的圆点。that.position 就是圆点当前的位置。
            let i=this.seriesValueList.findIndex(item=>!isNaN(item[dataIndex]))
            let afterChangeValue = this.myChart.convertFromPixel(
                "grid",
                that.position
            )[0];
            if(afterChangeValue<0){
                afterChangeValue=0
            }
            if(afterChangeValue>this.seriesValueList[i][dataIndex] + this.dataList[dataIndex]){
                afterChangeValue=this.seriesValueList[i][dataIndex] + this.dataList[dataIndex]-1
            }
            this.seriesValueList[i][dataIndex] = this.seriesValueList[i][dataIndex] + this.dataList[dataIndex] - afterChangeValue
            this.dataList[dataIndex] = afterChangeValue;
            // 用更新后的 data，重绘。
            if (this.timer) {
                this.timer = false;
                window.setTimeout(() => {
                    this.setChart();
                    this.timer = true;
                    this.resetGraphic();

                }, 30);
                //   clearTimeout(this.resetTimer);
                //   this.resetTimer = setTimeout(() => {
                //     this.resetGraphic();
                //   }, 500);
            }
        },
        onMiddleDragging(dataIndex, that) {
            // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
            // 这里的 this 就是被拖拽的圆点。this.position 就是圆点当前的位置。
            const changeXY = this.myChart.convertFromPixel("grid", that.position);
            let i = this.seriesValueList.findIndex(item => !isNaN(item[dataIndex]))
            let currentY = changeXY[1]
            if (Math.abs(currentY-dataIndex)>1&&this.switchTimer) {
                this.switchTimer=false
                setTimeout(()=>{
                    this.switchTimer=true
                },300)
                if(currentY<dataIndex){
                    currentY=dataIndex-1
                }else{
                    currentY=dataIndex+1
                }
                if (currentY > this.yAxisData.length) {
                    currentY = this.yAxisData.length-1;
                } if (currentY < 0) {
                    currentY = 0
                }
                let temp = this.seriesValueList[i][dataIndex]
                if (isNaN(this.seriesValueList[i][currentY])) {
                    // alert(currentY)
                    let key = this.seriesValueList.findIndex(item => !isNaN(item[currentY]))
                    if(key===-1){
                        this.seriesValueList[i][dataIndex] = this.seriesValueList[i][currentY];
                        this.seriesValueList[i][currentY] = temp;
                    }else{
                        this.seriesValueList[key][dataIndex]=this.seriesValueList[key][currentY]
                        this.seriesValueList[key][currentY]='-'
                        this.seriesValueList[i][dataIndex] = this.seriesValueList[i][currentY];
                        this.seriesValueList[i][currentY] = temp;
                    }

                } else {
                    this.seriesValueList[i][dataIndex] = this.seriesValueList[i][currentY];
                    this.seriesValueList[i][currentY] = temp;

                }
                temp = this.dataList[dataIndex];
                this.dataList[dataIndex] = this.dataList[currentY];
                this.dataList[currentY] = temp;

            } else {
                this.dataList[dataIndex] = changeXY[0] - this.seriesValueList[i][dataIndex] / 2;
                if(this.dataList[dataIndex]<0){
                    this.dataList[dataIndex]=0
                }
            }


            // const value =
            //   this.series1Value[dataIndex] === "-"
            //     ? this.series2Value[dataIndex]
            //     : this.series1Value[dataIndex];
            // this.dataList[dataIndex] =
            //   this.myChart.convertFromPixel("grid", that.position)[0] - value / 2;
            // console.log(this.dataList);
            // 用更新后的 data，重绘。
            if (this.timer) {
                //节流防抖控制
                this.timer = false;
                //   console.log(this.dataList);
                window.setTimeout(() => {
                    this.setChart();
                    this.timer = true;
                    // this.resetGraphic();
                }, 30);
                clearTimeout(this.resetTimer);
                this.resetTimer = setTimeout(() => {
                    this.resetGraphic();
                }, 500);
            }
        },
        onEndDragging(dataIndex, that) {
            // 这里的 data 就是本文最初的代码块中声明的 data，在这里会被更新。
            // 这里的 that 就是被拖拽的圆点。that.position 就是圆点当前的位置。
            let afterChangeValue=this.myChart.convertFromPixel("grid", that.position)[0];
            if(afterChangeValue<this.dataList[dataIndex]){
                afterChangeValue=this.dataList[dataIndex]+1
            }
            for (let i = 0; i < this.seriesValueList.length; i++) {
                if (!isNaN(this.seriesValueList[i][dataIndex])) {
                    this.seriesValueList[i][dataIndex] = afterChangeValue - this.dataList[dataIndex];
                    break
                }
            }
            // console.log(this.dataList);
            // 用更新后的 data，重绘。
            if (this.timer) {
                this.timer = false;
                // console.log(this.dataList);
                window.setTimeout(() => {
                    this.setChart();
                    this.timer = true;
                    this.resetGraphic();

                }, 30);
                //   clearTimeout(this.resetTimer);
                //   this.resetTimer = setTimeout(() => {
                //     this.resetGraphic();
                //   }, 500);
            }
        },
        setChart() {
            this.seriesList[0].data = this.dataList;
            for (let i = 1; i < this.seriesList.length; i++) {
                this.seriesList[i].data = this.seriesValueList[i - 1]
            }
            this.option.yAxis.data = this.yAxisData
            this.option.series = this.seriesList
            this.option.legend.data = this.seriesOptions
            this.myChart.setOption(this.option);
        },
        resetGraphic() {
            this.setMoveGraphic();
        },
        setMoveGraphic() {
            let graphicList = [];
            // console.log(this.dataList)
            for (let i = 0; i < this.dataList.length; i++) {
                let step = i * 3;
                let value = 0;
                for (let k = 0; k < this.seriesValueList.length; k++) {
                    if (!isNaN(this.seriesValueList[k][i])) {
                        value = this.seriesValueList[k][i]
                    }
                }
                graphicList[step] = {
                    // 'circle' 表示这个 graphic element 的类型是圆点。
                    type: "circle",
                    cursor:"w-resize",
                    shape: {
                        // 圆点的半径。
                        r: 10,
                    },
                    // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
                    // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                    position: this.myChart.convertToPixel("grid", [
                        this.dataList[i],
                        this.yAxisData[i] - 1,
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
                    cursor:"move",
                    shape: {
                        // 圆点的半径。
                        r: 15,
                    },
                    // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
                    // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                    position: this.myChart.convertToPixel("grid", [
                        this.dataList[i] + value / 2,
                        this.yAxisData[i] - 1,
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
                    cursor:"e-resize",
                    shape: {    
                        // 圆点的半径。
                        r: 10,
                    },
                    // 用 transform 的方式对圆点进行定位。position: [x, y] 表示将圆点平移到 [x, y] 位置。
                    // 这里使用了 convertToPixel 这个 API 来得到每个圆点的位置，下面介绍。
                    position: this.myChart.convertToPixel("grid", [
                        this.dataList[i] + value,
                        this.yAxisData[i] - 1,
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