import { useState, createContext } from 'react';

export const ModuleContext = createContext({
    moduleNumber: -1,
    setModuleNumber: () => { },
});

export const LessonContext = createContext({
    lessonNumber: -1,
    setLessonNumber: () => { },
});

export const useModuleContext = () => {
    const [moduleNumber, setModuleNumber] = useState(-1);

    return {
        moduleNumber, setModuleNumber,
    };
};

export const useLessonContext = () => {
    const [lessonNumber, setLessonNumber] = useState(-1);

    return {
        lessonNumber, setLessonNumber,
    };
};