import { nanobeepa, google } from "../assets"

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from "../tools/auth";

import {
    EyeIcon,
    EyeSlashIcon,
} from '@heroicons/react/24/outline'

const Signup = () => {

    const navigate = useNavigate();
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn()) {
            navigate('/');
        }
    }, []);

    const resetForm = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword1('');
        setPassword2('');
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        const { error } = await register(first_name, last_name, email, password1, password2);

        if (error) {
            toast.error(error);
        } else {
            toast.success("Email Verification Sent! Please check your email.");
            resetForm();
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const googleid = import.meta.env.VITE_GOOGLE_CLIENT_ID;
            const googleurl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/google/&prompt=consent&response_type=code&client_id=${googleid}&scope=openid%20email%20profile&access_type=offline`;
            const response = window.open(googleurl, "_self");

            return response;

        } catch (err) {
            console.log(err);
            const response = "Unable to Sign Up with Google";

            return response;
        }
    };
  
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
 
    return (
        <div className="bg-white h-screen block lg:grid lg:grid-cols-2">
            <div className="w-full px-8 md:px-24 lg:px-16">

                <ToastContainer
                    toastClassName="rounded-lg"
                    bodyClassName="text-sm font-semibold"
                    position="top-center"
                />

                <div className="py-12 sm:px-12">
                    <div className="mb-3">
                        <a href="/" className="flex justify-center">
                            <img className="h-8 w-auto" src={nanobeepa} alt="nanobeepa.com" />
                            <h2 className='text-2xl font-bold leading-9 tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-200 ml-3'>NanoBeepa</h2>
                        </a>
                        <h2 className="mb-6 mt-3 text-2xl text-center font-bold leading-9 tracking-tight text-zinc-800">
                            Create an account
                        </h2>
                    </div>

                    <form className="space-y-6" method="POST" onSubmit={handleRegister}>
                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            <div className="w-full">
                                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        required
                                        className="w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        placeholder="First Name"
                                        value={first_name}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full mt-6 lg:mt-0">
                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        required
                                        className="w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        placeholder="Last Name"
                                        value={last_name}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    placeholder="youremail@domain.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-4">
                            <div className="w-full">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type= {showPassword ? "text": "password"}
                                        required
                                        className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        placeholder="••••••••"
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ?  <EyeIcon  className="h-5 w-5" aria-hidden="true"/> : <EyeSlashIcon className="h-5 w-5" aria-hidden="true"/> }
                                    </button>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-6 lg:mt-0">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <div className="relative">
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type= {showPassword ? "text":"password"}
                                        autoComplete="confirm-password"
                                        required
                                        className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                        placeholder="••••••••"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                    />
                                     <button 
                                        type="button"
                                        onClick={handleTogglePassword}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        {showPassword ?  <EyeIcon  className="h-5 w-5" aria-hidden="true"/> : <EyeSlashIcon className="h-5 w-5" aria-hidden="true"/> }
                                    </button>

                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="term-condition"
                                    name="term-condition"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                />
                                <label htmlFor="term-condition" className="ml-3 block text-sm leading-6 text-gray-900">
                                    I accept the <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-800">Terms and Conditions</a>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-zinc-800 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>

                    <div>
                        <div className="relative mt-10">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-500">Or</span>
                            </div>
                        </div>

                        <div className="mt-6 flex">
                            <a
                                href="#"
                                onClick={handleGoogleSignUp}
                                className="relative flex w-full items-center justify-start rounded-lg py-3 bg-white hover:bg-zinc-800 text-zinc-800 hover:text-zinc-100 ring-1 hover:ring-0 ring-inset ring-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 overflow-hidden"
                            >
                                <div className="px-4 absolute py-3 m-1 bg-white rounded-md">
                                    <img src={google} className="w-4 h-4" />
                                </div>
                                <div className="text-sm w-full flex justify-center font-semibold leading-6">
                                    Sign up with Google
                                </div>
                            </a>
                        </div>
                        <div className="mt-6">
                            <p className="text-center text-sm text-gray-500">
                                Already have an account ?{' '}
                                <a href="/signin" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-800">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1602037299890-c593f4c81d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt=""
                    className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 mb-20 mx-20 backdrop-blur-[14px] bg-black/40 p-8 rounded-xl">
                    <div className="flex flex-col items-center text-center">
                        <h4 className="text-2xl font-bold tracking-tight text-zinc-200">
                            <span className="block sm:inline">Hi beautiful!</span>
                        </h4>
                        <p className="mt-3 text-xl text-zinc-200 italic">
                            Welcome to a World of Beauty and Glamour - Sign up and discover Handpicked Cosmetic Treasures!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
