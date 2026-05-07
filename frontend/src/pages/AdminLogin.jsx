import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockKeyhole, LogIn, Mail, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (token) {
      navigate('/admin/orders', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email.trim() || !password.trim()) {
        throw new Error('Please enter email and password');
      }

      if (email.trim().toLowerCase() === 'admin@gotcha.shop' && password === 'admin123') {
        localStorage.setItem('admin_token', 'true');
        localStorage.setItem('admin_user', JSON.stringify({ email: 'admin@gotcha.shop', role: 'admin' }));
        navigate('/admin/orders', { replace: true });
        return;
      }

      throw new Error('Invalid login');
    } catch (err) {
      setError(err.message || 'Invalid login');
    }
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0b0b0c] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,222,66,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,222,66,0.08),transparent_24%)]" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden flex-col justify-between border-r border-white/10 p-10 lg:flex">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.45em] text-[#FFDE42]">Admin Console</p>
              <h1 className="max-w-md text-5xl font-black uppercase leading-[0.95] text-white">
                Manage orders with clarity.
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-7 text-zinc-300">
                Secure access for the Gotcha storefront dashboard. Review customer orders, totals, and delivery details in one place.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="flex items-center gap-3 text-sm font-semibold text-zinc-100">
                <ShieldCheck className="h-5 w-5 text-[#FFDE42]" />
                Protected local session via admin_token
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Use the demo credentials to enter the orders dashboard without any backend auth changes.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#FFDE42]">Welcome back</p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white">Admin Login</h2>
              </div>
              <div className="rounded-2xl border border-[#FFDE42]/20 bg-[#FFDE42]/10 p-3 text-[#FFDE42]">
                <LockKeyhole className="h-6 w-6" />
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-200">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/8 px-11 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-[#FFDE42]/50 focus:ring-4 focus:ring-[#FFDE42]/10"
                    placeholder="admin@gotcha.shop"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-200">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder:text-zinc-500 focus:border-[#FFDE42]/50 focus:ring-4 focus:ring-[#FFDE42]/10"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-medium text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`inline-flex w-full items-center justify-center rounded-2xl bg-[#FFDE42] px-6 py-3.5 text-base font-black text-black transition-all duration-200 ${
                  isLoading
                    ? 'cursor-not-allowed opacity-60'
                    : 'shadow-[0_18px_40px_rgba(255,222,66,0.22)] hover:-translate-y-0.5 hover:shadow-[0_24px_52px_rgba(255,222,66,0.28)]'
                }`}
              >
                <LogIn className="mr-2 h-5 w-5" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
              <p className="font-semibold text-white">Demo credentials</p>
              <p className="mt-2 font-mono text-[#FFDE42]">admin@gotcha.shop</p>
              <p className="font-mono text-[#FFDE42]">admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
