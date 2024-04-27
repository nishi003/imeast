import React from 'react';
import HomeMain from '../../Components/HomeMain'
import HomeLearn from '../../Components/HomeLearn'
import HomeLogo from '../../Components/HomeLogo'

import './style.css'

export const index = () => {
    return (
        <div className=''>
            <HomeMain />
            <HomeLearn />
            <HomeLogo />
        </div>
    )
}

export default index