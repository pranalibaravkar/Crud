import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa"; 
import SignupImage from "../assets/ECommerceright.webp"; // Import the signup image
import Logo from "../assets/logo.png"; // Import the logo

function Signup() {
  const history = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
  
    // 10-digit validation for the mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:8000/signup", {
        firstName,
        lastName,
        email,
        password,
        mobile,
      });
  
      // Handle the response from the backend
      if (res.data === "exist") {
        alert("User already exists");
      } else if (res.data === "notexist") {
        history("/home", { state: { id: email } });
      }
    } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      alert("Error while signing up: " + (error.response?.data?.message || error.message));
    }
  }
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 lg:w-2/3">
      {/* Left side - Signup Image */}
        <div className="hidden md:block w-1/2">
          <img
            src={SignupImage} // Display the imported signup image here
            alt="Signup Visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo" className="h-20 -mt-10 ml-20 w-40 md:h-40 md:w-56" />
            {/* <span className="text-xl font-semibold">Your Logo</span> */}
          </div>
          <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
          <p className="text-gray-600 mb-6">Let's get you all set up so you can access your account.</p>

          <form onSubmit={submit} className="space-y-4">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mr-2"
              />
              <label className="text-sm">
                I agree to all the <a href="#" className="text-blue-500">Terms</a> and <a href="#" className="text-blue-500">Privacy Policies</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Create Account
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account? <Link to="/" className="text-blue-500">Login</Link>
          </p>

          <div className="flex items-center mt-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">Or Sign Up with</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <div className="flex justify-center space-x-4 mt-4">
            <button className="bg-gray-200 p-2 rounded-full">
              <FaFacebook className="text-blue-600 h-6 w-6" /> {/* Facebook Icon */}
            </button>
            <button className="bg-gray-200 p-2 rounded-full">
              <FaGoogle className="text-red-600 h-6 w-6" /> {/* Google Icon */}
            </button>
            <button className="bg-gray-200 p-2 rounded-full">
              <FaApple className="text-black h-6 w-6" /> {/* Apple Icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
