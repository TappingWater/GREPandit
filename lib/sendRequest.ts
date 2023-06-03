import axios, { AxiosRequestConfig, Method } from 'axios';
import https from 'https';

const agent = new https.Agent({  
  rejectUnauthorized: false
});

// Set a default base URL for axios
axios.defaults.baseURL = process.env.API_BASE_URL;

export interface IRequestOptions {
  method: Method;
  url: string;
  data?: any;
  params?: any;
  headers?: any;
}

export const sendRequest = async (options: IRequestOptions) => {
  const requestOptions: AxiosRequestConfig = {
    method: options.method,
    url: options.url,
    data: options.data,
    params: options.params,
    headers: options.headers,
    httpsAgent: agent,
  };
  try {
    const response = await axios(requestOptions);
    return response;
  } catch (error) {
    console.error(`Error sending request to ${options.url}:`, error);
    throw error;
  }
};
