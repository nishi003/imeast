import React, { useEffect } from 'react';
import logo from '../../Assets/logo-green-sm.png';

import { useState } from 'react';

import './style.css'
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNnmber] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [college, setCollege] = useState("");
    const [license, setLicense] = useState("");
    const [location, setLocation] = useState("");
    const [profession, setProfession] = useState("");
    const [period, setPeriod] = useState("");

    const [sectionOne, setSectionOne] = useState(false);
    const [sectionTwo, setSectionTwo] = useState(false);
    const [sectionThree, setSectionThree] = useState(false);
    const [isCreateAccountHovered, setIsCreateAccountHovered] = useState(false);

    const [errors, setErrors] = useState({
        first_name: null,
        last_name: null,
        sex: null,
        email: null,
        phone_number: null,
        password1: null,
        password2: null,
        college: null,
        license: null,
        address: null,
        profession: null,
        period: null,
        other: null
    });

    useEffect(() => {
        setErrors({});
    }, [navigate]);

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

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    const handlePhoneNumberChange = (event) => {
        const newPhoneNumber = event.target.value;
        setPhoneNnmber(newPhoneNumber);
    }

    const handlePassword1Change = ((event) => {
        const newPassword1 = event.target.value;
        setPassword1(newPassword1);
    });

    const handlePassword2Change = ((event) => {
        const newPassword2 = event.target.value;
        setPassword2(newPassword2);
    });

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

    const handlePeriodChange = (event) => {
        const newPeriod = event.target.value;
        setPeriod(newPeriod);
    };

    useEffect(() => {
        if (firstName || lastName || sex || birthday || email || password1 || password2) {
            setSectionOne(true);
            setSectionTwo(false);
            setSectionThree(false);
        }
    }, [firstName, lastName, sex, birthday, email, password1, password2]);

    useEffect(() => {
        if (college || license || location || profession || period) {
            setSectionOne(false);
            setSectionTwo(true);
            setSectionThree(false);
        }
    }, [college, license, location, profession, period]);

    useEffect(() => {
        if (isCreateAccountHovered) {
            setSectionOne(false);
            setSectionTwo(false);
            setSectionThree(true);
        } else {
            setSectionThree(false);
        }
    }, [isCreateAccountHovered]);

    return (
        <main className='p-36 bg-[#91C28D99]'>
            <div className='flex justify-center items-center'>
                <div className='w-[1330px] h-auto flex flex-col bg-white rounded-[50px] container p-4'>
                    <div className='w-full h-auto flex flex-row'>
                        <div className='flex flex-col bg-[#DEF1DD] w-[530px] pl-6 pt-3 rounded-t-[30px] gap-12'>
                            <div className='flex flex-row items-baseline gap-1'>
                                <img src={logo} alt='logo' className='w-[10px] h-[31px]' />
                                <p className='kalam-bold text-[40px] text-[#91C28D]'>meast</p>
                            </div>
                            <p className='poppins-semibold text-text text-[40px] pb-7'>Create Account</p>
                        </div>
                        <div></div>
                    </div>
                    <div className='w-full h-auto flex flex-row'>
                        <div className='flex flex-col bg-[#DEF1DD] w-[530px] pl-6'>
                            <div className='flex flex-row items-center gap-4'>
                                {sectionOne ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>1</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>1</p>
                                    </div>
                                }
                                <div className='text-[#2F2F2F] poppins-semibold text-[30px]'>Personal Details</div>
                            </div>
                            <div className='h-full w-0 border border-[#91C28D] ml-[50px]' />
                        </div>
                        <div className='flex flex-col pl-5 gap-6 pb-20'>
                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='first-name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>First Name</label>
                                    <input type='text' id='first-name' value={firstName} onChange={handleFirstNameChange} required className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Fill in your first name' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='last-name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Last Name</label>
                                    <input type='text' id='last-name' value={lastName} onChange={handleLastNameChange} required className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Fill in your last name' />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <label className='poppins-semibold text-[15px] text-[#767676] pl-2'>Sex</label>
                                    <select name="sex" value={sex} onChange={handelSexChange} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="" disabled selected hidden>Select sex</option>
                                        <option value="male" className="text-[15px]">Male</option>
                                        <option value="female" className="text-[15px]">Female</option>
                                        <option value="other" className="text-[15px]">Other</option>
                                        <option value="none" className="text-[15px]">Prefer not to specify</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='birthday' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Birthday</label>
                                    <input type='date' name='birthday' value={birthday} required onChange={handleBirthdayChange} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Email</label>
                                <input type='email' name='email' value={email} required onChange={handleEmailChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your email here' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='phoneNumber' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Phone Number</label>
                                <input type='text' name='phoneNumber' value={phoneNumber} required onChange={handlePhoneNumberChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your phone number here' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='password1' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Create Password</label>
                                <input type='password' name='password1' value={password1} required onChange={handlePassword1Change} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='password2' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Confirm Password</label>
                                <input type='password' name='password2' value={password2} required onChange={handlePassword2Change} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●' />
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-row'>
                        <div className='flex flex-col bg-[#DEF1DD] w-[530px] pl-6'>
                            <div className='flex flex-row items-center gap-4'>
                                {sectionTwo ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>2</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>2</p>
                                    </div>
                                }
                                <div className='text-[#2F2F2F] poppins-semibold text-[30px]'>Professional Details</div>
                            </div>
                            <div className='h-full w-0 border border-[#91C28D] ml-[50px]' />
                        </div>
                        <div className='flex flex-col pl-5 gap-6 pb-20'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='college' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Registered College</label>
                                <input type='text' name='college' value={college} required onChange={handleCollegeChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your college' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='license' className='poppins-semibold text-[15px] text-[#767676] pl-2'>License Number</label>
                                <input type='text' name='license' value={license} required onChange={handleLicenseChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your license number' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='location' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Location of practice (address)</label>
                                <input type='text' name='location' value={location} required onChange={handleLocationChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your location of practice' />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='profession' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Type of profession</label>
                                    <select name='profession' value={profession} onChange={handleProfessionChange} className='h-[58px] w-[327px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="" disabled selected hidden>Select Profession</option>
                                        <option value='acupuncturist' className='text-[15px]'>Acupuncturist</option>
                                        <option value='physiologist' className='text-[15px]'>Physiologist</option>
                                        <option value='naturopathicDoctor' className='text-[15px]'>Naturopathic Doctor</option>
                                        <option value='other' className='text-[15px]'>Other</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='period' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Practicing period</label>
                                    <select name='period' value={period} onChange={handlePeriodChange} className='h-[58px] w-[327px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
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
                                    <input type='text' name='other-prof' className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your profession' />
                                </div>
                                :
                                <></>
                            }
                        </div>
                    </div>
                    <div className='w-full h-auto flex flex-row'>
                        <div className='flex flex-col bg-[#DEF1DD] w-[530px] pl-6 pb-6 rounded-b-[30px]'>
                            <div className='flex flex-row items-center gap-4'>
                                {sectionThree ?
                                    <div className='h-[100px] w-[100px] bg-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-white poppins-semibold text-[30px]'>3</p>
                                    </div>
                                    :
                                    <div className='h-[100px] w-[100px] border-2 border-[#91C28D] rounded-[50px] flex justify-center items-center'>
                                        <p className='text-[#91C28D] poppins-semibold text-[30px]'>3</p>
                                    </div>
                                }
                                <div className='text-[#2F2F2F] poppins-semibold text-[30px]'>Create Account</div>
                            </div>
                        </div>
                        <div className='flex flex-col pl-6 w-[670px] justify-center items-center gap-4' onMouseEnter={() => setIsCreateAccountHovered(true)}>
                            <button type='submit' className='h-[58px] w-[400px] rounded-[30px] bg-[#669162] hover:scale-105 duration-200 poppins-semibold text-white text-[18px]'>CREATE ACCOUNT</button>
                            <div className='flex'>
                                <p className='poppins-semibold text-[#767676] text-[15px] gap-1'>Already have an account? <Link to='/signin/' className='text-[#669162] hover:scale-105 duration-200'>Sign In</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Index