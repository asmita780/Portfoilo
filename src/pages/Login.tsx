import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate('/admin');
      } else {
        setError(data.error || 'Invalid credentials. Try again.');
      }
    } catch (err) {
      setError('Error: Server is not running or unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-brand-bg">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-brand-teal/5"
      >
        <div className="flex justify-center mb-8">
          <div className="p-5 bg-brand-teal/5 rounded-3xl">
            <Lock className="w-10 h-10 text-brand-teal" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center text-brand-teal mb-2">Author Login</h1>
        <p className="text-center text-brand-teal/50 mb-10 text-sm">Welcome back. Please enter your details.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all outline-none"
              placeholder="e.g. author"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mb-6">
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Demo Credentials:</strong><br/>
              User: <code className="bg-amber-100 px-1 rounded">author</code><br/>
              Pass: <code className="bg-amber-100 px-1 rounded">password123</code>
            </p>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-teal text-white py-4 rounded-2xl font-bold hover:bg-brand-teal/90 transition-all shadow-xl disabled:opacity-50 flex justify-center items-center space-x-2"
          >
            {loading ? (
               <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
            ) : (
               <span>Access Dashboard</span>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
