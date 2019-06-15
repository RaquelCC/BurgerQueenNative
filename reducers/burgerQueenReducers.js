import * as actions from '../actions/actionTypes';

export default (
    state = {
    currentScreen: "GARZONES",
    logedUser: false,
    admin: false,
    userAccount: false,
},
    action
) => {
    console.log(JSON.stringify(action));
    switch (action.type) {
        case actions.CAMBIAR_PANTALLA:
            return {
                ...state,
                currentScreen: action.payload,
            }
        case actions.LOGIN_USER:
            return {
                ...state,
                logedUser: action.payload.token,
                admin: action.payload.admin,
                userAccount: action.payload.userAccount
            }
        case actions.LOGOUT:
            return {
                ...state,
                logedUser: false,
                admin: false,
            }
        default:
            return {...state}
    }
}
