export const set_user = ({ commit, state }, item) => {
    commit({
        type: 'set_user',
        item
    })
}


export const add_cart_count = ({ commit, state }, item) => {
    commit({
        type: 'add_cart_count',
        item
    })
}


export const desc_cart_count = ({ commit, state }, item) => {
    commit({
        type: 'desc_cart_count',
        item
    })
}


export const logout = ({ commit, state }, item) => {
    commit({
        type: 'logout',
        item
    })
}


export const set_cart = ({ commit, state }, item) => {
    commit({
        type: 'set_cart',
        item
    })
}


export const check_all = ({ commit, state }, item) => {
    commit({
        type: 'check_all',
        item
    })
}


export const check_store = ({ commit, state }, item) => {
    commit({
        type: 'check_store',
        item
    })
}


export const check_good = ({ commit, state }, item) => {
    commit({
        type: 'check_good',
        item
    })
}


export const remove_good = ({ commit, state }, item) => {
    commit({
        type: 'remove_good',
        item
    })
}



export const add_cart = ({ commit, state }, item) => {
    commit({
        type: 'add_cart',
        item
    })
}

export const remove_cart = ({ commit, state }, item) => {
    commit({
        type: 'remove_cart',
        item
    })
}


export const set_chat_count = ({ commit, state }, item) => {
    commit({
        type: 'set_chat_count',
        item
    })
}


export const set_default_address = ({ commit, state }, item) => {
    commit({
        type: 'set_default_address',
        item
    })
}