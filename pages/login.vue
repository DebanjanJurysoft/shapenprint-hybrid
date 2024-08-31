<template>
    <div class="account-area ptb-100">
        <div class="container" style="max-width: 92%;">
            <div class="row ">
                <div class="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12 ">
                    <div class="account-form form-style  login-card">
                        <div class="banner-area mobarea">
                            <div class="container banner-wrap" style="background: linear-gradient(180deg, #E0C3FC 0%, #8EC5FC 100%);
                            border-radius: 20px;">
                                <div class="row align-items-center mobilerow">
                                    <div class="col-lg-8 col-sm-6">
                                        <h3 class="login-banner-heading">Login to get upto Rs. 300 OFF on your first
                                            order.</h3>
                                    </div>
                                    <div class="col-lg-4 col-sm-6">
                                        <img class="login_image" src="//images/cart-banner/1.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img class="login_images" src="//images/favicon.png" alt="" width="50" />
                        <h2>Welcome to shapeNprint</h2>
                        <p>One stop, many solutions</p>
                        <div class="login-area" id="login_area" style="display: block;">
                            <h3>Login</h3>
                            <input type="text" id="username" v-model="username" placeholder="Mobile Or Email">
                            <div style="display: flex; border: 1px solid #dedede; border-radius: 5px; align-items: center; margin-bottom: 20px;">
                                <input id="log_password" v-model="password" :type="show_password_type" style="width: 92%; margin-bottom: 0px; border: none;" placeholder="Password">
                                <i id="log_eye_button" @click.prevent="showPassword" style="width: 10%; text-align: center; cursor: pointer;" :class="`fa ${show_password_icon}`"></i>
                            </div>
                            <p>By continuing, I agree to the <a href="#" class="text-purple">Terms of Use</a> & <a
                                    href="#" class="text-purple">Privacy Policy</a></p>
                            <button @click.prevent="login" class="btn theme-btn w-100">Login</button>
                            <div class="text-left">
                                <a href="forgot.php" class="text-purple">Forgot Password?</a>
                                <p class="py-3">Dont have an account? <a href="#" class="text-purple" onclick="toggleRegisterLogin('register')">Register</a></p>
                            </div>
                        </div>
                        <div class="login-area" id="register_area" style="display: none;">
                            <h3>Sign Up</h3>
                            <input type="text" id="reg_fullname" placeholder="Full Name">
                            <input type="text" id="reg_email" placeholder="Email">
                            <input type="text" id="reg_mobile" placeholder="Mobile No">
                            <div style="display: flex; border: 1px solid #dedede; border-radius: 5px; align-items: center; margin-bottom: 20px;">
                                <input id="reg_password" type="password" style="width: 92%; margin-bottom: 0px; border: none;" placeholder="Password">
                                <i id="reg_eye_button" onclick="showPassword('reg_password','reg_eye_button')" style="width: 10%; text-align: center; cursor: pointer;" class="fa fa-eye-slash"></i>
                            </div>
                            <div style="display: flex; border: 1px solid #dedede; border-radius: 5px; align-items: center; margin-bottom: 20px;">
                                <input id="reg_cnf_password" type="password" style="width: 92%; margin-bottom: 0px; border: none;" placeholder="Confirm Password">
                                <i id="reg_cnf_eye_button" onclick="showPassword('reg_cnf_password','reg_cnf_eye_button')" style="width: 10%; text-align: center; cursor: pointer;" class="fa fa-eye-slash"></i>
                            </div>
                            <p>By continuing, I agree to the <a href="#" class="text-purple">Terms of Use</a> & <a
                                    href="#" class="text-purple">Privacy Policy</a></p>
                            <button onclick="register()" class="btn theme-btn w-100">Register</button>
                            <div class="text-left">
                                <!-- <a href="forgot.php" class="text-purple">Forgot Password?</a> -->
                                <p class="py-3">Already have an account? <a href="#" class="text-purple" onclick="toggleRegisterLogin('login')">Login</a></p>
                            </div>
                        </div>
                        <div class="login-area" id="otp_area" style="display: none;">
                            <h3>Verify OTP</h3>
                            <input type="text" style="cursor: not-allowed" id="reg_verify_email" disabled placeholder="Email">
                            <input type="text" id="reg_verify_otp" placeholder="OTP">
                            <!-- <p>By continuing, I agree to the <a href="#" class="text-purple">Terms of Use</a> & <a
                                    href="#" class="text-purple">Privacy Policy</a></p> -->
                            <button onclick="verifyOtp()" class="btn theme-btn w-100">Verify</button>
                            <button style="float:right; background: transparent; border: none;" id="resendOtpButton"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    layout: 'unauth',
    data() {
        return {
            show_password_type: 'password',
            show_password_icon: "fa-eye-slash",
            username: null,
            password: null
        }
    },
    methods: {
        showPassword() {
            if (this.show_password_type == 'password') {
                this.show_password_type = 'text'
                this.show_password_icon = "fa-eye"
            } else {
                this.show_password_type = 'password'
                this.show_password_icon = "fa-eye-slash"
            }
        },
        async login() {
            try {
                if (!this.username.trim() || !this.password.trim()) {
                    throw new Error('Username and password both are required.')
                }
                const payload = {
                    username: this.username,
                    password: this.password,
                    type: 'userlogin',
                }
                const response = await this.$store.dispatch('loginUser', payload)
                if (response.status == 'success') {
                    this.$toast.success(response.msg)
                    this.$router.go(-1)
                }
            } catch (error) {
                console.log(error);
                this.$toast.error(error.message)
            }
        }
    }
}
</script>