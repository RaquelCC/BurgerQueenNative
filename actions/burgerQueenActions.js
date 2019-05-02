import * as actions from './actionTypes';

export const changeScreen = dispatch => screen => {
    dispatch({
        type: actions.CAMBIAR_PANTALLA,
        payload: screen.toUpperCase(),
    });

}

export const loginUser = dispatch => user => {
    dispatch({
        type: actions.LOGIN_USER,
        payload: user
    })
}

export const logout = dispatch => () => {
    dispatch({
        type: actions.LOGOUT,
    })
}