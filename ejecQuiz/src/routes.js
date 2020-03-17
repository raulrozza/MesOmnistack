import React, { useEffect, useRef, useState } from 'react';
import { Linking } from 'expo';

// Components
import Main from './Pages/Main';
import Questions from './Pages/Questions';

// Navigation
import { NavigationContainer, useLinking } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const prefix = Linking.makeUrl('/');

const Routes = () => {
  const ref = useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      Main: '',
      Questions: 'room/:id'
    }
  });

  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve => setTimeout(resolve, 150)),
    ])
    .catch(e => {
      console.error(e);
    })
    .then(state => {
      if (state !== undefined) {
        setInitialState(state);
      }

      setIsReady(true);
    });
  }, [getInitialState]);

  if (!isReady)
    return null;

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#343a40",
            borderBottomWidth: 2,
            borderBottomColor: "#007bff",
          },
          headerTintColor: "#FFF",
          headerTitleStyle: {
            fontSize: 40,
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="Main" component={Main} options={{ title: "EJEC Quiz", headerBackTitleVisible: false }} initialParams={{ prefix }} />
        <Stack.Screen name="Questions" component={Questions} options={{ title: "Carregando..." }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;