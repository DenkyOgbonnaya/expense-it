import API from './axiosDefaultConfig';

export const handleGetRequest = async <T> (payload:string):Promise<T> => {
  try {
    const {data} = await API.get(payload);
    return data;
  } catch (err) {
    console.log(err, 'ERR');
    throw err;
  }
};

export const handlePostRequest = async <T>(path:string, payload:Object):Promise<T> => {
  try {
    const {data} = await API.post(path, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handlePutRequest = async <T>(path:string, payload:Object): Promise<T> => {
  console.log(path, "PATH")
  try {
    const {data} = await API.put(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handleDeleteRequest = async <T>(payload:string):Promise<T> => {
  try {
    const {data} = await API.delete(`${payload}`);
    return data;
  } catch (err) {
    throw err;
  }
};
