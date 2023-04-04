import axios from 'axios';

const HOST = "http://localhost:8080/api"

// TODO: API request functions

export const getAllCars = () => {};

export const createCar = () => {};

export const updateCar = () => {};

export const removeCar = () => {};

export const validateKey = async (secretKey: string) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${HOST}/auth/validate`,
        data: { secretKey }
      });

      localStorage.setItem('validated', res.data)
  
      return res;
    } catch (err: any) {
      throw new Error(err.response?.data.message);
    }
  };