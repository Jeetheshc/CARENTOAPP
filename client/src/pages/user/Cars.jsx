import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance'
import { Card } from '../../components/user/Card'
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from '../../components/user/Skelton';

export const Cars = () => {

  const [Cars, isLoading, error ] = useFetch("car/cars");
    console.log('cars===',Cars);
    

    return (
        <div className='flex flex-wrap gap-6 p-4'>
            { isLoading ? (
                <ProductSkelton />
            ) : (
                <>
                    {Cars?.map((value) => (
                        <Card key={value._id} cars={value} />
                    ))}
                </>
            )}
        </div>
    );
};