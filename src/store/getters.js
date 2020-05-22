export const getUser = (state) => {
    return state.user
}

export const getLoginStatus = (state) => {
    return state.isLogin
}

export const getCart = (state) => {
    return state.cart
}

export const getGoodCheck = (state) => (item_id) => {
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            if (item_id == state.cart[i].good_list[good].item_id) {
                return state.cart[i].good_list[good].checked
            }
        }
    }
}

export const getStoreCheck = (state) => (store_id) => {
    for (let i in state.cart) {
        if (store_id == state.cart[i].name) {
            return state.cart[i].checked
        }
    }

}

export const getTotalPrice = (state) => {
    let total_price = 0.0;
    let good_item = {};
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            good_item = state.cart[i].good_list[good]
            if (good_item.checked == true) {
                total_price += parseInt(good_item.count) * parseFloat(good_item.discounted_price)
            }
        }
    }
    return total_price
}

export const getTotalCount = (state) => {
    let total_count = 0.0;
    let good_item = {};
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            good_item = state.cart[i].good_list[good]
            if (good_item.checked == true) {
                total_count += parseInt(good_item.count)
            }
        }
    }
    state.cart_count = total_count
    return total_count
}

export const getCheckedGoods = (state) => {
    let good_list = []
    let good_item = {}
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            good_item = state.cart[i].good_list[good]
            if (good_item.checked == true) {
                good_list.push(good_item.item_id)
            }
        }
    }
    return good_list
}


export const getCartCount = (state) => {
    return state.cart_count
}


export const getChatCount = (state) => {
    return state.chat_count
}

export const getDefaultAddress = (state) => {
    return state.default_address
}