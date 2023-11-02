import { Box, Button, Center, FormControl, useToast } from "native-base";
import React, { useState } from "react";

import { InputBase } from "../InputBase";
import { Controller, useForm } from "react-hook-form";
import { TextAreaBase } from "../TextAreaBase";
import { ActivityIndicator } from "react-native";
import { CommunityData } from "../../interfaces/IDadosColetados";
import { IDataHandler } from "../../interfaces/IDataHandle";
import { useRoute } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { coletaAPI } from "../../api/coletaAPI";

export default function FormBasicColetaDados() {
  const [isLoading, setIsLoading] = useState(false)

  const defaultValue = { "key": 1, "value": "Napra" }
  const [fontes, setFontes] = useState(defaultValue)
  const [categorias, setCategorias] = useState(defaultValue)

  const toast = useToast()

  const [selected, setSelected] = useState([]);

  const textos = useRoute()?.params as unknown as Readonly<
    IDataHandler<CommunityData> | undefined
  >;

  const validationSchema = yup.object<CommunityData>({
    descricao: yup.string().required("Informe a descrição do texto."),
    nome: yup.string().required("Informe o nome da fonte."),
    url: yup.string().url().required("Informe a URL da fonte."),
  });

  const {
    control,
    handleSubmit,
  } = useForm<CommunityData>({
  });

  async function handleRegisterTexto(data: CommunityData) {
    setIsLoading(true);
    console.log(data)
    try {
      await textos?.trigger({
        ...data,
        comunidadeId: 2,
      });
      toast.show({
        title: "Feito !",
        placement: "bottom",
      });
    } catch (e) {
      toast.show({
        title: "Ops !",
        placement: "bottom",
      });
    }
    setIsLoading(false);
  }

  async function getFontesInformacao() {
    if (fontes == defaultValue) {
      const response = await coletaAPI.get('/fontes-informacao')
      const json = response.data.map(item => { return { "key": item.id, "value": item.nome } })
      // __AUTO_GENERATED_PRINT_VAR_START__
      console.log("FormBasicColetaDados#getFontesInformacao#if json: %s", json); // __AUTO_GENERATED_PRINT_VAR_END__
      setFontes(json)
    }
  }

  async function getCategorias() {
    if (categorias == defaultValue) {
      const response = await coletaAPI.get('/categorias')
      const json = response.data.map(item => { return { "key": item.id, "value": item.descricao } })
      // __AUTO_GENERATED_PRINT_VAR_START__
      console.log("FormBasicColetaDados#getCategorias#if json: %s", json); // __AUTO_GENERATED_PRINT_VAR_END__
      setCategorias(json)
    }
  }

  getFontesInformacao()
  getCategorias()

  return (
    <Box w={"100%"} padding={4}>
      <FormControl>
        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange } }) => (
            <TextAreaBase
              h={"32"}
              paddingBottom={15}
              marginBottom={15}
              numberOfLines={5}
              onChangeText={onChange}
              label="Descrição básica"
              placeholder="Informações coletadas"
            />
          )}
        />
        <MultipleSelectList
          setSelected={(val) => setSelected(val)}
          data={fontes}
          searchPlaceholder="Buscar"
          placeholder="Selecionar Fonte de Informação"
          fontFamily="lilita-one"
          save="value"
          onSelect={() => {
            alert(selected)
            setFontes(defaultValue)
          }}
          label="Selecionados"
        />
        <MultipleSelectList
          setSelected={(val) => setSelected(val)}
          data={categorias}
          searchPlaceholder="Buscar"
          placeholder="Selecionar Assuntos"
          fontFamily="lilita-one"
          save="value"
          onSelect={() => {
            alert(selected)
            setCategorias(defaultValue)
          }}
          label="Selecionados"
        />
        <Button
          size="lg"
          backgroundColor={"dark.300"}
          onPress={handleSubmit(handleRegisterTexto)}
          fontSize={18}
          padding={4}
          borderRadius={32}
          mt={4}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#f0f00bd3" />
          ) : (
            "Adicionar Texto"
          )}
        </Button>
      </FormControl>
    </Box>
  );
}
