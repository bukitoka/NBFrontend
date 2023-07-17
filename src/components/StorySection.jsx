import { ChevronRightIcon } from "@heroicons/react/20/solid"

const StorySection = () => {
    return (
        <section aria-labelledby="category-heading" className="bg-white">
            <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-baseline sm:justify-between">
                    <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                        Beauty Stories
                    </h2>
                    <a href="#" className="hidden lg:flex group py-2 px-6 rounded-full text-sm bg-gray-100 font-semibold text-gray-800 hover:text-yellow-600">
                        Browse all stories
                        <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
                    </a>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
                    <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2">
                        <img
                            src="https://images.unsplash.com/photo-1520207588543-1e545b20c19e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80"
                            alt="Two models wearing women's black cotton crewneck tee and off-white cotton crewneck tee."
                            className="object-cover object-center group-hover:opacity-75"
                        />
                        <div aria-hidden="true" className="bg-gradient-to-b from-transparent to-black opacity-50" />
                        <div className="flex items-end p-6">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        Beauty daily with Laura
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    6 min read
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                        <img
                            src="https://images.unsplash.com/photo-1571497587098-d5b661744605?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt="Wooden shelf with gray and olive drab green baseball caps, next to wooden clothes hanger with sweaters."
                            className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                        />
                        <div
                            aria-hidden="true"
                            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                        />
                        <div className="flex items-end p-6 sm:absolute sm:inset-0">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        Melisa's beach story
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    4 min read
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full">
                        <img
                            src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhdGluZ3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                            alt="Walnut desk organizer set with white modular trays, next to porcelain mug on wooden desk."
                            className="object-cover object-center group-hover:opacity-75 sm:absolute sm:inset-0 sm:h-full sm:w-full"
                        />
                        <div
                            aria-hidden="true"
                            className="bg-gradient-to-b from-transparent to-black opacity-50 sm:absolute sm:inset-0"
                        />
                        <div className="flex items-end p-6 sm:absolute sm:inset-0">
                            <div>
                                <h3 className="font-semibold text-white">
                                    <a href="#">
                                        <span className="absolute inset-0" />
                                        Special Moments, Tips and trick!
                                    </a>
                                </h3>
                                <p aria-hidden="true" className="mt-1 text-sm text-white">
                                    5 min read
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex lg:hidden justify-center mt-8 w-full">
                    <a href="#" className="bg-black hover:bg-yellow-600 flex py-2 px-6 text-sm text-white rounded-full group">
                        Browse all stories  <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:ml-4 ease-linear duration-150" />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default StorySection