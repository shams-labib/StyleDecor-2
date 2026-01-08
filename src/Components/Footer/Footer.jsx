import React from "react";
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../Shared/Logo/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full mt-32 overflow-hidden bg-white dark:bg-[#05070a]">
      {/* --- High-End Animated Background Elements --- */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* --- Brand Power Section (5 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="scale-125 origin-left"
            >
              <Logo />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-black leading-tight text-gray-900 dark:text-white">
              Crafting <span className="text-primary">Elegance</span> <br />
              For Your Living Space.
            </h2>

            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md font-medium">
              We don't just decorate; we tell your story through textures,
              colors, and premium craftsmanship.
            </p>

            <div className="flex gap-5">
              {[
                {
                  icon: <FaTwitter />,
                  color: "hover:bg-[#1DA1F2]",
                  link: "https://x.com",
                },
                {
                  icon: <FaYoutube />,
                  color: "hover:bg-[#FF0000]",
                  link: "https://www.youtube.com",
                },
                {
                  icon: <FaFacebook />,
                  color: "hover:bg-[#1877F2]",
                  link: "https://www.facebook.com/shamsallabib",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ y: -8, rotate: 5 }}
                  className={`w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800/50 backdrop-blur-md shadow-lg text-xl transition-all duration-300 ${social.color} hover:text-white text-gray-700 dark:text-gray-300 border border-transparent hover:border-white/20`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- Navigation Links (2 Columns) --- */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Explore
            </h3>
            <ul className="space-y-4 text-lg font-bold">
              {["Services", "Decorators", "Gallery", "About Us"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-all flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-primary mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Contact / Location (5 Columns) --- */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">
              Get In Touch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-sm font-black text-gray-400 uppercase">
                  Office
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  Dhaka, Bangladesh <br />
                  Gulshan-2, Road 12
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-black text-gray-400 uppercase">
                  Support
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  +880 1234 567 890 <br />
                  hello@styledecor.com
                </p>
              </div>
            </div>

            {/* Subscription Box UI (Attractive Element) */}
            <div className="relative group max-w-sm">
              <input
                type="text"
                placeholder="Subscribe to Newsletter"
                className="w-full bg-gray-100 dark:bg-gray-800/50 border border-transparent focus:border-primary/50 outline-none px-6 py-4 rounded-2xl text-white transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-24 pt-10 border-t border-gray-100 dark:border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <p className="text-gray-500 dark:text-gray-500 font-bold text-sm">
              &copy; {currentYear} STYLEDECOR.
            </p>
            <div className="hidden md:flex gap-6 text-[10px] font-black tracking-widest text-gray-400 uppercase">
              <a href="#" className="hover:text-primary transition-all">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-all">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Scroll To Top Button */}
          <motion.button
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs font-black tracking-[0.2em] text-gray-900 dark:text-white uppercase"
          >
            Back to top
            <span className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-500">
              <FaArrowUp />
            </span>
          </motion.button>
        </div>
      </div>

      {/* GOD-TYPE Aesthetic: Large Background Text */}
      <div className="absolute bottom-[-20px] left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] dark:opacity-[0.03]">
        <h1 className="text-[15vw] font-black leading-none uppercase">
          StyleDecor
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
