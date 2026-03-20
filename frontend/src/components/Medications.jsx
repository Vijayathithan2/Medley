import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pill, CheckCircle2, AlertCircle, Plus, Calendar, Clock, Sun, Moon } from 'lucide-react';

const Medications = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodaySchedules();
    }, []);

    const fetchTodaySchedules = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/medications/schedules/today');
            const sorted = response.data.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
            setSchedules(sorted);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleTakeMedication = async (scheduleId) => {
        try {
            await axios.patch(`http://localhost:8080/api/medications/schedules/${scheduleId}/take`);
            fetchTodaySchedules();
        } catch (error) {
            console.error('Error taking medication:', error);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="p-3 bg-primary-50 rounded-2xl text-primary-600 shadow-sm">
                             <Pill size={28} />
                        </div>
                        Medication Reminders
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">Keep your health on track by managing daily prescriptions.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="btn-secondary flex items-center justify-center gap-2 flex-1 sm:flex-none">
                        <Calendar size={18} /> Schedule
                    </button>
                    <button className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none">
                        <Plus size={18} /> Add Pill
                    </button>
                </div>
            </div>

            {/* Weekly Calendar Representation (Visual only, imitating screenshot) */}
            <div className="glass-card p-6 border-white/40 mb-8 py-8 hidden lg:block border-none">
                 <div className="grid grid-cols-7 gap-4 w-full">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                           <div key={i} className={`flex flex-col items-center p-4 rounded-3xl ${i === 2 ? 'bg-primary-500 text-white shadow-xl scale-110 translate-y-2' : 'bg-surface-100 text-gray-600 hover:bg-gray-200'} transition-all cursor-pointer`}>
                               <span className="text-sm font-bold uppercase tracking-widest">{day}</span>
                               <span className="text-2xl font-bold font-display mt-2">{10 + i}</span>
                               {i === 2 && <div className="w-2 h-2 mt-2 bg-white rounded-full"></div>}
                           </div>
                      ))}
                 </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-lg font-bold">Synchronizing medications...</div>
            ) : schedules.length === 0 ? (
                <div className="glass-card flex flex-col items-center justify-center py-24 px-4 text-center border-dashed border-primary-200">
                    <div className="bg-primary-50 p-6 rounded-full mb-6">
                        <Pill className="w-16 h-16 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">All Clear Today</h3>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-sm font-medium">No doses scheduled today. You're completely caught up!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {schedules.map((schedule) => {
                        const dateObj = new Date(schedule.scheduledTime);
                        const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const isPast = dateObj < new Date() && !schedule.isTaken;
                        const isMorning = dateObj.getHours() < 12;
                        
                        return (
                            <div key={schedule.id} className="glass-card flex flex-col sm:flex-row items-stretch overflow-hidden group hover:shadow-2xl transition-all border-none">
                                
                                {/* Timeline Side Color Indicator */}
                                <div className={`w-3 shrink-0 ${schedule.isTaken ? 'bg-emerald-400' : isPast ? 'bg-orange-400' : 'bg-primary-400'}`}></div>

                                <div className="flex-1 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white dark:bg-gray-800">
                                    <div className="flex items-start gap-6">
                                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shrink-0 shadow-sm border ${schedule.isTaken ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : isPast ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-primary-50 text-primary-500 border-primary-100'}`}>
                                            {isMorning ? <Sun size={32} /> : <Moon size={32} />}
                                        </div>
                                        
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`font-bold font-display text-2xl ${isPast && !schedule.isTaken ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'} ${schedule.isTaken && 'text-gray-400 line-through'}`}>
                                                    {time}
                                                </span>
                                                <span className="px-3 py-1 bg-surface-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600">
                                                    {schedule.patientName}
                                                </span>
                                            </div>
                                            
                                            <h3 className={`text-xl font-bold ${schedule.isTaken ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                                {schedule.medicationName} <span className="text-base font-semibold text-gray-500 ml-2">({schedule.dosage})</span>
                                            </h3>
                                            
                                            {schedule.isTaken && (
                                                <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
                                                    <CheckCircle2 size={16} /> Marked taken at {new Date(schedule.takenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            )}
                                            {isPast && !schedule.isTaken && (
                                                <p className="text-sm font-bold text-orange-600 mt-2 flex items-center gap-1.5">
                                                    <AlertCircle size={16} /> Dose missed - please review schedule
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {!schedule.isTaken && (
                                        <div className="mt-4 sm:mt-0 ml-auto w-full sm:w-auto">
                                            <button 
                                                onClick={() => handleTakeMedication(schedule.id)}
                                                className={`w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${isPast ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'}`}
                                            >
                                                Confirm Dose
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Medications;
