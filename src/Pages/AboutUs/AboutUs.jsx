import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  FolderKanban,
  Users,
  ShieldCheck,
  Award,
} from "lucide-react";

const AboutUs = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const iconAnimation = {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
  };

  const stats = [
    { icon: FolderKanban, value: "250+", label: "Projects Completed" },
    { icon: Users, value: "120+", label: "Happy Clients" },
    { icon: ShieldCheck, value: "15+", label: "Team Members" },
    { icon: Award, value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 rounded-xl md:my-8">
      <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            className="rounded-2xl shadow-xl object-cover w-full md:h-[400px] h-[300px]"
            src="https://i.ibb.co.com/4wN3xT02/How-to-become-an-interior-decorator-in-post-image-4.jpg"
            alt="Team working"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-[-20px] right-[-20px] bg-white dark:bg-gray-800 shadow-lg px-6 py-4 rounded-xl"
          >
            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
              5+ Years
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Of Excellent Service
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <div>
          <h2
            ref={headingRef}
            className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3"
          >
            About <span className="text-[#d96c42] dark:text-primary">Us</span>
            {headingInView && (
              <motion.span
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-indigo-600"
              >
                <Sparkles size={32} />
              </motion.span>
            )}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
            We are a passionate team dedicated to delivering high-quality
            digital solutions. Our mission is to provide outstanding service,
            innovative ideas, and long-term support to help businesses grow in
            the digital world.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-8">
            With a strong focus on user experience, performance, and clean
            design, we’ve helped hundreds of clients achieve their goals with
            professionalism and dedication.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <motion.div
                    animate={iconAnimation}
                    className="text-indigo-600"
                  >
                    <Icon size={28} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {stat.value}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
