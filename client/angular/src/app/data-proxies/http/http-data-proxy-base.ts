import { Entity } from '../../contracts';
import { IDataProxy, ServiceException } from 'peasy-js';
import axios from 'axios';

export abstract class HttpDataProxy<T extends Entity> implements IDataProxy<T, string> {

  private httpStatusCodes = {
    BAD_REQUEST: 400,
    CONFLICT: 409,
    NOT_FOUND: 404,
    NOT_IMPLEMENTED: 501
  };

  protected abstract baseUri: string;

  getAll(): Promise<T[]> {
    return axios.get(this.baseUri).then(result => result.data);
  }

  getById(id: string): Promise<T> {
    return axios.get(`${this.baseUri}/${id}`).then(result => result.data);
  }

  protected async getAllById(url: string): Promise<T[]> {
    try {
      const data = await axios.get(url).then(result => result.data);
      return data;
    } catch (err) {
      if (err.response && err.response.status === this.httpStatusCodes.NOT_FOUND) {
        return [];
      }
      throw err;
    }
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

