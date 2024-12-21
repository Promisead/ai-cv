import React from 'react'
import { FaFileInvoice } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";


const Footer = () => {
  return (
    <div>
      <footer
      className="pt-5 bg-gradient-to-r from-blue-600 to-blue-700 text-gray-900"
      data-aos="fade-up"
    >
       <div className="container mx-auto my-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <div className="navbar-brand flex items-center text-white text-2xl font-bold">
                <FaFileInvoice className="mr-2" />
                <span>Crea8 CV</span>
              </div>
              <p className="text-gray-300 text-base">
                Our resume builder helps you create your perfect resume, 100%
                free.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white text-xl transition-colors hover:text-gray-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-white text-xl transition-colors hover:text-gray-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-white text-xl transition-colors hover:text-gray-300"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {[
              { title: "Company", links: ["About Us", "Services", "Careers"] },
              { title: "Community", links: ["Forum", "Blog", "Podcast"] },
              { title: "Support", links: ["Help Center", "Contact Us"] },
            ].map((section, index) => (
              <div key={index}>
                <h5 className="text-white text-lg font-bold mb-4">
                  {section.title}
                </h5>
                <ul className="list-none space-y-3">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-300 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter Subscription */}
           {/* Newsletter Subscription */}
           <div>
              <h5 className="text-white text-lg font-bold mb-4">Stay Updated</h5>
              
              <form className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  className="w-full sm:w-auto flex-grow rounded-lg px-4 py-3 text-gray-900 focus:outline-none"
                  placeholder="Enter your email address"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
              <small className="block text-white mt-4">
                We respect your privacy. Unsubscribe anytime.
              </small>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-blue-800 py-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <small className="text-gray-400 text-sm">
              © 2025 Crea8 CV. All Rights Reserved.
            </small>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
