import { useState, createContext } from 'react';

export const UserContext = createContext({
    id: -1,
    setID: () => { },
});

export const useUserContext = () => {
    const [id, setID] = useState(-1);

    return {
        id, setID,
    };
};