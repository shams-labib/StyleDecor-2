import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  FolderKanban,
  Users,
  ShieldCheck,
  Award,
  ChevronRight,
} from "lucide-react";

const AboutUs = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const iconAnimation = {
    scale: [1, 1.15, 1],
    rotate: [0, 5, -5, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  };

  const stats = [
    { icon: FolderKanban, value: "250+", label: "Events Styled" },
    { icon: Users, value: "120+", label: "Happy Couples" },
    { icon: ShieldCheck, value: "15+", label: "Expert Decorators" },
    { icon: Award, value: "99%", label: "Positive Reviews" },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Image Composition */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          {/* Decorative Background Element */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10 overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-gray-800">
            <img
              className="object-cover w-full h-[350px] md:h-[500px] transform group-hover:scale-105 transition-transform duration-700"
              src="https://i.ibb.co.com/4wN3xT02/How-to-become-an-interior-decorator-in-post-image-4.jpg"
              alt="Beautifully decorated event space"
            />
          </div>

          {/* Floating Experience Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="absolute -bottom-6 -right-2 md:right-8 bg-white dark:bg-gray-800 shadow-2xl p-5 md:p-7 rounded-3xl border border-gray-100 dark:border-gray-700 z-20"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-black text-primary">
                5+
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-center">
                Years of <br /> Artistry
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider"
            >
              <Sparkles size={16} />
              Crafting Memories
            </motion.div>

            <h2
              ref={headingRef}
              className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight"
            >
              Turning Your <span className="text-primary italic">Dreams</span>{" "}
              Into Reality
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            <p>
              We are a team of creative visionaries dedicated to the art of
              event styling. Our mission is to transform ordinary spaces into
              breathtaking environments that reflect your unique personality and
              story.
            </p>
            <p>
              From intimate gatherings to grand celebrations, we bring a touch
              of sophistication, elegance, and meticulous attention to detail to
              every corner of your venue.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    animate={iconAnimation}
                    className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 text-primary shadow-sm"
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 text-primary font-bold text-lg group"
          >
            Learn More About Our Process
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
