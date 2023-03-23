import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
    children: React.ReactNode;
}

interface UserAuth {
    user_id: number;
    auth_token: string;
}


const AdminAuth: React.FC<Props> = ({ children }) => {
    
    let [ user, setUser ] = useState<UserAuth | null>(null)
    
    useEffect(() => {
        setTimeout(() => {
            const user_auth : UserAuth = { user_id: 0, auth_token: "" }
            setUser(user_auth);
        }, 1500)
    }, []);

    return (
        user === null
            ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            :
                <>{children}</>
    )

}


export default AdminAuth;
