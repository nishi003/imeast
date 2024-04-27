import React from 'react';
import Navbar from '../../Components/Navbar';
import logo from '../../Components/Assets/logo-large.png';
import { Link } from 'react-router-dom';

import './style.css';

export const index = () => {
    return (
        <>
            <Navbar />
            <div className='h-full w-full'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <img src={logo} alt='logo' />
                        <p className='text-text kalam-bold'>meast</p>
                    </div>
                    <p className=''>Future of pain managements. Way towards a better life.</p>
                    <div className='flex flex-row'>
                        <Link to='' className>what</Link>
                        <Link to='' className></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index