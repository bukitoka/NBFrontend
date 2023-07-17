import { ChevronRightIcon } from "@heroicons/react/20/solid"

const TopPromo = () => {
    return (
        <div className="bg-white lg:py-16 py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Special promo for you!
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Beauty shopping with exclusive promos everyday. Happy shopping!
                        </p>
                    </div>
                    <div className="mt-12 flex flex-row space-x-4 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0 overflow-x-auto rounded-lg">
                        <a href="#" className="flex flex-shrink-0 overflow-hidden rounded-lg">
                            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-60 w-80 lg:w-96 object-cover rounded-lg hover:scale-110 ease-in duration-150"
                            />
                        </a>
                        <a href="#" className="flex flex-shrink-0 overflow-hidden rounded-lg">
                            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-60 w-80 lg:w-96 object-cover rounded-lg hover:scale-110 ease-in duration-150"
                            />
                        </a>
                        <a href="#" className="flex flex-shrink-0 overflow-hidden rounded-lg">
                            <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                                alt=""
                                className="h-60 w-80 lg:w-96 object-cover rounded-lg hover:scale-110 ease-in duration-150"
                            />
                        </a>
                    </div>
                </div>
                <div className="flex justify-center mt-8 w-full">
                    <a href="#" className="bg-black group hover:bg-yellow-600 flex py-2 px-6 text-sm text-white rounded-full">
                        Browse all promo  <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopPromo
