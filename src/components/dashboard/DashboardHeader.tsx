
import { useState } from "react";
import { Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  user: {
    email: string;
    fullName?: string;
    companyName?: string;
  };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Поиск",
        description: `Вы искали: ${searchTerm}`,
      });
    }
  };
  
  const displayName = user.fullName || user.email;
  
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center w-full max-w-md">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="search"
            placeholder="Поиск..."
            className="pl-10 bg-gray-50 border-gray-100 focus:bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
      
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div>
                  <p className="font-medium">Новая регистрация</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Пользователь перешел по вашей реферальной ссылке
                  </p>
                  <p className="text-xs text-gray-400 mt-2">2 часа назад</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-4 cursor-pointer">
                <div>
                  <p className="font-medium">Новая сделка</p>
                  <p className="text-sm text-gray-500 mt-1">
                    В Битрикс24 создана новая сделка
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Вчера</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-brand-purple text-white">
                  {user.fullName ? getInitials(user.fullName) : user.email.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block font-medium">
                {displayName.length > 20 ? `${displayName.substring(0, 20)}...` : displayName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2" size={16} />
              <span>Профиль</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2" size={16} />
              <span>Настройки</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <LogOut className="mr-2" size={16} />
              <span>Выйти</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
