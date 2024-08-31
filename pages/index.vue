<template>
    <div>
        <HomeSearchArea />
        <HomeProductArea />
        <div class="banner-area">
            <div class="container banner-wrap banner-bg trust" style="max-width: 95%;">
                <div class="row align-items-center">
                    <div class="col-lg-8 col-sm-6">
                        <h2>ShapeNprint is trusted by over 300 large enterprises for printing, signage and gifting
                            needs.</h2>
                        <br />
                        <a class="btn-href" href="/contact.php"><span
                                class="d-flex flex-row align-item-center bg-white p-3"
                                style="width: max-content; border-radius: 5px;">Get Started <i style="font-size: 25px"
                                    class="fa fa-arrow-right ml-3"></i></span></a>
                    </div>

                </div>
            </div>
        </div>
        <HomeFastSellingArea />
        <div class="about-area">
            <div class="container" style="max-width: 95%;">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title text-center">
                            <h2>Designing & Printing made easy</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="blog-wrap">
                            <img src="/img/Design@4x-100.jpg" alt="blog" style="width:100%; height:auto;">
                            <div class="blog-content text-center">
                                <h3 class="font-24 about-heading"><a href="#">Live Designing</a></h3>
                                <p class="font-18 about-para">Once the design is completed, all corrections will be done
                                    live at your mobile screen, powered by Google Meet. </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="blog-wrap">
                            <img src="/img/Print@4x-100.jpg" alt="blog" style="width:100%; height:auto;">
                            <div class="blog-content text-center">
                                <h3 class="font-24 about-heading"><a href="#">Nearest Printing</a></h3>
                                <p class="font-18 about-para">Get fast and high-quality print from your nearest printing
                                    shop, verified by shapeNprint.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="blog-wrap">
                            <img src="/img/Deliver@4x-100.jpg" alt="blog" style="width:100%; height:auto;">
                            <div class="blog-content text-center">
                                <h3 class="font-24 about-heading"><a href="#">Fastest Delivery</a></h3>
                                <p class="font-18 about-para">Superfast delivery of design & printing, powered by
                                    Telyport Delivery Service.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Testimonials />
        <div class="banner-area">
            <div class="container banner-wrap banner-bg" style="max-width: 95%;">
                <div class="row align-items-center">
                    <div class="col-lg-8 col-sm-6">
                        <h2>Access the India’s largest Graphic Design & Printing Ecosystem with Money-Back
                            Guarantee</h2>
                        <br />
                        <a class="btn-href" href="/contact.php"><span
                                class="d-flex flex-row align-item-center bg-white p-3"
                                style="width: max-content; border-radius: 5px;">Get Started <i style="font-size: 25px"
                                    class="fa fa-arrow-right ml-3"></i></span></a>
                    </div>

                    <div class="col-lg-4 col-sm-6">
                        <img src="/images/advertising/hand.png" />
                    </div>
                </div>
            </div>
        </div>
        <div class="blog-area">
            <div class="container" style="text-align: center;max-width: 95%;">
                <div class="row">
                    <div class="col-12">
                        <div class="section-title">
                            <h2>Recent Stories</h2>
                        </div>
                    </div>
                </div>
                <div class="row news-slider4" id="blog_holder">
                    <!--<div class="col-lg-4 col-md-6 col-12">-->
                    <!--    <div class="blog-wrap">-->

                    <!--        <img src="assets///images/blog/1.jpg" alt="blog">-->
                    <!--        <div class="blog-content">-->
                    <!--            <span>design</span>-->
                    <!--            <h3><a href="#">12 Tips to make a Perfect Poster</a></h3>-->
                    <!--        </div>-->
                    <!--    </div>-->
                    <!--</div>-->
                    <!--<div class="col-lg-4 col-md-6 col-12">-->
                    <!--    <div class="blog-wrap">-->

                    <!--        <img src="assets///images/blog/2.jpg" alt="blog">-->
                    <!--        <div class="blog-content">-->
                    <!--            <span>design</span>-->
                    <!--            <h3><a href="#">12 Tips to make a Perfect Poster</a></h3>-->
                    <!--        </div>-->
                    <!--    </div>-->
                    <!--</div>-->
                    <!--<div class="col-lg-4 col-md-6 col-12">-->
                    <!--    <div class="blog-wrap">-->
                    <!--        <img src="assets///images/blog/3.jpg" alt="blog">-->
                    <!--        <div class="blog-content">-->
                    <!--            <span>design</span>-->
                    <!--            <h3><a href="#">12 Tips to make a Perfect Poster</a></h3>-->
                    <!--        </div>-->
                    <!--    </div>-->
                    <!--</div>-->
                </div>
            </div>
        </div>
        <OurClient />
    </div>
</template>

<script>
import HomeSearchArea from '@/components/Home/SearchArea.vue'
import HomeProductArea from '@/components/Home/ProductArea.vue'
import HomeFastSellingArea from '@/components/Home/FastSelling.vue'
import OurClient from '@/components/Home/OurClient.vue'
import Testimonials from '@/components/Home/Testimonials.vue'
export default {
    layout: 'unauth',
    components: {
        HomeSearchArea,
        HomeProductArea,
        HomeFastSellingArea,
        OurClient,
        Testimonials,
    }
}
</script>

<style>
.post-slide {
    background: #fff;
    margin: 20px 15px 20px;
    border-radius: 15px;
    padding-top: 1px;
    box-shadow: 0px 14px 22px -9px #bbcbd8;
}

.post-slide .post-img {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    margin: -12px 15px 8px 15px;
    margin-left: -10px;
}

.post-slide .post-img img {
    width: 100%;
    height: auto;
    transform: scale(1, 1);
    transition: transform 0.2s linear;
}

.post-slide:hover .post-img img {
    transform: scale(1.1, 1.1);
}

.btn-href:link {
    text-decoration: none;
}

.btn-href {
    color: black !important;
    font-size: 20px;
    display: contents !important;
}

.btn-href:hover {
    font-size: 21px;
}

.btn-href:before {
    position: relative !important;
    text-decoration: none;
}

.post-slide .over-layer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    background: linear-gradient(-45deg, rgba(6, 190, 244, 0.75) 0%, rgba(45, 112, 253, 0.6) 100%);
    transition: all 0.50s linear;
}

.post-slide:hover .over-layer {
    opacity: 1;
    text-decoration: none;
}

.post-slide .over-layer i {
    position: relative;
    top: 45%;
    text-align: center;
    display: block;
    color: #fff;
    font-size: 25px;
}

.post-slide .post-content {
    background: #fff;
    padding: 2px 20px 40px;
    border-radius: 15px;
}

.post-slide .post-title a {
    font-size: 15px;
    font-weight: bold;
    color: #333;
    display: inline-block;
    text-transform: uppercase;
    transition: all 0.3s ease 0s;
}

.post-slide .post-title a:hover {
    text-decoration: none;
    color: #3498db;
}

.post-slide .post-description {
    line-height: 24px;
    color: #808080;
    margin-bottom: 25px;
}

.post-slide .post-date {
    color: #a9a9a9;
    font-size: 14px;
}

.post-slide .post-date i {
    font-size: 20px;
    margin-right: 8px;
    color: #CFDACE;
}

.post-slide .read-more {
    padding: 7px 20px;
    float: right;
    font-size: 12px;
    background: #2196F3;
    color: #ffffff;
    box-shadow: 0px 10px 20px -10px #1376c5;
    border-radius: 25px;
    text-transform: uppercase;
}

.post-slide .read-more:hover {
    background: #3498db;
    text-decoration: none;
    color: #fff;
}

.owl-controls .owl-buttons {
    text-align: center;
    margin-top: 20px;
}

.owl-controls .owl-buttons .owl-prev {
    background: #fff;
    position: absolute;
    top: 40%;
    left: -50px;
    padding: 0 18px 0 15px;
    border-radius: 50px;
    box-shadow: 3px 14px 25px -10px #92b4d0;
    transition: background 0.5s ease 0s;
}

.owl-controls .owl-buttons .owl-next {
    background: #fff;
    position: absolute;
    top: 40%;
    right: -50px;
    padding: 0 15px 0 18px;
    border-radius: 50px;
    box-shadow: -3px 14px 25px -10px #92b4d0;
    transition: background 0.5s ease 0s;
}

.owl-controls .owl-buttons .owl-prev:after,
.owl-controls .owl-buttons .owl-next:after {
    content: "\f104";
    font-family: FontAwesome;
    color: #333;
    font-size: 30px;
}

.owl-controls .owl-buttons .owl-next:after {
    content: "\f105";
}

.product-area {
    margin-bottom: -270px !important;
}

#news-slidermob {
    display: none !important;
}

@media only screen and (max-width:1280px) {
    .post-slide .post-content {
        padding: 0px 15px 25px 15px;
    }
}

@media (max-width:667px) {
    .search {
        display: flex;
    }

    .product-area {
        top: 20px !important;
        margin-bottom: 0px !important;
    }

    .searchButton {
        width: 60px;
        left: 0px;

    }

    .slide-inner {
        height: 100%;
    }

    #news-slider1 {
        padding: 0 0 !important;

        /*display:none !important;*/
    }

    .owl-item {
        width: 229px !important;
    }

    #news-slidermob {
        display: block !important;
    }

    #news-slidermob .owl-controls .owl-buttons .owl-prev {
        display: none;
    }

    #news-slidermob .owl-controls .owl-buttons .owl-next {
        display: none;
    }

}


@media (max-width:767px) {
    .search {
        display: flex;
    }

    .product-area {
        top: 20px !important;
        margin-bottom: 0px !important;
    }

    .searchButton {
        width: 60px;
        left: 0px;

    }

    .slide-inner {
        height: 100%;
    }

    #news-slider1 {
        padding: 0 0 !important;

        /*display:none !important;*/
    }

    .owl-item {
        width: 235px !important;
    }

    #news-slidermob {
        display: block !important;
    }

    #news-slidermob .owl-controls .owl-buttons .owl-prev {
        display: none;
    }

    #news-slidermob .owl-controls .owl-buttons .owl-next {
        display: none;
    }

}

@keyframes rotate360 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.product-spinner {
    animation: rotate360 2s linear infinite;
}

.product-spinner {
    width: 40px;
}

.spinner-text {
    font-size: 20px;
    color: #1962b3;
}


#blog_holder .owl-controls .owl-buttons .owl-prev {
    display: none;
}

#blog_holder .owl-controls .owl-buttons .owl-next {
    display: none;
}




/*second testimonial style*/

figure.snip1390 *,
figure.snip1390 *:before,
figure.snip1390 *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
}

figure.snip1390 figcaption {
    width: 100%;
}

figure.snip1390 h2,
figure.snip1390 h4,
figure.snip1390 blockquote {
    margin: 0;
}

figure.snip1390 h2,
figure.snip1390 h4 {
    font-weight: 300;
}

figure.snip1390 h2 {
    color: black;
}

figure.snip1390 h4 {
    color: #a6a6a6;
}

figure.snip1390 blockquote {
    font-size: 1em;
    padding: 45px 20px 40px 50px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: inset -1.4px -1.4px 2px rgba(0, 0, 0, 0.3);
    text-align: left;
    position: relative;
}

figure.snip1390 blockquote:before {
    font-family: 'FontAwesome';
    content: "\201C";
    position: absolute;
    font-size: 70px;
    opacity: 0.25;
    font-style: normal;
    top: 0px;
    left: 20px;
}

figure.snip1390 .profile {
    width: 100px;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.4);
    margin-bottom: 10px;
    border: solid 5px #A6A57A;
}

a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;
    width: 50% !important;
}

.popup {
    position: absolute;
    top: 100px;
    border: 1px solid black;
    display: none;
    width: 500px;
    margin-left: 50%;
    transform: translate(-50%, 0%);
    z-index: 1000;
    position: fixed;
    cursor: pointer;
}

@media only screen and (max-width: 600px) {
    .popup {
        width: 100% !important
    }
}
</style>