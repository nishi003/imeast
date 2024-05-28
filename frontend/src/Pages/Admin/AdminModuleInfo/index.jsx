import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UilAngleLeft, UilLinkH, UilEditAlt } from '@iconscout/react-unicons';

import { access, access_or_login } from '../../../Util/access';
import { ModuleContext } from '../../../Contexts/MLCContext';
import AdminAllVideos from '../../../Components/Admin/AdminAllVideos';

import document from '../../../Assets/Documents/May_2024_Resume.pdf';

const Index = () => {
    const navigate = useNavigate();

    const { moduleID } = useParams();
    const { moduleNumber, setModuleNumber } = useContext(ModuleContext);

    const [module, setModule] = useState(null);
    const [moduleAvatar, setAvatarFile] = useState(null);
    const [pdf, setPDF] = useState({ document });

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
                    const moduleResponse = await access_or_login(`/modules/${moduleID}/`, { method: 'GET' }, navigate);
                    const jsonModule = await moduleResponse.json();
                    const moduleRes = jsonModule.module;
                    setModule(moduleRes);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleBack = (() => {
        navigate('/admin/module/list/');
        setModuleNumber(-1);
    });

    const handleEdit = (() => {
        navigate(`/admin/module/${moduleID}/edit/`);
    });

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
                            <div className='h-[100px] w-[100px] bg-primary rounded-full' />
                            <div className='flex flex-col'>
                                <p className='poppins-medium text-black text-[40px]'>MODULE {moduleNumber}:</p>
                                <p className='poppins-bold text-black text-base mt-[-6px]'>{module?.title}</p>
                            </div>
                        </div>
                        <div className='flex h-full w-full flex-col pt-6 pr-6 justify-between'>
                            <div className='flex flex-col h-auto w-full gap-4'>
                                <div className='flex flex-row'>
                                    <p className='poppins-semibold text-base pl-2 text-black'> PRICE:</p>
                                    <p className='poppins-medium text-base pl-2 text-[#767676]'>${module?.price}</p>
                                </div>
                                <div className='flex flex-row'>
                                    <p className='poppins-semibold text-base pl-2 text-black'> DURATION:</p>
                                    <p className='poppins-medium text-base pl-2 text-[#767676]'>{module?.duration}</p>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='poppins-semibold text-base pl-2 text-black'> DESCRIPTION:</p>
                                    <p className='poppins-medium text-base pl-2 text-[#767676]'>{module?.description}</p>
                                </div>
                                <div className='flex flex-col gap-1 custom-scrollbar'>
                                    <p className='poppins-semibold text-base pl-2 text-black'>PDF DOCUMENT:</p>
                                    <div className='flex flex-row w-full justify-start gap-4'>
                                        <a href={pdf.document} download='Module_Notes.pdf' className='flex flex-row ml-2 py-3 px-5 rounded-full text-[#767676] border gap-2 flex-grow-0 justify-center'>
                                            <UilLinkH />
                                            <p className='poppins-semibold text-base'>MODULE NOTES</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row w-full justify-center gap-4'>
                                <button className='py-3 px-8 bg-secondary poppins-semibold text-primary hover:text-white rounded-full hover:bg-primary hover:scale-105 hover:duration-200' onClick={handleEdit}>EDIT MODULE</button>
                            </div>
                        </div>
                    </div>
                    <div className='h-full w-full flex flex-col px-8 overflow-hidden'>
                        <AdminAllVideos moduleID={module?._id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index