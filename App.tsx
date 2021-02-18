import React from 'react';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from './Colors';
import {WeatherContainer} from './Weather/WeatherContainer';

const AppHeader = {
  text: 'Cycling Weather Forecast',
  style: {
    color: 'white',
  },
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Header centerComponent={AppHeader} backgroundColor={Colors.purple} />
      <WeatherContainer />
    </SafeAreaProvider>
  );
};

export default App;
