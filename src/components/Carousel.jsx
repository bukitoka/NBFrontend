import { register } from 'swiper/element/bundle';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const Carousel = () => {

    // Register Swiper Element
    register();

    return (
        <div className="bg-gray-100 pt-[130px] lg:pt-[86px] border-b border-b-gray-200">
            <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-24 lg:px-8">
                <swiper-container
                    rewind="true"
                    effect="fade"
                    autoplay="true"
                    autoplay-delay="5000"
                    navigation-next-el=".swiper-button-next"
                    navigation-prev-el=".swiper-button-prev"
                >
                    <swiper-slide>
                        <img
                            src="https://images.unsplash.com/photo-1583241800698-e8ab01830a07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="h-[450px] w-full object-cover object-center rounded-lg"
                        />
                    </swiper-slide>
                    <swiper-slide>
                        <img
                            src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="h-[450px] w-full object-cover object-center rounded-lg"
                        />
                    </swiper-slide>
                    <swiper-slide>
                        <img
                            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                            alt=""
                            className="h-[450px] w-full object-cover object-center rounded-lg"
                        />
                    </swiper-slide>

                    <ChevronLeftIcon aria-hidden="true" className="swiper-button-prev h-10 w-10 text-lg bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-black" />
                    <ChevronRightIcon aria-hidden="true" className="swiper-button-next h-10 w-10 text-lg bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-black" />

                </swiper-container>

            </div>
        </div>
    )
}

export default Carousel
