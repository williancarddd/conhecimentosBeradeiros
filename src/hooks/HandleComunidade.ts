import { coletaAPI } from "../api/coletaAPI";
import { IComunidade } from "../interfaces/IComunidades";

export default function useHandleComunidade() {
  function editComunidade(item: IComunidade) {
    return  coletaAPI.put<IComunidade>(`/comunidades/${item?.id}`, item);
  }

  function createComunidade(item: IComunidade) {
    return coletaAPI.post('/comunidades', item)
  }

  return {
    editComunidade,
    createComunidade
  }
}