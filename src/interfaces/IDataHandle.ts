export interface IDataHandler<T> {
  data: T;
  trigger: (data: T) => void;
}
