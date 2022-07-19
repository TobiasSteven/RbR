import { 
    // CHECK_PAYMENT_GATEWAY, 
    // COUNTER_CHANGE, 
    // GET_PRODUCTS, 
    // GET_CATEGORIES, 
    // ADD_TO_CART, 
    // GET_PAYMENT_GATEWAY,
    // GET_SHIPPING_OPTION,
    // CHECK_SHIPPING_OPTION,
    // CLEAN_CART,
    // UPDATE_CART_PRODUCT_QTY,
    GET_USER,
    SET_USER_IS_AUTH,
    SET_IS_SPLASH,
    SET_IS_MODAL,
    SET_USER_KEY,
    SET_CHECKED,
    PHONE_NUMBER_OTP,
    SET_GET_PASSWORD,
    SET_POSITION,
    SET_STEPS,
    SET_TRACKEUR_STATE,
    // GET_MY_ORDER,
    // SET_RESET_PASSWORD,
    // ADD_OR_REMOVE_FAVORITE,
} from '../../constants/storeAction';

// export function changeCount(count) {

//     return {
//     type: COUNTER_CHANGE,
//     payload: count
//     }

// // }
// export function updateFavorite(prod) {

//     return {
//     type: ADD_OR_REMOVE_FAVORITE,
//     payload: prod
//     }

// }

// export function getProducts(products) {
        
//         return {
//             type: GET_PRODUCTS,
//             payload: products
//         }
// }

// export function getMyOrder(orders) {
        
//         return {
//             type: GET_MY_ORDER,
//             payload: orders
//         }
// }
// export function getCategories(categories) {
//         // console.log(categories)
//         return {
//             type: GET_CATEGORIES,
//             payload: categories
//         }
// }
// export function add_to_cart(product) {
        
//         return {
//             type: ADD_TO_CART,
//             payload: product
//         }
// }
// export function clean_cart() {
        
//         return {
//             type: CLEAN_CART,
//             payload: []
//         }
// }
// export function get_payment_gateway(gateway) {
        
//         return {
//             type: GET_PAYMENT_GATEWAY,
//             payload: gateway
//         }
// }
// export function check_payment_gateway(id,index) {
//         console.log(id)
//         return {
//             type: CHECK_PAYMENT_GATEWAY,
//             payload: {
//                 id:id,
//                 index:index
//             }
//         }
// }
// export function get_shipping_option(shipping_option) {
        
//         return {
//             type: GET_SHIPPING_OPTION,
//             payload: shipping_option
//         }
// }
// export function check_shipping_option(id,index) {
//         return {
//             type: CHECK_SHIPPING_OPTION,
//             payload: {
//                 id:id,
//                 index:index
//             }
//         }
// }
// export function update_qty(id,qty) {
//         return {
//             type: UPDATE_CART_PRODUCT_QTY,
//             payload: {
//                 id:id,
//                 qty:qty
//             }
//         }
// }
export function getUser(user) {
        console.log(user)
        return {
            type: GET_USER,
            payload: user
        }
}
export function user_key(user_key) {
        console.log(user_key)
        return {
            type: SET_USER_KEY,
            payload: user_key
        }
}
export function user_is_auth(user_is_auth) {
        console.log("isAuth " + user_is_auth)
        return {
            type: SET_USER_IS_AUTH,
            payload: user_is_auth
        }
}
export function phoneNumberOtp(phoneNumberOtp) {
        console.log("phoneNumber Otp " + phoneNumberOtp)
        return {
            type: PHONE_NUMBER_OTP,
            payload: phoneNumberOtp
        }
}
export function is_splash(is_splash) {
        console.log("isSplash " + is_splash)
        return {
            type: SET_IS_SPLASH,
            payload: is_splash
        }
}
export function isModal(is_modal) {
        console.log("is_modal " + is_modal)
        return {
            type: SET_IS_MODAL,
            payload: is_modal
        }
}
export function is_checked(is_checked) {
        console.log("isChecked " + is_checked)
        return {
            type: SET_CHECKED,
            payload: is_checked
        }
}
export function getPass(password) {
        // console.log("isPassword " + password)
        return {
            type: SET_GET_PASSWORD,
            payload: password
        }
}
export function getPosition(position) {
        console.log("your position is " + position)
        return {
            type: SET_POSITION,
            payload: position
        }
}
export function getSteps(steps) {
        console.log("your steps " + steps)
        return {
            type: SET_STEPS,
            payload: steps
        }
}
export function getTrackeurState(trackeur_state) {
        console.log("your trackeur state " + trackeur_state)
        return {
            type: SET_TRACKEUR_STATE,
            payload: trackeur_state
        }
}
// export function reset_password(reset_password) {
//         console.log("reset_password " + reset_password)
//         return {
//             type: SET_RESET_PASSWORD,
//             payload: reset_password
//         }
// }