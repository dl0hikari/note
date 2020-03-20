import qs from 'qs';
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export function createRequest(getConfig: () => AxiosRequestConfig) {
    const axiosInstance = axios.create();
    const get = <T>(url: string, config?: AxiosRequestConfig) => sendRequest<T>({ ...getConfig(), ...config, url, method: 'get' }, axiosInstance);
    const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => sendRequest<T>({ ...getConfig(), ...config, url, data, method: 'post' }, axiosInstance);
}

export function sendRequest<T>(config: AxiosRequestConfig, axiosInstance: AxiosInstance) {
    return axiosInstance.request<T>(config).then(response => response.data);
}
