const INIT_STATE = {
    carts: []
};


export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingItem = state.carts.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                return {
                    ...state,
                    carts: state.carts.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: (item.quantity || 1) + 1 }
                            : item
                    )
                }
            } else {
                return {
                    ...state,
                    carts: [...state.carts, { ...action.payload, quantity: 1 }]
                }
            }

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                carts: state.carts.map(item =>
                    item.id === action.payload.item.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            }

        case "RMV_CART":
            const data = state.carts.filter((el)=>el.id !== action.payload); 
            // console.log(data);

            return {
                ...state,
                carts:data
            }

        case "RMV_ONE":
            const IteamIndex_dec = state.carts.findIndex((iteam)=> iteam.id === action.payload.id);
   
            if(state.carts[IteamIndex_dec].qnty >= 1){
                const dltiteams = state.carts[IteamIndex_dec].qnty -= 1
                console.log([...state.carts,dltiteams]);

                return {
                    ...state,
                    carts:[...state.carts]
                }
            }else if(state.carts[IteamIndex_dec].qnty === 1 ){
                const data = state.carts.filter((el)=>el.id !== action.payload);

                return {
                    ...state,
                    carts:data
                }
            }

        default:
            return state
    }
}