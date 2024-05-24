import React from 'react';

const Index = ({fielderror}) => {
    return (
        <p className={`w-full text-center poppins-bold text-[15px] text-red-400 ${fielderror === '' ? 'display:none' : ''}`}>
            {fielderror}
        </p>
    )
}

export default Index