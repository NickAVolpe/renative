import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation';
import ScreenHome from './screenHome';
import ScreenMyPage from './screenMyPage';
import Menu from './menu';

const Navigator = createDrawerNavigator(
    {
        ScreenHome,
        ScreenMyPage,
    },
    {
        contentComponent: Menu,
    },
);

class App extends React.Component {
  static router = {
      ...Navigator.router,
      getStateForAction: (action, lastState) => Navigator.router.getStateForAction(action, lastState)
      ,
  };

  render() {
      return (
          <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#222222' }}>
              <Navigator navigation={this.props.navigation} />
          </View>
      );
  }
}

export default App;
