import { ChevronRightIcon } from "@heroicons/react/20/solid"

const TopBanner = () => {
    return (
        <div className="flex justify-center items-center gap-x-6 backdrop-blur-[14px] bg-black/90 py-2 px-2 lg:px-6">
            <div className="bg-clip-text text-transparent bg-yellow-500 lg:bg-gradient-to-t from-yellow-700 to-yellow-200">
                <p className="text-sm leading-6">
                    <a href="#" className="flex items-center">
                        <span className="hidden lg:inline font-semibold">BEAUTY PROMO &nbsp;–&nbsp;</span>
                        Register now and get 10% off for all product
                        <ChevronRightIcon className="text-yellow-600 w-5 h-5 ml-3" />
                    </a>
                </p>
            </div>
        </div>
    )
}

export default TopBanner