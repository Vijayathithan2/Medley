import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    
    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
            {/* Welcome Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good Morning, {user?.firstName || 'User'}! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's your health summary for today.</p>
                </div>
                <button className="bg-gradient-to-r from-teal-500 to-primary hover:from-teal-600 hover:to-cyan-800 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-teal-500/30 flex items-center gap-2">
                    <i className="fa-solid fa-plus"></i> Add Record
                </button>
            </div>

            {/* SECTION 1: Health Overview */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow border border-gray-50 dark:border-gray-700 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Steps Walked</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">8,432</h3>
                            <p className="text-xs font-medium text-emerald-500 mt-2 flex items-center gap-1">
                                <i className="fa-solid fa-arrow-up"></i> 12% vs yesterday
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900 text-teal-500 dark:text-teal-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-shoe-prints"></i>
                        </div>
                    </div>
                </div>
                
                {/* Stat Card 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow border border-gray-50 dark:border-gray-700 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Heart Rate</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">72 <span className="text-sm font-normal text-gray-400">bpm</span></h3>
                            <p className="text-xs font-medium text-gray-400 mt-2 flex items-center gap-1">
                                <i className="fa-solid fa-minus text-gray-300"></i> Normal range
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-heart-pulse"></i>
                        </div>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow border border-gray-50 dark:border-gray-700 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Sleep Pattern</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">7h 20m</h3>
                            <p className="text-xs font-medium text-emerald-500 mt-2 flex items-center gap-1">
                                <i className="fa-solid fa-arrow-up"></i> 5% target reached
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-moon"></i>
                        </div>
                    </div>
                </div>

                {/* Stat Card 4 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft hover:shadow-md transition-shadow border border-gray-50 dark:border-gray-700 group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Calories Burned</p>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">1,240 <span className="text-sm font-normal text-gray-400">kcal</span></h3>
                            <p className="text-xs font-medium text-red-500 mt-2 flex items-center gap-1">
                                <i className="fa-solid fa-arrow-down"></i> 3% under target
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-fire"></i>
                        </div>
                    </div>
                </div>
            </section>

            {/* ROW 2: Medications & Family */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* SECTION 2: Medication Reminder */}
                <section className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Medication Reminders</h2>
                        <Link to="/medications" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700">View All</Link>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-50 dark:border-gray-700 overflow-hidden">
                        {/* Morning */}
                        <div className="p-5 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-500 flex items-center justify-center">
                                    <i className="fa-regular fa-sun"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Vitamin D3 & Calcium</h4>
                                    <p className="text-sm text-gray-500">1 Pill • Morning (08:00 AM)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full hidden sm:inline-block">Taken</span>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only toggle-checkbox peer" defaultChecked />
                                        <div className="block bg-gray-200 dark:bg-gray-600 w-10 h-6 rounded-full peer-checked:bg-teal-500 transition-colors"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Afternoon */}
                        <div className="p-5 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center">
                                    <i className="fa-solid fa-cloud-sun"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Amoxicillin 500mg</h4>
                                    <p className="text-sm text-gray-500">1 Capsule • After Lunch (02:00 PM)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full hidden sm:inline-block">Pending</span>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only toggle-checkbox peer" />
                                        <div className="block bg-gray-200 dark:bg-gray-600 w-10 h-6 rounded-full peer-checked:bg-teal-500 transition-colors"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Evening */}
                        <div className="p-5 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 flex items-center justify-center">
                                    <i className="fa-solid fa-moon"></i>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Omega 3 Fish Oil</h4>
                                    <p className="text-sm text-gray-500">2 Softgels • After Dinner (08:30 PM)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold rounded-full hidden sm:inline-block">Upcoming</span>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only toggle-checkbox peer" />
                                        <div className="block bg-gray-200 dark:bg-gray-600 w-10 h-6 rounded-full peer-checked:bg-teal-500 transition-colors"></div>
                                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-full"></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: Family Members */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Family Members</h2>
                        <button className="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                            <i className="fa-solid fa-plus text-sm"></i>
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-transform border border-gray-50 dark:border-gray-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=a04258" className="w-12 h-12 rounded-full object-cover border-2 border-primary" alt="Family 1" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Michael Jenkins</h4>
                                <p className="text-xs text-gray-500">Husband • 36 Yrs</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50 dark:ring-emerald-900"></div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-transform border border-gray-50 dark:border-gray-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e" className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700" alt="Family 2" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Emma Jenkins</h4>
                                <p className="text-xs text-gray-500">Daughter • 8 Yrs</p>
                            </div>
                            <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded uppercase tracking-wider">Asthma</span>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-transform border border-gray-50 dark:border-gray-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=a0425" className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700" alt="Family 3" />
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Robert Smith</h4>
                                <p className="text-xs text-gray-500">Father • 68 Yrs</p>
                            </div>
                            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold rounded uppercase tracking-wider">BP High</span>
                        </div>
                    </div>
                </section>
            </div>

            {/* ROW 3: Appointments & Records */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* SECTION 4: Upcoming Appointments */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Upcoming Appointments</h2>
                        <Link to="/appointments" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700">Calendar</Link>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-soft border border-gray-50 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-2xl bg-teal-50 overflow-hidden flex-shrink-0 relative">
                            <img src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?size=626&ext=jpg" className="w-full h-full object-cover" alt="Doctor" />
                            <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base">Dr. Marcus Allen</h4>
                            <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-1">Cardiologist</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> Oct 24, 2026</span>
                                <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 10:30 AM</span>
                            </div>
                        </div>
                        
                        <button className="w-full sm:w-auto px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap">
                            <i className="fa-solid fa-video mr-1.5"></i> Consult Online
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-soft border border-gray-50 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-5 hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-2xl bg-teal-50 overflow-hidden flex-shrink-0">
                            <img src="https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?size=626&ext=jpg" className="w-full h-full object-cover" alt="Doctor" />
                        </div>
                        
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base">Dr. Sarah Connor</h4>
                            <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-1">Pediatrician</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> Oct 28, 2026</span>
                                <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 02:00 PM</span>
                            </div>
                        </div>
                        
                        <button className="w-full sm:w-auto px-5 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap">
                            <i className="fa-solid fa-location-dot mr-1.5"></i> Get Directions
                        </button>
                    </div>
                </section>

                {/* SECTION 5: Medical Records */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Recent Medical Records</h2>
                        <Link to="/records" className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700">See All</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-50 dark:border-gray-700 hover:-translate-y-1 transition-transform group cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center text-lg">
                                    <i className="fa-solid fa-file-waveform"></i>
                                </div>
                                <button className="text-gray-300 hover:text-primary transition-colors">
                                    <i className="fa-solid fa-download"></i>
                                </button>
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1 line-clamp-1">Complete Blood Count</h4>
                            <p className="text-xs text-gray-400">Uploaded: Oct 12, 2026</p>
                            <div className="mt-3 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-md font-medium">PDF • 1.2 MB</div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-50 dark:border-gray-700 hover:-translate-y-1 transition-transform group cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-500 flex items-center justify-center text-lg">
                                    <i className="fa-solid fa-x-ray"></i>
                                </div>
                                <button className="text-gray-300 hover:text-primary transition-colors">
                                    <i className="fa-solid fa-download"></i>
                                </button>
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1 line-clamp-1">Chest X-Ray Scan</h4>
                            <p className="text-xs text-gray-400">Uploaded: Sep 28, 2026</p>
                            <div className="mt-3 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-md font-medium">JPG • 4.5 MB</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-50 dark:border-gray-700 hover:-translate-y-1 transition-transform group cursor-pointer">
                            <div className="flex justify-between items-start mb-3">
                                <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/30 text-teal-600 flex items-center justify-center text-lg">
                                    <i className="fa-solid fa-prescription-bottle-medical"></i>
                                </div>
                                <button className="text-gray-300 hover:text-primary transition-colors">
                                    <i className="fa-solid fa-download"></i>
                                </button>
                            </div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-1 line-clamp-1">Cardiology Prescription</h4>
                            <p className="text-xs text-gray-400">Uploaded: Sep 15, 2026</p>
                            <div className="mt-3 inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded-md font-medium">PDF • 0.8 MB</div>
                        </div>

                        <div className="bg-teal-50 dark:bg-teal-900/20 border-2 border-dashed border-teal-200 dark:border-teal-800 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:bg-teal-100 dark:hover:bg-teal-900/40 transition-colors cursor-pointer min-h-[140px]">
                            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 text-teal-500 shadow-sm flex items-center justify-center mb-2">
                                <i className="fa-solid fa-cloud-arrow-up"></i>
                            </div>
                            <h4 className="font-medium text-teal-800 dark:text-teal-400 text-sm">Upload File</h4>
                            <p className="text-[10px] text-teal-600 mt-1">PDF, JPG up to 10MB</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* ROW 4: Hospital Finder */}
            <section className="space-y-4 pt-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Hospital Finder</h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-1 cursor-pointer hover:bg-gray-50">
                            <i className="fa-solid fa-filter text-gray-400"></i> Filter
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
                    <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2 pb-2">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border-2 border-primary relative cursor-pointer">
                            <div className="absolute top-4 right-4 text-primary bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-sm">
                                <i className="fa-solid fa-diamond-turn-right"></i>
                            </div>
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base mb-1 pr-10">City Central Hospital</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-amber-400 text-xs">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star-half-stroke"></i>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">4.5 (120 reviews)</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-3"><i className="fa-solid fa-location-dot text-gray-400 mr-1"></i> 2.4 km away • 15 min drive</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-[10px] font-semibold">Cardiology</span>
                                <span className="px-2 py-1 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-[10px] font-semibold">Emergency 24/7</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700 hover:border-gray-200 cursor-pointer transition-colors">
                            <h4 className="font-bold text-gray-800 dark:text-gray-100 text-base mb-1 pr-10">Greenwood Medical Clinic</h4>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-amber-400 text-xs">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">4.0 (85 reviews)</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-3"><i className="fa-solid fa-location-dot text-gray-400 mr-1"></i> 4.1 km away • 22 min drive</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded text-[10px] font-semibold">Pediatrics</span>
                                <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded text-[10px] font-semibold">General</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-soft border border-gray-100 dark:border-gray-700 relative group h-[300px] lg:h-full">
                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
                        
                        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md text-sm font-semibold flex items-center gap-2 dark:text-white">
                            <i className="fa-solid fa-location-crosshairs text-primary"></i> Current Location
                        </div>
                        
                        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce duration-1000">
                            <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-md mb-1">City Central</div>
                            <div className="w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg">
                                <i className="fa-solid fa-hospital text-sm"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
