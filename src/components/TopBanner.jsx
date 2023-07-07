const TopBanner = () => {
    return (
        <div className="flex justify-center items-center gap-x-6 backdrop-blur-[14px] bg-black/90 px-6 py-2 sm:px-2">
            <div className="bg-clip-text text-transparent bg-yellow-500 lg:bg-gradient-to-t from-yellow-700 to-yellow-200">
                <p className="text-sm leading-6">
                    <a href="#">
                        <strong className="font-semibold">BEAUTY PROMO</strong>
                        &nbsp;–&nbsp;
                        Register now and get 10% off for all product &nbsp;<span aria-hidden="true">&rarr;</span>
                    </a>
                </p>
            </div>
        </div>
    )
}

export default TopBanner