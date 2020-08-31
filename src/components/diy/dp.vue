<template>
  <div > 
      <a-input v-model="inputValue"></a-input>
      <a-input v-model="inputValue1"></a-input>
      <a-button @click="getRes">计算</a-button>
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
        getRes(){
            let res=this.callBack(this.arr1,this.arr2,0,[],0)
            console.log(res)
        },
        callBack(start,target,tcur,res,splitCount){//最少拆箱算法
            if(target.length===tcur){
                // console.log( {count:splitCount,res:res})
                return {count:splitCount,res:res}
            }
            let temp=[]
            for(let i=0;i<start.length;i++){
                if(start[i]===0){
                    continue
                }
                    if(start[i]-target[tcur]<0){
                        let startCopy=[...start]
                        let targetCopy=[...target]
                        targetCopy[tcur]=target[tcur]-start[i]
                        startCopy[i]=0

                       temp.push( this.callBack(startCopy,targetCopy,tcur,[...res,{key:i,value:start[i]}],splitCount))
                    }else if(start[i]-target[tcur]>0){
                          let startCopy=[...start]
                        startCopy[i]=start[i]-target[tcur]
                       temp.push( this.callBack(startCopy,target,tcur+1,[...res,{key:i,value:target[tcur]}],splitCount+1))
                        
                    }else{
                        let startCopy=[...start]
                        startCopy[i]=0
                       temp.push( this.callBack(startCopy,target,tcur+1,[...res,{key:i,value:start[i]}],splitCount))
                    }
            }
            // if(temp.length==0){
            //     return {}
            
            // console.log(temp)
            let mini=temp[0]
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