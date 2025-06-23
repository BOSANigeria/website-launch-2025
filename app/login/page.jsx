"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "At least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("/api/auth/login", values);
        console.log(res)
        // localStorage.setItem("isLoggedIn", "true");

        const { role } = res.data

        toast.success("Login successful! Redirecting...", {
          position: "top-center",
          autoClose: 1500,
        });
        if (role == 'admin') {
          router.push('/super-admin')
        } else {
          setTimeout(() => {
            window.location.href = "/member-dashboard";
          }, 1500);
        }
      } catch (err) {
        const message =
          err.response?.data?.message || "Login failed. Please check your credentials.";
        toast.error(message, {
          position: "top-center",
          autoClose: 4000,
        });
      }
    },
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <ToastContainer />
      <div className="relative z-10 flex min-h-screen">
        {/* Left Panel */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center p-12 relative">
          <div className="bg-white border-2 border-black rounded-3xl p-24 shadow-2xl">
            <div className="text-center space-y-6">
              <h2 className="text-5xl text-black leading-relaxed font-medium">
                Welcome Back.
              </h2>
              <p className="text-xl text-gray-600 mt-8">
                Need assistance? Reach out to{" "}
                <span className="text-black underline font-semibold cursor-pointer">
                  bosanigeria@gmail.com
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 relative">
          <div className="w-full max-w-md relative">
            <form
              onSubmit={formik.handleSubmit}
              className="-mt-12 bg-white border-2 border-black rounded-3xl p-8 shadow-2xl space-y-8 animate-fade-in"
              noValidate
            >
              <div className="text-center">
                <h2 className="text-4xl font-bold text-black mb-2">
                  Member Portal
                </h2>
                <p className="text-gray-600">Access your exclusive dashboard</p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-black placeholder-gray-500 focus:outline-none ${
                      formik.touched.email && formik.errors.email
                        ? "border-black shadow-lg"
                        : "border-gray-300 focus:border-black"
                    }`}
                    placeholder="Enter your email"
                  />
                  <FaEnvelope className="absolute top-5 right-4 text-gray-500 group-focus-within:text-black transition-colors" />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-sm text-black animate-fade-in">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={`w-full px-4 py-4 bg-white border-2 rounded-xl text-black placeholder-gray-500 focus:outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-black shadow-lg"
                        : "border-gray-300 focus:border-black"
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-5 right-4 text-gray-500 hover:text-black transition-colors"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-sm text-black animate-fade-in">{formik.errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-gray-600 hover:text-black hover:underline transition-all"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className={`w-full py-4 font-semibold text-white rounded-xl transition-all duration-300 relative overflow-hidden group ${
                  formik.isSubmitting || !formik.isValid
                    ? "bg-gray-400 cursor-not-allowed opacity-50"
                    : "bg-black hover:bg-gray-800 hover:scale-105 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-center">
                  {formik.isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FaLock className="mr-2" />
                      Access Dashboard
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Login;
