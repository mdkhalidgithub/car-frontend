import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaLocationArrow, FaMobileAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const FotterLinks = [
  { title: "Home", link: "/" },
  { title: "Cars", link: "/cars" },
  { title: "About", link: "/about" },
  { title: "Booking", link: "/booking" },
];

const ServiceLinks = [
  { title: "Best Price", link: "/#services" },
  { title: "Fast and Safe", link: "/#services" },
  { title: "Experienced Drivers", link: "/#services" },
];

const LegalLinks = [
  { title: "Privacy Policy", link: "#" },
  { title: "Terms of Service", link: "#" },
  { title: "Support", link: "#" },
];

const Footer = () => {
  return (
    <div className='bg-gray-800 dark:bg-dark text-white pt-10 pb-6'>
      <div className='container mx-auto px-4'>
        <div className="grid md:grid-cols-3 gap-8 p-5">
          {/*---------- company details ----------------------*/}
          <div className='space-y-4'>
            <h1 className='text-2xl sm:text-3xl font-bold font-serif text-primary'>
              CarRental
            </h1>
            <p className="text-gray-300">
              Drive your dreams with ease! CarRental offers a seamless experience for booking reliable and affordable vehicles, perfect for every journey. 
            </p>
            <div className='space-y-2 text-gray-300 text-sm'>
              <div className='flex items-center gap-3'>
                <FaLocationArrow className="text-primary" />
                <p>Ambala, Haryana, India</p>
              </div>
              <div className='flex items-center gap-3'>
                <FaMobileAlt className="text-primary" />
                <p>+91 85276 19456</p>
              </div>
            </div>

            {/*------------- social handles -----------------*/}
            <div className='flex items-center gap-4 pt-2'>
              <a href="#" className="hover:text-primary transition-colors">
                <FaInstagram className='text-2xl' />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaFacebook className='text-2xl' />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <FaLinkedin className='text-2xl' />
              </a>
            </div>
          </div>

          {/* --------------- Navlinks -------------------*/}
          <div className='grid grid-cols-3 col-span-2 gap-4 md:pl-10'>
            {/*- first-col---------- */}
            <div>
              <h1 className='text-lg font-bold mb-4 border-b border-gray-700 pb-2'>Quick Links</h1>
              <ul className='flex flex-col gap-2 text-sm text-gray-300'>
                {FotterLinks.map((data) => (
                  <li key={data.title} className='cursor-pointer hover:text-primary duration-300 flex items-center'>
                    <span className='mr-2 text-xs'>&#11162;</span>
                    <Link to={data.link}>{data.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/*- second-col---------- */}
            <div>
              <h1 className='text-lg font-bold mb-4 border-b border-gray-700 pb-2'>Our Services</h1>
              <ul className='flex flex-col gap-2 text-sm text-gray-300'>
                {ServiceLinks.map((data) => (
                  <li key={data.title} className='cursor-pointer hover:text-primary duration-300 flex items-center'>
                    <span className='mr-2 text-xs'>&#11162;</span>
                    <a href={data.link}>{data.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/*- third-col---------- */}
            <div>
              <h1 className='text-lg font-bold mb-4 border-b border-gray-700 pb-2'>Legal & Support</h1>
              <ul className='flex flex-col gap-2 text-sm text-gray-300'>
                {LegalLinks.map((data) => (
                  <li key={data.title} className='cursor-pointer hover:text-primary duration-300 flex items-center'>
                    <span className='mr-2 text-xs'>&#11162;</span>
                    <a href={data.link}>{data.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-400">
          <p>© 2026 CarRental. All rights reserved. Made with ❤️ by MD KHALID</p>
        </div>
      </div>
    </div>
  )
}

export default Footer