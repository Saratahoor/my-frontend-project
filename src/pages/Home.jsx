import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Content from "../components/ui/Content";
import { useTranslation } from "../hooks/TranslationContext";

const Home = () => {
  const [showTerms, setShowTerms] = useState(false);
  const { isTranslating } = useTranslation();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-400 via-white to-green-400 text-gray-800 p-8 overflow-y-auto">
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-400 border-t-green-400 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">
                Translating content...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Section with Title */}
      <div className="flex flex-col items-start mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          <Content>Nyay Path</Content>
        </h1>
        <h3 className="text-xl font-semibold text-gray-700 mt-2">
          <Content>Justice Beyond Courts, Resolution Beyond Delays</Content>
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
          <Content>Welcome to Nyay Path</Content>
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          <Content>
            Nyay Path is a cutting-edge online mediation and dispute resolution
            platform designed to make legal conflict resolution more accessible,
            efficient, and fair for all. Our mission is to empower individuals
            and businesses by providing a seamless and transparent way to
            resolve disputes outside traditional courts.
          </Content>
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
          <Content>Mediation Act 2023</Content> ⚖️
        </h2>
        <p className="text-gray-700 mt-3 text-center">
          <Content>
            The Mediation Act 2023 aims to promote mediation as an effective
            alternative dispute resolution mechanism. It provides a legal
            framework for resolving disputes amicably, ensuring confidentiality,
            neutrality, and fairness.
          </Content>
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="mt-10 flex flex-col items-center space-y-6">
        <Link
          to="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 mr-4"
        >
          <Content>Get Started</Content>
        </Link>
        <div className="flex gap-4">
          <Link
            to="/about"
            className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 mr-4"
          >
            <Content>Learn More</Content>
          </Link>
          <Link
            to="/community"
            className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-gray-700"
          >
            <Content> Community</Content>
          </Link>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-16 text-center text-gray-700 text-sm border-t pt-6">
        <p>
          <Content>
            By using this application, you agree to our Terms and Conditions.
          </Content>
        </p>
        <p
          className="underline cursor-pointer"
          onClick={() => setShowTerms(!showTerms)}
        >
          <Content>Read More</Content>
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
                  <Content>
                    Users must provide accurate and truthful information when
                    using the platform.
                  </Content>
                </li>
                <li>
                  <Content>
                    All mediation processes remain confidential and cannot be
                    disclosed without consent.
                  </Content>
                </li>
                <li>
                  <Content>
                    The platform does not provide legal advice but facilitates
                    dispute resolution.
                  </Content>
                </li>
                <li>
                  <Content>
                    Mediators must adhere to ethical guidelines and maintain
                    neutrality.
                  </Content>
                </li>
                <li>
                  <Content>
                    Users are prohibited from misusing the platform for
                    fraudulent activities.
                  </Content>
                </li>
                <li>
                  <Content>
                    Nyaya Path reserves the right to modify terms at any time
                    with prior notice.
                  </Content>
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
