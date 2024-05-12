import React from 'react';
import background from '../../Assets/signin-bg.png'
import logo from '../../Assets/logo-green-sm.png'

import { useState } from 'react';

import './style.css'

const Index = () => {
    const [sectionOne, setSectionOne] = useState(false);
    const [sectionTwo, setSectionTwo] = useState(false);
    const [sectionThree, setSectionThree] = useState(false);

    return (
        <main className='relative h-full pt-36'>
            <div className='w-full flex justify-center items-center'>
                <img src={background} alt='bg' className='absolute inset-0 object-cover w-full h-full z-0' />
                <div className='w-[1330px] h-auto flex flex-row bg-white z-10 rounded-[50px] container p-4'>
                    <div className='w-[800px] h-full bg-[#DEF1DD] flex flex-col rounded-[30px] pl-6 pt-3 pb-5'>
                        <div className='flex flex-row items-baseline gap-1'>
                            <img src={logo} alt='logo' className='w-[10px] h-[31px]' />
                            <p className='kalam-bold text-[40px] text-[#91C28D]'>meast</p>
                        </div>
                        <p className='poppins-semibold text-text text-[40px] mt-4'>Create Account</p>
                        <div className='flex flex-row mt-6 gap-5'>
                            <div className='flex flex-col items-center justify-center'>
                                {sectionOne ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>1</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>1</p>
                                    </div>
                                }
                                <div className='h-[200px] w-0 border border-[#91C28D] ' />
                                {sectionTwo ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>2</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>2</p>
                                    </div>
                                }
                                <div className='h-[200px] w-0 border border-[#91C28D] ' />
                                {sectionThree ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>3</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>3</p>
                                    </div>
                                }
                            </div>
                            <div className='flex flex-col w-full'>
                                <p className='poppins-semibold text-[30px] text-text h-[100px] flex justify-left items-center'>Personal Details</p>
                                <div className='h-[200px]' />
                                <p className='poppins-semibold text-[30px] text-text h-[100px] flex justify-left items-center'>Professional Details</p>
                                <div className='h-[200px]' />
                                <p className='poppins-semibold text-[30px] text-text h-[100px] flex justify-left items-center'>Create Account</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='w-full flex flex-col pl-6 pt-3 invisible'>
                            <div className='flex flex-row items-baseline gap-1'>
                                <img src={logo} alt='logo' className='w-[10px] h-[31px]' />
                                <p className='kalam-bold text-[40px] text-[#91C28D]'>meast</p>
                            </div>
                            <p className='poppins-semibold text-text text-[40px] mt-4'>Create Account</p>
                        </div>
                        <div className='flex flex-col mt-6 pl-5 pr-6'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row'>
                                    <label></label>
                                    <input type='email' id='email' required className='h-[59px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index