import { Box, Button, Center, FormControl, useToast } from "native-base";

import React, { useEffect, useState } from "react";
import { InputBase } from "../InputBase";
import { Controller, useForm } from "react-hook-form";
import { TextAreaBase } from "../TextAreaBase";
import { ActivityIndicator } from "react-native";
import { CommunityData } from "../../interfaces/IDadosColetados";
import { IDataHandler } from "../../interfaces/IDataHandle";
import { useIsFocused, useRoute } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { coletaAPI } from "../../api/coletaAPI";

export default function FormBasicColetaDados() {
  const [isLoading, setIsLoading] = useState(false)

  const isFocused = useIsFocused();

  const defaultValue = { "key": 1, "value": "Napra" }
  const [fontes, setFontes] = useState(defaultValue)
  const [categorias, setCategorias] = useState(defaultValue)

  const [fonteSelected, setFonteSelected] = useState("")
  const [categoriaSelected, setCategoriaSelected] = useState("")

  const toast = useToast()

  const textos = useRoute()?.params as unknown as Readonly<
    IDataHandler<CommunityData> | undefined
  >;

  const {
    control,
    handleSubmit,
  } = useForm<CommunityData>({
  });

  async function handleRegisterTexto(data: CommunityData) {
    setIsLoading(true);
    const comunidadeNazare = 1;
    const response = await coletaAPI.post("/textos-coletados", {
      descricao: data.descricao,
      comunidadeId: comunidadeNazare,
      fonteId: Number(fonteSelected),
    });
    const json = await response.data;
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.log("FormBasicColetaDados#handleRegisterTexto json: %s", json); // __AUTO_GENERATED_PRINT_VAR_END__
    setIsLoading(false);
    return json;
  }

  async function getFontesInformacao() {
    const response = await coletaAPI.get('/fontes-informacao')
    const json = response.data.map(item => { return { "key": item.id, "value": item.nome } })
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.log("FormBasicColetaDados#getFontesInformacao#if json: %s", json); // __AUTO_GENERATED_PRINT_VAR_END__
    setFontes(json)
  }

  async function getCategorias() {
    const response = await coletaAPI.get('/categorias')
    const json = response.data.map(item => { return { "key": item.id, "value": item.descricao } })
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.log("FormBasicColetaDados#getCategorias#if json: %s", json); // __AUTO_GENERATED_PRINT_VAR_END__
    setCategorias(json)
  }

  useEffect(() => {
    if (isFocused) {
      getFontesInformacao()
    }
  }, [isFocused])

  useEffect(() => {
    if (isFocused) {
      getCategorias()
    }
  }, [isFocused])

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
          setSelected={(val) => setFonteSelected(val)}
          data={fontes}
          searchPlaceholder="Buscar"
          placeholder="Selecionar Fonte de Informação"
          fontFamily="lilita-one"
          save="key"
          label="Selecionados"
        />
        <MultipleSelectList
          setSelected={(val) => setCategoriaSelected(val)}
          data={categorias}
          searchPlaceholder="Buscar"
          placeholder="Selecionar Assuntos"
          fontFamily="lilita-one"
          save="key"
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
