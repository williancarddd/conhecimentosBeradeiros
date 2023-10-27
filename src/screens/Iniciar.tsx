import React, { useState } from 'react';
import { Text, Alert, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import SvgLogo from '../components/SvgLogo'
interface IniciarProps {
  navigation: BottomTabNavigationProp<Record<string, object | undefined>, string>;
}


export default function Iniciar({ navigation }: IniciarProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onHandleLogin = () => {
    if (email === '' && password === '') {
      console.log('logado');
      navigation.navigate('Conhecer')
    } else {
      Alert.alert('Erro ao logar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          Conhecimentos Beradeiros
      </Text>
      <View />
      <SafeAreaView style={styles.form}>
        
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}  >
          <Image
            source={require('../../assets/boat.png')}
            style={
              {
                width: 96,
                height: 96
              }
            }
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    alignSelf: 'center',
    paddingBottom: 24,
    fontFamily: 'Lilita One'
  },
  input: {
    backgroundColor: '#f6f7f8',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 252,
    marginHorizontal: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:54,
  }
});
