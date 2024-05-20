import React, { useState } from 'react';
import logo from '../../Assets/logo-large.png';
import logo_lg from '../../Assets/logo-xl.png';

import './style.css'
import { Link } from 'react-router-dom';

const Index = () => {
    const [error, setError] = useState("");

    function handle_submit(event) {
        let data = new FormData(event.target);
    }

    return (
        <main className='h-screen p-40 bg-[#91C28D99] flex justify-center items-center'>
            <div className='h-[740px] w-[1330px] bg-[#91C28D] rounded-[50px] container flex flex-row items-center'>
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
                    <form onSubmit={handle_submit} className='mt-12'>
                        <div className='flex flex-col gap-1 mb-4'>
                            <label htmlFor='email' className='poppins-semibold text-sm text-[#767676] ml-1'>Email Address:</label>
                            <input type='email' id='email' name='email' required className='w-[500px] h-[56px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='abcdefg@gmail.com'></input>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='password' className='poppins-semibold text-sm text-[#767676] ml-1'>Password:</label>
                            <input type='password' id='password' name='password' required className='w-[500px] h-[56px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●'></input>
                        </div>
                        <div className='flex w-[500px] justify-between mt-6'>
                            <div className='flex flex-row gap-1 items-center'>
                                <input type='checkbox' id='remember-checkbox' className='h-4 w-4 rounded-none accent-[#669162]' />
                                <label htmlFor='remember-checkbox' className='poppins-semibold text-sm text-[#669162]'>Remember me</label>
                            </div>
                            <Link to='' className='poppins-semibold text-sm text-[#669162]'>Forgot Password?</Link>
                        </div>
                        <div className='flex justify-center items-center'>
                            <button className='w-[500px] h-[60px] rounded-[30px] bg-[#669162] text-white poppins-semibold text-lg hover:scale-105 duration-200 mt-6'>SIGN UP</button>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='poppins-semibold text-[#767676] text-[15px] gap-1 mt-16'>Don't have an account? <Link to='/signup/' className='text-[#669162] hover:scale-105 duration-200'>Sign Up</Link></p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='poppins-semibold text-red-500'>{error}</p>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Index