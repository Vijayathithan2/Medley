import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, ThumbsUp, UserCircle, Send, Stethoscope } from 'lucide-react';

const CommunityForum = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [replyContent, setReplyContent] = useState({});
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/forum');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching forum posts:', error);
        }
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8080/api/forum?userId=${user.id}`, newPost);
            setNewPost({ title: '', content: '' });
            fetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end mb-4 border-b border-gray-200 dark:border-gray-700/50 pb-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <MessageSquare className="text-indigo-500" /> Community Forum
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ask questions and share health experiences.</p>
                </div>
            </div>

            {/* Create Post Form */}
            <div className="glass-card p-6 border-white/40">
                <form onSubmit={handleCreatePost} className="space-y-4">
                    <input 
                        type="text" required placeholder="Question Title..." 
                        value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})}
                        className="input-field bg-white/50 focus:bg-white"
                    />
                    <textarea 
                        required placeholder="Detail your health question or discussion..." rows="3"
                        value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})}
                        className="input-field bg-white/50 focus:bg-white resize-none"
                    ></textarea>
                    <div className="flex justify-end">
                        <button type="submit" className="btn-primary flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700">
                            <Send size={16} /> Post Discussion
                        </button>
                    </div>
                </form>
            </div>

            {/* Forum Posts List */}
            <div className="space-y-4">
                {posts.length === 0 ? (
                    <div className="glass-card flex flex-col items-center justify-center py-16 text-center text-gray-500">
                        <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                        <p>No queries have been posted in the community yet.</p>
                    </div>
                ) : posts.map(post => (
                    <div key={post.id} className="glass-card overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                    <UserCircle size={24} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.authorName}</h4>
                                    <p className="text-xs text-gray-500 flex items-center gap-1.5">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{post.content}</p>
                            
                            <div className="flex gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                                    <ThumbsUp size={16} /> {post.upvotes || 0} Upvotes
                                </button>
                                <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                                    <MessageSquare size={16} /> {post.replies?.length || 0} Replies
                                </span>
                            </div>
                        </div>

                        {/* Replies Section */}
                        {post.replies && post.replies.length > 0 && (
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 space-y-4 border-t border-gray-100 dark:border-gray-800">
                                {post.replies.map(reply => (
                                    <div key={reply.id} className="flex gap-4">
                                        <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center text-white ${reply.authorRole === 'DOCTOR' ? 'bg-emerald-500' : 'bg-gray-400'}`}>
                                            {reply.authorRole === 'DOCTOR' ? <Stethoscope size={16} /> : <UserCircle size={16} />}
                                        </div>
                                        <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative">
                                            {reply.authorRole === 'DOCTOR' && (
                                                <span className="absolute top-0 right-0 -mt-2 -mr-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold rounded-lg border border-emerald-200">Verified Doc</span>
                                            )}
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-sm text-gray-900 dark:text-white">{reply.authorName}</span>
                                                <span className="text-[10px] text-gray-400">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityForum;
