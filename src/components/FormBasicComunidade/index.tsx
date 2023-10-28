import React, { useState } from "react";
import { FormControl, View, Button, ScrollView, Text, IconButton } from "native-base";
import { Ionicons } from '@expo/vector-icons';
import { IComunidade } from "../../interfaces/IComunidades";
import { InputBase } from "../InputBase";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { TextAreaBase } from "../TextAreaBase";
import { useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { IDataHandler } from "../../interfaces/IDataHandle";

const validationSchema = yup.object({
  nome: yup.string().required('Informe o nome da comunidade.'),
  descricao: yup.string()
    .required('Descrição breve da comunidade.')
    .max(200, 'No máximo 200 caracteres.'),
});


export function FormBasicComunidade() {
  const [isLoading, setIsLoading] = useState(false);
  const comunidade = useRoute()?.params as unknown as Readonly<IDataHandler<IComunidade> | undefined>;
  console.log(comunidade?.data)
  const { control, handleSubmit,
    formState: {
      errors,
      defaultValues,
    } } = useForm<IComunidade>({
      resolver: yupResolver(validationSchema),
      defaultValues: comunidade?.data ?? {
        descricao: '',
        latitude: '',
        longitude: '',
        populacao: 0,
        nome: undefined,
        id: undefined
      },
    });
  async function handleRegisterComunidade(data: IComunidade) {

    setIsLoading(true);
    await comunidade?.trigger({
      ...data,
      populacao: Number(data?.populacao),
      //@ts-ignore
      latitude: Number(data.latitude?.replace(",", '.')),
      //@ts-ignore
      longitude: Number(data.longitude?.replace(",", '.'))
    })
    setIsLoading(false)
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
                defaultValue={defaultValues?.nome}
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
                defaultValue={defaultValues?.descricao}
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
                defaultValue={String(defaultValues?.latitude)}
                error={errors.latitude?.message}
                onChangeText={onChange}
                inputMode="decimal" />
            )}
          />
          <Controller
            control={control}
            name='longitude'
            render={({ field: { onChange } }) => (
              <InputBase
                label="longitude"
                defaultValue={String(defaultValues?.longitude)}
                error={errors.longitude?.message}
                onChangeText={onChange}
                inputMode="decimal" />
            )}
          />
          <Controller
            control={control}
            name='populacao'
            render={({ field: { onChange } }) => (
              <InputBase
                label="População"
                defaultValue={String(defaultValues?.populacao) === undefined ? '' : String(defaultValues?.populacao)}
                error={errors.populacao?.message}
                onChangeText={onChange}
                inputMode="numeric"
              />
            )}
          />
        </FormControl>
      </View>
      <View borderBottomWidth={1} borderBottomColor={'gray.200'} mt={2} padding={4} width={'100%'}>

        <Button size="lg" backgroundColor={'dark.300'} onPress={handleSubmit(handleRegisterComunidade)} fontSize={18} padding={4} borderRadius={32} mt={4}  >
          {
            isLoading ?
              <ActivityIndicator size="large" color="#f0f00bd3" />
              :
              comunidade?.mode !== 'edit' ? 'Adicionar comunidade' : 'Atualizar comunidade'
          }
        </Button>

      </View>
      {
        comunidade?.mode !== 'edit' ? null : (
          <View mt={2} w={'96'}>
            <Text fontSize={'2xl'} fontFamily={'lilita-one'} bold  >
              Coleta da  {comunidade?.data?.nome}
            </Text>
            <IconButton size={16} borderRadius={32} variant="solid" alignSelf={'flex-end'} justifyContent={'center'} alignContent={'center'} icon={<Ionicons name="add" size={36} color="white" />} />
          </View>
        )
      }
    </ScrollView>
  );
};