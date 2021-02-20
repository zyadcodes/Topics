// This is going to be the main file that is run when the app is first launched
import 'react-native-gesture-handler';
import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainStackNavigator from './src/screens/MainStackNavigator';
import analytics from '@react-native-firebase/analytics';

// Creates the functional component
const App = (props) => {
  // Creates references for analytics
  const navigationRef = useRef();
  const routeNameRef = useRef();

  // Renders the component
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
        }}>
        <MainStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

// Exports the app
export default App;
