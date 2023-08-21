import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { verifyEmail } from "../tools/auth";


const VerifyEmail = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const verify = async (key) => {
        const { error } = await verifyEmail(key);

        if (error) {
            setMessage('Something went wrong, please try again later.', error);
        } else {
            setMessage('Your email has been verified successfully, you will be redirected to sign in page automatically');
            setTimeout(() => {
                navigate('/signin');
            }, 1000);
        }
    };

    useEffect(() => {

        const { key } = queryString.parse(location.search);

        if (key) {
            verify(key);
        } else {
            navigate('/');
        }

    }, []);

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <h5 className="text-gray-800">{message}</h5>
        </div>
    );
};

export default VerifyEmail;
