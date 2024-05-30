import { useState, createContext, useEffect } from 'react';

export const ModuleContext = createContext({
    moduleNumber: -1,
    setModuleNumber: () => { },
});

export const LessonContext = createContext({
    lessonNumber: -1,
    setLessonNumber: () => { },
});

export const CommentContext = createContext({
    commentID: -1,
    setCommentID: () => { },
});

const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};

export const useModuleContext = () => {
    const [moduleNumber, setModuleNumber] = usePersistedState('moduleNumber', -1);

    return {
        moduleNumber, setModuleNumber,
    };
};

export const useLessonContext = () => {
    const [lessonNumber, setLessonNumber] = usePersistedState('lessonNumber', -1);

    return {
        lessonNumber, setLessonNumber,
    };
};

export const useCommentContext = () => {
    const [commentID, setCommentID] = usePersistedState('commentID', -1);

    return {
        commentID, setCommentID,
    };
};
