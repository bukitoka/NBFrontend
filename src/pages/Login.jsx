import { SiGoogle } from "@icons-pack/react-simple-icons"
import { nanobeepa } from "../assets"

const Login = () => {
    return (
        <div className="bg-white h-screen block lg:grid lg:grid-cols-2">
            <div className="w-full px-8 md:px-32 lg:px-24 pt-16">
                <div className="py-12 sm:px-12">
                    <div className="mb-3">
                        <div className="flex justify-center">
                            <img className="h-8 w-auto" src={nanobeepa} alt="nanobeepa.com" />
                            <h2 className='text-2xl font-bold leading-9 tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-yellow-600 to-yellow-200 ml-3'>NanoBeepa</h2>
                        </div>
                        <h2 className="mb-6 mt-3 text-2xl text-center font-bold leading-9 tracking-tight text-zinc-800">
                            Login to your account
                        </h2>
                    </div>
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    placeholder="youremail@domain.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-lg border-0 py-3 px-4 bg-zinc-50 focus:bg-white text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm leading-6">
                                <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-800">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-lg bg-zinc-800 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            >
                                Sign in
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
                                className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-3 bg-white hover:bg-zinc-800 text-gray-800 hover:text-zinc-100 ring-1 ring-inset ring-gray-300 hover:ring-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                            >
                                <SiGoogle className="w-4 h-4" />
                                <span className="text-sm font-semibold leading-6">Login with Google</span>
                            </a>
                        </div>
                        <div className="mt-6">
                            <p className="text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-800">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1599022484226-1e18b28d32d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                    alt=""
                    className="h-full w-full object-cover object-bottom"
                />
                <div className="absolute bottom-0 mb-20 mx-20 backdrop-blur-[14px] bg-black/40 p-8 rounded-xl">
                    <div className="flex flex-col items-center text-center">
                        <h4 className="text-2xl font-bold tracking-tight text-zinc-200">
                            <span className="block sm:inline">Hi, Welcome back beautiful!</span>
                        </h4>
                        <p className="mt-3 text-xl text-zinc-200 italic">
                            Beauty and Glamour Await - Sign in to explore our handpicked cosmetic treasures.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login