import React, { useEffect } from 'react';
import logo from '../../Assets/logo-green-sm.png';

import { useState } from 'react';

import './style.css'
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const [sectionOne, setSectionOne] = useState(false);
    const [sectionTwo, setSectionTwo] = useState(false);
    const [sectionThree, setSectionThree] = useState(false);
    const [isCreateAccountHovered, setIsCreateAccountHovered] = useState(false);

    const [errors, setErrors] = useState({
        first_name: null,
        last_name: null,
        sex: null,
        birthDate: null,
        email: null,
        phoneNumber: null,
        pw1: null,
        pw2: null,
        registeredCollege: null,
        lisenceNumber: null,
        practiceLocation: null,
        professionType: null,
        practicePeriod: null,
        Other: null
    });

    useEffect(() => {
        setErrors({});
    }, [navigate]);

    const [formData, setFormData] = useState({
        first_name: null,
        last_name: null,
        sex: null,
        birthDate: null,
        email: null,
        phoneNumber: null,
        pw1: null,
        pw2: null,
        registeredCollege: null,
        lisenceNumber: null,
        practiceLocation: null,
        professionType: null,
        practicePeriod: null,
        Other: null
    });

    const handleInputChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function handle_submit(event) {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };

        try {
            const response = await fetch('http://localhost:4000/signup', requestOptions);

            if (!response.ok) {
                const json = await response.json();
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                navigate("/login/");
            }
        } catch (error) {
            console.error("Error during fetch: ", error);
        }
    }

    useEffect(() => {
        console.log("errors changed");
        console.log(errors);
    }, [errors]);

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
                                    <label htmlFor='first_name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>First Name</label>
                                    <input type='text' name='first_name' value={formData['first_name']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Fill in your first name' />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='last_name' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Last Name</label>
                                    <input type='text' name='last_name' value={formData['last_name']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Fill in your last name' />
                                </div>
                            </div>
                            <div className='flex flex-row gap-5'>
                                <div className='flex flex-col gap-1'>
                                    <label className='poppins-semibold text-[15px] text-[#767676] pl-2'>Sex</label>
                                    <select name="sex" value={formData['sex']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="" disabled selected hidden>Select sex</option>
                                        <option value="male" className="text-[15px]">Male</option>
                                        <option value="female" className="text-[15px]">Female</option>
                                        <option value="other" className="text-[15px]">Other</option>
                                        <option value="none" className="text-[15px]">Prefer not to specify</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='birthDate' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Birthday</label>
                                    <input type='date' name='birthDate' value={formData['birthDate']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[326px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Email</label>
                                <input type='email' name='email' value={formData['email']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your email here' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='phoneNumber' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Phone Number</label>
                                <input type='text' name='phoneNumber' value={formData['phoneNumber']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your phone number here' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='pw1' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Create Password</label>
                                <input type='password' name='pw1' value={formData['pw1']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='pw2' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Confirm Password</label>
                                <input type='password' name='pw2' value={formData['pw2']} onFocus={() => { setSectionOne(true); setSectionTwo(false); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='●●●●●●●●' />
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
                                <label htmlFor='registeredCollege' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Registered College</label>
                                <input type='text' name='registeredCollege' value={formData['registeredCollege']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your college' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='lisenceNumber' className='poppins-semibold text-[15px] text-[#767676] pl-2'>License Number</label>
                                <input type='text' name='lisenceNumber' value={formData['lisenceNumber']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your license number' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='practiceLocation' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Location of practice (address)</label>
                                <input type='text' name='practiceLocation' value={formData['practiceLocation']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your location of practice' />
                            </div>
                            <div className='flex flex-row gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='professionType' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Type of profession</label>
                                    <select name='professionType' value={formData['professionType']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[327px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="" disabled selected hidden>Select Profession</option>
                                        <option value='acupuncturist' className='text-[15px]'>Acupuncturist</option>
                                        <option value='physiologist' className='text-[15px]'>Physiologist</option>
                                        <option value='naturopathicDoctor' className='text-[15px]'>Naturopathic Doctor</option>
                                        <option value='other' className='text-[15px]'>Other</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='practicePeriod' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Practicing period</label>
                                    <select name='practicePeriod' value={formData['practicePeriod']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[327px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]'>
                                        <option value="" disabled selected hidden>Select practicing period</option>
                                        <option value='lt1yr' className='text-[15px]'>Less than 1 year</option>
                                        <option value='1yr' className='text-[15px]'>1 year</option>
                                        <option value='2-3yr' className='text-[15px]'>2-3 years</option>
                                        <option value='gt3yr' className='text-[15px]'>More than 3 years</option>
                                    </select>
                                </div>
                            </div>
                            {formData['professionType'] === 'other' ?
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='Other' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Please Specify:</label>
                                    <input type='text' name='Other' value={formData['Other']} onFocus={() => { setSectionOne(false); setSectionTwo(true); setSectionThree(false); }} onChange={handleInputChangeForm} className='h-[58px] w-[670px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold px-3 focus:outline-[#767676]' placeholder='Type in your profession' />
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
                        <div className='flex flex-col pl-6 w-[670px] justify-center items-center gap-4' onMouseEnter={() => { setSectionOne(false); setSectionTwo(false); setSectionThree(true); }}>
                            <button type='submit' className='h-[58px] w-[400px] rounded-[30px] bg-[#669162] hover:scale-105 duration-200 poppins-semibold text-white text-[18px]' onClick={handle_submit}>CREATE ACCOUNT</button>
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