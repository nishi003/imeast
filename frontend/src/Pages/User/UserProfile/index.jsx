import React, { useState } from 'react';
import { UilPen } from '@iconscout/react-unicons'
import './style.css';
import { Link } from 'react-router-dom';
import TransactionHistory from '../../../Components/TransactionHistory';

const Index = () => {
    const [isProfile, setIsProfile] = useState(true);
    const [isPersonalEdit, setIsPersonalEdit] = useState(false);
    const [isProfessionalEdit, setIsProfessionalEdit] = useState(false);
    const [user, setUser] = useState();
    const [firstName, setFirstName] = useState("Eugene");
    const [lastName, setLastName] = useState("Jang");
    const [sex, setSex] = useState("Male");
    const [birthday, setBirthday] = useState("2003.06.24");
    const [email, setEmail] = useState("emailoverhere@gmail.com");
    const [phoneNumber, setPhoneNumber] = useState("604-459-3405");
    const [profilePic, setProfilePic] = useState();

    const [college, setCollege] = useState("University of Waterloo");
    const [license, setLicense] = useState("CAMD-9999-9999");
    const [location, setLocation] = useState("405-889 West Pender St. Vancouver, BC. V6C 3B2");
    const [profession, setProfession] = useState("naturopathicDoctor");
    const [other, setOther] = useState("");
    const [period, setPeriod] = useState("less than 1 year");

    const handleFirstNameChange = ((event) => {
        const newFirstName = event.target.value;
        setFirstName(newFirstName);
    });

    const handleLastNameChange = (event) => {
        const newLastName = event.target.value;
        setLastName(newLastName);
    };

    const handelSexChange = ((event) => {
        const newSex = event.target.value;
        setSex(newSex);
    });

    const handleBirthdayChange = ((event) => {
        const newBirthday = event.target.value;
        setBirthday(newBirthday);
    })

    const handleProfilePictureChange = (event) => {
        const newProfilePic = event.target.value;
        setProfilePic(newProfilePic);
    };

    const handleCollegeChange = ((event) => {
        const newCollege = event.target.value;
        setCollege(newCollege);
    });

    const handleLicenseChange = (event) => {
        const newLicense = event.target.value;
        setLicense(newLicense);
    };

    const handleLocationChange = (event) => {
        const newLocation = event.target.value;
        setLocation(newLocation);
    };

    const handleProfessionChange = (event) => {
        const newProfession = event.target.value;
        setProfession(newProfession);
    };

    const handleOtherChange = (event) => {
        const newOther = event.target.value;
        setOther(newOther);
    }

    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        setPeriod(newPeriod);
    };

    return (
        <div className='h-full w-full bg-[#DEF1DD] flex flex-col p-8'>
            <div className='h-full w-full flex flex-row flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                <div className='flex flex-col h-full w-[280px] flex-shrink-0 py-8 pr-8 justify-start items-center gap-4 border-r-2 border-[#9F9F9F]'>
                    <button className={`flex flex-row justify-start px-4 py-2 w-full ${isProfile ? 'bg-secondary rounded-2xl' : ''}`} onClick={() => { setIsProfile(true); setIsPersonalEdit(false); setIsProfessionalEdit(false); }}>
                        <p className='poppins-medium text-[20px]'>My Profile</p>
                    </button>
                    <button className={`flex flex-row justify-start px-4 py-2 w-full ${isProfile ? '' : 'bg-secondary rounded-2xl'}`} onClick={() => { setIsProfile(false) }}>
                        <p className='poppins-medium text-[20px]'>Transaction History</p>
                    </button>
                </div>
                <div className='h-full w-full flex flex-row p-8 justify-start overflow-hidden'>
                    {isProfile ?
                        <div className='flex flex-col justify-start items-center gap-6 overflow-y-scroll custom-scrollbar w-full'>
                            <p className='w-full poppins-semibold text-xl'>My Profile</p>
                            {isPersonalEdit ?
                                <div className='w-full p-4 rounded-[30px] border-2 border-[#DEF1DD] flex flex-col items-center justify-center'>
                                    <div className='w-full justify-start flex flex-col px-4 pt-4'>
                                        <p className='poppins-semibold text-xl'>Personal Information</p>
                                    </div>
                                    <div className='flex flex-col gap-6 p-8 justify-center'>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='profilePic' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Profile Picture</label>
                                            <input type='file' name='profilePic' value={profilePic} required onChange={handleProfilePictureChange} className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] items-center flex flex-row justify-center' placeholder='Type in your email here' />
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='first-name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>First Name</label>
                                                <input type='text' id='first-name' value={firstName} onChange={handleFirstNameChange} required className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Fill in your first name' />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='last-name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Last Name</label>
                                                <input type='text' id='last-name' value={lastName} onChange={handleLastNameChange} required className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Fill in your last name' />
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <div className='flex flex-col gap-1'>
                                                <label className='poppins-semibold text-[15px] text-[#767676] pl-2'>Sex</label>
                                                <select name="sex" value={sex} onChange={handelSexChange} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]'>
                                                    <option value="" disabled selected hidden>Select sex</option>
                                                    <option value="male" className="text-[15px]">Male</option>
                                                    <option value="female" className="text-[15px]">Female</option>
                                                    <option value="other" className="text-[15px]">Other</option>
                                                    <option value="none" className="text-[15px]">Prefer not to specify</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='birthday' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Birthday</label>
                                                <input type='date' name='birthday' value={birthday} required onChange={handleBirthdayChange} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='email' className='poppins-semibold text-[15px] text-[#767676] pl-2'>*Email - cannot be changed</label>
                                            <input type='email' name='email' value={email} required readOnly className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Type in your email here' />
                                        </div>
                                        <div className='flex flex-row w-full justify-center gap-4'>
                                            <Link className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={() => { setIsPersonalEdit(false) }}>CANCEL</Link>
                                            <Link className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={() => { console.log('handle update'); setIsPersonalEdit(false); }}>UPDATE</Link>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='w-full p-4 rounded-[30px] border-2 border-[#DEF1DD] flex flex-row gap-8 items-center'>
                                    <div className='h-[200px] w-[200px] bg-secondary rounded-full flex-shrink-0' />
                                    <div className='flex flex-col gap-6 w-full'>
                                        <div className='flex flex-row gap-1'>
                                            <p className='poppins-semibold text-xl'>{firstName}</p>
                                            <p className='poppins-semibold text-xl'>{lastName}</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='poppins-semibold text-base text-[#767676]'>{sex}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{birthday}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{phoneNumber}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{email}</p>
                                        </div>
                                    </div>
                                    <div className='h-full w-auto flex flex-col justify-end pb-2 pr-2'>
                                        <button className='flex flex-row items-baseline justify-center pl-4 pr-3 pt-2 pb-1 border border-[#767676] rounded-full gap-2 hover:scale-105 hover:duration-200' onClick={() => setIsPersonalEdit(true)}>
                                            <p className='poppins-semibold text-base'>Edit</p>
                                            <UilPen size='18' />
                                        </button>
                                    </div>
                                </div>
                            }
                            {isProfessionalEdit ?
                                <div className='w-full p-4 rounded-[30px] border-2 border-[#DEF1DD] flex flex-col items-center justify-center'>
                                    <div className='w-full justify-start flex flex-col px-4 pt-4'>
                                        <p className='poppins-semibold text-xl'>Professional Information</p>
                                    </div>
                                    <div className='flex flex-col gap-6 p-8 justify-center'>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='college' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Registered College</label>
                                            <input type='text' name='college' value={college} required onChange={handleCollegeChange} className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Type in your college' />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='license' className='poppins-semibold text-[15px] text-[#767676] pl-2'>License Number</label>
                                            <input type='text' name='license' value={license} required onChange={handleLicenseChange} className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Type in your license number' />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='location' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Location of practice (address)</label>
                                            <input type='text' name='location' value={location} required onChange={handleLocationChange} className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' placeholder='Type in your location of practice' />
                                        </div>
                                        <div className='flex flex-row gap-4'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='profession' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Type of profession</label>
                                                <select name='profession' value={profession} onChange={handleProfessionChange} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]'>
                                                    <option value="" disabled selected hidden>Select Profession</option>
                                                    <option value='acupuncturist' className='text-[15px]'>Acupuncturist</option>
                                                    <option value='physiologist' className='text-[15px]'>Physiologist</option>
                                                    <option value='naturopathicDoctor' className='text-[15px]'>Naturopathic Doctor</option>
                                                    <option value='other' className='text-[15px]'>Other</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='period' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Practicing period</label>
                                                <select name='period' value={period} onChange={handlePeriodChange} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]'>
                                                    <option value="" disabled selected hidden>Select practicing period</option>
                                                    <option value='lt1yr' className='text-[15px]'>Less than 1 year</option>
                                                    <option value='1yr' className='text-[15px]'>1 year</option>
                                                    <option value='2-3yr' className='text-[15px]'>2-3 years</option>
                                                    <option value='gt3yr' className='text-[15px]'>More than 3 years</option>
                                                </select>
                                            </div>
                                        </div>
                                        {profession === 'other' ?
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='other-prof' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Please Specify:</label>
                                                <input type='text' name='other-prof' className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]' onChange={handleOtherChange} value={other} placeholder='Type in your profession' />
                                            </div>
                                            :
                                            <></>
                                        }
                                        <div className='flex flex-row w-full justify-center gap-4'>
                                            <Link className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={() => { setIsProfessionalEdit(false) }}>CANCEL</Link>
                                            <Link className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={() => { console.log('handle update'); setIsProfessionalEdit(false); }}>UPDATE</Link>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='w-full p-8 rounded-[30px] border-2 border-[#DEF1DD] flex flex-row gap-8 items-center justify-between'>
                                    <div className='flex flex-shrink-0 flex-col gap-2 items-center'>
                                        <div className='w-full justify-start flex flex-col'>
                                            <p className='poppins-semibold text-xl'>Professional Information</p>
                                        </div>
                                        <div className='w-full justify-start flex flex-col gap-1'>
                                            <p className='poppins-semibold text-base text-[#767676]'>{college}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{license}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>
                                                {profession === 'acupuncturist' ?
                                                    <>Acupuncturist</>
                                                    :
                                                    <></>
                                                }
                                                {profession === 'physiologist' ?
                                                    <>Physiologist</>
                                                    :
                                                    <></>
                                                }
                                                {profession === 'naturopathicDoctor' ?
                                                    <>Naturopathic Doctor</>
                                                    :
                                                    <></>
                                                }
                                                {profession === 'other' ?
                                                    <>{other}</>
                                                    :
                                                    <></>
                                                }
                                            </p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{location}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{period}</p>
                                        </div>
                                    </div>
                                    <div className='h-full w-auto flex flex-col justify-end mr-[-8px] mb-[-8px]'>
                                        <button className='flex flex-row items-baseline justify-center pl-4 pr-3 pt-2 pb-1 border border-[#767676] rounded-full gap-2 hover:scale-105 hover:duration-200' onClick={() => setIsProfessionalEdit(true)}>
                                            <p className='poppins-semibold text-base'>Edit</p>
                                            <UilPen size='18' />
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div className='flex flex-col justify-start items-center gap-6 overflow-y-scroll custom-scrollbar w-full'>
                            <p className='w-full poppins-semibold text-xl'>Transaction History</p>
                            <TransactionHistory id={1} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Index