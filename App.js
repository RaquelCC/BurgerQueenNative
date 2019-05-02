import React from 'react';
// import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store'
import { StyleSheet, Text, View } from 'react-native';
import BurgerQueen from './components/BurgerQueen';
// import Login from './components/Login';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
      <BurgerQueen />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// const mapStateToProps = state => ({
//   ...state
// });

// const mapDispatchToProps = dispatch => ({
//   agregarItemMenuAccion: agregarItemMenu(dispatch)
// });

// export default
//   connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(App);
