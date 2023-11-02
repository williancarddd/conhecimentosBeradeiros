import React, { useState } from "react";
import {
  FormControl,
  View,
  Button,
  ScrollView,
  Text,
  IconButton,
  Box,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { IComunidade } from "../../interfaces/IComunidades";
import { InputBase } from "../InputBase";
import { ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { TextAreaBase } from "../TextAreaBase";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IDataHandler } from "../../interfaces/IDataHandle";
import { StackType } from "../../interfaces/TStack";
import MultiSelectExample from "../MultiSelectBase";
import { FormAssuntoComunidade } from "../FormAssuntoComunidade";
import MultiSelectBase from "../MultiSelectBase";

const validationSchema = yup.object<IComunidade>({
  nome: yup.string().required("Informe o nome da comunidade."),
  descricao: yup
    .string()
    .required("Descrição breve da comunidade.")
    .max(200, "No máximo 200 caracteres."),
});

export function FormBasicComunidade() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalAssunto, setModalAssunto] = useState(false);
  const [modalFonte, setModalFonte] = useState(false);
  const toast = useToast();
  const { navigate } = useNavigation<StackType>();
  const comunidade = useRoute()?.params as unknown as Readonly<
    IDataHandler<IComunidade> | undefined
  >;
  // __AUTO_GENERATED_PRINT_VAR_START__
  console.log("FormBasicComunidade comunidade?.data: %s", comunidade?.data); // __AUTO_GENERATED_PRINT_VAR_END__
  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues },
    getValues,
  } = useForm<IComunidade>({
    resolver: yupResolver(validationSchema),
    defaultValues: comunidade?.data ?? {
      descricao: "",
      latitude: "",
      longitude: "",
      populacao: 0,
      nome: undefined,
      id: undefined,
    },
  });
  async function handleRegisterComunidade(data: IComunidade) {
    setIsLoading(true);
    try {
      await comunidade?.trigger({
        ...data,
        populacao: Number(data?.populacao),
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
  async function handleChangeScreenDataColetaDetais() {
    const data = getValues();
    navigate("ColetaDadosDetails");
  }
  return (
    <Box width={"96"}>
      <ScrollView>
        <View>
          <FormControl>
            <Controller
              control={control}
              name="nome"
              render={({ field: { onChange } }) => (
                <InputBase
                  error={errors.nome?.message}
                  label="Nome da Comunidade"
                  onChangeText={onChange}
                  defaultValue={defaultValues?.nome}
                  inputMode="text"
                />
              )}
            />
            <Controller
              control={control}
              name="descricao"
              render={({ field: { onChange } }) => (
                <TextAreaBase
                  h={"32"}
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
        <KeyboardAvoidingView behavior="padding">
          <View mt={4}>
            <FormControl paddingBottom={2}>
              <Controller
                control={control}
                name="latitude"
                render={({ field: { onChange } }) => (
                  <InputBase
                    label="Latitude"
                    defaultValue={defaultValues?.latitude}
                    error={errors.latitude?.message}
                    onChangeText={onChange}
                    textContentType="location"
                    inputMode="decimal"
                  />
                )}
              />
              <Controller
                control={control}
                name="longitude"
                render={({ field: { onChange } }) => (
                  <InputBase
                    label="longitude"
                    defaultValue={defaultValues?.longitude}
                    error={errors.longitude?.message}
                    onChangeText={onChange}
                    inputMode="decimal"
                  />
                )}
              />
              <Controller
                control={control}
                name="populacao"
                render={({ field: { onChange } }) => (
                  <InputBase
                    label="População"
                    defaultValue={
                      String(defaultValues?.populacao) === undefined
                        ? ""
                        : String(defaultValues?.populacao)
                    }
                    error={errors.populacao?.message}
                    onChangeText={onChange}
                    inputMode="numeric"
                  />
                )}
              />
            </FormControl>
          </View>
        </KeyboardAvoidingView>
        <View
          borderBottomWidth={1}
          borderBottomColor={"gray.200"}
          mt={2}
          mb={24}
        >
          <Button
            size="lg"
            backgroundColor={"dark.300"}
            onPress={handleSubmit(handleRegisterComunidade)}
            fontSize={18}
            padding={4}
            borderRadius={32}
            mt={4}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="#f0f00bd3" />
            ) : comunidade?.mode !== "edit" ? (
              "Adicionar comunidade"
            ) : (
              "Atualizar comunidade"
            )}
          </Button>
          {comunidade?.data?.id ? (
            <>
              <Button
                size="lg"
                backgroundColor={"dark.300"}
                onPress={() => {
                  setModalFonte(!modalFonte);
                }}
                fontSize={18}
                padding={4}
                borderRadius={32}
                mt={4}
              >
                Adicionar Fontes de Informação
              </Button>
              <Button
                size="lg"
                backgroundColor={"dark.300"}
                onPress={() => {
                  setModalAssunto(!modalAssunto);
                }}
                fontSize={18}
                padding={4}
                borderRadius={32}
                mt={4}
              >
                Assuntos
              </Button>
              <FormAssuntoComunidade
                setShowModal={setModalAssunto}
                showModal={modalAssunto}
                dynamicContent={<MultiSelectBase />}
              />
              <FormAssuntoComunidade
                setShowModal={setModalFonte}
                showModal={modalFonte}
                dynamicContent={<MultiSelectBase />}
              />
            </>
          ) : null}
        </View>
        {comunidade?.mode !== "edit" ? null : (
          <View mt={2}>
            <Text fontSize={"2xl"} fontFamily={"lilita-one"} bold>
              Coleta da {comunidade?.data?.nome}
            </Text>
            <IconButton
              size={16}
              borderRadius={32}
              variant="solid"
              alignSelf={"flex-end"}
              justifyContent={"center"}
              alignContent={"center"}
              icon={<Ionicons name="add" size={36} color="white" />}
              onPress={handleChangeScreenDataColetaDetais}
            />
          </View>
        )}
      </ScrollView>
    </Box>
  );
}
