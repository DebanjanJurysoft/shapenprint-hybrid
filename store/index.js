export const state = () => ({
    preloaderOn: false,
    preloaderPercentage: 0,
    footerCategories: [],
    fastSellingProducts: [],
    categories: [],
    categorySingle: null,
    testimonials: [],
    single_product_selected_options: {},
    category_search_home: null,
    snp_id: localStorage.getItem('SNP_ID'),
    cart_count: 0,
    cart_data: [],
    addresses: [],
    selected_address: null,
    user: JSON.parse(localStorage.getItem('USER')),
    logged_in: localStorage.getItem('LOGGEDIN') && localStorage.getItem('LOGGEDIN') == 'true' ? true : false,
    coupons: [],
    delivery_offer: null,
    delivery_charge: null,
    selected_coupon: null,
    address_lat_lng: null,
    order_id: null,
    orders: [],
    razorpay_options: {
        key: process.env.razorpayKeyId,
        currency: 'INR',
        name: 'Shapenprint',
        description: 'Payment descripton',
        image: 'images/favicon.png'
    }
});

export const mutations = {
    setDeliveryCharge(state, charge) {
        state.delivery_charge = charge
    },
    setAddressLatLng(state, address_lat_lng) {
        state.address_lat_lng = address_lat_lng
    },
    setDeliveryOffer(state, offer) {
        state.delivery_offer = offer
    },
    setPreloaderPercentage(state, preloaderPercentage) {
        state.preloaderPercentage = preloaderPercentage
    },
    setPreloaderOn(state, preloaderOn) {
        state.preloaderOn = preloaderOn
    },
    setSnpID(state, snp_id) {
        localStorage.setItem('SNP_ID', snp_id)
        state.snp_id = snp_id
    },
    setAddressData(state, data) {
        state.addresses = data
        state.selected_address = data.length ? data[0] : null

    },
    setOrderData(state, data) {
        state.orders = data
    },
    setCartData(state, data) {
        state.cart_count = data.length
        state.cart_data = data
    },
    setFooterCategories(state, categories) {
        state.footerCategories = categories;
    },
    setFastSellingProducts(state, fastSellingProducts) {
        state.fastSellingProducts = fastSellingProducts.filter(e => e?.product?.quantity?.length);
    },
    setCategories(state, categories) {
        state.categories = categories.map(e => {
            return {
                ...e,
                price_data: e?.quantity?.sort((a, b) => b.price_per_piece - a.price_per_piece)
            }
        });
    },
    setTestimonials(state, testimonials) {
        state.testimonials = testimonials;
    },
    set_single_product_selected_flow(state, data) {
        state.single_product_selected_options['flow'] = data
    },
    set_single_product_selected_option_value(state, data) {
        state.single_product_selected_options[data.option.id].value = data.option_value
        const combo_data = []
        for (const option of state.categorySingle.options) {
            if (state.single_product_selected_options[option.id].value) {
                combo_data.push(state.single_product_selected_options[option.id].value.id)
            }
        }
        const price_data = state.categorySingle.quantity.filter(e => {
            const combo_unsorted = JSON.parse(e.options_combo)
            const combo_sorted = combo_unsorted.sort((a, b) => a - b)
            const selected_combo_data_sorted = combo_data.sort((a, b) => a - b)
            return !e.deleted && e.status && combo_sorted.length === selected_combo_data_sorted.length && combo_sorted.every((val, index) => val === selected_combo_data_sorted[index])
        })

        const seen = new Set();
        const unique = price_data.filter(item => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);
            return !duplicate;
        });
        state.single_product_selected_options['price_data'] = unique
        state.single_product_selected_options['quantity'] = !state.single_product_selected_options['quantity'] ? {
            value: unique[0]
        } : state.single_product_selected_options['quantity']
    },
    setSingleCategory(state, categorySingle) {
        state.categorySingle = categorySingle;
        state.single_product_selected_options = {}
        const combo_data = []
        for (const option of categorySingle.options) {
            const option_values = categorySingle.option_values.filter(e => e.opt_id == option.id)
            if (option_values.length) {
                combo_data.push(option_values[0].id)
            }
            state.single_product_selected_options[option.id] = {
                ...option,
                value: option_values.length ? option_values[0] : null
            }
        }
        const price_data = categorySingle.quantity.filter(e => {
            const combo_unsorted = JSON.parse(e.options_combo)
            const combo_sorted = combo_unsorted.sort((a, b) => a - b)
            const selected_combo_data_sorted = combo_data.sort((a, b) => a - b)
            return !e.deleted && e.status && combo_sorted.length === selected_combo_data_sorted.length && combo_sorted.every((val, index) => val === selected_combo_data_sorted[index])
        })

        const seen = new Set();
        const unique = price_data.filter(item => {
            const duplicate = seen.has(item.id);
            seen.add(item.id);
            return !duplicate;
        });
        state.single_product_selected_options['flow'] = 'PRINT'
        state.single_product_selected_options['price_data'] = unique
        state.single_product_selected_options['quantity'] = {
            value: unique[0]
        }
    },
    setCategorySearchHome(state, search) {
        state.category_search_home = search
    },
    setUser(state, user) {
        localStorage.setItem('USER', JSON.stringify(user))
        state.user = user
    },
    setLoggedIn(state, logged_in) {
        localStorage.setItem('LOGGEDIN', logged_in)
        state.logged_in = logged_in
    },
    setCoupons(state, coupons) {
        state.coupons = coupons.filter(e => new Date() < new Date(new Date(e.use_by_date).setHours(23, 59, 59, 999)))
    },
    setSelectedAddressData(state, selected_address) {
        state.selected_address = selected_address
    },
    setOrderId(state, order_id) {
        state.order_id = order_id
    },
};

export const actions = {
    async fetchlatLongFromAddress({ commit }, params) {
        try {
            const response = await this.$axios.get(`${process.env.shippingBaseURL}/fetch-lat-long-for-address?address=${params}`);
            const data = response.data
            if (data.status == 'error') {
                return {
                    status: false,
                    message: data.message
                }
            }
            commit('setAddressLatLng', data.response[0]);
        } catch (error) {
            console.error("Error fetching address lat lng data:", error);
            return false
        } 
    },
    async fetchDeliveryCharges({ commit }, params) {
        try {
            const response = await this.$axios.post(`${process.env.shippingBaseURL}/fetch-shipping-charges`, params);
            const data = response.data
            if (data.status == 'error') {
                return {
                    status: false,
                    message: data.message
                }
            }
            commit('setDeliveryCharge', data.response);
        } catch (error) {
            console.error("Error fetching delivery charges data:", error);
            return false
        } 
    },
    async fetchDeliveryOffer({commit}) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=fetch_delivery_charge_offers');
            const data = response.data
            commit('setDeliveryOffer', data.data);
        } catch (error) {
            console.error("Error fetching delivery offer data:", error);
            return false
        }
    },
    setSelectedAddress({commit}, selected_address) {
        commit('setSelectedAddressData', selected_address)
    },
    setPreloaderOn({commit}, preloaderOn) {
        commit('setPreloaderOn', preloaderOn)
    },
    setPreloaderPercentage({commit}, preloaderPercentage) {
        commit('setPreloaderPercentage', preloaderPercentage)
    },
    async fetchCart({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=fetchCart', params);
            const data = response.data
            commit('setCartData', data.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
            return false
        }
    },
    async assignImageIdToCart({ commit }, payload) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=assignProductDetails', payload);
            const data = response.data
            return data
        } catch (error) {
            console.error("Error assigning data:", error);
            return false
        }
    },
    async uploadImageForProduct({ commit }, payload) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=uploadImageForProduct', payload);
            const data = response.data
            return data
        } catch (error) {
            console.error("Error uploading image:", error);
            return false
        }
    },
    async addToCartPrint({ commit }, payload) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=addToCart', payload);
            const data = response.data
            return data
        } catch (error) {
            console.error("Error adding to cart:", error);
            return false
        }
    },
    async addToCartDesign({ commit }, payload) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=addDesignDataToCart', payload);
            const data = response.data
            return data
        } catch (error) {
            console.error("Error adding to cart:", error);
            return false
        }
    },
    async deleteFromCart({ commit }, payload) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php?type=deleteCartData', {
                force: true,
                cart_id: payload
            });
            const data = response.data
            return data
        } catch (error) {
            console.error("Error removed from cart:", error);
            return false
        }
    },
    async fetchSnpID({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data.data.unique_id
            commit('setSnpID', data);
        } catch (error) {
            console.error("Error fetching unique-ID:", error);
        }
    },
    assignSearchText({ commit }, params) {
        commit('setCategorySearchHome', params);
    },
    setSingleProductSelectedOptionValue({ commit }, data) {
        commit('set_single_product_selected_option_value', { option: data.option, option_value: data.option_value });
    },
    setSingleProductSelectedFlow({ commit }, data) {
        commit('set_single_product_selected_flow', data);
    },
    async fetchTestimonial({ commit }, params) {
        try {
            const response = await this.$axios.post('/api.php', params);
            const data = response.data.data.filter(e => e.status);
            commit('setTestimonials', data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    },
    async fetchAllCategories({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data.data;
            commit('setCategories', data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    },
    async fetchCategoryByID({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data.data.length ? response.data.data[0] : null;
            commit('setSingleCategory', data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    },
    async fetchfastSellingProducts({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data.products;
            commit('setFastSellingProducts', data);
        } catch (error) {
            console.error("Error fetching fast selling products:", error);
        }
    },
    async fetchCoupons({ commit }) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', {
                type: 'fetch_coupons'
            });
            const data = response.data.coupons
            commit('setCoupons', data);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    },
    async fetchFooterCategories({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data.data.slice(0, 4);
            commit('setFooterCategories', data);
        } catch (error) {
            console.error("Error fetching footer categories:", error);
        }
    },
    async fetchAddresses({ commit }, params) {
        try {
            const response = await this.$axios.post('/api.php', params);
            const data = response.data.data
            commit('setAddressData', data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    },
    async placeOrder({ commit }, params) {
        try {
            const response = await this.$axios.post('/api.php', params);
            const data = response.data
            console.log(data);
            commit('setOrderId', data.order_id)
            return data
        } catch (error) {
            console.error("Error placing order:", error);
        }
    },
    async sendUpdateSMS({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data
            console.log(data);
            return data
        } catch {
            console.error("Error sending SMS:", error);
        }
    },
    async fetchOrders({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            const data = response.data
            commit('setOrderData', data.data)
        } catch {
            console.error("Error sending SMS:", error);
        }
    },
    async deleteCartData({ commit }, params) {
        try {
            for (const cart of params) {
                const data = {
                    type: 'deleteCartData',
                    cart_id: cart.id
                }
                await this.$axios.post('/updatedApiForProducts.php', data);
            }
        } catch {
            console.error("Error sending SMS:", error);
        }
    },
    async loginUser({ commit }, params) {
        try {
            const response = await this.$axios.post('/api.php', params);
            if (response.data.status == 'success') {
                commit('setLoggedIn', true);
                commit('setUser', response.data.session);
            }
            return response.data
        } catch (error) {
            console.error("Error logging in:", error);
        }
    },
    async updateCartData({ commit }, params) {
        try {
            const response = await this.$axios.post('/updatedApiForProducts.php', params);
            return response.data
        } catch (error) {
            console.error("Error logging in:", error);
        }
    },
};

export const getters = {
    footerCategories: (state) => state.footerCategories,
    categories: (state) => state.categories,
    fastSellingProducts: (state) => state.fastSellingProducts,
    testimonials: (state) => state.testimonials,
    category_search_home: (state) => state.category_search_home,
    categorySingle: (state) => state.categorySingle,
    single_product_selected_options: (state) => state.single_product_selected_options,
    snp_id: (state) => state.snp_id,
    cart_count: (state) => state.cart_count,
    cart_data: (state) => state.cart_data,
    logged_in: (state) => state.logged_in,
    user: (state) => state.user,
    preloaderOn: (state) => state.preloaderOn,
    preloaderPercentage: (state) => state.preloaderPercentage,
    coupons: (state) => state.coupons,
    addresses: (state) => state.addresses,
    selected_address: (state) => state.selected_address,
    razorpay_options: (state) => state.razorpay_options,
    delivery_offer: (state) => state.delivery_offer,
    delivery_charge: (state) => state.delivery_charge,
    address_lat_lng: (state) => state.address_lat_lng,
    order_id: (state) => state.order_id,
    orders: (state) => state.orders,
};
