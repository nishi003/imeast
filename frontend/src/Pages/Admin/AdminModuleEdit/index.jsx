import React, { useContext, useEffect, useState } from 'react';
import { UilAngleLeft, UilLinkH, UilEditAlt } from '@iconscout/react-unicons';
import { useNavigate, useParams } from 'react-router-dom';

import { access, access_or_login } from '../../../Util/access';
import { ModuleContext } from '../../../Contexts/MLCContext';
import AdminAllVideos from '../../../Components/Admin/AdminAllVideos';
import FieldError from '../../../Components/FieldError';

const Index = () => {
    const navigate = useNavigate();

    const { moduleID } = useParams();
    const { moduleNumber, setModuleNumber } = useContext(ModuleContext);

    const [module, setModule] = useState(null);
    const [moduleAvatar, setAvatarFile] = useState(null);

    const [isSure, setIsSure] = useState(false);

    const [errors, setErrors] = useState({
        title: '',
        duration: '',
        description: '',
        pdf: '',
        image: '',
        price: '',
        link: '',
    });

    const [formData, setFormData] = useState({
        title: '',
        duration: '',
        description: '',
        pdf: '',
        image: '',
        price: '',
        link: '',
    });

    const handleInputChangeForm = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarFile(file);
        }
    };

    const handleBack = (() => {
        setIsSure(false);
        navigate(`/admin/module/${moduleID}/`);
    });

    const fetchUserData = async () => {
        try {
            const response = await access('/users/currentuser/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access: localStorage.getItem('access') }) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const decrypt_serverErrors = json.errors;
                console.log(decrypt_serverErrors);
            } else {
                const info = json.info;
                if (!info.isAdmin) {
                    navigate('/signin/');
                } else {
                    const moduleResponse = await access_or_login(`/modules/module/${moduleID}/`, { method: 'GET' }, navigate);
                    const jsonModule = await moduleResponse.json();
                    if (jsonModule && jsonModule.module) {
                        const moduleData = jsonModule.module;
                        setModule(moduleData);

                        setFormData({
                            title: moduleData.title,
                            duration: moduleData.duration,
                            description: moduleData.description,
                            pdf: moduleData.pdf,
                            image: moduleData.image,
                            price: moduleData.price,
                            link: moduleData.link
                        });
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

    async function handleUpdate(event) {
        event.preventDefault();
        try {
            const response = await access(`/modules/module/${module._id}/`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }, navigate);
            const json = await response.json();
            if (!response.ok) {
                const serverErrors = json.errors;
                if (serverErrors) {
                    setErrors(serverErrors);
                }
            } else {
                setModule(json.changed);
                navigate(`/admin/module/${moduleID}/`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function handleDelete(event) {
        if (!isSure) {
            setIsSure(true);
        } else {
            event.preventDefault();
            try {
                const response = await access_or_login(`/modules/module/${module._id}/`, { method: 'DELETE' }, navigate);
                const json = await response.json();
                if (!response.ok) {
                    const serverErrors = json.errors;
                    if (serverErrors) {
                        setErrors(serverErrors);
                    }
                } else {
                    navigate('/admin/module/list/');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className='h-full w-full bg-[#DCDCDC] flex p-8 gap-4 overflow-hidden'>
            <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                <button onClick={handleBack} className='w-auto flex h-auto flex-row items-center'>
                    <UilAngleLeft color='#505050' />
                    <p className='poppins-bold text-[#505050] text-base'>Back</p>
                </button>
                <div className='h-full w-full flex flex-row overflow-hidden'>
                    <div className='w-[555px] border-r border-[#505050] flex flex-col flex-shrink-0'>
                        <div className='flex flex-row gap-8 items-center border-b border-[#505050] pr-8 py-8 pl-2'>
                            <label htmlFor="avatarInput" className="rounded-full min-h-[100px] aspect-square bg-primary md:hidden">
                                <div className="rounded-full aspect-square bg-primary group relative cursor-pointer md:hidden">
                                    <div className='group-hover:opacity-50 h-[100px] w-[100px] rounded-full borderobject-cover bg-primary' />
                                    <UilEditAlt color='#ffffff' size='36' className='absolute left-[46%] top-[46%] hidden group-hover:block' />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="avatarInput"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <div className="rounded-full h-[100px] aspect-square bg-primary group relative cursor-pointer max-md:hidden">
                                <label htmlFor="avatarInput" className="w-full rounded-full">
                                    <div className='group-hover:opacity-50 h-[100px] w-[100px] rounded-full borderobject-cover bg-primary' />
                                    <UilEditAlt color='#ffffff' size='36' className='absolute left-[33%] top-[30%] hidden group-hover:block' />
                                </label>
                            </div>
                            <div className='flex flex-col w-full overflow-hidden'>
                                <p className='poppins-medium text-black text-[40px]'>MODULE {moduleNumber}:</p>
                                <input type='text' name='title' defaultValue={formData['title']} className='poppins-bold text-[#9F9F9F] focus:text-black text-base mt-[-6px] focus:outline-none bg-white p-0' />
                                <FieldError fielderror={errors?.title} />
                            </div>
                        </div>
                        <div className='flex h-full w-full flex-col pt-6 pr-6 justify-between'>
                            <div className='flex flex-col h-auto w-full gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='price' className='poppins-semibold text-base pl-2 text-black'>PRICE:</label>
                                    <input type='number' name='price' defaultValue={formData['price']} className='w-full px-3 py-2 border border-[#9F9F9F] text-base poppins-semibold rounded-xl text-[#9F9F9F] focus:outline-[#767676] focus:text-black' onChange={handleInputChangeForm} min={0} />
                                    <FieldError fielderror={errors?.price} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='duration' className='poppins-semibold text-base pl-2 text-black'>DURATION:</label>
                                    <input type='text' name='duration' defaultValue={formData['duration']} className='w-full px-3 py-2 border border-[#9F9F9F] text-base poppins-semibold rounded-xl text-[#9F9F9F] focus:outline-[#767676] focus:text-black' onChange={handleInputChangeForm} />
                                    <FieldError fielderror={errors?.duration} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='description' className='poppins-semibold text-base pl-2 text-black'>DESCRIPTION:</label>
                                    <textarea rows="5" name='description' defaultValue={formData['description']} className="w-full px-3 py-2 border border-[#9F9F9F] rounded-xl text-base resize-none poppins-medium text-[#9F9F9F] focus:outline-[#767676] focus:text-black custom-scrollbar" onChange={handleInputChangeForm} />
                                    <FieldError fielderror={errors?.description} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='pdf' className='poppins-semibold text-base pl-2 text-black'>PDF DOCUMENT:</label>
                                    <input type='file' name='pdf' accept='.pdf' className='border border-[#9F9F9F] rounded-md p-3 poppins-semibold text-[#767676] text-sm' onChange={handleInputChangeForm} />
                                    <FieldError fielderror={errors?.pdf} />
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-3'>
                                {isSure ?
                                    <p className='text-center poppins-semibold text-base text-red-500'>Are you sure you want to delete this module?</p>
                                    :
                                    <></>
                                }
                                <div className='flex flex-row w-full justify-center gap-4'>
                                    {!isSure ?
                                        <>
                                            <button className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={handleUpdate}>UPDATE</button>
                                            <button className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={handleDelete}>DELETE MODULE</button>
                                        </>
                                        :
                                        <>
                                            <button className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={handleBack}>BACK</button>
                                            <button className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={handleDelete}>I'M SURE. DELETE.</button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-full flex flex-col px-8 overflow-hidden'>
                        <AdminAllVideos module={module?._id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index