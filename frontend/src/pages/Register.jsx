import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeartPulse, Mail, Lock, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'USER'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // Remove confirmPassword from payload before sending
            const { confirmPassword, ...payload } = formData;
            await register(payload);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
             {/* Background Decorations */}
             <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

            <div className="max-w-md w-full space-y-6 glass-card p-10 z-10 bg-white/90">
                <div className="text-center flex flex-col items-center">
                    <div className="bg-gradient-to-tr from-primary-500 to-secondary-500 p-2.5 rounded-2xl text-white shadow-lg mb-3">
                        <ShieldCheck size={36} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 tracking-tight">Create an account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">Sign in here</Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex items-center">
                            <AlertCircle className="text-red-500 mr-2" size={20} />
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="sr-only" htmlFor="firstName">First name</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="firstName" name="firstName" type="text" required
                                className="input-field pl-10"
                                placeholder="First Name"
                                value={formData.firstName} onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <label className="sr-only" htmlFor="lastName">Last name</label>
                            <input
                                id="lastName" name="lastName" type="text" required
                                className="input-field"
                                placeholder="Last Name"
                                value={formData.lastName} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label className="sr-only" htmlFor="email">Email address</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="email" name="email" type="email" required
                            className="input-field pl-10"
                            placeholder="Email address"
                            value={formData.email} onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <label className="sr-only" htmlFor="phoneNumber">Phone Number</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" /> 
                        </div>
                        <input
                            id="phoneNumber" name="phoneNumber" type="tel" required
                            className="input-field pl-10"
                            placeholder="Phone Number"
                            value={formData.phoneNumber} onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <label className="sr-only" htmlFor="password">Password</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="password" name="password" type="password" required
                            className="input-field pl-10"
                            placeholder="Password"
                            value={formData.password} onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="confirmPassword" name="confirmPassword" type="password" required
                            className="input-field pl-10"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                        <select
                            id="role" name="role"
                            className="input-field"
                            value={formData.role} onChange={handleChange}
                        >
                            <option value="USER">Patient / User</option>
                            <option value="DOCTOR">Medical Professional</option>
                        </select>
                    </div>

                    <button
                        type="submit" disabled={loading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : (
                            <span className="flex items-center gap-2">Join Medley <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                        )}
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-4">By joining, you agree to our Terms of Service and Privacy Policy.</p>
                </form>
            </div>
        </div>
    );
};

export default Register;
