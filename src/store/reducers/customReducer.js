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
    SET_USER_KEY,
    SET_USER_IS_AUTH,
    SET_IS_SPLASH,
    SET_IS_MODAL,
    SET_CHECKED,
    PHONE_NUMBER_OTP,
    SET_GET_PASSWORD,
    SET_POSITION,
    SET_TRACKEUR_STATE,
    // GET_MY_ORDER,
    SET_STEPS,
    // ADD_OR_REMOVE_FAVORITE
} from '../../constants/storeAction';

const initialState = {
count: 0,
products: [],
categories: [],
cart:[],
gateways: [],
shipping_option: [],
address: {
    first_name: "John",
    last_name: "Doe",
    address_1: "969 Market",
    address_2: "",
    city: "San Francisco",
    state: "CA",
    postcode: "94103",
    country: "US"
  },
user: [],
userKey: '',
user_is_auth: false,
is_splash: false,
is_checked: false,
orders: [],
reset_password: {},
myfavorites: [],
test: ["1"],
phoneNumberOtp: '',
is_modal: true,
password: '',
position: [],
steps: 0,
trackeur_state: [],
};

const rbrReducer = (state = initialState, action) => {
    switch(action.type) {
        // case COUNTER_CHANGE:
        //     return {
        //     ...state,
        //     count:action.payload
        //     };
        // case GET_PRODUCTS:
        //     return {
        //         ...state,
        //         products: action.payload
        //     }
        // case GET_MY_ORDER:
        //     return {
        //         ...state,
        //         orders: action.payload
        //     }
        // case GET_PAYMENT_GATEWAY:
        //     return {
        //         ...state,
        //         gateways: action.payload
        //     }
        // case GET_SHIPPING_OPTION:
        //     return {
        //         ...state,
        //         shipping_option: action.payload
        //     }
        // case GET_CATEGORIES:
        //     return {
        //         ...state,
        //         categories: action.payload
        //     }
        // case ADD_OR_REMOVE_FAVORITE:
        //     let fav = state.myfavorites
        //     if (state.myfavorites == undefined){
        //         return {
        //             ...state,
        //             myfavorites: [action.payload]
        //         }
        //     } else {
        //         if (state.myfavorites.findIndex(item => item.id == action.payload.id) == -1){
        //             fav = state.myfavorites.concat([action.payload])
        //         }else{
        //             fav = state.myfavorites.filter(item => item.id != action.payload.id)
        //         }
        //         console.log(fav)
        //         return {
        //             ...state,
        //             myfavorites: fav
        //         }
        //     }
            
        // case CLEAN_CART:
        //     return {
        //         ...state,
        //         cart: action.payload
        //     }
        // case UPDATE_CART_PRODUCT_QTY:
        //     if(action.payload.qty == 0){
        //         return {
        //             ...state,
        //             cart: state.cart.filter((p) => p.product.id != action.payload.id)
        //         }
        //     }
        //     const newCartP = state.cart
        //     const index = newCartP.findIndex(item => item.product.id == action.payload.id)
        //     newCartP[index].qty = action.payload.qty
        //     return {
        //         ...state,
        //         cart: newCartP
        //     }
        // case GET_CATEGORIES:
        //     return {
        //         ...state,
        //         categories: action.payload
        //     }
        // case CHECK_PAYMENT_GATEWAY:
        //     console.log(state.gateways)
        //     let newGate = state.gateways.map((p) => (
        //         {
        //             title: p.title, 
        //             id: p.id,
        //             checked: false,

        //         }
        //     ))

        //     newGate[action.payload.index].checked = true

        //     return {
        //         ...state,
        //         gateways: newGate
        //     }
        // case CHECK_SHIPPING_OPTION:
        //     let newShipping_option = state.shipping_option.map((p) => (
        //         {
        //             title: p.title, 
        //             id: p.id,
        //             checked: false,

        //         }
        //     ))

        //     newShipping_option[action.payload.index].checked = true

        //     return {
        //         ...state,
        //         shipping_option: newShipping_option
        //     }
        // case ADD_TO_CART:
        //     let newCart = state.cart
        //     const prod = newCart.filter((p) => p.product.id == action.payload.product.id)
        //     if (prod.length > 0){
        //         newCart = newCart.filter((p) => p.product.id != action.payload.product.id).concat([action.payload])
        //     } else {
        //         newCart = newCart.concat([action.payload])
        //     }
        //     return {
        //         ...state,
        //         cart: newCart
        //     }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USER_KEY:
            return {
                ...state,
                userKey: action.payload,
            };
        case SET_USER_IS_AUTH:
            return {
                ...state,
                user_is_auth: action.payload,
            };
        case PHONE_NUMBER_OTP:
            return {
                ...state,
                phoneNumberOtp: action.payload,
            };
        case SET_CHECKED:
            return {
                ...state,
                is_checked: action.payload,
            };
        case SET_IS_SPLASH:
            return {
                ...state,
                is_splash: action.payload,
            };
        case SET_IS_MODAL:
            return {
                ...state,
                is_modal: action.payload,
            };
        case SET_GET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case SET_POSITION:
            return {
                ...state,
                position: action.payload,
            };
        case SET_STEPS:
            return {
                ...state,
                steps: action.payload,
            };
        case SET_TRACKEUR_STATE:
            return {
                ...state,
                trackeur_state: action.payload,
            };
        default:
        return state;
    }
}

export default rbrReducer;