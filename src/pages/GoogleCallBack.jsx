import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { googleAuthenticate } from "../tools/auth";


const GoogleCallBack = () => {

    const navigate = useNavigate();

    const authenticate = async (code) => {
        const { error } = await googleAuthenticate(code);

        if (error) {
            console.log(error);
        } else {
            navigate('/');
        }
    };

    useEffect(() => {

        const { code } = queryString.parse(location.search);

        if (code) {
            authenticate(code);
        } else {
            navigate('/');
        }

    }, []);

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <h5 className="text-gray-800">You will be redirected to homepage automatically, please wait ...</h5>
        </div>
    );
};

export default GoogleCallBack;
