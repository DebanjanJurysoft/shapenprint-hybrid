<template>
    <div class="preloader-container" v-if="isLoading">
        <div class="loader">
          <div class="image" v-html="currentImage"></div>
          <span style="color: white; font-size: 30px;">{{ loadingPercentage }}%</span>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // images: [
        //   '<img src="/images/favicon.png" width="50"/>',
        // ],
        currentImage: '<img src="/images/favicon.png" width="100"/>',
        loadingPercentage: 0,
        isLoading: true
      };
    },
    methods: {
    //   changeImage() {
    //     let counter = 0;
    //     setInterval(() => {
    //       this.currentImage = this.images[counter];
    //       counter = (counter + 1) % this.images.length;
    //     }, 1500);
    //   },
      updateLoadingPercentage() {
        let num = 0;
        const interval = setInterval(() => {
          this.loadingPercentage = num;
          if (num === 100) {
            clearInterval(interval);
            this.$emit('loadingEnd')
            this.isLoading = false; // Hide loader once done
          }
          let numberToAdd = Number(Number(parseFloat(Math.random()).toFixed(1)) * 10)
          if (numberToAdd + num > 100) {
            numberToAdd = 100 - num
          }
          num += numberToAdd;
        }, 100);
      }
    },
    mounted() {
    //   this.changeImage();
      this.updateLoadingPercentage();
    }
  };
  </script>
  
  <style scoped>
  @import url(https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900);
  
  .preloader-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background: #36a6fb;
      z-index: 10000;
      overflow: hidden;
  }
  
  .loader {
      width: 100px;
      height: 200px;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
  }
  
  .loader .image {
      width: 100px;
      height: 160px;
      font-size: 40px;
      text-align: center;
      transform-origin: bottom center;
      animation: 1.2s rotate infinite;
      opacity: 0;
  }
  
  .loader span {
      display: block;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 0;
  }
  
  @keyframes rotate {
      0% {
          transform: rotate(90deg);
      }
  
      10% {
          opacity: 0;
      }
  
      35% {
          transform: rotate(0deg);
          opacity: 1;
      }
  
      65% {
          transform: rotate(0deg);
          opacity: 1;
      }
  
      80% {
          opacity: 0;
      }
  
      100% {
          transform: rotate(-90deg);
      }
  }
  </style>
  