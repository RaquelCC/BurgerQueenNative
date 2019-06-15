import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu, fillMenu } from '../actions/waitersActions';
import { changeScreen, loginUser, logout } from '../actions/burgerQueenActions';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import KeyboardListener from 'react-native-keyboard-listener';
import EditableProduct from './EditableProduct'



class EditarMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            newProduct: null,
            newPrice: null,
            newMenu: null,
            keyboardOpen: false,
        }

        this.renderItems = this.renderItems.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.handleNewProduct = this.handleNewProduct.bind(this);
        this.handleNewPrice = this.handleNewPrice.bind(this);
        this.handleNewMenu = this.handleNewMenu.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    componentDidMount() {
        // fetch("http://192.168.1.102:8080/products",
        //     {
        //         method: "GET",
        //         // body: JSON.stringify({
        //         //     "email": this.state.user,
        //         //     "password": this.state.pwd
        //         // }),
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': 'Bearer ' + this.props.burgerQueenReducers.logedUser
        //         }
        //     })
        //     .then(data => data.json())
        //     .then(data => {
        //         this.setState({
        //             ...this.state,
        //             products: data,
        //         }, () => console.log(this.state.products))
        //     })
        //     .catch(error => console.log(error))
    }

    deleteProduct(product) {
        // console.log(product)
        fetch("http://192.168.1.102:8080/products/" + product,
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
                console.log(data)
                this.props.fillMenuAccion(data)
                // this.setState({
                //     ...this.state,
                //     products: data
                // }, () => console.log(this.state.products))
            })
            .catch(error => console.log(error))
    }

    updateInfo(data) {
        this.setState({
            ...this.state,
            products: data
        })
    }

    
    handleNewProduct(e) {
        this.setState({
            ...this.state,
            newProduct: e
        })
    }

    handleNewPrice(e) {
        this.setState({
            ...this.state,
            newPrice: e
        })
    }

    handleNewMenu(e) {
        this.setState({
            ...this.state,
            newMenu: e
        })
    }

    addProduct() {
        fetch("http://192.168.1.102:8080/products/",
            {
                method: "POST",
                body: JSON.stringify({
                    "name": this.state.newProduct,
                    "price": Number(this.state.newPrice),
                    "menu": this.state.newMenu
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.burgerQueenReducers.logedUser
                }
            })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.props.fillMenuAccion(data)
                this.setState({
                    ...this.state,
                    products: data,
                    newProduct: null,
                    newPrice: null,
                    newMenu: null,
                }, () => console.log(this.state.products))
            })
            .catch(error => console.log(error))
    }


    renderItems() {
        const renderedProducts = this.props.waitersReducers.bqMenu.map(item => {
            return (
                <EditableProduct item={item} deleteProduct={this.deleteProduct} updateInfo={this.updateInfo}/>
                // <View style={styles.productsContainer}>
                //     <View style={{ flex: 2 }}>
                //         <View style={{flexDirection: "row"}}><Text>Producto: </Text><TextInput ref={"name"+item["_id"]} editable={false}>{item.name}</TextInput></View>
                //         <View style={{flexDirection: "row"}}><Text>Precio: </Text><TextInput ref={"price"+item["_id"]} editable={false}>{item.price}</TextInput></View>
                //         <View style={{flexDirection: "row"}}><Text>Menu: </Text><TextInput ref={"menu"+item["_id"]} editable={false}>{item.menu}</TextInput></View>
                //     </View>
                //     <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                //         <Icon
                //             name='pencil'
                //             type='evilicon'
                //             color='#517fa4'
                //             onPress={() => this.enableEdit(item["_id"])}
                //         />
                //         <Icon
                //             name='trash'
                //             type='evilicon'
                //             color='#517fa4'
                //             onPress={() => this.deleteProduct(item["_id"])}
                //         />
                //     </View>
                // </View>
            )
        })
        return renderedProducts
    }

    render() {
        return (
            <ScrollView style={{
                ...styles.editarProductosContainer, paddingBottom: 200,
            }}
                ref='myView'
            >
                <KeyboardListener
                    onWillShow={() => {
                        // console.log("abierto")
                        this.setState({ ...this.state, keyboardOpen: true },
                            () => {
                                // console.log("callback")
                                this.refs.scrollto.measure((fx, fy, width, height, px, py) => {
                                    // console.log('Component width is: ' + width)
                                    // console.log('Component height is: ' + height)
                                    // console.log('X offset to frame: ' + fx)
                                    // console.log('Y offset to frame: ' + fy)
                                    // console.log('X offset to page: ' + px)
                                    // console.log('Y offset to page: ' + py)
                                    this.refs.myView.scrollTo({ y: py - 80 })
                                })
                            }
                        )
                    }}
                    onWillHide={() => { this.setState({ ...this.state, keyboardOpen: false }) }}
                />
                {this.renderItems()}
                <View style={{ width: "80%" }}>
                    <Text ref="scrollto">Para agregar un nuevo producto al menu ingrese el nombre del producto, precio y menu al que pertenece: </Text>
                    <TextInput placeholder="Producto" style={styles.inputContainer} /*onFocus={() => setTimeout(()=> this.refs.myView.scrollToEnd({animated: false}), 100)}*/ onChangeText={(e) => this.handleNewProduct(e)} value={this.state.newProduct}></TextInput>
                    <TextInput placeholder="Precio" style={styles.inputContainer} onChangeText={(e) => this.handleNewPrice(e)} value={this.state.newPrice}></TextInput>
                    <TextInput placeholder="Menu" style={styles.inputContainer} onChangeText={(e) => this.handleNewMenu(e)} value={this.state.newMenu}></TextInput>
                    <TouchableOpacity style={styles.addProductButton} onPress={this.addProduct}><Text style={{ color: "white", fontSize: 20 }}>Agregar Producto</Text></TouchableOpacity>
                </View>
                <View style={{ height: this.state.keyboardOpen ? 300 : 0 }}></View>
            </ScrollView>
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
    fillMenuAccion: fillMenu(dispatch),
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditarMenu);