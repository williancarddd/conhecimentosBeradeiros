import { AxiosResponse } from "axios";

export interface IDataHandler<T> {
  data: T;
  trigger: (data: T) => Promise<AxiosResponse<T, any>>;
  mode: "edit" | "create" | "no";
}
