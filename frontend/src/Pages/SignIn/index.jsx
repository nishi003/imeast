import React from 'react';
import background from '../../Assets/signup-bg.png'
import logo from '../../Assets/logo-large.png';
import logo_lg from '../../Assets/logo-xl.png';

import './style.css'
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <div className='relative h-screen w-full flex justify-center items-center'>
            <img src={background} alt='bg' className='absolute inset-0 object-cover w-full h-full z-0' />
            <div className='h-[740px] w-[1330px] bg-[#91C28D] z-10 rounded-[50px] container flex flex-row items-center'>
                <div className='w-1/2 h-full flex items-center justify-center flex-col'>
                    <div className='flex flex-row justify-center items-baseline gap-4 logo-part'>
                        <img src={logo_lg} alt='lg-logo' className='w-[31px] h-[96px]' />
                        <p className='kalam-bold text-white text-[130px] text-shadow'>meast</p>
                    </div>
                    <div className='flex flex-col gap-1 items-center justify-center mt-[-20px]'>
                        <p className='poppins-bold text-2xl text-white'>Painless life starts here.</p>
                        <p className='poppins-bold text-2xl text-white'>Learn to live a better life.</p>
                    </div>
                </div>
                <div className='h-full w-1/2 bg-white rounded-[50px] flex flex-col justify-center items-center'>
                    <div className='flex flex-row items-baseline gap-3'>
                        <img src={logo} alt='logo' className='h-[21px] w-[7px]' />
                        <p className='poppins-semibold text-text text-[30px]'>USER SIGN IN</p>
                    </div>
                    <div className='flex flex-col gap-4 mt-12'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='email' className='poppins-semibold text-sm text-[#767676] ml-1'>Email Address:</label>
                            <input type='email' id='email' required className='w-[500px] h-[56px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='abcdefg@gmail.com'></input>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='password' className='poppins-semibold text-sm text-[#767676] ml-1'>Password:</label>
                            <input type='password' id='password' required className='w-[500px] h-[56px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●'></input>
                        </div>
                    </div>
                    <button className='w-[500px] h-[60px] rounded-[30px] bg-[#669162] text-white poppins-semibold text-lg hover:scale-105 duration-200 mt-8'>SIGN UP</button>
                    <p className='poppins-semibold text-[#767676] text-[15px] flex gap-1 mt-10'>Don't have an account? <Link to='/signup/' className='text-[#669162] hover:scale-105 duration-200'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Index