import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TaskCard from '../components/TaskCard';
import firestore from '@react-native-firebase/firestore';

const MenuTrabalhador = ({route, navigation}) => {
  const {nome, id, email} = route.params;

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const tasks = [];
        querySnapshot.forEach(documentSnapshot => {
          tasks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTasks(tasks);
      });

    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={styles.principal}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.titulo}>Perfil do trabalhador</Text>
      </View>

      <View style={{margin: 20}}>
        <Text style={styles.texto}>Nome : {nome}</Text>
        <Text style={styles.texto}>Email : {email}</Text>
      </View>

      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TaskCard
            titulo={item.key}
            done={item.isDone}
            data={item.tempo.toDate().toLocaleString('pt-PT')}
            descricao={item.descricao}
            id={id}
          />
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => {
          navigation.navigate('AdicionarTarefa', {nome, email, id});
        }}>
        <Icon name="folder-plus" size={50} color={'white'}></Icon>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MenuTrabalhador;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#E6DFD9',
    justifyContent: 'space-between',
  },
  titulo: {
    color: '#402F29',
    fontSize: 30,
    marginLeft: 50,
    margin: 20,
  },

  texto: {
    color: '#7A7067',
    fontSize: 19,
    padding: 10,
    backgroundColor: '#BFB3A8',
    
    
  },

  botao: {
    flexDirection: 'row',
    backgroundColor: '#7A7067',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    margin: 30,
    alignSelf: 'flex-end',
  },
});
