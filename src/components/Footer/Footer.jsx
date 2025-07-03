import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa'

const FotterLinks = [
    {
        title: "Home",
        link: "/#",
    },
    {
        title: "About",
        link: "/about",
    },
    {
        title: "Contact",
        link: "/contact",
    },
    {
        title: "Blog",
        link: "/blog",
    },
]

const  Footer = () => {
  return (
    <div className='bg-gray-700 dark:bg-dark bg
      text-white'>
        <div className='container'>
        <div className="grid md:grid-cols-3 p-5
        ">
            {/*---------- comapany details ----------------------*/}
            <div className='py-8 px-4'>
                <h1 className='text-xl sm:text-3xl font-bold
                sm:text-left text-justify mb-3 gap-3 flex items-center'>
                    CarRental
                    </h1>
                    <p>
                       Drive your dreams with ease! CarRental offers a seamless experience for booking
                        reliable and affordable vehicles, perfect for every journey. 
                    </p>
                    <br />
                    <div className='flex items-center gap-3'>
                        <FaLocationArrow/>
                        <p>Ambala, Haryana, India</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <FaMobileAlt/>
                        <p>+918527619456</p>
                    </div>

                    {/*------------- social handles -----------------*/}
                    <div className='flex items-center gap-3 mt-3'>
                        <a href="#">
                            <FaInstagram
                            className='text-3xl hover:text-primary
                            duration-300'/>
                        </a>
                        <a href="#">
                            <FaFacebook
                            className='text-3xl hover:text-primary
                            duration-300'/>
                        </a>
                        <a href="#">
                            <FaLinkedin
                            className='text-3xl hover:text-primary
                            duration-300'/>
                        </a>
                    </div>
            </div>
            {/* ---------------Navlinks -------------------*/}
            <div className='grid grid-cols-2 sm:grid-cols-3
            col-span-2 md:pl-10'>

                {/*- first-col---------- */}
                <div>
                    <div className='py-8 px-4'>
                        <h1 className='text-xl font-bold
                        sm:text-left text-justify mb-3'>Important Links</h1>
                        <ul className='flex flex-col gap-3'>
                            {
                                FotterLinks.map((data)=>{
                                    return (
                                        <li key={data.title}
                                        className='cursor-pointer 
                                        hover:text-primary duration-300'>
                                            <span className='mr-2'>&#11162;</span>
                                            <a href={data.link}>
                                                {data.title}
                                                
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/*- second-col---------- */}
                <div>
                    <div className='py-8 px-4'>
                        <h1 className='text-xl font-bold
                        sm:text-left text-justify mb-3'>Important Links</h1>
                        <ul className='flex flex-col gap-3'>
                            {
                                FotterLinks.map((data)=>{
                                    return (
                                        <li key={data.title}
                                        className='cursor-pointer 
                                        hover:text-primary duration-300'>
                                            <span className='mr-2'>&#11162;</span>
                                            <a href={data.link}>
                                                {data.title}
                                                
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                {/*- third-col---------- */}
                <div>
                    <div className='py-8 px-4'>
                        <h1 className='text-xl font-bold
                        sm:text-left text-justify mb-3'>Important Links</h1>
                        <ul className='flex flex-col gap-3'>
                            {
                                FotterLinks.map((data)=>{
                                    return (
                                        <li key={data.title}
                                        className='cursor-pointer 
                                        hover:text-primary duration-300'>
                                            <span className='mr-2'>&#11162;</span>
                                            <a href={data.link}>
                                                {data.title}
                                                
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
  )
}

export default Footer