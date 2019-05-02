import * as actions from '../actions/actionTypes';

export default (
    state = {
            currentOrder: {
                customer: null,
                contents: [],
                total: 0,
                sentToKitchen: false,
                ready: false,
                delivered: false,
            },
            inputName: ''
    },
    action
) => {
    console.log(JSON.stringify(action));
    switch (action.type) {
        case actions.AGREGAR_ITEM_MENU: 
            return {
                ...state,
                currentOrder: {
                    ...state.currentOrder,
                    contents: action.payload.contents,
                    total: state.currentOrder.total + action.payload.price,
                }
            }
        default:
            return {...state}
    }
}