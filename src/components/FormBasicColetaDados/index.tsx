import {
  Box,
  Center,
  FormControl,
} from "native-base";
import React from "react";

import { InputBase } from "../InputBase";
import { Controller, useForm } from "react-hook-form";
import { TextAreaBase } from "../TextAreaBase";



export default function FormBasicColetaDados() {
  const { control, handleSubmit,
    formState: {
      errors,
      defaultValues,
    }, getValues } = useForm();
  return (
    <Box w={'100%'} padding={4} >
      <FormControl >
        <Controller
          control={control}
          name='descricao'
          render={({ field: { onChange } }) => (
            <TextAreaBase
              h={'32'}
              numberOfLines={5}
              onChangeText={onChange}
              defaultValue={defaultValues?.descricao}

              label="Descrição básica"
              placeholder="Informações coletadas"
            />
          )}
        />
        <Controller
          control={control}
          name='nome'
          render={({ field: { onChange } }) => (
            <InputBase

              label="Nome da fonte"
              onChangeText={onChange}
              defaultValue={defaultValues?.nome}
              inputMode="text" />
          )}
        />
        <Controller
          control={control}
          name='url'
          render={({ field: { onChange } }) => (
            <InputBase
              label="URL da fonte"
              onChangeText={onChange}
              defaultValue={defaultValues?.nome}
              keyboardType="url"
              inputMode="url" />
          )}
        />
      </FormControl>
    </Box>
  );
}
