import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu, fillMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import Login from './Login';
import { View } from 'react-native';
import SideMenu from './SideMenu';
import EditarUsuarios from './EditarUsuarios';
import EditarMenu from './EditarMenu';
import Waiters from './Waiters';

class BurgerQueen extends React.Component {
    constructor(props) {
        super(props)


        this.updated = false;

    }


    componentDidUpdate() {
        if (!this.updated) {
            fetch("http://192.168.1.102:8080/products",
            {
                method: "GET",
                // body: JSON.stringify({
                //     "email": this.state.user,
                //     "password": this.state.pwd
                // }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.burgerQueenReducers.logedUser
                }
            })
            .then(data => data.json())
            .then(data => {
                this.props.fillMenuAccion(data)
            })
            .then(() => {
                this.updated = true;
            })
            .catch(error => console.log(error))
        }
    }


    render() {
        return (
            <View style={{height: "100%"}}>
                {this.props.burgerQueenReducers.logedUser && <SideMenu />}
                {!this.props.burgerQueenReducers.logedUser && <Login />}
                {this.props.burgerQueenReducers.currentScreen === "EDITAR USUARIOS" && <EditarUsuarios />}
                {this.props.burgerQueenReducers.currentScreen === "EDITAR MENU" && <EditarMenu />}
                {this.props.burgerQueenReducers.currentScreen === "GARZONES" && <Waiters />}

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
    fillMenuAccion: fillMenu(dispatch)

});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BurgerQueen);