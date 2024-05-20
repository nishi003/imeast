import React from 'react'
import { Outlet } from "react-router-dom"
import Navbar from '../Navbar'

const Index = () => {
    return (
        <div className='flex h-screen flex-col'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Index