import React from 'react';
import { useForm } from 'react-hook-form';

function FileCase() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  const indianLanguages = [
    "English", "Hindi", "Bengali", "Telugu", "Marathi", "Tamil", "Urdu",
    "Gujarati", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese",
    "Maithili", "Santali", "Kashmiri", "Nepali", "Konkani", "Sindhi", "Dogri"
  ];

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">File a Case</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Mode Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
            <select
              {...register("mode", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {errors.mode && <p className="text-red-500 text-sm mt-1">Mode is required.</p>}
          </div>

          {/* Case Type Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Case Type</label>
            <input
              type="text"
              placeholder="e.g., Property Dispute"
              {...register("case_type", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
            {errors.case_type && <p className="text-red-500 text-sm mt-1">Case type is required.</p>}
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              {...register("language", { required: true })}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            >
              <option value="">Select Language</option>
              {indianLanguages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            {errors.language && <p className="text-red-500 text-sm mt-1">Language is required.</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileCase;
