export type Nullable<T> = T | null;

export type NullableProps<T> = {
  [K in keyof T]: Nullable<T[K]>;
};

export type NullableWithProps<T> = Nullable<NullableProps<T>>;
