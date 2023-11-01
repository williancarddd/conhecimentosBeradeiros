import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IDataHandler } from "./IDataHandle";
import { IComunidade } from "./IComunidades";

export type RootStackParamsList = {
  AreaComunidade: undefined;
  ComunidadeDetails: IDataHandler<IComunidade>;
  ColetaDadosDetails: undefined;
};

export type StackType = NativeStackNavigationProp<
  RootStackParamsList,
  "ComunidadeDetails"
>;
