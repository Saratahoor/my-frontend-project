import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-white to-green-400 text-gray-800 p-8 overflow-y-auto">
      {/* Top Section with Title */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Nyay Path</h1>
        <h3 className="text-xl font-semibold text-gray-700 mt-2">
          Justice Beyond Courts, Resolution Beyond Delays
        </h3>
      </div>

      {/* Welcome Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-10 p-8 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-gray-900">
          Welcome to Nyay Path
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Nyay Path is a cutting-edge online mediation and dispute resolution
          platform designed to make legal conflict resolution more accessible,
          efficient, and fair for all. Our mission is to empower individuals and
          businesses by providing a seamless and transparent way to resolve
          disputes outside traditional courts.
        </p>
      </motion.div>

      {/* Mediation Act Section */}
      <motion.div
        className="max-w-3xl mx-auto bg-white p-6 shadow-xl rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          Mediation Act 2023 ⚖️
        </h2>
        <p className="text-gray-700 mt-3 text-center">
          The Mediation Act 2023 aims to promote mediation as an effective
          alternative dispute resolution mechanism. It provides a legal
          framework for resolving disputes amicably, ensuring confidentiality,
          neutrality, and fairness.
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col items-center space-y-6">
        <Link
          to="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 mr-4"
        >
          Get Started
        </Link>
        <div className="flex gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 mr-4"
          >
            Learn More
          </Link>
          <Link
            to="/community"
            className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-gray-700"
          >
            Community
          </Link>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-16 text-center text-gray-700 text-sm border-t pt-6">
        <p>By using this application, you agree to our Terms and Conditions.</p>
        <p
          className="underline cursor-pointer"
          onClick={() => setShowTerms(!showTerms)}
        >
          Read More
        </p>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: showTerms ? "auto" : 0,
            opacity: showTerms ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          {showTerms && (
            <div className="mt-4 text-left max-w-3xl mx-auto p-4 rounded shadow-md">
              <ul className="list-disc pl-5 text-gray-700">
                <li>
                  Users must provide accurate and truthful information when
                  using the platform.
                </li>
                <li>
                  All mediation processes remain confidential and cannot be
                  disclosed without consent.
                </li>
                <li>
                  The platform does not provide legal advice but facilitates
                  dispute resolution.
                </li>
                <li>
                  Mediators must adhere to ethical guidelines and maintain
                  neutrality.
                </li>
                <li>
                  Users are prohibited from misusing the platform for fraudulent
                  activities.
                </li>
                <li>
                  Nyaya Path reserves the right to modify terms at any time with
                  prior notice.
                </li>
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
