import { Button } from "native-base";
import React from "react";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { InputBase } from "../InputBase";
import { coletaAPI } from "../../api/coletaAPI";
import { ICategoria } from "../../interfaces/ICategoria";

interface Props {
  id_get: number;
}
export default function MultiSelectBase() {
  const [selected, setSelected] = React.useState([]);

  function handleFormatData() { }
  function handleGetDataItems() {
    try {
      const data = coletaAPI.get<ICategoria[]>("/categorias");
      // __AUTO_GENERATED_PRINT_VAR_START__
      console.log("MultiSelectBase#handleGetDataItems data: %s", data); // __AUTO_GENERATED_PRINT_VAR_END__
    } catch (err) { }
  }

  const data = [
    { key: "1", value: "Geral" },
    { key: "2", value: "Saúde" },
    { key: "3", value: "Economia" },
    { key: "4", value: "Religião" },
  ];

  handleGetDataItems()

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        searchPlaceholder="Buscar"
        placeholder="Selecionar opções"
        fontFamily="lilita-one"
        save="value"
        onSelect={() => alert(selected)}
        label="Selecionados"
      />
      <InputBase label="Nome do Item" inputMode="numeric" />
      <Button
        size="lg"
        backgroundColor={"dark.300"}
        fontSize={18}
        padding={4}
        borderRadius={32}
        mt={4}
      >
        Adicionar categoria
      </Button>
    </>
  );
}
