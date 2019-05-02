import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu } from '../actions/waitersActions';
import { changeScreen, loginUser } from '../actions/burgerQueenActions';


class EditarMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return
    }
}

const mapStateToProps = state => {
    console.log(JSON.stringify(state));
    return ({
        ...state
    })
};

const mapDispatchToProps = dispatch => ({
    agregarItemMenuAccion: agregarItemMenu(dispatch),
    changeScreenAccion: changeScreen(dispatch),
    loginUserAccion : loginUser(dispatch),
    logoutAccion: logout(dispatch),
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditarMenu);