<template>
  <div>
    <a-card>
      
    </a-card>
    <a-card>
      <a-row :gutter="12">
        <a-col class="col" :span="3">
          <p>周日</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周一</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周二</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周三</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周四</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周五</p>
        </a-col>
        <a-col class="col" :span="3">
          <p>周六</p>
        </a-col>
        <a-col class="col" :span="3"></a-col>
      </a-row>
      <a-row v-for="(i,key) in dayTimeArray" :key="key">
        <a-col class="col" :span="3"  v-for="(item,key1) in i" :key="key1">
          <div class="daily" v-if="item">
            <p class="dayTime" v-text="item.date"></p>
            <p class="WorkTime" v-text="item.workTime"></p>
          </div>
        </a-col>
      </a-row>
      
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dayTimeArray: [],
      selectTime: {
        year: 2020,
        month: 9,
      },
      workTime:"10:00"
    };
  },
  beforeMount(){
      this.initDatTimeArray()
  },
  methods: {
    initDatTimeArray() {
      let monthLastDay = new Date(
        this.selectTime.year,
        this.selectTime.month,
        0
      );
      let monthLength = monthLastDay.getDate();
      let fristDay=new Date(this.selectTime.year,this.selectTime.month-1,1)
      let currentDay=fristDay.getDay()
      console.log(monthLength);
      console.log(currentDay)
      for(let i=1;i<=monthLength;i++){
          let week=~~(currentDay/7)// 第几周
          let day=currentDay%7  //当天是周几
          if(this.dayTimeArray[week]){
              this.dayTimeArray[week][day]={date:i,workTime:this.workTime}
          }else{
              this.dayTimeArray[week]=[]
              this.dayTimeArray[week].length=7
              this.dayTimeArray[week][day]={date:i,workTime:this.workTime}

          }
          currentDay++
      }
      console.log(this.dayTimeArray)
    },
  },
};
</script>

<style lang="less" scoped>
</style>