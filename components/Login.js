import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { agregarItemMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: false,
            pwd: false,
            token: false,
        }

        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePwdInput = this.handlePwdInput.bind(this);
        this.login = this.login.bind(this);
    }

    login() {
        console.log("iniciando sesión")
        fetch("http://172.20.10.2:8080/auth", {
            method: "POST",
            body: JSON.stringify({
                "email": this.state.user,
                "password": this.state.pwd
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(data => {
            return data.json()
        })
        .then(data=>{
            this.setState({
                ...this.state,
                token: data.token
            }, () => {
                fetch("http://172.20.10.2:8080/users/"+this.state.user,
                {
                    method: "GET",
                    // body: JSON.stringify({
                    //     "email": this.state.user,
                    //     "password": this.state.pwd
                    // }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.state.token
                    }
                })
                .then(data => {
                    return data.json()
                })
                .then(data => {
                    let admin = false;
                    if (data.roles) {
                        admin = data.roles.admin;
                    }
                    this.props.loginUserAccion({
                        token: this.state.token,
                        admin: admin,
                    })
                })
                .catch(error => {
                    console.log(error)
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleUserInput(e) {
        this.setState({
            ...this.state,
            user: e
        }, () => {
            // console.log(this.state.user)
        })
    }

    handlePwdInput(e) {
        this.setState({
            ...this.state,
            pwd: e
        }, () => {
            // console.log(this.state.pwd)
        })
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <Text style={styles.loginField}>Usuario</Text>
                <TextInput style={styles.loginInput} onChangeText={(e) => this.handleUserInput(e)}></TextInput>
                <Text style={styles.loginField}>Contraseña</Text>
                <TextInput style={styles.loginInput} secureTextEntry={true} onChangeText={(e) => this.handlePwdInput(e)}></TextInput>
                <TouchableOpacity style={styles.loginButton} onPress={this.login}><Text style={{ color: "white", fontSize: 20 }}>Iniciar Sesión</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        // backgroundColor: "#3D6DCC",
        display: "flex",
        justifyContent: "center",
        // paddingTop: "50%",
        alignItems: "center",
        height: "100%",
        width: "100%"
    },
    loginInput: {
        borderWidth: 1,
        width: "50%",
        marginTop: 5,
        marginBottom: 5,
        fontSize: 20,
        padding: 5
    },
    loginField: {
        fontSize: 20
    },
    loginButton: {
        height: 40,
        width: "50%",
        backgroundColor: "#2f89fc",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"

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
    loginUserAccion : loginUser(dispatch),
    logoutAccion: logout(dispatch),

});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Login);