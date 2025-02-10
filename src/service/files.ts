import axios from 'axios';
import { FileInfo } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/files'
});

export const getFiles = (): Promise<FileInfo[]> => {
  return new Promise((resolve, reject) => {
    api.get('/')
     .then(response => resolve(response.data))
     .catch(error => reject(error));
  });
} 

export const uploadFile = (formData: FormData): Promise<FileInfo> => {

  return new Promise<any>((resolve, reject) => {
    api.post('/upload', formData)
     .then(response => resolve(response.data))
     .catch(error => reject(error));
  })
}

export const getFile= (fileId: string, type: any): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    api.get(`/${fileId}`, { responseType: type })
     .then(response => resolve(response.data))
     .catch(error => reject(error));
  })
} 