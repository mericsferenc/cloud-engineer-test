import axios from 'axios';
import { Car } from '../types';

const HOST = "http://localhost:8080/api"

// TODO: API request functions


export const getAllCars = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${HOST}/cars`,
    });

    return res;
  } catch (err: any) {
    throw new Error(err.response?.data.message);
  }
};

export const createCar = async (car: Car) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${HOST}/cars`,
      data: car
    });

    return res;
  } catch (err: any) {
    throw new Error(err.response?.data.message);
  }
};

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