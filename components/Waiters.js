import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu, fillMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';

class Waiters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textInput: "",
            customer: "",
            currentOrder: {
                customer: null,
                contents: [],
                total: 0,
                sentToKitchen: false,
                ready: false,
                delivered: false,
            }
        }

        this.reset = this.reset.bind(this);
    }

    componentDidMount() {

    }

    reset() {
        console.log("reset")
        this.setState({
            textInput: "",
            customer: "",
            currentOrder: {
                customer: null,
                contents: [],
                total: 0,
                sentToKitchen: false,
                ready: false,
                delivered: false,
            }
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                placeholder="Ingrese nuevo Cliente.."
                value={this.state.customer}
                onChangeText={e => this.setState({...this.state, customer: e}) }
                style={styles.customerName}
                ></TextInput>
                <TouchableOpacity style={styles.nuevoPedido}><Text style={styles.nuevoPedidoText}>AGREGAR CLIENTE</Text></TouchableOpacity>
                <TouchableOpacity style={styles.nuevoPedido}><Text style={styles.nuevoPedidoText}>ENVIAR PEDIDO A COCINA</Text></TouchableOpacity>
                <TouchableOpacity style={styles.nuevoPedido} onPress={this.reset}><Text style={styles.nuevoPedidoText}>INICIAR NUEVO PEDIDO</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    nuevoPedido: {
        display: "block",
        width: "80%",
        backgroundColor: "#2f89fc",
        borderRadius: 10,
        margin: "auto",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        height: 50
    },
    nuevoPedidoText: {
        color: "white",
        fontSize: 20
    },
    customerName: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 10,
        width: "80%",
        height: 40,
        padding: 5,
        fontSize: 20,
        marginTop: 20
    }
})

const mapStateToProps = state => ({
    ...state
});

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
    )(Waiters);

