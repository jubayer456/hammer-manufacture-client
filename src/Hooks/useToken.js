import React, { useEffect, useState } from 'react';

const useToken = (user) => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user?.email;
        const currentUser = { email: email }
        if (email) {
            fetch(`https://agile-chamber-23774.herokuapp.com/users/${email}`, {
                method: 'PUT',
                headers: {
                    'body-content': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accesssToken = data.token;
                    localStorage.setItem('accessToken', accesssToken);
                    setToken(accesssToken);
                })
        }
    }, [user])
    return [token];
};

export default useToken;