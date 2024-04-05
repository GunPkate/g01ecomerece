import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Product(){

    const contentBodyStyle = 'min-h-[90vh]'
    return <>
        <Navbar/>
        <div  className={ contentBodyStyle }>
            <div className="mx-[160px] mt-[160px] lg:flex justify-between">
            <div className="block w-[280px] mr-[30px]">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
            <div className="w-full">
                <Outlet/>
            </div>
        </div>
        </div>
      <Footer/>
    </>
}