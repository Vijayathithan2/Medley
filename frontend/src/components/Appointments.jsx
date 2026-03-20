import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, UserCircle2, Clock, MapPin, Video, CheckCircle2 } from 'lucide-react';

const Appointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const endpoint = user.role === 'DOCTOR' 
                ? 'http://localhost:8080/api/appointments/doctor' 
                : 'http://localhost:8080/api/appointments/user';
            
            const response = await axios.get(endpoint);
            const sorted = response.data.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));
            setAppointments(sorted);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="p-3 bg-primary-50 rounded-2xl text-primary-600">
                             <Calendar size={28} />
                        </div>
                        Appointments
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage all your upcoming and past doctor visits.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    {user.role !== 'DOCTOR' && (
                        <button className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none">
                            Book Appointment
                        </button>
                    )}
                </div>
            </div>

            {/* Layout like in the screenshot: Calendar widget + Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual Calendar */}
                <div className="lg:col-span-4 glass-card p-8 flex flex-col items-center">
                    <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white mb-6 w-full flex justify-between">
                        January <span>&lt; &gt;</span>
                    </h3>
                    
                    <div className="grid grid-cols-7 gap-y-6 gap-x-6 w-full text-center text-sm font-bold text-gray-500">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
                        
                        {/* Mocking a calendar grid */}
                        {[...Array(31)].map((_, i) => {
                            const isToday = i === 15;
                            const hasAppt = i === 18 || i === 22;
                            return (
                                <div key={i} className={`relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all ${isToday ? 'bg-primary-500 text-white shadow-md' : 'text-gray-900 hover:bg-gray-100'}`}>
                                    {i + 1}
                                    {hasAppt && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-400 rounded-full border border-white"></div>}
                                </div>
                            );
                        })}
                    </div>
                    
                    <button className="btn-secondary w-full mt-10 rounded-xl">View Full Calendar</button>
                </div>

                {/* Upcoming Appointments List */}
                <div className="lg:col-span-8 space-y-6">
                     <div className="flex justify-between items-center bg-transparent">
                          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Upcoming Appointments</h2>
                          <div className="flex items-center gap-2 outline-none border-none py-2 px-4 bg-surface-100 rounded-full text-sm font-semibold text-gray-600">
                               Filter By <span className="text-primary-600 font-bold ml-1">Date</span>
                          </div>
                     </div>

                     {loading ? (
                          <div className="flex items-center justify-center h-32 text-gray-400">Loading appointments...</div>
                      ) : appointments.length === 0 ? (
                          <div className="glass-card flex flex-col items-center justify-center py-16 px-4 text-center border-dashed">
                              <div className="bg-primary-50 dark:bg-primary-900/20 p-5 rounded-full mb-4 text-primary-500">
                                  <Calendar className="w-12 h-12" />
                              </div>
                              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white">No Upcoming Visits</h3>
                              <p className="mt-2 text-gray-500 text-md max-w-sm">You haven't booked any doctor consultations recently.</p>
                          </div>
                      ) : (
                          <div className="space-y-4">
                              {appointments.map((appt) => {
                                  const dateObj = new Date(appt.appointmentDate);
                                  const isUpcoming = dateObj > new Date() && appt.status !== 'CANCELLED';
                                  
                                  return (
                                      <div key={appt.id} className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                                          <div className="flex items-center gap-5">
                                              {/* Avatar */}
                                              <div className="w-16 h-16 rounded-full bg-surface-100 border-[3px] border-primary-100 flex items-center justify-center shrink-0">
                                                  <UserCircle2 size={32} className="text-primary-500" />
                                              </div>
                                              
                                              <div>
                                                  <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white leading-tight">
                                                      {user.role === 'DOCTOR' ? appt.patientName : appt.doctorName}
                                                  </h3>
                                                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                                      {appt.consultationType === 'ONLINE' ? <Video size={16} className="text-primary-500"/> : <MapPin size={16} className="text-rose-500"/>}
                                                      {appt.consultationType} Consultation
                                                  </p>
                                              </div>
                                          </div>
                                          
                                          <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                                              <div className="flex items-center gap-2 text-gray-800 font-bold bg-surface-100 px-4 py-2 rounded-full shadow-inner-soft">
                                                  <Clock size={16} className="text-primary-500" />
                                                  {dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                              </div>
                                              <div className="flex gap-2 w-full mt-2 sm:mt-0">
                                                  <button className="flex-1 sm:flex-none btn-secondary px-6 rounded-full text-sm shadow-none bg-surface-100 border-transparent hover:bg-gray-200">Reschedule</button>
                                                  <button className="flex-1 sm:flex-none px-6 py-2.5 bg-primary-100 text-primary-700 hover:bg-primary-200 rounded-full font-bold text-sm transition-colors cursor-pointer">Start Call</button>
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })}
                          </div>
                      )}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
