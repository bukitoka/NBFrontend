const CategorySection = ({ categories }) => {
    return (
        <section aria-labelledby="category-heading" className="pt-10 xl:mx-auto xl:max-w-7xl xl:px-8">
            <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
                <h2 id="category-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                    Popular Categories
                </h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <div className="mx-auto max-w-7xl px-4 lg:px-0">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="mt-12 flex flex-row space-x-4 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:space-x-0 overflow-x-auto rounded-lg">
                        {categories.map((category) => (
                            <a
                                key={category.name}
                                href={category.href}
                                className="flex flex-shrink-0"
                            >
                                <img src={category.imageSrc} alt="" className="h-80 w-full object-cover rounded-lg" />
                                <span
                                    aria-hidden="true"
                                    className="relative z-20 h-2/3 bg-gradient-to-t from-gray-800 opacity-10"
                                />
                                <span className="relative mt-auto text-center text-xl font-bold text-black">{category.name}</span>

                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 px-4 sm:hidden">
                <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </section>
    )
}

export default CategorySection