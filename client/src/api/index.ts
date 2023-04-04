import axios from 'axios';
import { Car } from '../types';

const HOST = "http://localhost:8080/api"

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

export const updateCar = async (id: number, car: Car) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${HOST}/cars/${id}`,
      data: car
    });

    return res;
  } catch (err: any) {
    throw new Error(err.response?.data.message);
  }
};

export const removeCar = async (id: number) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${HOST}/cars/${id}`,
    });

    return res;
  } catch (err: any) {
    throw new Error(err.response?.data.message);
  }
};

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