import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Content from "../components/ui/Content";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-white to-green-400 text-gray-800 p-8">
      {/* Header Section */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-gray-900">
          <Content>About Nyaya Path</Content>
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          <Content>
            Your trusted platform for online mediation and dispute resolution.
          </Content>
        </p>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: "⚖️ Easy Case Filing",
            desc: "Submit disputes easily and get quick resolutions.",
          },
          {
            title: "🔍 Find a Mediator",
            desc: "Connect with certified mediators for professional assistance.",
          },
          {
            title: "📜 Track Your Case",
            desc: "Stay updated with real-time case tracking.",
          },
          {
            title: "💼 Mediation Opportunities",
            desc: "Qualified mediators can find freelancing cases.",
          },
          {
            title: "📖 Learn Mediation",
            desc: "Understand your legal rights and the mediation process.",
          },
          {
            title: "🔒 Secure & Confidential",
            desc: "We prioritize user privacy and data protection.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white shadow-xl rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              <Content>{feature.title}</Content>
            </h2>
            <p className="text-gray-600 mt-2">
              <Content>{feature.desc}</Content>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          <Content>Ready to Get Started?</Content>
        </h2>
        <p className="text-lg text-gray-700 mt-2">
          <Content>Join us now and resolve disputes the easy way!</Content>
        </p>
        <div className="mt-6">
          <Link
            to="/auth"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 mr-4"
          >
            <Content>Get Started</Content>
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md hover:bg-gray-700"
          >
            <Content>Back to Home</Content>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
