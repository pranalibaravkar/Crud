import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path as necessary
import rightImage from "../assets/ECommerceright.webp"; // Adjust the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/", {
        email,
        password,
      })
      .then(res => {
        if (res.data === "exist") {
          history("/home", { state: { id: email } });
        } else if (res.data === "notexist") {
          alert("User has not signed up");
        }
      })
      .catch(e => {
        alert("Wrong details");
        console.log(e);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-blue-100 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-3/4 lg:w-2/3">
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center justify-center md:justify-start mb-8">
            <img src={logo} alt="Logo" className="h-20 w-40 md:h-40 md:w-56" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Login</h2>
          <p className="text-gray-600 mb-4 text-center md:text-left">Login to access your account</p>

          <form onSubmit={submit}>
            <div className="mb-4">
              <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email" 
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter password" 
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to="#" className="text-red-500 mt-2 md:mt-0">Forgot Password?</Link>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-4">
              Login
            </button>
          </form>

          <div className="my-4 text-center text-gray-600">OR</div>

          <div className="flex justify-around mb-4">
            <button className="bg-gray-200 rounded-full p-3">
              <FontAwesomeIcon icon={faFacebook} size="lg" className="text-blue-600" />
            </button>
            <button className="bg-gray-200 rounded-full p-3">
              <FontAwesomeIcon icon={faGoogle} size="lg" className="text-red-600" />
            </button>
            <button className="bg-gray-200 rounded-full p-3">
              <FontAwesomeIcon icon={faApple} size="lg" className="text-black" />
            </button>
          </div>

          <p className="mt-4 text-center">
            Don't have an account? <Link to="/signup" className="text-red-500">Sign up</Link>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img 
            src={rightImage} 
            alt="Right" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
