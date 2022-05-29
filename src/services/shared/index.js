import API from './axiosDefaultConfig';

export const handleGetRequest = async payload => {
  try {
    const {data} = await API.get(payload);
    return data;
  } catch (err) {
    console.log(err, 'ERR');
    throw err;
  }
};

export const handlePostRequest = async (path, payload) => {
  try {
    const {data} = await API.post(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handlePutRequest = async (path, payload) => {
  try {
    const {data} = await API.post(`${path}`, payload);
    return data;
  } catch (err) {
    throw err;
  }
};
export const handleDeleteRequest = async payload => {
  try {
    const {data} = await API.delete(`${payload}`);
    return data;
  } catch (err) {
    throw err;
  }
};
