import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const Registro = () => {
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [nome, setnome] = useState('');
  const [isAdmin, setisAdmin] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [roles, setroles] = useState([
    {label: 'Admin', value: true},
    {label: 'Trabalhador', value: false},
  ]);

  const nav = useNavigation();

  const HandleRegister = () => {
    if (email && pass && nome && isAdmin !== null) {
      auth()
        .createUserWithEmailAndPassword(email, pass)
        .then(() => {
          firestore().collection('users').doc(auth().currentUser.uid).set({
            id: auth().currentUser.uid,
            nome: nome,
            email: email,
            admin: isAdmin,
          });
        })

        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Toast.show({
              type: 'error',
              text1: 'Email já em uso',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/invalid-email') {
            Toast.show({
              type: 'error',
              text1: 'Email Inválido',
              position: 'bottom',
            });
          }

          if (error.code === 'auth/weak-password') {
            Toast.show({
              type: 'error',
              text1: 'Password fraca',
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

  return (
    <KeyboardAvoidingView style={styles.principal}>
      <Text style={styles.titulo}>Registro</Text>
      <View style={styles.boxView}>
        <TextInput
          value={nome}
          onChangeText={setnome}
          placeholder="Nome"
          style={styles.texto}></TextInput>
      </View>

      <View style={styles.boxView}>
        <TextInput
          value={email}
          onChangeText={setemail}
          placeholder="Email"
          style={styles.texto}
          keyboardType="email-address"
          autoCapitalize="none"></TextInput>
      </View>

      <View style={styles.boxView}>
        <TextInput
          value={pass}
          onChangeText={setpass}
          placeholder="Password"
          secureTextEntry
          style={styles.texto}></TextInput>
      </View>

      <DropDownPicker
        open={isOpen}
        value={isAdmin}
        items={roles}
        setOpen={setisOpen}
        setValue={setisAdmin}
        setItems={setroles}
        placeholder="Cargo na empresa"
        style={styles.boxView}
        labelStyle={{
          fontSize: 20,
          color: '#7A7067',
        }}
        placeholderStyle={{
          fontSize: 20,
          color: '#BF2604',
        }}
        dropdown ={styles.dropdown}
        listItemLabelStyle={{
          color: '#7A7067',
        }}
        selectedItemLabelStyle={{
          color: 'black',
        }}
      />
      <TouchableOpacity onPress={HandleRegister} style={styles.botao}>
        <Text style={styles.botaoregistro}>Criar conta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Registro;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6DFD9',
  },
  titulo: {
    color: '#402F29',
    fontSize: 40,
    position: 'relative',
    marginTop: 80,
    top: -75,
  },

  boxView: {
    justifyContent: 'center',
    backgroundColor: '#BFB3A8',
    alignSelf: 'center',
    width: '80%',
    height: 75,
  },

  dropdown: {
    justifyContent: 'center',
    backgroundColor: '#BFB3A8',
    alignSelf: 'center',
    width: '80%',
    height: 90,
    marginTop: 10,
  },

  texto: {
    fontSize: 20,
    color: '#7A7067'
  },

  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BFB3A8',
    width: '50%',
    height: 75,
    borderRadius: 20,
    marginTop: 15,
  },

  botaoregistro: {
    color: '#7A7067',
    fontSize: 30,
  },

});
