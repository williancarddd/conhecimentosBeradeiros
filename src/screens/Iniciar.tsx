import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import SvgLogo from '../components/SvgLogo'
interface IniciarProps {
  navigation: DrawerNavigationProp<Record<string, object | undefined>, string>;
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
      <SvgLogo props={{xml: null, style: styles.backIamge}} />
      <View  />
      <SafeAreaView style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 18,
            }}>
            Vamos navegar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingBottom: 24,
  },
  input: {
    backgroundColor: '#f6f7f8',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backIamge: {
    width: '100%',
    position: 'absolute',
    top: 128,
    resizeMode: 'stretch',
  },
  whiteSheet: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    marginTop: 20
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 252,
    marginHorizontal: 40,
  },
  button: {
    backgroundColor: '#2945FF',
    height: 68,
    width: 260,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
    paddingVertical: 16,
    marginTop: 252,
  }
});
