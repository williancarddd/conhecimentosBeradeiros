import React from "react";
import { FormControl, View, Button, ScrollView, Text, IconButton } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { IComunidade } from "../../interfaces/IComunidades";
import { InputBase } from "../InputBase";
import { TouchableOpacity } from "react-native";
import { TextAreaBase } from "../TextAreaBase";
import { useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

const validationSchema = yup.object({
  nome: yup.string().required('Informe o nome da comunidade.'),
  populacao: yup.string(),
  descricao: yup.string()
    .required('Descrição breve da comunidade.')
    .max(200, 'No máximo 200 caracteres.'),
    latitude: yup.string()
    .test('has-comma', 'Latitude deve conter uma vírgula', (value) => {
      if (typeof value !== 'undefined' && value !== null) {
        return value.includes(',');
      }
      return true;
    }),
  longitude: yup.string()
    .test('has-comma', 'Longitude deve conter uma vírgula', (value) => {
      if (typeof value !== 'undefined' && value !== null) {
        return value.includes(',');
      }
      return true;
    }),
});


export function FormBasicComunidade() {
  const comunidade: Readonly<IComunidade | undefined> = useRoute()?.params;
  const { control, handleSubmit, 
    formState: {
      errors,
      
    } } = useForm<IComunidade>({
      resolver: yupResolver(validationSchema)
    });
  function handleRegisterComunidade(data: IComunidade) {
    console.log(data);
  };
  return (
    <ScrollView w={'100%'} mb={4} >
      <View >
        <FormControl>
          <Controller
            control={control}
            name='nome'
            render={({ field: { onChange } }) => (
              <InputBase
                error={errors.nome?.message}
                label="Nome da Comunidade"
                onChangeText={onChange}
                inputMode="text" />
            )}
          />
          <Controller
            control={control}
            name='descricao'
          
            render={({ field: { onChange } }) => (
              <TextAreaBase
                h={'32'}
                numberOfLines={5}
                onChangeText={onChange}
                error={errors.descricao?.message}
                label="Descrição básica"
                placeholder="Digite uma breve descrição da comunidade"
              />
            )}
          />
        </FormControl>
      </View>
      <View w={'100%'} mt={4}>
        <FormControl paddingBottom={2}>
          <Controller
            control={control}
            name='latitude'
      
            render={({ field: { onChange } }) => (
              <InputBase
                label="Latitude"
                error={errors.latitude?.message}
                onChangeText={onChange}
                inputMode="text" />
            )}
          />
          <Controller
            control={control}
            name='longitude'
            render={({ field: { onChange } }) => (
              <InputBase
                label="longitude"
                error={errors.longitude?.message}
                onChangeText={onChange}
                inputMode="text" />
            )}
          />
          <Controller
            control={control}
            name='populacao'
            render={({ field: { onChange } }) => (
              <InputBase
                label="População"
                error={errors.populacao?.message}
                onChangeText={onChange}
                inputMode="text" />
            )}
          />
        </FormControl>
      </View>
      <View borderBottomWidth={1} borderBottomColor={'gray.200'} mt={2} padding={4} width={'100%'}>
        <TouchableOpacity >
          <Button size="lg" backgroundColor={'dark.300'} onPress={handleSubmit(handleRegisterComunidade)} fontSize={18} padding={4} borderRadius={32} mt={4}  >
            Criar Comunidade
          </Button>
        </TouchableOpacity>
      </View>
      <View flex={1} mt={2} justifyContent={'center'} justifyItems={'center'}>
        <Text fontSize={'2xl'} fontFamily={'lilita-one'} bold >
          Dados Coletados da Comunidade
        </Text>
        <IconButton size={16} borderRadius={32} variant="solid" alignSelf={'flex-end'} justifyContent={'center'} alignContent={'center'} icon={<Ionicons name="add" size={36} color="white" />} />
      </View>
    </ScrollView>
  );
};