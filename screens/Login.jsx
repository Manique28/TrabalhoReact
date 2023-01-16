import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Login = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');

  const HandleLogin = () => {
    if (email && pass) {
      auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {})
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'erro',
              text1: 'Email Inválido',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/wrong-password') {
            Toast.show({
              type: 'error',
              text1: 'Password Errada',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/user-not-found') {
            Toast.show({
              type: 'error',
              text1: 'Utilizador não encontrado',
              position: 'bottom',
            });
          }
        });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Sem dados',
        position: 'bottom',
      });
    }
  };

  const nav = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titulo}>Shifter</Text>
      <Text style={styles.titulo2}>App</Text>
      <View style={styles.caixastexto}>
        <TextInput
          value={email}
          onChangeText={setemail}
          placeholder="Email"
          style={styles.dados}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.caixastexto}>
        <TextInput
          value={pass}
          onChangeText={setpass}
          placeholder="Password"
          secureTextEntry
          style={styles.dados}></TextInput>
      </View>

      <TouchableOpacity onPress={HandleLogin} style={styles.loginbotao}>
        <Text style={styles.logintexto}>Login</Text>
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 20,
          color: '#7A7067',
          marginTop: 20,
        }}>
        Não tem conta?{' '}
        <Text
          onPress={() => nav.navigate('Registro')}
          style={{color: '#0d61d6'}}>
          Registrar
        </Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6DFD9',
  },

  titulo: {
    color: '#402F29',
    fontSize: 45,
    top: -75,
    marginTop: 100,
    borderRadius: 15,
    backgroundColor:'#BFB3A8',
    borderWidth: 2,
    borderColor: '#BFB3A8',
  },

  titulo2: {
    color: '#402F29',
    fontSize: 45,
    top: -80,
    borderRadius: 15,
    backgroundColor: '#BFB3A8',
    borderWidth: 2,
    borderColor: '#BFB3A8'
  },

  caixastexto: {
    justifyContent: 'center',
    backgroundColor: '#BFB3A8',
    width: '80%',
    height: 75,
    marginBottom: 10,
  },

  dados: {
    fontSize: 20,
  },

  loginbotao: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFB3A8',
    width: '50%',
    height: 60,
    marginTop: 15,
  },

  logintexto: {
    color: '#402F29',
    fontSize: 30,
  },
});
