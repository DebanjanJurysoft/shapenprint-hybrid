<template>
  <div v-if="loader" class="col-lg-4 col-md-12 col-sm-12 col-xs-12 sticky p-5">
    <BSpinner variant="primary" />
  </div>
  <div v-else class="col-lg-4 col-md-12 col-sm-12 col-xs-12 sticky" ref="containerThumb">
    <div class="product-single-img">
      <div class="product-active" style="width: 100%; display: flex; justify-content: center;">
        <div class="item" style="width: 550px;">
          <img :src="activeImage" style="object-fit: contain; width: 100%;" alt="Main Image">
        </div>
      </div>
      <div class="product-thumbnil-active" ref="thumbnailContainer">
        <span v-for="(image, index) in thumbnails" :key="index" class="item" :style="thumbnailStyle"
          style="height: max-content !important; width: 70px !important; max-width: 70px !important; min-width: 70px !important;"
          @click.prevent="setActiveImage(index)" :ref="`thumbnail_${index}`">
          <img :src="image" :class="active_index === index ? 'active' : ''" width="100" alt="Thumbnail Image">
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'thumbnails',
    // 'active_index',
    // 'activeImage',
    'delay'
  ],
  data() {
    return {
      loader: true,
      activeImage: "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/f11e40f4ac55acb7f88a8f95ed09c790.jpg",
      // thumbnails: [
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/80b79e555f94364fc19876eddc64be36.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/ca8fc85237e3cdaeaa0d3afc50ee269c.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/57d9be783a59818f2ac758c144d7ee39.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7a995ec0dd8739f7648f008091ba2a05.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/f11e40f4ac55acb7f88a8f95ed09c790.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/57d9be783a59818f2ac758c144d7ee39.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7a995ec0dd8739f7648f008091ba2a05.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/f11e40f4ac55acb7f88a8f95ed09c790.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/57d9be783a59818f2ac758c144d7ee39.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/7a995ec0dd8739f7648f008091ba2a05.jpg",
      //   "https://jurysoftprojects.com/shapeNprint_api/api/uploads/new_category/f11e40f4ac55acb7f88a8f95ed09c790.jpg"
      // ],
      active_index: 0,
      thumbnailStyle: {
        border: 'none',
        borderRadius: '17px',
        cursor: 'pointer',
      },
      timer: null,
      // delay: 3000
    };
  },
  async created() {
    this.loader = true;
    await this.intervalFunc();
    this.loader = false;
  },
  methods: {
    intervalFunc() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.makeItSlide, this.delay);
    },
    async makeItSlide() {
      while (this.$refs.containerThumb == null) {
        console.log(this.$refs.containerThumb != null);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (this.active_index + 1 === this.thumbnails.length) {
        this.active_index = 0;
      } else {
        this.active_index++;
      }
      this.activeImage = this.thumbnails[this.active_index];
      this.$nextTick(() => {
        this.scrollToActiveThumbnail();
      });
    },
    setActiveImage(index) {
      this.active_index = index;
      this.activeImage = this.thumbnails[this.active_index];
      this.$nextTick(() => {
        this.scrollToActiveThumbnail();
      });
      this.intervalFunc();
    },
    scrollToActiveThumbnail() {
      const thumbnailContainer = this.$refs.thumbnailContainer;
      const activeThumbnail = this.$refs[`thumbnail_${this.active_index}`];

      if (activeThumbnail) {
        const containerWidth = thumbnailContainer.clientWidth;
        const thumbnailLeft = activeThumbnail[0].offsetLeft;
        const thumbnailWidth = activeThumbnail[0].clientWidth;

        // Scroll the container to ensure the active thumbnail is visible
        thumbnailContainer.scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
      }
    }
  }
};
</script>

<style scoped>
.item img {
  border: 2px solid transparent;
  border-radius: 17px;
  position: relative;
}

.item img.active {
  border: 4px solid rgb(142, 208, 255);
  scale: 1.2;
  transition: 1 ease-in-out;
}

.product-thumbnil-active {
  display: flex;
  width: 100% !important;
  overflow: hidden;
  overflow-x: scroll;
  padding: 10px;
}
</style>
