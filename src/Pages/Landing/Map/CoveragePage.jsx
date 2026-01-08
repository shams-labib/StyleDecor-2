import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLoaderData } from "react-router";

const CoveragePage = () => {
  const position = [25.7466, 89.2517];
  const serviceData = useLoaderData();
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    const district = serviceData.find((c) =>
      c.district.toLowerCase().includes(value.toLowerCase())
    );
    if (district) {
      const cord = [district.latitude, district.longitude];
      mapRef.current.flyTo(cord, 12, { duration: 1.5 });
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="text-center px-4 sm:px-8 lg:px-16 py-12 space-y-8">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
        <div className="flex md:gap-2">
          <span>
            {" "}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <FaMapMarkerAlt className="text-red-500" />
            </motion.div>
          </span>
          <span> We are available in 64 districts</span>
        </div>
      </h2>
      <p className="mt-2 text-gray-500 dark:text-gray-300 text-base sm:text-lg">
        Find our service centers across all districts
      </p>

      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
      >
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 shadow-sm w-full">
          <svg
            className="h-5 w-5 text-gray-400 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="search"
            name="search"
            placeholder="Search district..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
        <button className="btn btn-primary px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Search
        </button>
      </form>

      {/* Map */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-xl shadow-md overflow-hidden h-[400px] sm:h-[500px] md:h-[600px]">
        <MapContainer
          center={position}
          ref={mapRef}
          zoom={8}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceData.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoveragePage;
