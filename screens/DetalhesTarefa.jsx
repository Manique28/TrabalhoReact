import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import firestore from '@react-native-firebase/firestore';

const DetalhesTarefa = ({route}) => {
  const {titulo, done, descricao, data, id} = route.params;
  const nav = useNavigation();
  const [changesMade, setChangesMade] = useState(false);

  const [check, setcheck] = useState(done);

  const handleChange = () => {
    setChangesMade(true);
    setcheck(!check);
  };

  const showAlert = () => {
    Alert.alert(
      'Eliminar Tarefa',
      'Confirme mais uma vez que quer eliminar',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Eliminar', onPress: () => deleteTask()},
      ],
      {cancelable: false},
    );
  };

  const deleteTask = () => {
    firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .doc(titulo)
      .delete()
      .then(nav.navigate('MenuP'));
  };

  const handleSave = () => {
    firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .doc(titulo)
      .update({
        isDone: check,
      });
    // Save the value here
    setChangesMade(false);
  };
  return (
    <SafeAreaView style={styles.principal}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titulo}>Detalhes da tarefa</Text>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitulo}>Titulo:</Text>
          <Text style={styles.texto}>{titulo}</Text>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitulo}>Descrição da tarefa:</Text>
          <Text style={styles.texto}>{descricao}</Text>
        </View>

        <View style={{margin: 20}}>
          <Text style={styles.subtitulo}>Data limite:</Text>
          <Text style={styles.texto}>{data}</Text>
        </View>

        <View
          style={{
            margin: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                color: '#402F29',
                fontSize: 25,
              }}>
              Marca como concluída:
            </Text>
            <BouncyCheckbox
              isChecked={check}
              disableBuiltInState
              onPress={handleChange}
              fillColor="#7A7067"
              disableText
              size={50}
              style={{marginTop: 10, alignSelf: 'center'}}
              iconImageStyle={{height: '50%', width: '50%'}}
            />
          </View>
          <Icon
            name="trash-can"
            size={55}
            color={'#7A7067'}
            onPress={() => {
              showAlert();
            }}
            style={{marginRight: 30, marginTop: 45 }}></Icon>
        </View>

        {changesMade && (
          <TouchableOpacity style={styles.botao}>
            <Icon
              name="content-save-all"
              size={50}
              color={'#7A7067'}
              onPress={handleSave}></Icon>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetalhesTarefa;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#E6DFD9',
  },

  titulo: {
    color: '#402F29',
    margin: 20,
    marginLeft: 60,
    fontSize: 30,
    borderColor: 'white',
    
  },
  texto: {
    color: '#7A7067',
    fontSize: 20,
    borderRadius: 5,
    borderColor: 'white',
    borderLeftWidth: 10,
    backgroundColor: 'white',
  },

  subtitulo: {
    color: '#402F29',
    fontSize: 25,
  },
  botao: {
    height: 80,
    width: 80,
    marginLeft: 265, 
    alignItems: 'center',
   
  },
});
