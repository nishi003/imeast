import React, { useEffect, useState } from 'react';
import { UilPen } from '@iconscout/react-unicons'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { access, access_or_login } from '../../../Util/access';
import TransactionHistory from '../../../Components/TransactionHistory';
import FieldError from '../../../Components/FieldError';

const Index = () => {
    const navigate = useNavigate();

    const [isProfile, setIsProfile] = useState(true);
    const [isPersonalEdit, setIsPersonalEdit] = useState(false);
    const [isProfessionalEdit, setIsProfessionalEdit] = useState(false);
    const [user, setUser] = useState(null);

    const [errors, setErrors] = useState({
        image: "",
        firstName: "",
        lastName: "",
        sex: "",
        birthday: "",
        email: "",
        phoneNumber: "",
        registeredCollege: "",
        licenseNumber: "",
        practiceLocation: "",
        professionType: "",
        practicePeriod: "",
        other: "",
        serverErrors: "",
    });

    const [formData1, setFormData1] = useState({
        image: null,
        firstName: null,
        lastName: null,
        sex: null,
        birthday: null,
        email: null,
        phoneNumber: null,
    });

    const [formData2, setFormData2] = useState({
        registeredCollege: null,
        licenseNumber: null,
        practiceLocation: null,
        professionType: null,
        practicePeriod: null,
        other: null,
    })

    const handleInputChangeForm1 = (e) => {
        const { name, value } = e.target;
        setFormData1((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const handleInputChangeForm2 = (e) => {
        const { name, value } = e.target;
        setFormData2((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const fetchUserData = async () => {
        try {
            const response = await access('/Users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const decrypt_serverErrors = json.errors;
                if (decrypt_serverErrors) {
                    setErrors(decrypt_serverErrors);
                }
            } else {
                const info = json.info;
                const userID = info.userID;
                const userResponse = await access_or_login(`/Users/user/${userID}`, { method: 'GET' }, navigate);
                const userResponseJson = await userResponse.json();
                if (!userResponse.ok) {
                    console.log('Internal server error.')
                } else {
                    setUser(userResponseJson.user);
                    setFormData1({ image: user?.image, firstName: user?.firstName, lastName: user?.lastName, sex: user?.sex, birthday: user?.birthday, email: user?.email, phoneNumber: user?.phoneNumber });
                    setFormData2({ registeredCollege: user?.registeredCollege, licenseNumber: user?.licenseNumber, practiceLocation: user?.practiceLocation, professionType: user?.professionType, practicePeriod: user?.practicePeriod, other: user?.other });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    function handlePersonalEdit() {
        setFormData1({ image: user?.image, firstName: user?.firstName, lastName: user?.lastName, sex: user?.sex, birthday: user?.birthday, email: user?.email, phoneNumber: user?.phoneNumber });
        setErrors((prevErrors) => ({ ...prevErrors, image: '', firstName: '', lastName: '', sex: '', birthday: '', email: '', phoneNumber: '' }));
        setIsPersonalEdit(true);
    };

    function handlePersonalCancel() {
        setIsPersonalEdit(false);
    };

    async function handlePersonalSubmit(event) {
        event.preventDefault();
        try {
            const response = await access(`/Users/user/${user._id}/`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData1) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                setUser(json.changed);
                setIsPersonalEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function handleProfessionalEdit() {
        setFormData2({ registeredCollege: user?.registeredCollege, licenseNumber: user?.licenseNumber, practiceLocation: user?.practiceLocation, professionType: user?.professionType, practicePeriod: user?.practicePeriod, other: user?.other });
        setErrors((prevErrors) => ({ ...prevErrors, registeredCollege: '', licenseNumber: '', practiceLocation: '', professionType: '', practicePeriod: '', other: '' }));
        setIsProfessionalEdit(true);
    };

    function handleProfessionalCancel() {
        setIsProfessionalEdit(false);
    };

    async function handleProfessionalSubmit(event) {
        event.preventDefault();
        try {
            const response = await access_or_login(`/Users/user/${user._id}/`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData2) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                setUser(json.changed);
                setIsProfessionalEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = (date.getDate() + 1).toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    function BirthdayDisplay(isoDateString) {
        const formattedDate = formatDate(isoDateString);
        return <>{formattedDate}</>;
    };

    function BirthdayDatabase(birthday) {
        const formattedDate = birthday?.split('T')[0];
        return formattedDate
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
                                            <label htmlFor='image' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Profile Picture</label>
                                            <input type='file' name='image' onChange={handleInputChangeForm1} className={`w-full rounded-[10px] border border-[#9F9F9F] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] items-center flex flex-row justify-center`} />
                                            {/* defaultValue={formData1['image']} */}
                                            <FieldError fielderror={errors.image} />
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='firstName' className='poppins-semibold text-[15px] text-[#767676] pl-2'>First Name</label>
                                                <input type='text' name='firstName' defaultValue={formData1['firstName']} onChange={handleInputChangeForm1} className={`w-[500px] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['firstName'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='First name cannot be blank' />
                                                <FieldError fielderror={errors.firstName} />
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='lastName' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Last Name</label>
                                                <input type='text' name='lastName' defaultValue={formData1['lastName']} onChange={handleInputChangeForm1} className={`w-[500px] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['lastName'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Last name cannot be blank' />
                                                <FieldError fielderror={errors.lastName} />
                                            </div>
                                        </div>
                                        <div className='flex flex-row gap-5'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='sex' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Sex</label>
                                                <select name="sex" defaultValue={formData1['sex']} onChange={handleInputChangeForm1} className={`w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]`}>
                                                    <option value="" disabled hidden>Select sex</option>
                                                    <option value="male" className="text-[15px]">Male</option>
                                                    <option value="female" className="text-[15px]">Female</option>
                                                    <option value="other" className="text-[15px]">Other</option>
                                                    <option value="none" className="text-[15px]">Prefer not to specify</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='birthday' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Birthday</label>
                                                <input type='date' name='birthday' defaultValue={BirthdayDatabase(formData1['birthday'])} onChange={handleInputChangeForm1} className={`w-[500px] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['birthday'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} />
                                                <FieldError fielderror={errors.birthday} />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='email' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Email - *cannot be changed</label>
                                            <input type='email' name='email' defaultValue={formData1['email']} readOnly className='w-full border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-none' />
                                        </div>
                                        <div className='flex flex-row w-full justify-center gap-4'>
                                            <button className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={handlePersonalCancel}>CANCEL</button>
                                            <button type='submit' className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={handlePersonalSubmit}>UPDATE</button>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='w-full p-4 rounded-[30px] border-2 border-[#DEF1DD] flex flex-row gap-8 items-center'>
                                    <div className='h-[200px] w-[200px] bg-secondary rounded-full flex-shrink-0' />
                                    <div className='flex flex-col gap-6 w-full'>
                                        <div className='flex flex-row gap-1'>
                                            <p className='poppins-semibold text-xl'>{user?.firstName}</p>
                                            <p className='poppins-semibold text-xl'>{user?.lastName}</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <p className='poppins-semibold text-base text-[#767676]'>
                                                {user?.sex === 'male' ?
                                                    <>Male</>
                                                    :
                                                    <></>
                                                }
                                                {user?.sex === 'female' ?
                                                    <>Female</>
                                                    :
                                                    <></>
                                                }
                                                {user?.sex === 'other' ?
                                                    <>Other</>
                                                    :
                                                    <></>
                                                }
                                            </p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{BirthdayDisplay(user?.birthday)}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{user?.phoneNumber}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className='h-full w-auto flex flex-col justify-end pb-2 pr-2'>
                                        <button className='flex flex-row items-baseline justify-center pl-4 pr-3 pt-2 pb-1 border border-[#767676] rounded-full gap-2 hover:scale-105 hover:duration-200' onClick={handlePersonalEdit}>
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
                                            <label htmlFor='registeredCollege' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Registered College</label>
                                            <input type='text' name='registeredCollege' defaultValue={formData2['registeredCollege']} onChange={handleInputChangeForm2} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['registeredCollege'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='College cannot be blank' />
                                            <FieldError fielderror={errors.registeredCollege} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='licenseNumber' className='poppins-semibold text-[15px] text-[#767676] pl-2'>License Number</label>
                                            <input type='text' name='licenseNumber' defaultValue={formData2['licenseNumber']} onChange={handleInputChangeForm2} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['licenseNumber'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='License number cannot be blank' />
                                            <FieldError fielderror={errors.licenseNumber} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label htmlFor='practiceLocation' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Location of practice (address)</label>
                                            <input type='text' name='practiceLocation' defaultValue={formData2['practiceLocation']} onChange={handleInputChangeForm2} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['practiceLocation'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Location of practice cannot be blank' />
                                            <FieldError fielderror={errors.practiceLocation} />
                                        </div>
                                        <div className='flex flex-row gap-4'>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='professionType' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Type of profession</label>
                                                <select name='professionType' defaultValue={formData2['professionType']} onChange={handleInputChangeForm2} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]'>
                                                    <option value='acupuncturist' className='text-[15px]'>Acupuncturist</option>
                                                    <option value='physiologist' className='text-[15px]'>Physiologist</option>
                                                    <option value='naturopathicDoctor' className='text-[15px]'>Naturopathic Doctor</option>
                                                    <option value='other' className='text-[15px]'>Other</option>
                                                </select>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='practicePeriod' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Practicing period</label>
                                                <select name='practicePeriod' defaultValue={formData2['practicePeriod']} onChange={handleInputChangeForm2} className='w-[500px] border border-[#9F9F9F] rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676]'>
                                                    <option value="" disabled selected hidden>Select practicing period</option>
                                                    <option value='lt1yr' className='text-[15px]'>Less than 1 year</option>
                                                    <option value='1yr' className='text-[15px]'>1 year</option>
                                                    <option value='2-3yr' className='text-[15px]'>2-3 years</option>
                                                    <option value='gt3yr' className='text-[15px]'>More than 3 years</option>
                                                </select>
                                            </div>
                                        </div>
                                        {formData2['professionType'] === 'other' ?
                                            <div className='flex flex-col gap-1'>
                                                <label htmlFor='other' className='poppins-semibold text-[15px] text-[#767676] pl-2'>Please Specify:</label>
                                                <input type='text' name='other' defaultValue={formData2['other']} onChange={handleInputChangeForm2} className={`w-full rounded-[10px] text-[#9F9F9F] poppins-semibold p-3 focus:outline-[#767676] ${errors['other'] === '' ? 'border border-[#9F9F9F]' : 'border-2 border-red-400'}`} placeholder='Profession cannot be blank' />
                                                <FieldError fielderror={errors.other} />
                                            </div>
                                            :
                                            <></>
                                        }
                                        <div className='flex flex-row w-full justify-center gap-4'>
                                            <button className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={handleProfessionalCancel}>CANCEL</button>
                                            <button type='submit' className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={handleProfessionalSubmit}>UPDATE</button>
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
                                            <p className='poppins-semibold text-base text-[#767676]'>{user?.registeredCollege}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{user?.licenseNumber}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>
                                                {user?.professionType === 'acupuncturist' ?
                                                    <>Acupuncturist</>
                                                    :
                                                    <></>
                                                }
                                                {user?.professionType === 'physiologist' ?
                                                    <>Physiologist</>
                                                    :
                                                    <></>
                                                }
                                                {user?.professionType === 'naturopathicDoctor' ?
                                                    <>Naturopathic Doctor</>
                                                    :
                                                    <></>
                                                }
                                                {user?.professionType === 'other' ?
                                                    <>{user?.other}</>
                                                    :
                                                    <></>
                                                }
                                            </p>
                                            <p className='poppins-semibold text-base text-[#767676]'>{user?.practiceLocation}</p>
                                            <p className='poppins-semibold text-base text-[#767676]'>
                                                {user?.practicePeriod === 'lt1yr' ?
                                                    <>Less than 1 year</>
                                                    :
                                                    <></>
                                                }
                                                {user?.practicePeriod === '1yr' ?
                                                    <>1 year</>
                                                    :
                                                    <></>
                                                }
                                                {user?.practicePeriod === '2-3yr' ?
                                                    <>2-3 years</>
                                                    :
                                                    <></>
                                                }
                                                {user?.practicePeriod === 'gt3yr' ?
                                                    <>More than 3 years</>
                                                    :
                                                    <></>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='h-full w-auto flex flex-col justify-end mr-[-8px] mb-[-8px]'>
                                        <button className='flex flex-row items-baseline justify-center pl-4 pr-3 pt-2 pb-1 border border-[#767676] rounded-full gap-2 hover:scale-105 hover:duration-200' onClick={handleProfessionalEdit}>
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