import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { Header } from 'react-native-elements';
import { agregarItemMenu, fillMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import { AsyncStorage } from 'react-native';



class SideMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            on: false,
        }
        this.handleClickSideMenu = this.handleClickSideMenu.bind(this);
    }

    handleClickSideMenu() {
        this.setState({
            ...this.state,
            on: !this.state.on
        })
    }

    render() {
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff', alignContent: "center", justifyContent: "center", onPress: this.handleClickSideMenu }}
                    centerComponent={{ text: this.props.burgerQueenReducers.currentScreen, style: { color: '#fff' } }}
                    // rightComponent={{ icon: 'restaurant', color: '#fff', alignContent: "center", justifyContent: "center", onPress: () => { this.props.changeScreenAccion('cocina') } }}
                    containerStyle={{
                        justifyContent: "center",
                        alignContent: "center",
                        paddingTop: 40,
                        height: 80,
                        backgroundColor: "#2f89fc"
                    }}
                />
                {this.state.on && <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuOption}><Text style={{ color: "white", fontSize: 20, fontWeight: "700" }} onPress={() => {
                        this.props.changeScreenAccion("garzones")
                        this.handleClickSideMenu()
                    }}>GARZONES</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.menuOption}><Text style={{ color: "white", fontSize: 20, fontWeight: "700" }} onPress={() => {
                        this.props.changeScreenAccion("cocina")
                        this.handleClickSideMenu()
                    }}>COCINA</Text></TouchableOpacity>
                    {this.props.burgerQueenReducers.admin && <TouchableOpacity style={styles.menuOption}><Text style={{ color: "white", fontSize: 20, fontWeight: "700" }} onPress={() => {
                        this.props.changeScreenAccion("editar menu")
                        this.handleClickSideMenu()
                    }}>EDITAR MENU</Text></TouchableOpacity>}
                    {this.props.burgerQueenReducers.admin && <TouchableOpacity style={styles.menuOption}><Text style={{ color: "white", fontSize: 20, fontWeight: "700" }} onPress={() => {
                        this.props.changeScreenAccion("editar usuarios")
                        this.handleClickSideMenu()
                    }}>EDITAR USUARIOS</Text></TouchableOpacity>}
                    <TouchableOpacity style={{ ...styles.menuOption, borderTopWidth: 1, borderBottomWidth: 1 }}><Text style={{ color: "white", fontSize: 20, fontWeight: "700" }} onPress={() => {
                        this.handleClickSideMenu()
                        AsyncStorage.multiRemove(["token", "admin"], () => {
                            this.props.logoutAccion()
                        })
                    }}>CERRAR SESIÓN</Text></TouchableOpacity>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuContainer: {
        height: Dimensions.get('window').height * 0.9,
        width: "60%",
        backgroundColor: "#2f89fc",
        justifyContent: "center",
        alignItems: "center",
        // position: "absolute",
        zIndex: 20,

    },
    menuOption: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: "white",
        borderStyle: "solid",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box"
    }

})

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
    fillMenuAccion: fillMenu(dispatch),
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SideMenu);