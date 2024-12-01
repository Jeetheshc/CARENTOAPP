import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'

export const Cars = () => {

  const [cars, setCars] = useState([])

  const fetchcars = async () => {

    const response = await axiosInstance({
      url: "/car/cars",
    });
    console.log('cars:', cars);
    setCars(response?.data?.data);
  }

  useEffect(() => {
    fetchcars()
  }, [])
  return (
    <div>Cars1</div>
  )
}
