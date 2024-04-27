import React from 'react';
import logo from '../../Components/Assets/logo-large.png';
import { Link } from 'react-router-dom';

export const index = () => {
    return (
        <>
            <div className='h-full w-full'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <img src={logo} alt='logo' />
                        <p className='text-text kalam-bold text-[200px]'>meast</p>
                    </div>
                    <p className=''>Future of pain managements. Way towards a better life.</p>
                    <div className='flex flex-row'>
                        <Link to='' className='bg-black text-white'>BOOK MODULE</Link>
                        <Link to='' className='bg-black text-white'>CONTACT US</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index