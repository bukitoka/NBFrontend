import { XMarkIcon } from '@heroicons/react/20/solid'

const TopBanner = () => {
    return (
        <div className="flex justify-center items-center gap-x-6 backdrop-blur-[14px] bg-black/90 px-6 py-2 sm:px-3.5">
            <div className="bg-clip-text text-transparent bg-gradient-to-t from-yellow-700 to-yellow-200">
                <p className="text-sm leading-6">
                    <a href="#">
                        <strong className="font-semibold">SPECIAL</strong>
                        &nbsp;–&nbsp;
                        Shop now and get 15% off for all product &nbsp;<span aria-hidden="true">&rarr;</span>
                    </a>
                </p>
            </div>
        </div>
    )
}

export default TopBanner