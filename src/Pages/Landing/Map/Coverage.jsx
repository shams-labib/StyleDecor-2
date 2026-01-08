import React, { use, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation settings
const entryVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Coverage = ({ coveragePromise }) => {
  const position = [25.7466, 89.2517];
  const serviceData = use(coveragePromise);
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    const district = serviceData.find((c) =>
      c.district.toLowerCase().includes(value.toLowerCase())
    );
    if (district) {
      const cord = [district.latitude, district.longitude];
      mapRef.current.flyTo(cord, 12, { duration: 2 }); // Smooth fly animation
    } else {
      alert("District not found!");
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={entryVariants}
      className="text-center px-4 sm:px-8 lg:px-16 py-12 space-y-8 container mx-auto"
    >
      {/* Section Title */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <FaMapMarkerAlt className="text-red-500" />
          </motion.div>
          <span>Available in 64 Districts</span>
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 dark:text-gray-300 text-lg"
        >
          Find our service centers across all districts of Bangladesh
        </motion.p>
      </div>

      {/* Search Box Animation */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
      >
        <div className="flex items-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus-within:border-primary rounded-full px-5 py-2.5 shadow-sm w-full transition-all">
          <svg
            className="h-5 w-5 text-gray-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search district (e.g. Dhaka)..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200"
          />
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
          Search
        </button>
      </motion.form>

      {/* Map Container Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative group border-4 border-white dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[450px] sm:h-[600px]"
      >
        <MapContainer
          center={position}
          ref={mapRef}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceData.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-lg text-primary">
                    {center.district}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <strong>Covered:</strong> {center.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </motion.div>
  );
};

export default Coverage;
