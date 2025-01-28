"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import ResetPassword from '../_components/resetPassword/ResetPassword';

const Page = () => {
    const searchParams = useSearchParams();

  const id = searchParams.get('id'); 
  const token = searchParams.get('token');
  console.log(id, token);
  
    return (
        <>
            <ResetPassword/>
        </>
    );
};

export default Page;