
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  QrCode,
  Link as LinkIcon,
  History,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarLink = ({ to, icon, text, isCollapsed, isActive }: SidebarLinkProps) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center py-3 px-3 rounded-md transition-colors hover:bg-brand-purple/10",
        isActive ? "bg-brand-purple/10 text-brand-purple font-medium" : "text-gray-600"
      )}
    >
      <div className="flex items-center justify-center w-10">{icon}</div>
      {!isCollapsed && (
        <span className="ml-2 transition-opacity duration-200">{text}</span>
      )}
    </Link>
  );
};

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar = ({ onLogout }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Проверяем, является ли пользователь администратором
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsAdmin(!!user.isAdmin);
      } catch (e) {
        setIsAdmin(false);
      }
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const links = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, text: "Панель управления" },
    { to: "/dashboard/qr-codes", icon: <QrCode size={20} />, text: "QR-коды" },
    { to: "/dashboard/referral-links", icon: <LinkIcon size={20} />, text: "Реферальные ссылки" },
    { to: "/dashboard/history", icon: <History size={20} />, text: "История" },
    { to: "/dashboard/partners", icon: <Users size={20} />, text: "Партнеры" },
  ];

  // Добавляем ссылку на админ-панель только для администраторов
  const adminLinks = isAdmin ? [
    { to: "/admin", icon: <LayoutDashboard size={20} />, text: "Админ-панель" },
  ] : [];

  const allLinks = [...links, ...adminLinks];

  const sidebarClasses = cn(
    "flex flex-col h-screen bg-white border-r transition-all duration-300 z-20",
    isCollapsed ? "w-[70px]" : "w-[250px]",
    isMobile ? "fixed left-0 top-0" : "",
    isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
  );

  return (
    <>
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-30 md:hidden shadow-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      )}
      
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center">
            {!isCollapsed && <span className="text-xl font-bold text-gradient">ПартнерКабинет</span>}
            {isCollapsed && <span className="text-xl font-bold text-gradient">ПК</span>}
          </Link>
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCollapse}
              className="ml-2"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {allLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              text={link.text}
              isCollapsed={isCollapsed}
              isActive={location.pathname === link.to}
            />
          ))}
        </nav>
        
        <div className="p-3 border-t">
          <Button
            variant="ghost"
            className={cn(
              "flex items-center py-2 px-3 w-full text-red-500 hover:bg-red-50",
              isCollapsed ? "justify-center" : "justify-start"
            )}
            onClick={onLogout}
          >
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-2">Выйти</span>}
          </Button>
        </div>
      </div>
      
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
