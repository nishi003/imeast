import React, { useEffect, useState } from 'react'
import { access } from '../../../../Util/access';
import { useNavigate } from 'react-router-dom';

const Index = ({ id, firstName, lastName, email, sex, birthday, phone, date, college, license, location, profession, period, other }) => {
    const navigate = useNavigate();

    const [purchases, setPurchases] = useState(0);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const sexMapping = {
        male: "Male",
        female: "Female",
        other: "Other",
    };

    const professionMapping = {
        acupuncturist: 'Acupuncturist',
        physiologist: 'Physiologist',
        naturopathicDoctor: 'Naturopathic Doctor',
        other: "Other",
    };

    const periodMapping = {
        'lt1yr': 'Less than 1 year',
        '1yr': '1 year',
        '2-3yr': '2-3 years',
        'gt3yr': 'More than 3 years',
    };

    const fetchUserData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) });
            const json = await response.json();
            if (!response.ok) {
                console.log(json);
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    navigate('/signin/');
                } else {
                    const purchasesResponse = await access('/users/user/purchases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userID: id }) });
                    const jsonPurchases = await purchasesResponse.json();
                    if (!purchasesResponse.ok) {
                        console.log(jsonPurchases);
                    } else {
                        if (jsonPurchases) {
                            setPurchases(jsonPurchases.purchases);
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    function formattedNumber(originalNumber) {
        return originalNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    };

    return (
        <div className='w-full h-auto p-2 border border-[#DCDCDC] hover:border-primary rounded-[10px] flex flex-row justify-between'>
            <div className='flex items-center w-[80px]'>
                <div className='h-[70px] w-[70px] rounded-full bg-[#D9D9D9]' />
            </div>
            <div className='flex flex-col h-auto justify-between w-[300px] gap-[2px]'>
                <p className='poppins-semibold text-[15px] text-black'>{firstName} {lastName}</p>
                <div className='flex flex-col'>
                    <p className='poppins-semibold text-[10px] text-[#767676]'>{formatDate(birthday)}</p>
                    <p className='poppins-semibold text-[10px] text-[#767676] mt-[-1px]'>{email}</p>
                    <p className='poppins-semibold text-[10px] text-[#767676] mt-[-1px]'>{formattedNumber(phone)}</p>
                    <p className='poppins-semibold text-[10px] text-[#767676] mt-[-1px]'>{location}</p>
                </div>
            </div>
            <div className='h-full flex items-center w-[200px]'>
                <p className='poppins-semibold text-[15px] text-black'>
                    {profession === 'other' ?
                        <>{other}</>
                        :
                        <>{professionMapping[profession]}</>
                    }
                </p>
            </div>
            <div className='h-full flex items-center w-[140px]'>
                <p className='poppins-semibold text-[15px] text-black'>{periodMapping[period]}</p>
            </div>
            <div className='h-full flex items-center w-[150px]'>
                <p className='poppins-semibold text-[15px] text-black'>{license}</p>
            </div>
            <div className='h-full flex items-center w-[190px]'>
                <p className='poppins-semibold text-[15px] text-black'>{college}</p>
            </div>
            <div className='h-full flex items-center w-[70px]'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{sexMapping[sex]}</p>
            </div>
            <div className='h-full flex items-center w-[100px] justify-center'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{purchases}</p>
            </div>
            <div className='h-full flex items-center w-[120px] justify-center'>
                <p className='poppins-semibold text-[15px] text-black text-center'>{formatDate(date)}</p>
            </div>
        </div>
    )
}

export default Index