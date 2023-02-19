import React from 'react'
import Fade from 'react-reveal/Fade'
import Image from 'next/image'

function WhatDoTheySay() {
    return (
        // what do they say
        <div className="flex flex-col items-center justify-center my-12 lg:my-0 lg:h-[100vh] 3xl:h-full 3xl:my-36">
            <h1 className="text-3xl lg:text-5xl font-bold text-font-color-light 3xl:mb-12">What do they say about us?</h1>
            <div className="flex flex-col lg:flex-row items-center justify-center xl:w-9/12 h-3/4 mt-10">
                <Fade left>
                    <div className="flex flex-col items-center justify-center lg:w-1/3 h-full space-y-10 lg:mx-12">
                        <div className="flex flex-col items-start px-6 justify-center w-full lg:h-3/4 space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="flex flex-col items-start px-6 justify-center w-full lg:h-3/4 space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </Fade>
                <Fade up>
                    <div className="flex flex-col items-center justify-center lg:w-1/3 h-full space-y-10 mt-10 lg:mt-0">
                        <div className="flex flex-col items-start px-6 justify-center w-full lg:h-3/4 space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="flex flex-col items-start px-6 justify-center w-full lg:h-3/4 space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </Fade>
                <Fade right>
                    <div className="lg:flex flex-col items-center justify-center lg:w-1/3 h-full space-y-10 mt-10 lg:mt-0 hidden">
                        <div className="flex flex-col items-start px-6 justify-center w-full lg:h-3/4 space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="flex flex-col items-start px-6 justify-center w-full h-3/4  space-y-5">
                            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <Image
                                    width={100}
                                    height={100}
                                    className='object-cover w-full h-full rounded-full'
                                    src="/lego.jpg" alt="user" />
                            </div>
                            <p className="text-xl font-bold text-font-color-light">John Doe</p>
                            <p className="text-base text-font-color-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    )
}

export default WhatDoTheySay