<template>
    <nav>
        <!--Loader-->
        <div class="loader-container">
            <div class="loader"></div>
        </div>
        <div class="navbar" style="max-width: 95%;">
            <i class='bx bx-menu'></i>
            <div class="logo"><a href="/"><img
                        src="/images/logo.png" width="100%"
                        style="max-width:200px" /></a></div>
            <div class="nav-links">
                <div class="sidebar-logo">
                    <span class="logo-name">Logo</span>
                    <i class='bx bx-x'></i>
                </div>
                <ul class="links">
                    <li><a href="/"> Home</a></li>
                    <li>
                        <a href="/how_we_work"> How we work</a>
                        <!-- <i class='bx bxs-chevron-down htmlcss-arrow arrow  '></i> -->
                        <!--<ul class="htmlCss-sub-menu sub-menu">-->
                        <!--<li><a href="#">Web Design</a></li>-->
                        <!--<li><a href="#">Login Forms</a></li>-->
                        <!--<li><a href="#">Card Design</a></li>-->
                        <!--  <li class="more">-->
                        <!--    <span><a href="#">More</a>-->
                        <!--      <i class='bx bxs-chevron-right arrow more-arrow'></i>-->
                        <!--    </span>-->
                        <!--    <ul class="more-sub-menu sub-menu">-->
                        <!--      <li><a href="#">Neumorphism</a></li>-->
                        <!--      <li><a href="#">Pre-loader</a></li>-->
                        <!--      <li><a href="#">Glassmorphism</a></li>-->
                        <!--    </ul>-->
                        <!--  </li>-->
                        <!--</ul>-->
                    </li>
                    <li>
                        <a href="about.php">About Us</a>
                        <!-- <i class='bx bxs-chevron-down js-arrow arrow '></i> -->
                        <!--<ul class="js-sub-menu sub-menu">-->
                        <!--  <li><a href="#">Dynamic Clock</a></li>-->
                        <!--  <li><a href="#">Form Validation</a></li>-->
                        <!--  <li><a href="#">Card Slider</a></li>-->
                        <!--  <li><a href="#">Complete Website</a></li>-->
                        <!--</ul>-->
                    </li>
                    <li><a target="_blank" href="https:/shapenprint.com/blogs/"> Blog</a></li>
                    <li><a target="_blank"
                            href="https:/drive.google.com/file/d/1Yg90YSDP__-1DaKAl_nY8vNDJX71RLjA/view?usp=drive_link">
                            Portfolio</a></li>
                    <!-- <li><a style="cursor: pointer;" id="cartButton"> Cart</a></li> -->
                    <li><a href="/orders"> Orders</a></li>
                </ul>
            </div>
            <div class="search-box">
                <!-- <i class="fa fa-search"></i>
      <div class="input-box">
        <input type="text" placeholder="Search...">
      </div> -->
            </div>
            <div class="d-flex flex-row align-items-center" style="height: 100%; gap: 20px;">
                <NuxtLink to="/cart" class="d-flex flex-column">
                    <span style="
                        font-size: 15px; 
                        margin-left: 5px; 
                        border-radius: 50%;
                        text-align: center;
                        align-items: center;
                        height: 20px;
                        width: 20px;
                        " id="header_cart_count">{{`${cart_count}`}}</span>
                    <span id="cartButton" style="cursor: pointer; "><img src="/images/icon/shopping_cart.svg"
                            alt=""></span>
                </NuxtLink>
                <NuxtLink v-if="!logged_in" to="/login" class="btn theme-btn padd"><span id="loginButton">Login /
                        Signup</span></NuxtLink>
                <NuxtLink v-if="logged_in" to="/profile" class="btn theme-btn padd"><span id="loginButton">Account</span></NuxtLink>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['cart_count', 'logged_in', 'user', 'snp_id'])
    },

    async mounted() {
        if (!this.snp_id) {
            await this.$store.dispatch('fetchSnpID', { type: 'getId' });
        }
        await this.$store.dispatch('fetchCart', { unuser: this.snp_id, uid: this.user.uid });
    },
}
</script>
<style scoped>
nav {
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

nav .navbar {
    height: 100%;
    max-width: 1250px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    /* background: red; */
    padding: 5px 0px;
    align-items: flex-start;
}

.navbar .logo a {
    font-size: 30px;
    color: black;
    text-decoration: none;
    font-weight: 600;
}

nav .navbar .nav-links {
    line-height: 70px;
    height: 100%;
}

nav .navbar .links {
    display: flex;
}

nav .navbar .links li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0 14px;
}

nav .navbar .links li a {
    height: 100%;
    text-decoration: none;
    white-space: nowrap;
    color: black;
    font-size: 15px;
    font-weight: 500;
}

.links li:hover .htmlcss-arrow,
.links li:hover .js-arrow {
    transform: rotate(180deg);
}

nav .navbar .links li .arrow {
    /* background: red; */
    height: 100%;
    width: 22px;
    line-height: 70px;
    text-align: center;
    display: inline-block;
    color: #fff;
    transition: all 0.3s ease;
}

nav .navbar .links li .sub-menu {
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
nav .navbar .links li:hover .js-sub-menu {
    display: block;
}


.navbar .links li .sub-menu li {
    padding: 0 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar .links li .sub-menu a {
    color: #fff;
    font-size: 15px;
    font-weight: 500;
}

.navbar .links li .sub-menu .more-arrow {
    line-height: 40px;
}


.navbar .links li .sub-menu .more-sub-menu {
    position: absolute;
    top: 0;
    left: 100%;
    border-radius: 0 4px 4px 4px;
    z-index: 1;
    display: none;
}

.links li .sub-menu .more:hover .more-sub-menu {
    display: block;
}

.navbar .search-box {
    position: relative;
    height: 40px;
    width: 40px;
}

.navbar .search-box i {
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

.navbar .search-box .input-box {
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

.navbar.showInput .search-box .input-box {
    top: 65px;
    opacity: 1;
    pointer-events: auto;
    background: #3E8DA8;
}

.search-box .input-box::before {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    background: #3E8DA8;
    right: 10px;
    top: -6px;
    transform: rotate(45deg);
}

.search-box .input-box input {
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

.navbar .nav-links .sidebar-logo {
    display: none;
}

.navbar .bx-menu {
    display: none;
}

.logo {
    padding: 0px !important;
}

.padd {
    padding-left: 20px;
    padding-right: 20px;
}

@media (max-width:920px) {
    nav .navbar {
        max-width: 100%;
        /*padding: 0 25px;*/
    }

    nav .navbar .logo a {
        font-size: 27px;
    }

    nav .navbar .links li {
        padding: 0 10px;
        white-space: nowrap;
    }

    nav .navbar .links li a {
        font-size: 15px;
    }
}

@media (max-width:800px) {

    .navbar .bx-menu {
        display: block;
    }

    .navbar {
        display: flex;
        flex-direction: column;
    }

    .search-box {
        display: none;
    }

    .logo {
        padding: 2px 0px !important;
    }

    .padd {
        padding-left: 0px;
        padding-right: 0px;
    }

    nav .navbar .nav-links {
        position: fixed;
        top: 0;
        left: -100%;
        display: block;
        max-width: 270px;
        width: 100%;
        background: #3E8DA8;
        line-height: 40px;
        padding: 20px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
        transition: all 0.5s ease;
        z-index: 1000;
    }

    .navbar .nav-links .sidebar-logo {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sidebar-logo .logo-name {
        font-size: 25px;
        color: #fff;
    }

    .sidebar-logo i,
    .navbar .bx-menu {
        font-size: 25px;
        color: black;
    }

    nav .navbar .links {
        display: block;
        margin-top: 20px;
    }

    nav .navbar .links li .arrow {
        line-height: 40px;
    }

    nav .navbar .links li {
        display: block;
    }

    nav .navbar .links li .sub-menu {
        position: relative;
        top: 0;
        box-shadow: none;
        display: none;
    }

    nav .navbar .links li .sub-menu li {
        border-bottom: none;

    }

    .navbar .links li .sub-menu .more-sub-menu {
        display: none;
        position: relative;
        left: 0;
    }

    .navbar .links li .sub-menu .more-sub-menu li {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .links li:hover .htmlcss-arrow,
    .links li:hover .js-arrow {
        transform: rotate(0deg);
    }

    .navbar .links li .sub-menu .more-sub-menu {
        display: none;
    }

    .navbar .links li .sub-menu .more span {
        /* background: red; */
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
    }

    .links li .sub-menu .more:hover .more-sub-menu {
        display: none;
    }

    nav .navbar .links li:hover .htmlCss-sub-menu,
    nav .navbar .links li:hover .js-sub-menu {
        display: none;
    }

    .navbar .nav-links.show1 .links .htmlCss-sub-menu,
    .navbar .nav-links.show3 .links .js-sub-menu,
    .navbar .nav-links.show2 .links .more .more-sub-menu {
        display: block;
    }

    .navbar .nav-links.show1 .links .htmlcss-arrow,
    .navbar .nav-links.show3 .links .js-arrow {
        transform: rotate(180deg);
    }

    .navbar .nav-links.show2 .links .more-arrow {
        transform: rotate(90deg);
    }
}

@media (max-width:370px) {
    nav .navbar .nav-links {
        max-width: 100%;
    }
}

@media (max-width:767px) {
    .banner-wrap h2 {
        font-size: 20px;
        line-height: 25px;
    }

    .banner-wrap {
        padding: 20px 15px !important;
    }
}

.btn {
    padding-top: 14px !important;
}

/*loader style*/
.loader-container {
    display: none;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
}

.loader {
    border: 4px solid #F3F3F3;
    border-top: 4px solid #3498DB;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>