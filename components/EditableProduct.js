import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { agregarItemMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';

class EditableProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editable:  false,
            name: this.props.item.name,
            price: this.props.item.price,
            menu: this.props.item.menu
        }

        this.makeEditable = this.makeEditable.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleEditPrice = this.handleEditPrice.bind(this);
        this.handleEditMenu = this.handleEditMenu.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    makeEditable(item) {
        // console.log(item)
        this.setState({
            ...this.state,
            editable: true
        }, () => {

            this.refs["name"+item].focus();
        })

    }

    cancelEdit() {
        this.setState({
            ...this.state,
            name: this.props.item.name,
            price: this.props.item.price,
            menu: this.props.item.menu,
            editable: false,
        }, () => {
        })
    }

    handleEditName(e) {
        this.setState({
            ...this.state,
            name: e
        }/*, () => {
            console.log(this.state.name)}*/
            )
    }

    handleEditPrice(e) {
        this.setState({
            ...this.state,
            price: e
        }/*, () => {
            console.log(this.state.price)
        }*/)
    }
    
    handleEditMenu(e) {
        this.setState({
            ...this.state,
            menu: e
        }/*, () => {
            console.log(this.state.menu)
        }*/)
    }

    saveEdit(product) {
        fetch("http://172.20.10.2:8080/products/"+product,
            {
                method: "PUT",
                body: JSON.stringify({
                    "name": this.state.name,
                    "price": Number(this.state.price),
                    "menu": this.state.menu
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.burgerQueenReducers.logedUser
                }
            })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.props.updateInfo(data)
            })
            .then( () => {
                this.setState({
                    editable: false,
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.productsContainer}>
                    <View style={{ flex: 2 }}>
                        <View style={{flexDirection: "row"}}><Text>Producto: </Text><TextInput style={{backgroundColor: this.state.editable ? "#fff3b1" : "white"}} ref={"name"+this.props.item["_id"]} editable={this.state.editable} onChangeText={(e) => this.handleEditName(e)}>{this.state.name}</TextInput></View>
                        <View style={{flexDirection: "row"}}><Text>Precio: </Text><TextInput style={{backgroundColor: this.state.editable ? "#fff3b1" : "white"}} editable={this.state.editable} onChangeText={(e) => this.handleEditPrice(e)}>{this.state.price}</TextInput></View>
                        <View style={{flexDirection: "row"}}><Text>Menu: </Text><TextInput style={{backgroundColor: this.state.editable ? "#fff3b1" : "white"}} editable={this.state.editable} onChangeText={(e) => this.handleEditMenu(e)}>{this.state.menu}</TextInput></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                        <Icon
                            name={!this.state.editable ? 'pencil' : 'check' }
                            type='evilicon'
                            color='#517fa4'
                            onPress={() => {
                                !this.state.editable && this.makeEditable(this.props.item["_id"])
                                this.state.editable && this.saveEdit(this.props.item["_id"])
                            }}
                        />
                        <Icon
                            name={!this.state.editable ? 'trash' : 'close-o'}
                            type='evilicon'
                            color='#517fa4'
                            onPress={() => {
                                !this.state.editable && this.props.deleteProduct(this.props.item["_id"])
                                this.state.editable && this.cancelEdit()
                            }}
                        />
                    </View>
                </View>
        )
    }



}

const styles = StyleSheet.create({
    editarProductosContainer: {
        // height: "100%",
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        // zIndex: 0,
        // backgroundColor: "white",
        // position: "absolute"
    },
    productsContainer: {
        width: "70%",
        // flex: 1,
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
    addProductButton: {
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
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditableProduct);