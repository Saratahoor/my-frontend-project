import React from "react";

const LoginForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label>Email:</label>
        <input type="email" className="border w-full p-2" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" className="border w-full p-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default LoginForm;
