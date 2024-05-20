import React, { useState } from 'react';
import { UilAngleLeft, UilLinkH } from '@iconscout/react-unicons';
import AdminModuleCard from '../../Components/AdminModuleCard';
import AdminVideoCard from '../../Components/AdminVideoCard';
import Comments from '../../Components/Comments';

import document from '../../Assets/Documents/May_2024_Resume.pdf';
import './style.css';
import { Link } from 'react-router-dom';

const Index = () => {
    const [type, typeChange] = useState("");
    const [module, setModule] = useState(-1);
    const [price, setPrice] = useState("149.99");
    const [category, setCategory] = useState("Neck & Shoulder, Shoulder Joint");
    const [description, setDescription] = useState("Treatment covers a wide range of conditions including general neck and shoulder pain, muscle cramps, and sprains. It also addresses cervical disk issues, straight neck syndrome, turtle neck syndrome, headaches, and numbness or tingling sensations in the arms and hands. Additional focuses include Impingement Syndrome, Frozen Shoulder, and Rotator Cuff tears.");
    const [duration, setDuration] = useState("3 hours");
    const [pdf, setPDF] = useState({ document });
    const [video, setVideo] = useState(-1);
    const [videoTitle, setVideoTitle] = useState("Neck & Shoulder, Shoulder Joint");
    const [videos, setVideos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    const handlePriceChange = ((event) => {
        const newPrice = event.target.value;
        setPrice(newPrice);
    });

    const handleDurationChange = ((event) => {
        const newDuration = event.target.value;
        setDuration(newDuration);
    });

    const handleDescriptionChange = ((event) => {
        const newDescription = event.target.value;
        setDescription(newDescription);
    });

    const handleBack = (() => {
        setModule(-1);
        setIsEdit(false);
    });

    return (
        <div className='h-full w-full bg-[#DEF1DD] flex p-8 gap-4 overflow-hidden'>
            {module === -1 ?
                <div className='h-full w-auto flex flex-wrap gap-8 overflow-y-scroll custom-scrollbar justify-center'>
                    <AdminModuleCard id={1} setModule={setModule} />
                    <AdminModuleCard id={2} setModule={setModule} />
                    <AdminModuleCard id={3} setModule={setModule} />
                    <AdminModuleCard id={4} setModule={setModule} />
                    <AdminModuleCard id={5} setModule={setModule} />
                    <AdminModuleCard id={6} setModule={setModule} />
                    <AdminModuleCard id={7} setModule={setModule} />
                    <AdminModuleCard id={8} setModule={setModule} />
                    <AdminModuleCard id={9} setModule={setModule} />
                </div>
                :
                <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 overflow-hidden bg-white rounded-[30px] p-8'>
                    {video !== -1 ?
                        <>
                            <Link onClick={() => { setVideo(-1) }} className='w-auto flex h-auto flex-row items-center' to={`/admin/module/${module}/`}>
                                <UilAngleLeft color='#505050' />
                                <p className='poppins-bold text-[#505050] text-base'>Back</p>
                            </Link>
                            <div className='h-full w-full flex flex-row p-4 overflow-hidden flex-shrink-0'>
                                <div className='flex flex-col gap-3 overflow-y-scroll custom-scrollbar border-r-2 border-[#9F9F9F] pr-12 flex-shrink-0'>
                                    <div className='w-[1104px] h-[621px] bg-[#D9D9D9] flex-shrink-0' />
                                    <div className='flex flex-row items-center gap-2 mb-2'>
                                        <p className='poppins-bold text-[30px]'>LESSON {video}:</p>
                                        <p className='poppins-semibold text-[30px]'>{videoTitle}</p>
                                    </div>
                                    <Comments module={module} video={video} />
                                </div>
                                <div className='h-full w-full flex flex-col gap-8 overflow-y-scroll pl-12 custom-scrollbar items-center'>
                                    <AdminVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                    <AdminVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' setVideo={setVideo} video={video} />
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Link onClick={handleBack} className='w-auto flex h-auto flex-row items-center' to={`/admin/module/list/`}>
                                <UilAngleLeft color='#505050' />
                                <p className='poppins-bold text-[#505050] text-base'>Back</p>
                            </Link>
                            <div className='h-full w-full flex flex-row'>
                                <div className='h-auto w-[555px] border-r border-[#505050] flex flex-col flex-shrink-0'>
                                    <div className='flex flex-row gap-8 items-center border-b border-[#505050] pr-8 py-8 pl-2'>
                                        <div className='h-[100px] w-[100px] bg-primary rounded-full' />
                                        <div className='flex flex-col'>
                                            <p className='poppins-medium text-black text-[40px]'>MODULE {module}</p>
                                            <p className='poppins-bold text-black text-base mt-[-6px]'>{category}</p>
                                        </div>
                                    </div>
                                    <div className='flex h-full w-full flex-col py-6 pr-6 justify-between'>
                                        {isEdit ?
                                            <>
                                                <div className='flex flex-col h-auto w-full gap-4'>
                                                    <div className='flex flex-col gap-1'>
                                                        <label htmlFor='price' className='poppins-semibold text-base pl-2 text-black'>PRICE:</label>
                                                        <input type='number' name='price' className='w-full px-3 py-2 border border-[#9F9F9F] text-base poppins-semibold rounded-xl text-[#9F9F9F] focus:outline-[#767676] focus:text-black' value={price} required onChange={handlePriceChange} min={0} />
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <label htmlFor='duration' className='poppins-semibold text-base pl-2 text-black'>DURATION:</label>
                                                        <input type='text' name='duration' className='w-full px-3 py-2 border border-[#9F9F9F] text-base poppins-semibold rounded-xl text-[#9F9F9F] focus:outline-[#767676] focus:text-black' value={duration} required onChange={handleDurationChange} />
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <label htmlFor='description' className='poppins-semibold text-base pl-2 text-black'>DESCRIPTION:</label>
                                                        <textarea rows="5" className="w-full px-3 py-2 border border-[#9F9F9F] rounded-xl text-base resize-none poppins-medium text-[#9F9F9F] focus:outline-[#767676] focus:text-black custom-scrollbar" value={description} onChange={handleDescriptionChange} />
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <label htmlFor='file' className='poppins-semibold text-base pl-2 text-black'>PDF DOCUMENT:</label>
                                                        <input type='file' name='file' accept='.pdf' className='border border-[#9F9F9F] rounded-md p-3 poppins-semibold text-[#767676] text-sm' />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row w-full justify-center gap-4'>
                                                    <Link className='py-3 px-8 bg-red-300 poppins-semibold text-red-500 hover:text-white rounded-full hover:bg-red-500 hover:scale-105 hover:duration-200' onClick={() => { setIsEdit(false) }} to={`/admin/module/${module}/`}>BACK</Link>
                                                    <Link className='py-3 px-8 bg-secondary poppins-semibold text-primary rounded-full hover:text-white hover:bg-primary hover:scale-105 hover:duration-200' onClick={() => { console.log('handle update') }} to={`/admin/module/${module}/`}>UPDATE</Link>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='flex flex-col h-auto w-full gap-4'>
                                                    <div className='flex flex-row'>
                                                        <p className='poppins-semibold text-base pl-2 text-black'> PRICE:</p>
                                                        <p className='poppins-medium text-base pl-2 text-[#767676]'>${price}</p>
                                                    </div>
                                                    <div className='flex flex-row'>
                                                        <p className='poppins-semibold text-base pl-2 text-black'> DURATION:</p>
                                                        <p className='poppins-medium text-base pl-2 text-[#767676]'>{duration}</p>
                                                    </div>
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='poppins-semibold text-base pl-2 text-black'> DESCRIPTION:</p>
                                                        <p className='poppins-medium text-base pl-2 text-[#767676]'>{description}</p>
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
                                                    <Link className='py-3 px-8 bg-secondary poppins-semibold text-primary hover:text-white rounded-full hover:bg-primary hover:scale-105 hover:duration-200' onClick={() => { setIsEdit(true) }} to={`/admin/module/${module}/edit/`}>EDIT MODULE</Link>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                <div className='h-full w-full flex flex-col px-8 p-6 overflow-hidden'>
                                    <div className='h-full w-full flex flex-col gap-8 overflow-y-scroll custom-scrollbar'>
                                        <AdminVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <AdminVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default Index