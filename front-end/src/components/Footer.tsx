import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-12">
      <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left px-6">
        
        {/* 🚀 Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            {[
              { path: "/", label: "Home" },
              { path: "/services", label: "Services" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" }
            ].map(({ path, label }) => (
              <li key={path}>
                <Link 
                  to={path} 
                  className="hover:text-yellow-300 transition-transform transform hover:translate-x-1 duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 🌍 Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaTwitter />, link: "#" },
              { icon: <FaLinkedinIn />, link: "#" },
              { icon: <FaInstagram />, link: "#" }
            ].map(({ icon, link }, index) => (
              <a
                key={index}
                href={link}
                className="text-white hover:text-yellow-300 text-2xl transition-transform transform hover:scale-125 duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* 📞 Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">Contact Us</h3>
          <p className="flex items-center space-x-2 text-sm">
            📍 <span>123 Health St, City, Country</span>
          </p>
          <p className="flex items-center space-x-2 mt-2 text-sm">
            📞 <span>+123 456 7890</span>
          </p>
          <p className="flex items-center space-x-2 mt-2 text-sm">
            ✉ <span>support@healthcare.com</span>
          </p>
        </div>
      </div>

      {/* ⚡ Footer Bottom */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs tracking-wide">
        &copy; {new Date().getFullYear()} <span className="font-semibold">TeleCare</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
