import React from 'react';
import background from '../../Assets/signin-bg.png'
import logo from '../../Assets/logo-green-sm.png'

import { useState } from 'react';

import './style.css'
import { Link } from 'react-router-dom';

const Index = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sex, setSex] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [birthYear, setBirthYear] = useState();
    const [email, setEmail] = useState("");
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

    const handleMonthChange = ((event) => {
        const newMonth = event.target.value;
        setBirthMonth(newMonth);
    });

    const handleDateChange = ((event) => {
        const newDate = event.target.value;
        setBirthDate(newDate);
    });

    const handleYearChange = ((event) => {
        const newYear = event.target.value;
        setBirthYear(newYear);
    });

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

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
                                    <select name="sex" value={sex} onChange={handelSexChange} className='h-[58px] w-[210px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="male" className="text-[15px]">Male</option>
                                        <option value="female" className="text-[15px]">Female</option>
                                        <option value="other" className="text-[15px]">Other</option>
                                        <option value="none" className="text-[15px]">Prefer not to specify</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='birthday' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Birthday</label>
                                    <div id='birthday' className='flex flex-row gap-5'>
                                        <select name="month" value={birthMonth} onChange={handleMonthChange} className='h-[58px] w-[210px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                            <option value='jan' className='text-[15px]'>January</option>
                                            <option value='feb' className='text-[15px]'>February</option>
                                            <option value='mar' className='text-[15px]'>March</option>
                                            <option value='apr' className='text-[15px]'>April</option>
                                            <option value='may' className='text-[15px]'>May</option>
                                            <option value='jun' className='text-[15px]'>June</option>
                                            <option value='jul' className='text-[15px]'>July</option>
                                            <option value='aug' className='text-[15px]'>August</option>
                                            <option value='sep' className='text-[15px]'>September</option>
                                            <option value='oct' className='text-[15px]'>October</option>
                                            <option value='nov' className='text-[15px]'>November</option>
                                            <option value='dec' className='text-[15px]'>December</option>
                                        </select>
                                        <select name="date" value={birthDate} onChange={handleDateChange} className='h-[58px] w-[80px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                            <option value='1' className='text-[15px]'>1</option>
                                            <option value='2' className='text-[15px]'>2</option>
                                            <option value='3' className='text-[15px]'>3</option>
                                            <option value='4' className='text-[15px]'>4</option>
                                            <option value='5' className='text-[15px]'>5</option>
                                            <option value='6' className='text-[15px]'>6</option>
                                            <option value='7' className='text-[15px]'>7</option>
                                            <option value='8' className='text-[15px]'>8</option>
                                            <option value='9' className='text-[15px]'>9</option>
                                            <option value='10' className='text-[15px]'>10</option>
                                            <option value='11' className='text-[15px]'>11</option>
                                            <option value='12' className='text-[15px]'>12</option>
                                            <option value='13' className='text-[15px]'>13</option>
                                            <option value='14' className='text-[15px]'>14</option>
                                            <option value='15' className='text-[15px]'>15</option>
                                            <option value='16' className='text-[15px]'>16</option>
                                            <option value='17' className='text-[15px]'>17</option>
                                            <option value='18' className='text-[15px]'>18</option>
                                            <option value='19' className='text-[15px]'>19</option>
                                            <option value='20' className='text-[15px]'>20</option>
                                            <option value='21' className='text-[15px]'>21</option>
                                            <option value='22' className='text-[15px]'>22</option>
                                            <option value='23' className='text-[15px]'>23</option>
                                            <option value='24' className='text-[15px]'>24</option>
                                            <option value='25' className='text-[15px]'>25</option>
                                            <option value='26' className='text-[15px]'>26</option>
                                            <option value='27' className='text-[15px]'>27</option>
                                            <option value='28' className='text-[15px]'>28</option>
                                            <option value='29' className='text-[15px]'>29</option>
                                            <option value='30' className='text-[15px]'>30</option>
                                            <option value='31' className='text-[15px]'>31</option>
                                        </select>
                                        <input type='number' name='year' value={birthYear} onChange={handleYearChange} className='h-[58px] w-[112px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Year' />
                                        {/* <input type='date' /> */}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Email</label>
                                <input type='email' name='email' value={email} required onChange={handleEmailChange} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your email here' />
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
                                        <option value='acupuncturist' className='text-[15px]'>Acupuncturist</option>
                                        <option value='physiologist' className='text-[15px]'>Physiologist</option>
                                        <option value='naturopathicDoctor' className='text-[15px]'>Naturopathic Doctor</option>
                                        <option value='other' className='text-[15px]'>Other</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='period' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Practicing period</label>
                                    <select name='period' value={period} onChange={handlePeriodChange} className='h-[58px] w-[327px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value='lt1yr' className='text-[15px]'>Less than 1 year</option>
                                        <option value='1yr' className='text-[15px]'>1 year</option>
                                        <option value='2-3yr' className='text-[15px]'>2-3 years</option>
                                        <option value='gt3yr' className='text-[15px]'>More than 3 years</option>
                                    </select>
                                </div>
                            </div>
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
                        <div className='flex flex-col pl-6 w-[670px] justify-center items-center gap-4'>
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