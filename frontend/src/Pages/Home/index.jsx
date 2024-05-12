import React, { useEffect } from 'react';
import logo from '../../Assets/logo-large.png';
import logo_lg from '../../Assets/logo-xl.png';
import './style.css'
import { Link } from 'react-router-dom';

export const Index = () => {
    return (
        <body>
            <main>
                <div className='h-screen overflow-y-scroll scroll-snap-y'>
                    <section className='w-full h-screen flex flex-col items-center justify-center'>
                        <div className='flex flex-row items-baseline gap-4 justify-center mt-[-90px] z-10'>
                            <img src={logo} alt='logo' className='w-[43.36px] h-[136.04px]' />
                            <p className='text-text kalam-bold text-[200px]'>meast</p>
                        </div>
                        <div className='flex justify-center mt-[-45px] z-10'>
                            <p className='poppins-regular text-text text-3xl'>Future of pain managements. Way towards a better life.</p>
                        </div>
                        <div className='flex flex-row gap-9 justify-center pt-[60px] z-10'>
                            <Link to='' className='hover:opacity-100 bg-text text-white w-[340px] h-[60px] text-center flex justify-center items-center rounded-[30px] text-xl poppins-semibold hover:scale-105 duration-200'>BOOK MODULE</Link>
                            <Link to='' className='hover:opacity-100 bg-text text-white w-[340px] h-[60px] text-center flex justify-center items-center rounded-[30px] text-xl poppins-semibold hover:scale-105 duration-200'>CONTACT US</Link>
                        </div>
                    </section>
                    <section className='w-full flex items-center justify-center h-screen scroll-snap-y'>
                        <Link to='/' className='text-text poppins-bold text-6xl hover:scale-105 duration-200 z-10 hover:opacity-100'>LEARN</Link>
                    </section>
                    <section className='last-bit w-full flex items-center justify-center h-screen'>
                        <img src={logo} alt="logo_lg" className='big-logo hover:scale-105 duration-200 z-10' />
                    </section>
                </div>
            </main>
        </body>
    )
}

export default Index