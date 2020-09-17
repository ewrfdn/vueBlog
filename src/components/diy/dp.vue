<template>
  <div > 
      <a-input v-model="inputValue"></a-input>
      <a-input v-model="inputValue1"></a-input>
      <a-button @click="getMaxRes">计算最大</a-button>
      <a-button @click="getMinRes">计算最小</a-button>

  </div>
</template>

<script>
export default {
    data(){
        return {
            inputValue:"",
            inputValue1:'',
            arr1:[],
            arr2:[],
        }
    },
    watch:{
        inputValue(val){
            this.arr1=val.split(' ')
            this.arr1=this.arr1.map(item=>{
                return parseInt(item)
            })
            console.log(this.arr1)
        },
        inputValue1(val){
            this.arr2=val.split(' ')
           this.arr2=this.arr2.map((item,index)=>{
                return parseInt(item)
            })
            console.log(this.arr2)
        }
    },
    methods:{
        getMinRes(){
            let res=this.callBack(this.arr1,this.arr2,0,[],0)
            console.log(res)
        },
        getMaxRes(){
               let res=this.callBackMax(this.arr1,this.arr2,0,[],0)
            console.log(res)
        },
         callBackMax(barCode,shipping,tcur,res,splitCount){//最少拆箱算法 barCode 条码数组 shipping 订单数组，tcur 当前订单数组完成指针 res 之前操作的结果数组，splitCount 拆箱次数
            if(shipping.length===tcur){
                return {count:splitCount,res:res}
            }
            let temp=[] // 记录循环后所有的结果
            for(let i=0;i<barCode.length;i++){
                if(barCode[i]===0){//条码中数量已用完
                    continue
                }
                    if(barCode[i]-shipping[tcur]<0){
                        let barCodeCopy=[...barCode]
                        let shippingCopy=[...shipping]
                        shippingCopy[tcur]=shipping[tcur]-barCode[i]
                        barCodeCopy[i]=0

                       temp.push( this.callBack(barCodeCopy,shippingCopy,tcur,[...res,{key:i,value:barCode[i]}],splitCount))
                    }else if(barCode[i]-shipping[tcur]>0){
                          let barCodeCopy=[...barCode]
                        barCodeCopy[i]=barCode[i]-shipping[tcur]
                       temp.push( this.callBack(barCodeCopy,shipping,tcur+1,[...res,{key:i,value:shipping[tcur]}],splitCount+1))
                        
                    }else{
                        let barCodeCopy=[...barCode]
                        barCodeCopy[i]=0
                       temp.push( this.callBack(barCodeCopy,shipping,tcur+1,[...res,{key:i,value:barCode[i]}],splitCount))
                    }
            }
            let mini=temp[0]// 获取返回最小值
            for(let i=1;i<temp.length;i++){
                if(mini.count<temp[i].count){
                    mini=temp[i]
                }
            }
            return mini
        },
        callBack(barCode,shipping,tcur,res,splitCount){//最少拆箱算法 barCode 条码数组 shipping 订单数组，tcur 当前订单数组完成指针 res 之前操作的结果数组，splitCount 拆箱次数
            if(shipping.length===tcur){
                return {count:splitCount,res:res}
            }
            let temp=[] // 记录循环后所有的结果
            for(let i=0;i<barCode.length;i++){
                if(barCode[i]===0){//条码中数量已用完
                    continue
                }
                    if(barCode[i]-shipping[tcur]<0){
                        let barCodeCopy=[...barCode]
                        let shippingCopy=[...shipping]
                        shippingCopy[tcur]=shipping[tcur]-barCode[i]
                        barCodeCopy[i]=0

                       temp.push( this.callBack(barCodeCopy,shippingCopy,tcur,[...res,{key:i,value:barCode[i]}],splitCount))
                    }else if(barCode[i]-shipping[tcur]>0){
                          let barCodeCopy=[...barCode]
                        barCodeCopy[i]=barCode[i]-shipping[tcur]
                       temp.push( this.callBack(barCodeCopy,shipping,tcur+1,[...res,{key:i,value:shipping[tcur]}],splitCount+1))
                        
                    }else{
                        let barCodeCopy=[...barCode]
                        barCodeCopy[i]=0
                       temp.push( this.callBack(barCodeCopy,shipping,tcur+1,[...res,{key:i,value:barCode[i]}],splitCount))
                    }
            }
            let mini=temp[0]// 获取返回最小值
            for(let i=1;i<temp.length;i++){
                if(mini.count>temp[i].count){
                    mini=temp[i]
                }
            }
            return mini
        }
    }

}
</script>

<style>

</style>