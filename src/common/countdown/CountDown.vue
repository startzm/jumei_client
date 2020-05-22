<template>
  <span :endTime="endTime" :endText="endText" :tipText="tipText" id="count-down">
    <span>{{tipText}}</span>
    <span id="hours">{{hours}}</span>&nbsp;:
    <span id="minutes">{{minutes}}</span>&nbsp;:
    <span id="seconds">{{seconds}}</span>
  </span>
</template>
<script>
  export default {
    name: 'CountDown',
    data(){
      return {
        content: '',
        hours: '',
        minutes: '',
        seconds: ''
     }
    },
    props:{
      endTime:{
        type: String,
        default :''
      },
      endText:{
        type : String,
        default:'已结束'
      },
      tipText: {
        type: String,
        default: '仅剩'
      }
    },
    mounted () {
     this.countdowm(this.endTime)
    },
    methods: {
      countdowm(timestamp){
      let self = this;
      let timer = setInterval(function(){
        let nowTime = new Date();
        let endTime = new Date(timestamp * 1000);
        let t = endTime.getTime() - nowTime.getTime();
        if(t>0){
          let day = Math.floor(t/86400000);
          let hour=Math.floor((t/3600000)%24);
          let min=Math.floor((t/60000)%60);
          let sec=Math.floor((t/1000)%60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = '';
          self.hours = hour;
          self.minutes = min;
          self.seconds = sec;
          }else{
           clearInterval(timer);
          }
         }.bind(this),1000);
      },
    },
    created() {
        this.countdowm()
    },
  }
</script>

<style scoped>
    #count-down {
        font-size: 13px;
        font-weight: bolder;
    }

    #seconds, #minutes, #hours {
        padding-left: 1px;
        padding-right: 1px;
        background: black;
        color: white;
        height: 100%;
        width: 100%
    }
</style>