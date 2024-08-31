<template>
    <div>
        <div class="breadcumb-area bg-img-1 black-opacity ptb-100" :style="contact_us_background">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="breadcumb-wrap text-center">
                            <h2>Contact</h2>
                            <ul>
                                <li><a href="index.php">Home</a></li>
                                <li><span>Contact</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ContactUsForm />
        <iframe style="margin-bottom: 100px;"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15557.009331779924!2d77.6131733!3d12.8914895!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15c285038ebb%3A0x5b7764f0c154dd31!2sshapeNprint!5e0!3m2!1sen!2sin!4v1695714869722!5m2!1sen!2sin"
            referrerpolicy="no-referrer-when-downgrade" width="100%" height="400" allowfullscreen="true" loading="lazy" ></iframe>

    </div>
</template>

<script>
import ContactUsForm from '@/components/ContactUs/form.vue'
export default {
    name: 'ContactUs',
    layout: 'unauth',
    components: {
        ContactUsForm
    },
    data() {
        return {
            loader: true,
            contact_us_background: {
                background: "url('//images/contact_us_banner/Cards.png') center center / cover no-repeat",
            },
            image_list: [
                '//images/contact_us_banner/Cards.png',
                '//images/contact_us_banner/Flyers.png',
                '//images/contact_us_banner/stickers (1).png',
            ],
            active: 0
        }
    },
    async mounted() {
        this.loader = true
        setInterval(() => {
            if (this.active + 1 < this.image_list.length) {
                this.active = this.active + 1
                this.contact_us_background = {
                    background: `url(${this.image_list[this.active]}) center center / cover no-repeat`,
                }
            } else {
                this.active = 0
                this.contact_us_background = {
                    background: `url(${this.image_list[this.active]}) center center / cover no-repeat`,
                }
            }
        }, 1500);
        this.loader = false
    }
}
</script>