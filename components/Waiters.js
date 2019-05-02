import React from 'react';
import { connect } from 'react-redux';
import { agregarItemMenu } from '../actions/waitersActions';
import { View } from 'react-native';

class Waiters extends React.Component {

    render() {
        return(
            <View></View>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    agregarItemMenuAccion: agregarItemMenu(dispatch)
});

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(BurgerQueen);

