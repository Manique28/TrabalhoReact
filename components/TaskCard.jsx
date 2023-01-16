import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

const TaskCard = ({titulo, done, descricao, data, id}) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={styles.principal}
      onPress={() => {
        nav.navigate('DetalhesTarefa', {titulo, done, descricao, data, id});
      }}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View
        style={{
          marginHorizontal: 10,
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#7A7067',
            fontSize: 15,
          }}>
          Concluido:
        </Text>
        <BouncyCheckbox
          isChecked={done}
          disableBuiltInState
          fillColor="#7A7067"
          disableText
          style={{marginTop: 10}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  principal: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 80,
    backgroundColor: '#BFB3A8',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titulo: {
    padding: 20,
    color: '#7A7067',
  },
});
