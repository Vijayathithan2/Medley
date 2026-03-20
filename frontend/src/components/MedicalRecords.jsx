import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Download, UploadCloud, File, Activity, FileLineChart } from 'lucide-react';

const MedicalRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/records');
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-[1400px] mx-auto">
            
            {/* Top Widget from Screenshot */}
            <div className="glass-card bg-gradient-to-r from-primary-500 to-primary-600 p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 relative overflow-hidden text-white border-none shadow-xl">
                 <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl blend-overlay"></div>
                 
                 <div className="relative z-10 w-full">
                     <div className="flex items-center gap-4 mb-3">
                         <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                             <FileText size={32} />
                         </div>
                         <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
                             Medical Records
                         </h1>
                     </div>
                     <p className="text-primary-50 text-lg w-full mt-2 font-medium max-w-xl">
                         Securely access and manage all your reports, scan data, and health histories here.
                     </p>
                 </div>
                 
                 <div className="relative z-10 w-full sm:w-auto">
                     <button className="w-full sm:w-auto bg-white hover:bg-surface-50 text-primary-600 active:scale-95 transition-all text-base font-bold px-8 py-3.5 rounded-full shadow-lg flex items-center justify-center gap-2">
                         <UploadCloud size={20} /> Upload Record
                     </button>
                 </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-32 text-gray-400 font-semibold text-lg">Decrypting and loading records...</div>
            ) : records.length === 0 ? (
                <div className="glass-card flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-primary-200">
                    <div className="bg-primary-50 p-6 rounded-full mb-6">
                        <FileText className="w-16 h-16 text-primary-500" />
                    </div>
                    <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Secure your health files</h3>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400 max-w-md font-medium">
                        Get started by uploading your first medical report, lab result, or prescription.
                    </p>
                    <button className="btn-secondary mt-8 border-dashed shadow-none text-base">Select a file from your device</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {records.map((record, index) => (
                        <div key={record.id} className="glass-card flex items-center p-6 gap-6 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 bg-white border border-transparent hover:border-primary-100">
                            
                            {/* Icon Based on type - simulating different report styles */}
                            <div className={`p-4 rounded-3xl flex items-center justify-center transition-transform ${index % 2 === 0 ? 'bg-primary-50 text-primary-500' : 'bg-orange-50 text-orange-500'}`}>
                                {index % 2 === 0 ? <Activity size={36} /> : <FileLineChart size={36} />}
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-center">
                                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-1">
                                    {record.recordType}
                                </h3>
                                <p className="text-sm font-semibold text-gray-500 mb-2">
                                   For: <span className="text-gray-800">{record.patientName}</span>
                                </p>
                                <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                                    Added • {new Date(record.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>

                            <a 
                                href={`http://localhost:8080${record.filePath}`} 
                                target="_blank" rel="noopener noreferrer"
                                className="w-14 h-14 bg-surface-100 group-hover:bg-primary-500 group-hover:text-white rounded-full flex items-center justify-center text-primary-500 transition-colors shadow-sm active:scale-95 shrink-0"
                            >
                                <Download size={22} />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MedicalRecords;
