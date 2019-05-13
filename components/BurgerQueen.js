import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import Login from './Login';
import { View } from 'react-native';
import SideMenu from './SideMenu';
import EditarUsuarios from './EditarUsuarios';
import EditarMenu from './EditarMenu';

class BurgerQueen extends React.Component {
    // constructor(props) {
    //     super(props)

    // }


    render() {
        return (
            <View style={{height: "100%"}}>
                {this.props.burgerQueenReducers.logedUser && <SideMenu />}
                {!this.props.burgerQueenReducers.logedUser && <Login />}
                {this.props.burgerQueenReducers.currentScreen === "EDITAR USUARIOS" && <EditarUsuarios />}
                {this.props.burgerQueenReducers.currentScreen === "EDITAR MENU" && <EditarMenu />}

            </View>
        )
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
    loginUserAccion: loginUser(dispatch),
    logoutAccion: logout(dispatch),

});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BurgerQueen);