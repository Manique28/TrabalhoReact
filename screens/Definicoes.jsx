import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {clearUser} from '../reducers/userSlice';
import {clearUsers} from '../reducers/usersListSlice';

const Definicoes = () => {
  const dispatch = useDispatch();
  const SignOut = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(clearUser());
        dispatch(clearUsers());
      });
  };
  return (
    <SafeAreaView style={styles.principal}>
      
      
        <TouchableOpacity style={styles.botaoprincipal} onPress={SignOut}>
          <View>
          <Text style={styles.botaotxt}>Deslogar</Text>
          <Icon name="logout" style={styles.icon}></Icon>
          </View>

        </TouchableOpacity>
      
    </SafeAreaView>
  );
};

export default Definicoes;

const styles = StyleSheet.create({
  principal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: '#E6DFD9',
  },
  botaoprincipal: {
    width: '80%',
    backgroundColor: '#BFB3A8',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 250,
    height: 250,
    marginTop: 30,
    borderRadius: 100,
  },

  botaotxt: {
    color: '#7A7067',
    fontSize: 30,
    left: 20,
    
    
  },
  icon: {
    color: '#7A7067',
    fontSize: 40,
    right: 10,
    position: 'absolute',
    
  },
});
