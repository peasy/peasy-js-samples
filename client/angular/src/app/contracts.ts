export interface Entity {
  id: string;
}

export interface Customer extends Entity {
  name: string;
}

export interface Category extends Entity {
  name: string;
}

export interface Error {
  association: string;
  message: string;
}

export interface ExecutionResult<T> {
  success: boolean;
  errors: Error[];
  value: T;
}
