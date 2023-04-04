import axios from 'axios';

// TODO: API request functions

export const getAllCars = () => {};

export const createCar = () => {};

export const updateCar = () => {};

export const removeCar = () => {};

export const validateKey = async (secretKey: any) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/auth/validate',
        data: secretKey
      });
  
    //   utils.setAxiosAuthToken(res.data.token);
    //   utils.setLocalStorageToken(res.data.token);
  
      return res;
    } catch (err: any) {
      throw new Error(err.response?.data.message);
    }
  };