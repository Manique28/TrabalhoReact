import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {addUsersList, clearUsers} from '../reducers/usersListSlice';
import {useNavigation} from '@react-navigation/native';
import TaskCard from '../components/TaskCard';

const MenuP = () => {
  const curUser = useSelector(state => state.currentUser);

  if (curUser.role === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#E6DFD9',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.titulo}>Aguarde</Text>
      </View>
    );
  }

  if (curUser.role === true) {
    return <HomeAdmin></HomeAdmin>;
  } else if (curUser.role === false) {
    return <HomeUser></HomeUser>;
  }
};

const HomeUser = () => {
  const curUser = useSelector(state => state.currentUser);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(curUser.id)
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
      <View>
        <Text style={styles.titulo}>Bem-vindo {curUser.name}</Text>
        <Text style={styles.subtitulo}>Tarefas:</Text>
      </View>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TaskCard
            titulo={item.key}
            done={item.isDone}
            data={item.tempo.toDate().toLocaleString('pt-PT')}
            descricao={item.descricao}
            id={curUser.id}
          />
        )}
      />
    </SafeAreaView>
  );
};

const HomeAdmin = () => {
  const dispatch = useDispatch();

  const curUser = useSelector(state => state.currentUser);
  const allUser = useSelector(state => state.allUsersList.users);
  const navigation = useNavigation();

  useEffect(() => {
    firestore()
      .collection('users')
      .where('admin', '==', curUser.role === false)
      .onSnapshot(users => {
        if (!users.empty) {
          dispatch(clearUsers());
          users.forEach(user => {
            dispatch(addUsersList(user.data()));
          });
        }
      });
  }, [curUser]);

  return (
    <SafeAreaView style={styles.principal}>
      <View>
        <Text style={styles.titulo}>Bem-vindo {curUser.name}</Text>
        <Text style={styles.subtitulo}>Lista de trabalhadores:</Text>
      </View>

      <View style={{marginLeft: 20, marginRight: 20}}>
        <FlatList
          data={allUser}
          renderItem={({item}) => (
            <View style={styles.trabalhadores}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MenuTrabalhador', {
                    id: item.id,
                    nome: item.nome,
                    email: item.email,
                  });
                }}>
                <Text style={styles.lista}>{item.nome}</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default MenuP;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#E6DFD9',
  },

  titulo: {
    color: '#402F29',
    fontSize: 30,
    margin: 20,
    marginTop: 120,
  },
  subtitulo: {
    color: '#402F29',
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20,
  },

  lista: {
    color: '#402F29',
    fontSize: 30,
    backgroundColor: '#BFB3A8',
    padding: 3,
  },

  trabalhadores: {
    marginTop: 20,
  },
});
