import { Button } from 'native-base';
import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { InputBase } from '../InputBase';
import { coletaAPI } from '../../api/coletaAPI';
import { ICategoria } from '../../interfaces/ICategoria';

interface Props {
  id_get: number;
}
export default function MultiSelectBase() {

  const [selected, setSelected] = React.useState([]);

  function handleFormatData( ) {}
  function handleGetDataItems() {
    try {
      const data = coletaAPI.get<ICategoria[]>('/categorias')
    } catch(err) {}
  }

  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]

  return (
    <>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        searchPlaceholder='Buscar'
        placeholder='Selecionar opções'
        fontFamily='lilita-one'
        save="value"
        onSelect={() => alert(selected)}
        label="Selecionados"
      />
      <InputBase
        label="Nome do Item"

        inputMode="numeric"
      />
      <Button
        size="lg"
        backgroundColor={'dark.300'}

        fontSize={18}
        padding={4}
        borderRadius={32}
        mt={4}>
        Adicionar categoria
      </Button>
    </>
  )

};