<template>
    <div>
        <OwlCarousel :items="visibleCards" :loop="true" :autoplay="true" :autoplayTimeout="slideInterval"
            :autoplayHoverPause="true" :nav="false" :dots="false" class="owl-theme">
            <div v-for="(item, index) in items" :key="index" class="item">
                <div class="text-center">
                    <h3>{{ item.heading }}</h3>
                    <p>{{ item.description.length > 200 ? item.description.slice(0, 200) + '...' : item.description }}</p>
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
            default: 1
        },
        slideInterval: {
            type: Number,
            default: 4000
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

.owl-prev,
.owl-next {
    background: rgba(0, 0, 0, 0.5);
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
}

.item:last-child {
    margin-right: 0;
}
</style>
