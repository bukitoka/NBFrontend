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
                            Shopping becomes more beautiful with exclusive promos. Happy shopping!
                        </p>
                    </div>
                    <div className="mt-12 relative flex flex-nowrap flex-row space-x-2 lg:space-x-8 overflow-auto rounded-lg">
                        <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="flex-1 flex-shrink-0 h-56 object-cover rounded-lg"
                        />
                        <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="flex-1 flex-shrink-0 h-56 object-cover rounded-lg"
                        />
                        <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="flex-1 flex-shrink-0 h-56 object-cover rounded-lg"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-8 w-full">
                    <a href="#" className="bg-black py-2 px-5 text-sm text-white rounded-full">
                        See all promo
                    </a>
                </div>
            </div>
        </div>
    )
}

export default TopPromo
