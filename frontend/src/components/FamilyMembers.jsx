import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Plus, HeartPulse, Activity, AlertTriangle, UserCircle } from 'lucide-react';

const FamilyMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/family-members');
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching family members:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-4">
                        <div className="p-3 bg-primary-50 rounded-2xl text-primary-600 shadow-sm">
                             <Users size={28} />
                        </div>
                        My Family
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage and monitor health records of your dependents.</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center justify-center gap-2 flex-1 sm:flex-none">
                        <Plus size={20} /> Add Member
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-32 text-gray-400 text-lg font-bold">Synchronizing Family Health Data...</div>
            ) : members.length === 0 && !showForm ? (
                <div className="glass-card flex flex-col items-center justify-center py-24 px-4 text-center border-dashed border-primary-200">
                    <div className="bg-primary-50 p-6 rounded-full mb-6">
                        <Users className="w-16 h-16 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Growing your circle</h3>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-sm font-medium">Keep your loved ones' medical data strictly synchronized today.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {members.map((member, index) => (
                        <div key={member.id} className="glass-card p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300 relative border border-transparent hover:border-primary-100 hover:shadow-2xl overflow-hidden group">
                             <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
                             
                             {/* Content Z-10 */}
                             <div className="relative z-10">
                                 <div className="flex justify-between items-start mb-6">
                                     <div className="w-20 h-20 bg-surface-100 rounded-[2rem] flex items-center justify-center border-4 border-white shadow-md text-primary-400">
                                          <UserCircle size={40} />
                                     </div>
                                     <div className="flex flex-col items-end gap-2">
                                          <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-white rounded-full border border-gray-100 shadow-sm text-gray-500 flex items-center gap-1.5">
                                             <HeartPulse size={14} className="text-rose-500" />
                                             {member.bloodGroup || 'Unspecified'}
                                          </span>
                                     </div>
                                 </div>
                                 
                                 <div className="mb-6">
                                     <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white">{member.fullName}</h3>
                                     <p className="text-sm font-bold text-primary-600 uppercase tracking-widest mt-1">{member.relation}</p>
                                 </div>
                                 
                                 <div className="space-y-4 pt-6 border-t border-dashed border-gray-200">
                                    <div className="flex gap-4 items-center bg-blue-50/50 p-3 rounded-2xl">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                            <Activity size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Vitals/Conditions</p>
                                             <p className="text-sm font-bold text-gray-800 line-clamp-1">{member.medicalConditions || 'Healthy'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center bg-orange-50/50 p-3 rounded-2xl">
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                            <AlertTriangle size={20} className="text-orange-500" />
                                        </div>
                                        <div>
                                             <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Allergies</p>
                                             <p className="text-sm font-bold text-gray-800 line-clamp-1">{member.allergies || 'No known allergies'}</p>
                                        </div>
                                    </div>
                                 </div>
                             </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FamilyMembers;
