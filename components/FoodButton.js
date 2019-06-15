import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class FoodButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{this.props.product}</Text>
                {this.props.price && <Text>{this.props.price}</Text>}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#2f89fc",
    },
    buttonText: {
        color: "white"
    }
})