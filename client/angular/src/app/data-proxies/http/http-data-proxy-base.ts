import { Entity } from '../../contracts';
import { IDataProxy } from 'peasy-js';
import axios from 'axios';

export abstract class HttpDataProxy<T extends Entity> implements IDataProxy<T, string> {

  protected abstract baseUri: string;

  getAll(): Promise<T[]> {
    return axios.get(this.baseUri).then(result => result.data);
  }

  getById(id: string): Promise<T> {
    return axios.get(`${this.baseUri}/${id}`).then(result => result.data);
  }

  insert(data: T): Promise<T> {
    return axios.post(this.baseUri, data).then(result => result.data);
  }

  update(data: T): Promise<T> {
    return axios.put(`${this.baseUri}/${data.id}`, data).then(result => result.data);
  }

  destroy(id: string): Promise<void> {
    return axios.delete(`${this.baseUri}/${id}`).then(result => result.data);
  }
}

