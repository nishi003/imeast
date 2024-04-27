import React from 'react'
import logo from '../../Components/Assets/logo-large.png';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className='w-full h-full flex flex-col align-middle'>
            <div className='flex flex-row items-baseline gap-4 justify-center'>
                <img src={logo} alt='logo' className='w-[43.36px] h-[136.04px]' />
                <p className='text-text kalam-bold text-[200px]'>meast</p>
            </div>
            <div className='flex justify-center mt-[-45px]'>
                <p className='poppins-regular text-text text-3xl'>Future of pain managements. Way towards a better life.</p>
            </div>
            <div className='flex flex-row gap-9 justify-center pt-[60px]'>
                <Link to='' className='bg-text text-white w-[340px] h-[60px] text-center flex justify-center items-center rounded-[30px] text-xl poppins-semibold hover:scale-105 duration-200'>BOOK MODULE</Link>
                <Link to='' className='bg-text text-white w-[340px] h-[60px] text-center flex justify-center items-center rounded-[30px] text-xl poppins-semibold hover:scale-105 duration-200'>CONTACT US</Link>
            </div>
        </div>
    )
}

export default Index