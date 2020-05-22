import store from "./store";

export const set_user = function (state, item) {
    let user = item.item;
    state.isLogin = true;
    state.user['token'] = user.token;
    state.user['username'] = user.username;
    state.user['phoneNum'] = user.phoneNum;
    state.user['header'] = user.header;
}


export const logout = function (state, item) {
    state.isLogin = false;
    state.user = {};
    localStorage.setItem('token', '')
}


export const set_cart = function (state, item) {
    let cart = item.item;
    state.cart = cart;
}


export const check_all = function (state, item) {
    for (let i in state.cart) {
        state.cart[i].checked = item.item.checked
        for (let good in state.cart[i].good_list) {
            state.cart[i].good_list[good].checked = item.item.checked
        }
    }
}

export const check_store = function (state, item) {
    let store_name = item.item
    for (let i in state.cart) {
        if (state.cart[i].name == store_name) {
            state.cart[i].checked = !state.cart[i].checked;
            for (let good in state.cart[i].good_list) {
                state.cart[i].good_list[good].checked = state.cart[i].checked
            }
        }
    }
}


export const check_good = function (state, item) {
    let item_id = item.item
    let not_checked_num = 0
    let total_num = 0
    for (let i in state.cart) {
        total_num = state.cart[i].good_list.length
        for (let good in state.cart[i].good_list) {
            if (state.cart[i].good_list[good].item_id == item_id) {
                state.cart[i].good_list[good].checked = !state.cart[i].good_list[good].checked   
                if (!state.cart[i].checked) {
                    state.cart[i].checked = true
                }
               
            }
            if (state.cart[i].good_list[good].checked == false) {
                not_checked_num += 1
            } 
        }
        if (total_num == not_checked_num) {
            state.cart[i].checked = false
        }
    }
}

export const remove_good = function (state, item) {
    let item_id = item.item.id
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            if (state.cart[i].good_list[good].item_id == item_id) {
                state.cart_count -= state.cart[i].good_list[good].count
                state.cart[i].good_list.splice(good, 1)
            }
        }
        if (state.cart[i].good_list.length == 0) {
            state.cart.splice(i, 1)
        }
    }
}


export const add_cart = function (state, item) {
    item = item.item
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            if (state.cart[i].good_list[good].item_id == item.item_id) {
                state.cart[i].good_list[good].count = parseInt(state.cart[i].good_list[good].count) + 1
            }
            
        }
    }

    
}


export const remove_cart = function (state, item) {
    item = item.item
    for (let i in state.cart) {
        for (let good in state.cart[i].good_list) {
            if (state.cart[i].good_list[good].item_id == item.item_id) {
                state.cart[i].good_list[good].count = parseInt(state.cart[i].good_list[good].count) - 1
            }
            
        }
    }
}


export const add_cart_count = function (state, item) {
    state.cart_count += 1
}


export const desc_cart_count = function (state, item) {
    state.cart_count -= parseInt(item.item)
}


export const set_chat_count = function (state, item) {
    state.chat_count = parseInt(item.item)
}


export const set_default_address = function (state, item) {
    state.default_address = item.item
}

