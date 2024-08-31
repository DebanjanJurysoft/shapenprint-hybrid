<template>
    <div class="contact-area ptb-100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12">
                    <div class="contact-form form-style">
                        <div class="cf-msg"></div>
                        <div id="cf">
                            <div class="row">
                                <div class="col-12 col-sm-6">
                                    <input type="text" placeholder="Name" id="fname" name="fname">
                                </div>
                                <div class="col-12  col-sm-6">
                                    <input type="text" placeholder="Mobile No." id="phone" name="phone">
                                </div>
                                <div class="col-12  col-sm-6">
                                    <input type="text" placeholder="Email" id="email" name="email">
                                </div>
                                <div class="col-12 col-sm-6">
                                    <input type="text" placeholder="Subject" id="subject" name="subject">
                                </div>
                                <div class="col-12">
                                    <textarea class="contact-textarea" placeholder="Message" id="msg"
                                        name="msg"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn theme-btn" onclick="sendMail()">SEND MESSAGE</button>
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="contact-wrap">
                        <ul>
                            <li>
                                <i class="fa fa-home"></i> Address:
                                <p>1131/A, BTM 4th Stage, 1st Block, Royal Shelters, Stage 4, BTM Layout, Bengaluru,
                                    Karnataka 560076</p>
                            </li>
                            <li>
                                <i class="fa fa-envelope"></i> Email address:
                                <p>
                                    <span><a style="text-transform: lowercase;"
                                            href="mailto:info@shapenprint.com">info@shapenprint.com</a> </span>
                                    <!--<span>info@shapenprint.com </span>-->
                                </p>
                            </li>
                            <li>
                                <i class="fa fa-phone"></i> phone number:
                                <p>
                                    <a href="tel:+91 8095135601">+91 8095135601</a>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>