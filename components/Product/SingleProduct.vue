<template>
  <div v-if="loader" class="single-product-area" id="fast_selling"
    style="background:#f2f2f2; padding:50px 0 50px !important;">
    <div class="text-center p-5 container"
      style="background:white; border-radius:20px;box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; max-width: 92%;">
      <BSpinner variant="primary" label="Spinning" />
    </div>
  </div>
  <div v-else class="single-product-area">
    <div class="container" style="max-width: 90%;">
      <div class="newrow1">
        <!-- <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1 d-inline-flex flex-row-reverse">
                    <a class="product-breadcumb-area breadcumb-wrap " href="./cart.php" style="font-size: 20px;">
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      <i id="cart_count">0</i>
                    </a>
                </div> -->
        <!-- <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
          <div class="card detail-card ">
            <div class="theme-btn-group"
              style="align-items: center; justify-content: center; font-size: 20px; font-weight: 600;"
              id="sub_category_container"></div>
          </div>
        </div> -->
        <!-- <SingleProductImageSlider :activeImage="activeImage" :thumbnails="thumbnails" :delay="3000" :active_index="0" /> -->
        <SingleProductImageSlider :thumbnails="thumbnails" :delay="3000" />
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
          <!--<div class="product-single-content" id="productContainer">-->
          <div class="product-single-content">
            <h2 id="product_name">{{ product.category_name }}</h2>
            <div class="card detail-card">
              <h3 id="options_heading">Create Order<span>*</span></h3>
              <div class="theme-btn-group d-flex flex-wrap" id="buttonContainer">
                <button @click.prevent="changeFlow('PRINT')" id="print_button"
                  :class="single_product_selected_options['flow'] == 'PRINT' ? 'active' : ''"
                  style="width: max-content; display: block;" class="btn btn-outline-secondary m-1">Print</button>
                <button @click.prevent="changeFlow('DESIGN')" id="design_button"
                  :class="single_product_selected_options['flow'] == 'DESIGN' ? 'active' : ''"
                  style="width: max-content; display: block;" class="btn btn-outline-secondary m-1">Design</button>
                <button @click.prevent="changeFlow('DESIGNNPRINT')" id="design_n_print_button"
                  :class="single_product_selected_options['flow'] == 'DESIGNNPRINT' ? 'active' : ''"
                  style="width: max-content; display: block;" class="btn btn-outline-secondary m-1">Design &amp;
                  Print</button>
              </div>
              <span class="w-100 text-center text-danger mt-2" id="alertMsgCreateOrder" style="display: none;">* Please
                select option</span>
            </div>
            <div id="designCard"
              v-if="single_product_selected_options['flow'] == 'DESIGN' || (single_product_selected_options['flow'] == 'DESIGNNPRINT' && designPrintDesignFlow)">
              <div class="card detail-card">
                <h3 id="options_heading">Content for Design<span>*</span></h3>
                <div class="d-flex flex-column text-center" id="buttonContainer">
                  <textarea @input="setDesignData('content_desc', content_description)" v-model="content_description"
                    id="content_description" required="" cols="40" rows="5"
                    style="padding: 12px 20px; box-sizing: border-box; border: 2px solid #ccc; border-radius: 4px; background-color: #f8f8f8; font-size: 16px; resize: none;"
                    placeholder="Description"></textarea>
                  <strong class="my-1">OR</strong>
                  <input id="content_file" required="" @input="handleFileInput($event, 'content_files')" type="file"
                    multiple="" accept=".jpg, .png, .jpeg, .pdf">
                  <span
                    style="font-weight: normal; font-size: 10px; line-height: 12px; color: #333333; margin: 0 0 20px 0;"
                    class="mt-1">* Supported file extension: .png, .jpg, .jpeg, .pdf</span>
                </div>
              </div>
              <div class="card detail-card">
                <h3 id="options_heading">Logo Image<span class="ml-3"><i onmouseenter="showText('logoT')"
                      onmouseleave="hideText('logoT')" id="logoQ" class="fa fa-question-circle-o"
                      aria-hidden="true"></i></span></h3>
                <div class="d-flex flex-column text-center" id="buttonContainer">
                  <input id="logo" @input="handleFileInput($event, 'logo')" required="" type="file"
                    accept=".jpg, .png, .jpeg, .pdf">
                  <span
                    style="font-weight: normal; font-size: 10px; line-height: 12px; color: #333333; margin: 0 0 20px 0; display: none;"
                    id="logoT" class="text-danger mt-1">* Supported file extension: .png, .jpg,
                    .jpeg, .pdf</span>
                </div>
              </div>
              <div class="card detail-card">
                <h3 id="options_heading">Reference Image<span class="ml-3"><i onmouseenter="showText('referenceT')"
                      onmouseleave="hideText('referenceT')" class="fa fa-question-circle-o"
                      aria-hidden="true"></i></span></h3>
                <div class="d-flex flex-column text-center" id="buttonContainer">
                  <input id="reference" @input="handleFileInput($event, 'reference')" required="" type="file"
                    accept=".jpg, .png, .jpeg, .pdf">
                  <span id="referenceT"
                    style="font-weight: normal; font-size: 10px; line-height: 12px; color: #333333; margin: 0 0 20px 0; display: none;"
                    class="text-danger mt-1">* Supported file extension: .png, .jpg, .jpeg,
                    .pdf</span>
                </div>
              </div>
              <div class="card detail-card">
                <h3 id="options_heading">Do You Require Source File?</h3>
                <div class="d-flex flex-column text-center" id="buttonContainer">
                  <!-- <span id="professional_design" class="req my-1">professional design</span> -->
                  <!-- <span style="font-size: 20px; text-transform: capitalize;" class="my-1">source file</span> -->
                  <div class="d-flex flex-row" style="text-align: center; justify-content: center;">
                    <span class="btn m-1" id="source_file" @click.prevent="setDesignData('source_file', true)"
                      style="padding-left: 20px; padding-right: 20px; border: 1px solid #468cdc;">Yes</span>
                    <span class="btn m-1" id="no_source_file" @click.prevent="setDesignData('source_file', false)"
                      style="padding-left: 20px; padding-right: 20px; border: 1px solid #468cdc;">No</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100" id="card_holder"
              v-if="single_product_selected_options['flow'] == 'PRINT' || (single_product_selected_options['flow'] == 'DESIGNNPRINT' && !designPrintDesignFlow)">
              <div id="card" class="card detail-card" v-for="(option, option_index) in product.options"
                :key="option_index">
                <template v-if="load_card_index == option_index">
                  <div class="text-center p-5 align-items-center d-flex flex-column" style="gap: 10px;">
                    <BSpinner variant="primary" label="Spinning" />
                    <span>Loading...</span>
                  </div>
                </template>
                <template v-else>
                  <h3 id="options_heading">{{ option.name }}<span>*</span></h3>
                  <div class="theme-btn-group d-flex flex-wrap" id="buttonContainer">
                    <template
                      v-for="(option_value, option_value_index) in product.option_values.filter(e => e.opt_id == option.id)">
                      <button class="btn btn-outline-secondary"
                        style="width: max-content; text-align: center; align-items: center;" :key="option_value_index"
                        :class="single_product_selected_options[option.id].value && single_product_selected_options[option.id].value.id == option_value.id ? 'active' : ''"
                        @click.prevent="updateSelectedDetails(option, option_value, option_index)">{{ option_value.name
                        }}</button>
                    </template>
                  </div>
                </template>
              </div>
              <div id="card" class="card detail-card">
                <template v-if="load_card_index == 'qty'">
                  <div class="text-center p-5 align-items-center d-flex flex-column" style="gap: 10px;">
                    <BSpinner variant="primary" label="Spinning" />
                    <span>Loading...</span>
                  </div>
                </template>
                <template v-else-if="single_product_selected_options.price_data.length">
                  <h3 id="options_heading">Quantity<span>*</span></h3>
                  <div class="theme-btn-group d-flex flex-wrap" id="buttonContainer">
                    <template v-for="(price, price_index) in single_product_selected_options.price_data">
                      <button class="btn btn-outline-secondary"
                        style="width: max-content; text-align: center; align-items: center;" :key="price_index"
                        :class="single_product_selected_options['quantity'].value && single_product_selected_options['quantity'].value.id == price.id ? 'active' : ''"
                        @click.prevent="updateQuantity(price)">{{ price.quantity }}</button>
                      <!-- :class="single_product_selected_options[option.id].value && single_product_selected_options[option.id].value.id == option_value.id ? 'active' : '' " -->
                    </template>
                  </div>
                </template>
                <template v-else>
                  <h3 id="options_heading">Quantity<span>*</span></h3>
                  <div class="theme-btn-group d-flex flex-wrap" style="width: 100%" id="buttonContainer"><a
                      class="btn btn-success w-100" href="/contact_us">Get a quote</a><span
                      class="w-100 text-center text-danger" style="display: none;">* Please
                      select option</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12 sticky">
          <div class="shareing-area">
            <a class="button shareing-area-a" style="cursor: pointer" @click="openShare">
              <img src="/images/icon/Arrow.png">
            </a>
            <dialog class="overlay">
              <div class="col-lg-4 col-md-5 col-sm-8 col-xs-10">
                <div class="share-img">
                  <img src="/images/product/product-details/1.jpg" alt="" class="">
                </div>
                <div class="sharing-area">
                  <h2>Share this with your social community</h2>
                  <a class="close" href="single-product.php">×</a>
                  <div class="content">
                    <ul class="socil-icon d-flex my-10">
                      <li><a href="javascript:void(0);"><img src="/images/socialicon/1.png"></a></li>
                      <li><a href="javascript:void(0);"><img src="/images/socialicon/6.png"></a></li>
                      <li><a href="javascript:void(0);"><img src="/images/socialicon/4.png"></a></li>
                      <li><a href="javascript:void(0);"><img src="/images/socialicon/2.png"></a></li>
                    </ul>

                    <span>or copy link</span>
                    <div class="copy-input">
                      <input type="text" id="share_link" placeholder="https://www.shapenprint.com/cards"
                        class="form-control">
                      <!-- <button>Copy</button> -->
                    </div>
                    <!-- <img src="images/icon/copy.PNG" class="my-10" /> -->
                  </div>
                </div>
              </div>
            </dialog>
          </div>
          <div class="card theme-card single-product-price" id="price_card">
            <h3 style="font-size: 20px;" class="price-detail">
              {{ price }} <del style="font-size: 14px;" id="deletePrice">{{ cut_price }}</del> <span
                style="font-size: 12px;" class="off">({{ cut_percentage }}% OFF)</span></h3>
            <span>inclusive of all taxes</span>
            <ul id="price_details_DNP">
            </ul>
            <div class="selected-option-container">
              <ul id="selected_option_ul"></ul>
            </div>
            <p>Expected Delivery by <strong id="delivery_date">{{ new Date(delivery_date).toLocaleDateString('en-IN', {
    weekday: 'long', // 'long' for full name, 'short' for abbreviated
    month: 'long', // 'long' for full name, 'short' for abbreviated
    day: 'numeric', // Numeric day
    year: 'numeric' // Numeric year
  }) }}</strong></p>
            <p class="t-c">*<NuxtLink :to="'/terms_and_conditions'">T&amp;C</NuxtLink> may apply</p>
            <div v-if="print_upload_content_popup" class="card theme-card single-product-price text-center mb-3"
              id="upload_files_on_design_and_print">
              <h3 class="price-detail">
                Upload Files
              </h3>
              <input type="file" ref="fileInput" @input="handleFile($event)" style="height: max-content;"
                accept=".jpg, .jpeg, .png, .pdf" class="form-control">
              <span class="t-c mt-1">* Supported file extension: .png, .jpg, .jpeg, .pdf</span>
              <template v-if="print_upload_loader">
                <div class="d-flex p-5 text-center align-items-center w-100">
                  <BSpinner variant="primary" />
                </div>
              </template>
              <div v-else class="d-flex flex-wrap flex-column m-2" style="gap: 10px;">
                <div v-for="(file, file_index) in uploaded_files_print" :key="file_index"
                  class="d-flex align-items-center">
                  <a :href="file.url" target="_blank">
                    <img :src="file.url" alt="File" width="90" height="90" style="object-fit: fill;">
                  </a>
                  <button class="btn btn-danger" @click.prevent="deleteFile(file_index, file)"
                    style="margin-left: 10px; height: 55px !important; width: 55px !important; align-items: center !important;"><i
                      class="fa fa-trash"></i></button>
                </div>
              </div>
              <!-- <button class="btn theme-btn mt-2" id="upload_files_button"><strong id="">Upload Files </strong><i class="fa fa-upload" style="margin-left: 5px;" id="designNprintFileUploadButton"></i> </button> -->
            </div>
            <button @click.prevent="proceed" id="finalButton" class="btn theme-btn"><strong id="upload_content">{{
    proceed_button_text }}
              </strong><i :class="proceed_button_icon" style="margin-left: 5px;" id="button_icon_upload"></i> </button>
            <!--<span id="alert_text" style="font-weight: 100; display: none;" class="text-danger mt-2 text-center w-100">* Please select all the options</span>-->
          </div>
          <!-- <div class="product-single-content">
                       <img src="images/icon/demo.jpg" />
                    </div> -->
        </div>
      </div>

      <div id="popup2" class="overlay">
        <div class="shareing-area">
          <div class="popup col-lg-4 col-md-6 col-sm-10 col-xs-10 p-3">
            <a class="close" href="#">×</a>
            <div class="heading text-center">
              <h3>Get a Quote</h3>
            </div>
            <div class="form">
              <input class="form-control my-2" id="name" type="text" placeholder="My name is">
              <input class="form-control my-2" id="email" type="text" placeholder="My email is">
              <input class="form-control my-2" id="phone" type="number" placeholder="My phone number is">
              <input class="form-control my-2" id="message" type="text" placeholder="Message">
              <button class="btn btn-outline-secondary" onclick="getQuote()" style="text-transform: uppercase;">Get
                Quote</button>
            </div>
          </div>
        </div>
      </div>
      <div class="featured-product-area">
        <div class="container" style="max-width: 90%;">
          <div class="row" style="margin-left: -60px; margin-right: -60px;">
            <div class="about">
              <div class="section-title ">
                <h2 class="related-p-heading">About Product</h2>
                <pre
                  style="font-family: 'Baloo Tammudu 2, cursive'; font-size: '14px'; line-height: '10px'; color: '#333';">
            {{ product.category_description }}</pre>
                <!-- <div v-html="product.category_description"></div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SingleProductImageSlider from './SingleProductImageSlider.vue';
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['snp_id', 'categorySingle'])
  },
  components: {
    SingleProductImageSlider
  },
  name: 'SingleProduct',
  props: ['category_id'],
  data() {
    return {
      content_description: null,
      designFlowData: new FormData(),
      designPrintDesignFlow: false,
      show_share_model: true,
      price: null,
      cut_price: null,
      cut_percentage: 10,
      delivery_date: null,
      product: null,
      thumbnails: [],
      activeImage: null,
      loader: true,
      flow: 'PRINT',
      single_product_selected_options: null,
      load_card_index: null,
      proceed_button_text: 'Upload Content',
      proceed_button_icon: 'fa fa-upload',
      print_upload_content_popup: false,
      print_upload_loader: false,
      uploaded_files_print: [],
      files_upload_print: null,
      uploaded_files_data: new FormData(),
    }
  },
  async mounted() {
    this.loader = true
    await this.fetchSingleCategory()
    this.loader = false
  },
  watch: {
    flow(val) {
      switch (val) {
        case "PRINT":
          this.proceed_button_icon = 'fa fa-upload'
          this.proceed_button_text = 'Upload Content'
          break;
        case "DESIGN":
          this.proceed_button_icon = 'fa fa-cart-plus'
          this.proceed_button_text = 'Proceed To Cart'
          break;
        case "DESIGNNPRINT":
          this.proceed_button_icon = 'fa fa-upload'
          this.proceed_button_text = 'Continue'
          break;

        default:
          break;
      }
    }
  },
  methods: {
    handleFileInput(event, name) {
      this.setDesignData(name, event.target.files[0])
    },
    setDesignData(name, data) {
      this.designFlowData.delete(name)
      this.designFlowData.append(name, data)
    },
    async changeFlow(flow) {
      this.loader = true
      this.flow = flow
      await this.$store.dispatch('setSingleProductSelectedFlow', flow)
      if (flow == 'DESIGN') {
        this.calculatePrice()
      } else if (flow == 'PRINT') {
        this.calculatePrice(this.single_product_selected_options.quantity.value)
      }
      this.loader = false
    },
    async addToCart() {
      try {
        if (this.flow == 'DESIGN' && this.proceed_button_text == 'Proceed To Cart') {
          if (this.designFlowData.has('content_desc') || this.designFlowData.has('content_files')) {
            this.designFlowData.append('cat_id', Number(this.category_id))
            // this.designFlowData.append('sub_cat_id', localStorage.getItem('sub_category'))
            this.designFlowData.append('unuser', this.snp_id)
            this.designFlowData.append('uid', this.uid)
            this.designFlowData.append('price', this.price)
            this.designFlowData.append('quantity', 1)
            const resp = await this.$store.dispatch('addToCartDesign', this.designFlowData)
            console.log(resp);
          } else {
            this.$toast.error('Fill all the details.')
          }
        }
        if (this.flow == 'PRINT' && this.proceed_button_text == 'Proceed To Cart') {
          if (!this.uploaded_files_print.length) {
            this.$toast.error('Please upload files')
            return
          }
          const add_cart_payload = {
            flow: this.single_product_selected_options.flow,
            unuser: this.snp_id,
            uid: this.uid,
            category: Number(this.category_id),
            price: this.price,
            quantity_id: this.single_product_selected_options?.quantity?.value?.id,
            quantity: this.single_product_selected_options?.quantity?.value?.quantity,
            exp_day: this.single_product_selected_options?.quantity?.value?.expected_delivery_in_days,
            option: Object.keys(this.single_product_selected_options).filter(e => !['flow', 'price_data', 'quantity'].includes(e)).join(','),
            option_values: JSON.parse(this.single_product_selected_options?.quantity?.value?.options_combo).join(','),
          }
          let i = 1
          for (const file of this.uploaded_files_print) {
            const form = new FormData()
            form.append(`file${i}`, this.uploaded_files_data.get(file.name))
            const response = await this.$store.dispatch('uploadImageForProduct', form);
            if (response) {
              this.uploaded_files_print[i - 1]['image_id'] = Number(response.data[0])
            }
            i += 1
          }
          const cart_response = await this.$store.dispatch('addToCartPrint', add_cart_payload)
          if (cart_response) {
            const cart_id = Number(cart_response.data)
            const image_ids = this.uploaded_files_print.map(e => e.image_id)
            const assign_product_details_response = await await this.$store.dispatch('assignImageIdToCart', {
              cart_id, image_ids
            })
            if (assign_product_details_response.status == 'success') {
              this.$toast.success('Added to cart successfully.')
              await this.$store.dispatch('fetchCart', { unuser: this.snp_id });
              this.$router.push('/cart')
            } else {
              throw new Error('Unable to add to cart.')
            }
          } else {
            throw new Error('Unable to add to cart.')
          }
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.message)
      }
    },
    openShare() {
      this.show_share_model = !this.show_share_model
    },
    deleteFile(file_index, file) {
      this.uploaded_files_data.delete(file.name)
      this.uploaded_files_print.splice(file_index, 1)
    },
    handleFile(event) {
      this.print_upload_loader = true
      const file = event.target.files[0]
      this.uploaded_files_data.append(file.name, file)
      this.uploaded_files_print.push({
        name: file.name, url: URL.createObjectURL(file)
      })
      this.$refs.fileInput.value = null;
      this.print_upload_loader = false
    },
    async proceed() {
      this.print_upload_loader = true
      const flow = this.single_product_selected_options.flow
      if (flow == 'PRINT') {
        if (this.proceed_button_text == 'Upload Content') {
          this.print_upload_content_popup = true
          this.proceed_button_icon = 'fa fa-cart-plus'
          this.proceed_button_text = 'Proceed To Cart'
        } else {
          await this.addToCart()
        }
      } else {
        await this.addToCart()
      }
      this.print_upload_loader = false
    },
    async updateQuantity(qty) {
      await this.$store.dispatch('setSingleProductSelectedOptionValue', {
        option: {
          id: 'quantity'
        }, option_value: qty
      });
      await this.set_single_product_selected_options()
      this.calculatePrice(qty)
    },
    increasePercentage(value, percentage) {
      return value * (1 + percentage / 100)
    },
    async calculatePrice(qty) {
      if (this.flow == 'DESIGN') {
        if (this.categorySingle.design) {
          this.price = parseFloat(Number(this.categorySingle.des_price)).toFixed(2)
          this.cut_price = parseFloat(Number(this.increasePercentage(Number(this.categorySingle.des_price), this.cut_percentage))).toFixed(2)
        } else {
            this.$toast.error('Design is not available for this product.')
        }
        return
      } else if (this.flow == 'PRINT') {
        this.load_card_index = 'qty'
        const quantity = Number(qty.quantity)
        const price_per_piece = Number(qty.price_per_piece)
        const price = quantity * price_per_piece
        this.price = parseFloat(price).toFixed(2)
        this.cut_price = parseFloat(Number(this.increasePercentage(Number(price), this.cut_percentage))).toFixed(2)
        const todayDate = new Date()
        this.delivery_date = new Date(todayDate.setDate(todayDate.getDate() + parseInt(qty.expected_delivery_in_days)))
        setTimeout(() => {
          this.load_card_index = null
        }, 10);
      }
    },
    async updateSelectedDetails(option, option_value, card_index) {
      this.load_card_index = card_index
      await this.$store.dispatch('setSingleProductSelectedOptionValue', { option, option_value });
      await this.set_single_product_selected_options()
      setTimeout(() => {
        this.load_card_index = null
      }, 10);
    },
    async fetchSingleCategory() {
      await this.$store.dispatch('fetchCategoryByID', { type: 'fetchAllCategories', cat_id: this.category_id });
      const data = this.$store.state.categorySingle
      this.product = data
      this.thumbnails = data.images.map(e => { return e.image_url })
      if (this.thumbnails.length) {
        this.activeImage = this.thumbnails[0]
      } else {
        this.activeImage = 'images/product/finalimage.png'
        this.thumbnails = ['images/product/finalimage.png']
      }
      this.set_single_product_selected_options()
    },
    set_single_product_selected_options() {
      this.single_product_selected_options = this.$store.getters['single_product_selected_options']
      this.calculatePrice(this.single_product_selected_options.price_data[0])
    },
  },
}
</script>

<style scoped>
body {
  width: 100%;
  overflow-x: hidden;
}

/* nav{
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  height: 70px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  z-index: 99;
}
nav .navbar{
  height: 100%;
  max-width: 1378px !important;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  /* background: red; 
  align-items:flex-start;
}
.navbar .logo a{
  font-size: 30px;
  color: black;
  text-decoration: none;
  font-weight: 600;
}
nav .navbar .nav-links{
  line-height: 70px;
  height: 100%;
  margin-left: -533px !important;
}
nav .navbar .links{
  display: flex;
}
nav .navbar .links li{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  padding: 0 14px;
}
nav .navbar .links li a{
  height: 100%;
  text-decoration: none;
  white-space: nowrap;
  color: black;
  font-size: 15px;
  font-weight: 500;
}
.links li:hover .htmlcss-arrow,
.links li:hover .js-arrow{
  transform: rotate(180deg);
  }

nav .navbar .links li .arrow{
  /* background: red; 
  height: 100%;
  width: 22px;
  line-height: 70px;
  text-align: center;
  display: inline-block;
  color: #fff;
  transition: all 0.3s ease;
}
nav .navbar .links li .sub-menu{
  position: absolute;
  top: 70px;
  left: 0;
  line-height: 40px;
  background: #3E8DA8;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 4px 4px;
  display: none;
  z-index: 2;
}
nav .navbar .links li:hover .htmlCss-sub-menu,
nav .navbar .links li:hover .js-sub-menu{
  display: block;
}
.navbar .links li .sub-menu li{
  padding: 0 22px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.navbar .links li .sub-menu a{
  color: #fff;
  font-size: 15px;
  font-weight: 500;
}
.navbar .links li .sub-menu .more-arrow{
  line-height: 40px;
}
.navbar .links li .htmlCss-more-sub-menu{
  /* line-height: 40px;
}
.navbar .links li .sub-menu .more-sub-menu{
  position: absolute;
  top: 0;
  left: 100%;
  border-radius: 0 4px 4px 4px;
  z-index: 1;
  display: none;
}
.links li .sub-menu .more:hover .more-sub-menu{
  display: block;
}
.navbar .search-box{
  position: relative;
   height: 40px;
  width: 40px;
}
.navbar .search-box i{
  position: absolute;
  height: 100%;
  width: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 22px;
  color: black;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}
.navbar .search-box .input-box{
  position: absolute;
  right: calc(100% - 40px);
  top: 80px;
  height: 60px;
  width: 300px;
  background: #3E8DA8;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s ease;
}
.navbar.showInput .search-box .input-box{
  top: 65px;
  opacity: 1;
  pointer-events: auto;
  background: #3E8DA8;
}
.search-box .input-box::before{
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  background: #3E8DA8;
  right: 10px;
  top: -6px;
  transform: rotate(45deg);
}
.search-box .input-box input{
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  height: 35px;
  width: 280px;
  outline: none;
  padding: 0 15px;
  font-size: 16px;
  border: none;
}
.navbar .nav-links .sidebar-logo{
  display: none;
}
.navbar .bx-menu{
  display: none;
}
.logo{
    padding:0px !important;
}*/

.btn-href:link {
  text-decoration: none;
}

.btn-href {
  color: black !important;
  font-size: 25px;
  align-items: center !important;
  display: contents !important;
}

.btn-href:hover {
  font-size: 21px;
}

.btn-href:before {
  position: relative !important;
  text-decoration: none;
}

@media (min-width: 920px) {
  .sticky {
    position: sticky;
    height: 100%;
    top: 100px;
  }
}

/*
@media (max-width:920px) {
  nav .navbar{
    max-width: 100%;
    padding: 0 25px;
  }

  nav .navbar .logo a{
    font-size: 27px;
  }
  nav .navbar .links li{
    padding: 0 10px;
    white-space: nowrap;
  }
  nav .navbar .links li a{
    font-size: 15px;
  }
}
@media (max-width:800px){
  nav{
    /* position: relative; 
  }
  .navbar .bx-menu{
    display: block;
  }
  nav .navbar .nav-links{
    position: fixed;
    top: 0;
    left: -100%;
    display: block;
    max-width: 270px;
    width: 100%;
    background:  #3E8DA8;
    line-height: 40px;
    padding: 20px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    z-index: 1000;
  }
  .navbar .nav-links .sidebar-logo{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .sidebar-logo .logo-name{
    font-size: 25px;
    color: #fff;
  }
    .sidebar-logo  i,
    .navbar .bx-menu{
      font-size: 25px;
      color: black;
    }
  nav .navbar .links{
    display: block;
    margin-top: 20px;
  }
  nav .navbar .links li .arrow{
    line-height: 40px;
  }
nav .navbar .links li{
    display: block;
  }
nav .navbar .links li .sub-menu{
  position: relative;
  top: 0;
  box-shadow: none;
  display: none;
}
nav .navbar .links li .sub-menu li{
  border-bottom: none;

}
.navbar .links li .sub-menu .more-sub-menu{
  display: none;
  position: relative;
  left: 0;
}
.navbar .links li .sub-menu .more-sub-menu li{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.links li:hover .htmlcss-arrow,
.links li:hover .js-arrow{
  transform: rotate(0deg);
  }
  .navbar .links li .sub-menu .more-sub-menu{
    display: none;
  }
  .navbar .links li .sub-menu .more span{
    /* background: red; 
    display: flex;
    align-items: center;
    /* justify-content: space-between; 
  }

  .links li .sub-menu .more:hover .more-sub-menu{
    display: none;
  }
  nav .navbar .links li:hover .htmlCss-sub-menu,
  nav .navbar .links li:hover .js-sub-menu{
    display: none;
  }
.navbar .nav-links.show1 .links .htmlCss-sub-menu,
  .navbar .nav-links.show3 .links .js-sub-menu,
  .navbar .nav-links.show2 .links .more .more-sub-menu{
      display: block;
    }
    .navbar .nav-links.show1 .links .htmlcss-arrow,
    .navbar .nav-links.show3 .links .js-arrow{
        transform: rotate(180deg);
}
    .navbar .nav-links.show2 .links .more-arrow{
      transform: rotate(90deg);
    }
}
@media (max-width:370px){
  nav .navbar .nav-links{
  max-width: 100%;
} 
}

@media (max-width:767px){
.banner-wrap h2{
    font-size:20px;
    line-height:25px;
}*/

.banner-wrap {
  padding: 20px 15px !important;
}


.btn {
  padding-top: 14px !important;
}

.newrow {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -97px;
}

.newrow1 {
  display: flex;
  flex-wrap: wrap;
  margin-right: -80px;
  margin-left: -80px;
}

.selected {
  color: #fff;
  background-color: #468DDC;
  border-color: #468DDC;
}

.about {
  flex: 0 0 100%;
  max-width: 100%;
  padding-top: 20px;
}

.selectedreq {
  background: #4087d8;
  color: #fff;
}

.req {
  border: 2px solid #4087d8;
  border-radius: 4px;
  color: #000;
  cursor: pointer;
  font-size: 15px;
  outline: none;
  padding: 10px 25px;
  padding-top: 17px;
  text-transform: uppercase;
  transition: all 0.6s ease;
}

.req:hover {
  background: #4087d8;
  border: 2px solid #4087d8;
  color: #fff;
}


[type="file"] {
  /* Style the color of the message that says 'No file chosen' */
  color: #878787;
}

[type="file"]::-webkit-file-upload-button {
  background: #4087d8;
  border: 2px solid #4087d8;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  outline: none;
  padding: 10px 25px;
  padding-top: 20px;
  text-transform: uppercase;
  transition: all 0.6s ease;
}

[type="file"]::-webkit-file-upload-button:hover {
  background: #fff;
  border: 2px solid #535353;
  color: #000;
}

@media (max-width:667px) {
  .newrow1 {
    margin-right: 0px;
    margin-left: 0px;
  }

  .product-single-img .product-active .item {
    width: 100% !important;
  }

  .single-product-area .product-single-content {
    padding-left: 0px;
  }

  .featured-product-area .container .row {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }

  .pull-right .product-price {
    display: flex !important;
    flex-direction: column !important;
  }

}

a:not([href]):not([tabindex]) {
  color: inherit;
  text-decoration: none;
  width: 50% !important;
}
</style>