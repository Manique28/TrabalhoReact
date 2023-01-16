import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

const AdicionarTarefa = ({route, navigation}) => {
  const [descricao, setdescricao] = useState('');
  const [titulo, settitulo] = useState('');
  const [date, setdate] = useState(new Date());
  const [mode, setmode] = useState('date');
  const [shown, setShown] = useState(false);
  const [texto_tempo, setTexto_tempo] = useState('Sem horas');
  const [txt_data, settxt_data] = useState('Sem data');
  const {nome, id} = route.params;

  const onChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    setShown(Platform.OS === 'ios');
    setdate(currentDate);
    let tempdate = new Date(currentDate);
    let fDate =
      tempdate.getDate() +
      '/' +
      (tempdate.getMonth() + 1) +
      '/' +
      tempdate.getFullYear();
    let fTime =
      tempdate.getHours() +
      'h:' +
      (tempdate.getMinutes() < 10 ? '0' : '') +
      tempdate.getMinutes() +
      'm';

    setTexto_tempo(fTime);
    settxt_data(fDate);
  };

  const ShowMode = currentMode => {
    setShown(true);
    setmode(currentMode);
  };

  const AdicionarTask = () => {
    if (titulo && descricao && date) {
      firestore()
        .collection('users')
        .doc(id)
        .collection('tasks')
        .doc(titulo)
        .set({
          descricao: descricao,
          tempo: date,
          isDone: false,
        });

      navigation.navigate('MenuP');
      Toast.show({
        type: 'success',
        text1: 'Tarefa criada com sucesso',
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Falha ao criar tarefa',
        position: 'bottom',
      });
    }
  };

  return (
    <SafeAreaView style={styles.principal}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titulo}>Adicionar Tarefa ao/a {nome}</Text>
        </View>


        <View style={[styles.descricaoBox, {height: 60}]}>
          <TextInput
            value={titulo}
            onChangeText={settitulo}
            placeholder="Titulo"
            style={styles.descricaoTxt}
            maxLength={20}></TextInput>
        </View>

        <View style={styles.descricaoBox}>
          <TextInput
            value={descricao}
            onChangeText={setdescricao}
            placeholder="Descrição das tarefas"
            style={styles.descricaoTxt}
            multiline
            maxLength={80}></TextInput>
        </View>

        <Text style={[styles.subtitulo, {marginTop: 20}]}>Realizar até:</Text>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={styles.subtitulo}>Data: </Text>

          <Icon
            name="calendar-blank"
            size={40}
            color={'#402F29'}
            style={{alignSelf: 'center'}}
            onPress={() => ShowMode('date')}></Icon>

          <View style={styles.date}>
            <Text style={styles.date_txt}>{txt_data}</Text>
          </View>

          
        </View>

        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <Text style={styles.subtitulo}>Hora: </Text>

          <Icon
            name="calendar-clock-outline"
            size={40}
            color={'#402F29'}
            style={{alignSelf: 'center'}}
            onPress={() => ShowMode('time')}></Icon>

          
          
          
          <View style={styles.date}>
            <Text style={styles.date_txt}>{texto_tempo}</Text>
          </View>

          
        </View>

        <TouchableOpacity 
          onPress={AdicionarTask}>
            <Text style={styles.botao}> Adicionar</Text>  
        </TouchableOpacity>

        {shown && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}></DateTimePicker>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdicionarTarefa;

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#E6DFD9',
  },
  titulo: {
    color: '#402F29',
    fontSize: 30,
    margin: 20,
    bottom: 10,
  },

  subtitulo: {
    color: '#7A7067',
    fontSize: 25,
    marginLeft: 20,
  },

  descricaoBox: {
    width: '80%',
    height: 120,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#BFB3A8',
    marginBottom: 20,
  },

  descricaoTxt: {
    color: '#402F29',
    padding: 10,
    fontSize: 20,
  },
  date: {
    height: '90%',
    width: '45%',
    alignSelf: 'center',
    alignItems: 'center',
  },

  date_txt: {
    color: '#402F29',
    fontSize: 25,
  },


  botao:{
    height: 50,
    width: 150,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: '#BFB3A8',
    
  }
});
