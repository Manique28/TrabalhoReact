import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './screens/Login';
import Registro from './screens/Registro';
import Toast from 'react-native-toast-message';
import BarraDeNavegação from './navigator/BarraDeNavegação';
import AdicionarTarefa from './screens/AdicionarTarefa';
import firestore from '@react-native-firebase/firestore';
import MenuTrabalhador from './screens/MenuTrabalhador';
import DetalhesTarefa from './screens/DetalhesTarefa';
import store from './store';
import {Provider, useDispatch} from 'react-redux';
import {addUser} from './reducers/userSlice';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();

  const [logado, setlogado] = useState();
  const dispatch = useDispatch();

  const saveUser = user => {
    const {id, admin, email, nome} = user;
    dispatch(addUser({id, email, name: nome, role: admin}));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .get()
          .then(user => {
            saveUser(user.data());
          });

        setlogado(true);
      } else {
        setlogado(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={BarraDeNavegação}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="AdicionarTarefa"
              component={AdicionarTarefa}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="MenuTrabalhador"
              component={MenuTrabalhador}
              options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen
              name="DetalhesTarefa"
              component={DetalhesTarefa}
              options={{headerShown: false}}></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast></Toast>
    </NavigationContainer>
  );
};

export default AppWrapper;