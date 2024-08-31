<template>
    <div>
      <OwlCarousel
        :items="visibleCards"
        :loop="true"
        :autoplay="true"
        :autoplayTimeout="slideInterval"
        :autoplayHoverPause="true"
        :nav="false"
        :dots="false"
        class="owl-theme"
      >
        <div v-for="(item, index) in items" :key="index" class="item">
          <div class="product-wrap">
            <div class="product-img">
              <img :src="item.images.length > 0 ? item.images[0].image_url : '/images/product/finalimage.png'" alt=""/>
            </div>
            <div class="product-content fix">
              <div class="row">
                <div class="col-6">
                  <h3 style="cursor: pointer">
                    <a>{{ item.category_name }}</a>
                  </h3>
                  <span class="pull-left">
                    {{
                      [
                        { name: 'design', text: 'Design' },
                        { name: 'print', text: 'Print' },
                        { name: 'design_n_print', text: 'Design & Print' },
                      ]
                        .filter(e => item[e.name])
                        .map(e => e.text)
                        .join(' / ')
                    }}
                  </span>
                </div>
                <div class="col-6 d-flex flex-column" style="text-align: end">
                  <h3 style="cursor: pointer; color: #4f91de;">
                    ₹{{ parseFloat(item.price).toFixed(2) }}
                  </h3>
                  <span>
                    <del style="color: #8e8e8e; font-size: 12px;">
                      ₹{{ parseFloat(item.comp_price).toFixed(2) }}
                    </del>
                    <span style="color: #f79a69; font-size: 12px;">(10% Off)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  </template>
  
  <script>
  import OwlCarousel from 'vue-owl-carousel';
  
  export default {
    components: { OwlCarousel },
    props: {
      items: {
        type: Array,
        required: true
      },
      visibleCards: {
        type: Number,
        default: 3
      },
      slideInterval: {
        type: Number,
        default: 3000
      }
    }
  };
  </script>
  
  <style scoped>
  .owl-theme .owl-nav {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    top: 50%;
    gap: 15px !important;
    transform: translateY(-50%);
  }
  
  .owl-prev, .owl-next {
    background: rgba(0,0,0,0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .owl-prev {
    left: 10px;
  }
  
  .owl-next {
    right: 10px;
  }
  
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px !important; 
    /* margin-right: 15px; Adjust the margin to create a gap between cards */
  }
  
  .item:last-child {
    margin-right: 0; 
  }
  </style>
  