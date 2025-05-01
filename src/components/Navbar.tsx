
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, PhoneCall, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { name: "Главная", icon: <Home size={18} className="mr-1" />, path: "/" },
    { name: "Преимущества", icon: null, path: "/benefits" },
    { name: "О нас", icon: <Info size={18} className="mr-1" />, path: "/about" },
    { name: "Контакты", icon: <PhoneCall size={18} className="mr-1" />, path: "/contacts" }
  ];

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300",
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gradient">ПартнерКабинет</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === link.path 
                    ? "text-brand-purple font-semibold" 
                    : "text-gray-700 hover:text-brand-purple"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild className="btn-animate">
                <Link to="/login" className="flex items-center">
                  <LogIn size={16} className="mr-1" /> Войти
                </Link>
              </Button>
              <Button size="sm" asChild className="btn-animate bg-brand-purple hover:bg-brand-purple-dark">
                <Link to="/register" className="flex items-center">
                  <UserPlus size={16} className="mr-1" /> Регистрация
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-x-0 top-16 bg-white shadow-md transition-all duration-300 transform z-40",
        mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={cn(
                "flex items-center block px-3 py-2 rounded-md text-base font-medium",
                location.pathname === link.path 
                  ? "text-brand-purple font-semibold bg-purple-50" 
                  : "text-gray-700 hover:text-brand-purple hover:bg-gray-50"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col space-y-2 pt-4 pb-2">
            <Button variant="outline" asChild className="btn-animate">
              <Link to="/login" className="flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
                <LogIn size={16} className="mr-1" /> Войти
              </Link>
            </Button>
            <Button asChild className="btn-animate bg-brand-purple hover:bg-brand-purple-dark">
              <Link to="/register" className="flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
                <UserPlus size={16} className="mr-1" /> Регистрация
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
