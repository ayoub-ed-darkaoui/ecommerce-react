import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, LayoutDashboard, ChevronDown, Package, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const adminMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    setIsAdminAuthenticated(Boolean(token));
    if (!token) {
      setIsAdminMenuOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'admin_token') {
        const token = event.newValue;
        setIsAdminAuthenticated(Boolean(token));
        if (!token) {
          setIsAdminMenuOpen(false);
        }
      }
    };

    const handleClickOutside = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false);
      }
    };

    window.addEventListener('storage', handleStorage);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAdminAuthenticated(false);
    setIsAdminMenuOpen(false);
    navigate('/admin/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-black tracking-tighter uppercase relative z-10">
            Gotcha
            <span className="text-[#FFDE42] text-4xl leading-none absolute -top-1 -right-3">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center font-bold uppercase tracking-wider text-sm">
            <Link to="/products" className="hover:text-[#FFDE42] transition-colors relative group">
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFDE42] transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/collections" className="hover:text-[#FFDE42] transition-colors relative group">
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFDE42] transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="hover:text-[#FFDE42] transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFDE42] transition-all group-hover:w-full"></span>
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
            <button className="hidden sm:block hover:text-[#FFDE42] transition-colors">
              <Search size={22} className="stroke-[2.5]" />
            </button>
            {!isAdminAuthenticated && (
              <Link
                to="/admin/login"
                className="hidden md:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-zinc-900 border border-zinc-700 transition-all duration-200 hover:border-[#FFDE42] hover:bg-[#FFDE42]/10 hover:text-[#FFDE42] hover:shadow-[0_8px_20px_rgba(255,222,66,0.15)]"
                title="Admin Access"
              >
                <LayoutDashboard size={17} className="stroke-[2.2]" />
                <span>Admin</span>
              </Link>
            )}
            {isAdminAuthenticated && (
              <div ref={adminMenuRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setIsAdminMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:bg-[#111] hover:text-[#FFDE42] hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  aria-haspopup="menu"
                  aria-expanded={isAdminMenuOpen}
                >
                  <LayoutDashboard size={18} className="stroke-[2.2]" />
                  <span>Admin</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isAdminMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isAdminMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                      className="absolute right-0 top-[calc(100%+10px)] w-56 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
                      role="menu"
                    >
                      <Link
                        to="/admin/orders"
                        onClick={() => setIsAdminMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-[#FFDE42]/15 hover:text-black"
                        role="menuitem"
                      >
                        <Package size={17} className="text-[#FFDE42]" />
                        Orders
                      </Link>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-zinc-700 transition-colors hover:bg-red-50 hover:text-red-600"
                        role="menuitem"
                      >
                        <LogOut size={17} className="text-red-500" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <Link to="/cart" className="relative hover:text-[#FFDE42] transition-colors group">
              <ShoppingCart size={22} className="stroke-[2.5]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-[#FFDE42] text-black text-xs font-bold px-1.5 py-0.5 rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 md:hidden flex flex-col space-y-4 font-bold uppercase text-xl"
          >
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            {!isAdminAuthenticated && (
              <Link
                to="/admin/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-base font-bold text-white transition-all duration-200 hover:bg-[#FFDE42]/10 hover:text-[#FFDE42] hover:border hover:border-[#FFDE42]"
              >
                <LayoutDashboard size={18} />
                Admin Login
              </Link>
            )}
            {isAdminAuthenticated && (
              <div className="pt-2 border-t border-zinc-100 space-y-2 normal-case text-base uppercase tracking-wide">
                <Link
                  to="/admin/orders"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminMenuOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-xl bg-zinc-950 px-4 py-3 text-white transition-colors hover:text-[#FFDE42]"
                >
                  <LayoutDashboard size={18} />
                  Admin / Orders
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleAdminLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 text-left text-zinc-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;