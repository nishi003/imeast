import React, { useEffect, useState } from 'react';
import UserModuleCard from '../../Components/UserModuleViewCard';
import { UilAngleLeft, UilLinkH } from '@iconscout/react-unicons';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import UserVideoCard from '../../Components/UserVideoCard';
import Comments from '../../Components/Comments';

import document from '../../Assets/Documents/May_2024_Resume.pdf';

const Index = () => {
    const { moduleID, videoID } = useParams();
    const [module, setModule] = useState(-1);
    const [video, setVideo] = useState(-1);
    const [videoTitle, setVideoTitle] = useState("Neck & Shoulder, Shoulder Joint");

    const [category, setCategory] = useState("Neck & Shoulder, Shoulder Joint");
    const [description, setDescription] = useState("Treatment covers a wide range of conditions including general neck and shoulder pain, muscle cramps, and sprains. It also addresses cervical disk issues, straight neck syndrome, turtle neck syndrome, headaches, and numbness or tingling sensations in the arms and hands. Additional focuses include Impingement Syndrome, Frozen Shoulder, and Rotator Cuff tears.");
    const [duration, setDuration] = useState("3 hours");
    const [pdf, setPDF] = useState({ document });

    useEffect(() => {
        if (moduleID && videoID && !isNaN(moduleID) && !isNaN(videoID)) {
            setModule(parseInt(moduleID, 10));
            setVideo(parseInt(videoID, 10));
        } else if (moduleID && !isNaN(moduleID)) {
            setModule(parseInt(moduleID, 10));
        }
        else {
            setModule(-1);
        }
    }, [moduleID, videoID]);

    const handleBack = (() => {
        setModule(-1);
    });

    return (
        <div className='flex h-full w-full overflow-hidden p-8 bg-[#DEF1DD]'>
            {module === -1 ?
                <div className='h-full w-full flex flex-wrap justify-center gap-8 overflow-y-scroll custom-scrollbar'>
                    <UserModuleCard key={1} moduleId={1} setModule={setModule} />
                    <UserModuleCard key={2} moduleId={2} setModule={setModule} />
                    <UserModuleCard key={3} moduleId={3} setModule={setModule} />
                    <UserModuleCard key={4} moduleId={4} setModule={setModule} />
                    <UserModuleCard key={5} moduleId={5} setModule={setModule} />
                    <UserModuleCard key={6} moduleId={6} setModule={setModule} />
                </div>
                :
                <div className='h-full w-full flex flex-col flex-grow-0 flex-shrink-0 bg-white rounded-[30px] p-8 overflow-hidden'>
                    {video !== -1 ?
                        <div className='flex flex-col overflow-hidden gap-4 h-full'>
                            <Link onClick={() => { setVideo(-1) }} className='w-auto flex h-auto flex-row items-center' to={`/user/module/${module}/`}>
                                <UilAngleLeft color='#505050' />
                                <p className='poppins-bold text-[#505050] text-base'>Back</p>
                            </Link>
                            <div className='h-full w-full flex flex-row overflow-hidden'>
                                <div className='flex flex-col gap-3 overflow-y-scroll custom-scrollbar border-r-2 border-[#9F9F9F] pl-4 pr-12 flex-shrink-0 h-auto'>
                                    <div className='w-[1104px] h-[621px] bg-[#D9D9D9] flex-shrink-0' />
                                    <div className='flex flex-row items-center gap-2 mb-2'>
                                        <p className='poppins-bold text-[30px]'>LESSON {video}:</p>
                                        <p className='poppins-semibold text-[30px]'>{videoTitle}</p>
                                    </div>
                                    <Comments module={module} video={video} />
                                </div>
                                <div className='h-full w-full flex flex-col gap-8 overflow-y-scroll custom-scrollbar items-center mr-[-32px]'>
                                    <UserVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    <UserVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col overflow-hidden h-full'>
                            <Link onClick={() => { setVideo(-1); setModule(-1); }} className='w-auto flex h-auto flex-row items-center' to={`/user/module/list/`}>
                                <UilAngleLeft color='#505050' />
                                <p className='poppins-bold text-[#505050] text-base'>Back</p>
                            </Link>
                            <div className='h-full w-full flex flex-row overflow-hidden'>
                                <div className='w-[555px] border-r border-[#505050] flex flex-col flex-shrink-0'>
                                    <div className='flex flex-row gap-8 items-center border-b border-[#505050] pr-8 py-8 pl-2'>
                                        <div className='h-[100px] w-[100px] bg-primary rounded-full' />
                                        <div className='flex flex-col'>
                                            <p className='poppins-medium text-black text-[40px]'>MODULE {module}</p>
                                            <p className='poppins-bold text-black text-base mt-[-6px]'>{category}</p>
                                        </div>
                                    </div>
                                    <div className='flex h-full w-full flex-col pt-6 pr-6 justify-between'>
                                        <div className='flex flex-col h-auto w-full gap-4'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='poppins-medium text-base pl-2'>{description}</p>
                                            </div>
                                            <div className='flex flex-row'>
                                                <p className='poppins-semibold text-base pl-2'> DURATION:</p>
                                                <p className='poppins-medium text-base pl-2'>{duration}</p>
                                            </div>
                                            <div className='flex flex-col gap-1 custom-scrollbar'>
                                                <div className='flex flex-row w-full justify-start gap-4'>
                                                    <a href={pdf.document} download='Module_Notes.pdf' className='flex flex-row ml-2 py-3 px-5 rounded-full border gap-2 flex-grow-0 justify-center'>
                                                        <UilLinkH />
                                                        <p className='poppins-semibold text-base'>MODULE NOTES</p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='h-full w-full flex flex-col px-8 overflow-hidden'>
                                    <div className='h-full w-full flex flex-col gap-8 overflow-y-scroll custom-scrollbar'>
                                        <UserVideoCard lesson={1} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={2} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={3} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={4} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={5} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={6} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={7} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={8} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={9} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={10} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={11} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                        <UserVideoCard lesson={12} title='Neck & Shoulder, Shoulder Joint' module={module} setVideo={setVideo} video={video} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default Index