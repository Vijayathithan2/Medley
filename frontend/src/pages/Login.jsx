import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, HeartPulse, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { login, demoLogin } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please verify your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = () => {
        demoLogin();
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex bg-surface-50 dark:bg-gray-900 font-sans">
            
            {/* Left Section - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 xl:px-24">
                
                {/* Logo & Header */}
                <div className="mb-10 w-full max-w-md mx-auto xl:mx-0">
                    <Link to="/" className="inline-flex items-center gap-3 mb-10 group">
                        <div className="bg-gradient-to-tr from-teal-400 to-primary-600 p-2.5 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
                            <HeartPulse size={24} />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-wide">Medley</span>
                    </Link>
                    
                    <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                        Welcome Back!
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        Please enter your details to access your health dashboard.
                    </p>
                </div>

                {/* Login Form */}
                <div className="w-full max-w-md mx-auto xl:mx-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-semibold border border-red-100 dark:border-red-800/50 flex items-center gap-3 animate-fadeIn">
                                <i className="fa-solid fa-circle-exclamation text-lg"></i> {error}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-regular fa-envelope"></i>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-5 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base shadow-sm"
                                    placeholder="patient@medley.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-base shadow-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors p-2"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex">
                                    <input type="checkbox" className="peer sr-only" />
                                    <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-teal-500 peer-checked:bg-teal-500 transition-all flex items-center justify-center">
                                        <i className="fa-solid fa-check text-white text-[10px] opacity-0 peer-checked:opacity-100 transition-opacity"></i>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">Forgot Password?</a>
                        </div>

                        <div className="flex flex-col gap-3 mt-6">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-teal-500 to-primary-600 hover:from-teal-600 hover:to-primary-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-teal-500/30 transition-all active:scale-[0.98] flex flex-row items-center justify-center gap-3 disabled:opacity-70"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                                {!isLoading && <ArrowRight size={20} />}
                            </button>

                            <button 
                                type="button"
                                onClick={handleDemoLogin}
                                className="w-full bg-white dark:bg-gray-800 border-2 border-teal-500 dark:border-teal-400 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-gray-700 font-bold text-lg py-4 rounded-2xl transition-all active:scale-[0.98] flex flex-row items-center justify-center gap-3"
                            >
                                <i className="fa-solid fa-flask"></i> View Live Demo
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 transition-colors ml-1">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Image/Graphic */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-900 justify-center items-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-300 via-primary-800 to-primary-900"></div>
                
                {/* Floating Elements */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
                
                {/* Glass Card Presentation */}
                <div className="relative z-10 w-[80%] max-w-xl">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-[2rem] shadow-2xl">
                        <div className="flex gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-teal-400/20 flex flex-col items-center justify-center text-teal-300 backdrop-blur-md">
                                <i className="fa-solid fa-notes-medical text-2xl"></i>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-wide">Smart Dashboard</h3>
                                <p className="text-primary-200">Manage everything in one place</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"><i className="fa-solid fa-check"></i></div>
                                <div className="h-3 w-1/3 bg-white/30 rounded-full"></div>
                                <div className="h-3 w-1/4 bg-white/10 rounded-full ml-auto"></div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 transform translate-x-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"><i className="fa-solid fa-user-doctor"></i></div>
                                <div className="h-3 w-1/2 bg-white/30 rounded-full"></div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4 border-l-4 border-l-teal-400">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white"><i className="fa-solid fa-pills"></i></div>
                                <div className="h-3 w-2/3 bg-white/30 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
