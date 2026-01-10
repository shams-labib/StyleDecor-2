import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"; // Add this
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../Pages/Loader/Loading";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (loading) return <Loading />;

  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        navigate("/");
        Swal.fire({
          title: "Login success, welcome back buddy!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-3xl overflow-hidden transition-all duration-300">
          <div className="p-10">
            <header className="mb-8">
              <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Welcome Back
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Enter your details to access your account.
              </p>
            </header>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 transition-all outline-none 
                    ${
                      errors.email
                        ? "border-red-400"
                        : "border-transparent focus:border-blue-500 dark:focus:border-blue-400"
                    } 
                    text-gray-900 dark:text-white`}
                  placeholder="name@company.com"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-500 text-xs font-medium ml-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    title="Forgot Password"
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 transition-all outline-none 
                    ${
                      errors.password
                        ? "border-red-400"
                        : "border-transparent focus:border-blue-500 dark:focus:border-blue-400"
                    } 
                    text-gray-900 dark:text-white`}
                  placeholder="••••••••"
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-red-500 text-xs font-medium ml-1"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
              >
                Sign In
              </motion.button>
            </form>

            <div className="mt-8">
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
                <span className="mx-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-gray-200 dark:border-gray-800"></div>
              </div>

              <SocialLogin />

              <p className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
                New to StyleDecor?{" "}
                <Link
                  state={location?.state}
                  to="/register"
                  className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 underline-offset-4 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
