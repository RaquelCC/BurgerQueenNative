import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu, fillMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import KeyboardListener from 'react-native-keyboard-listener';



class EditarUsuarios extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: false,
            newUser: null,
            newPwd: null,
        }

        this.renderUsers = this.renderUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleNewUser = this.handleNewUser.bind(this);
        this.handleNewPwd = this.handleNewPwd.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    componentDidMount() {
        fetch("http://192.168.1.102:8080/users",
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
                this.setState({
                    ...this.state,
                    users: data
                }, () => console.log(data))
            })
            .catch(error => console.log(error))
    }

    handleNewUser(e) {
        this.setState({
            ...this.state,
            newUser: e
        })
    }

    handleNewPwd(e) {
        this.setState({
            ...this.state,
            newPwd: e
        })
    }

    renderUsers() {
        const users = this.state.users.map(user => {
            return (
                <View style={styles.userContainer}>
                    <View style={{flex: 2}}>
                        <Text>{user.email}</Text>
                        <Text>Admin: {user.roles ? "Si" : "No"}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {!user.roles && <Icon
                            name='trash'
                            type='evilicon'
                            color='#517fa4'
                            onPress={() => this.deleteUser(user._id)}
                        />}
                    </View>
                </View>
            )
        })
        return users
    }

    deleteUser(uid) {
        fetch("http://192.168.1.102:8080/users/"+uid,
        {
            method: "DELETE",
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
            this.setState({
                ...this.state,
                users: data,
            })
        })
        .catch(error => console.log(error))
    }

    addUser() {
        fetch("http://192.168.1.102:8080/users/",
        {
            method: "POST",
            body: JSON.stringify({
                "email": this.state.newUser,
                "password": this.state.newPwd
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.burgerQueenReducers.logedUser
            }
        })
        .then(data => data.json())
        .then(data => {
            this.setState({
                ...this.state,
                users: data,
                newUser: null,
                newPwd: null,
            }, () => {
                console.log(this.state.users)
            })
        })
        .catch(error => console.log(error))
    } 
    
    render() {
        return (
            <ScrollView style={styles.editarUsuariosContainer}
            ref='myView'
            >
                {this.state.users && this.renderUsers()}
                <KeyboardListener
                        onWillShow={() => {
                            this.setState({ ...this.state, keyboardOpen: true },
                                () => {
                                    this.refs.scrollto.measure((fx, fy, width, height, px, py) => {
                                        this.refs.myView.scrollTo({y: py-80})
                                    })
                                }
                            )
                        }}
                        onWillHide={() => { this.setState({ ...this.state, keyboardOpen: false }) }}
                    />
                <View style={{width: "80%"}}>
                    {/* aqui boton para agregar usuarios */}
                    <Text  ref="scrollto">Para crear un nuevo usuario, ingrese el nombre de usuario y contraseña: </Text>
                    <TextInput placeholder="usuario" style={styles.inputContainer} onChangeText={(e) => this.handleNewUser(e)} value={this.state.newUser}></TextInput>
                    <TextInput placeholder="contraseña" style={styles.inputContainer} onChangeText={(e) => this.handleNewPwd(e)} value={this.state.newPwd}></TextInput>
                    <TouchableOpacity style={styles.loginButton} onPress={this.addUser}><Text style={{ color: "white", fontSize: 20 }}>Agregar Usuario</Text></TouchableOpacity>
                </View>
                <View style={{ height: this.state.keyboardOpen ? 300 : 0 }}></View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    editarUsuariosContainer: {
        // height: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        // zIndex: 0,
        // backgroundColor: "white",
        // position: "absolute"
    },
    userContainer: {
        width: "70%",
        flex: 1,
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: "gray",
        fontSize: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    loginButton: {
        height: 40,
        // width: "80%",
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
    loginUserAccion: loginUser(dispatch),
    logoutAccion: logout(dispatch),
    fillMenuAccion: fillMenu(dispatch),
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditarUsuarios);