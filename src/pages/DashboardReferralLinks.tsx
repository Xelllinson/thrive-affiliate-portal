
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ReferralLinkGenerator from "@/components/dashboard/ReferralLinkGenerator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon, Copy, Trash2, Search, Plus, ExternalLink, CheckCircle } from "lucide-react";

const ReferralLinkItem = ({ 
  id, 
  name, 
  url, 
  clicks, 
  createdAt,
  onDelete 
}: { 
  id: string, 
  name: string, 
  url: string, 
  clicks: number, 
  createdAt: string,
  onDelete: (id: string) => void 
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена.",
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось скопировать ссылку.",
      });
    }
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{url}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <span className="mr-4">{clicks} переходов</span>
              <span>Создана: {new Date(createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 self-end sm:self-start">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {isCopied ? (
                <CheckCircle size={14} className="mr-1 text-green-500" />
              ) : (
                <Copy size={14} className="mr-1" />
              )}
              Копировать
            </Button>
            <Button variant="outline" size="sm" className="flex items-center" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} className="mr-1" />
                Открыть
              </a>
            </Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={() => onDelete(id)}>
              <Trash2 size={14} className="mr-1" />
              Удалить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardReferralLinks = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [referralLinks, setReferralLinks] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast({
        variant: "destructive",
        title: "Доступ запрещен",
        description: "Пожалуйста, войдите в систему",
      });
      navigate("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
      
      // Mock referral links data
      setReferralLinks([
        {
          id: "link1",
          name: "Базовая реферальная ссылка",
          url: "https://partnercabinet.ru/?ref=partner123",
          clicks: 245,
          createdAt: "2023-05-15"
        },
        {
          id: "link2",
          name: "Летняя кампания",
          url: "https://partnercabinet.ru/?ref=partner123&utm_campaign=summer23",
          clicks: 87,
          createdAt: "2023-06-01"
        },
        {
          id: "link3",
          name: "Facebook кампания",
          url: "https://partnercabinet.ru/?ref=partner123&utm_source=facebook",
          clicks: 132,
          createdAt: "2023-05-20"
        }
      ]);
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
    navigate("/login");
  };

  const handleDeleteLink = (id: string) => {
    setReferralLinks(prev => prev.filter(link => link.id !== id));
    toast({
      title: "Реферальная ссылка удалена",
      description: "Ссылка была успешно удалена из вашего списка.",
    });
  };

  const filteredReferralLinks = referralLinks.filter(link => 
    link.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    link.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Реферальные ссылки</h1>
                <p className="text-gray-600">Управление вашими реферальными ссылками</p>
              </div>
              
              <Button className="mt-3 sm:mt-0 bg-brand-purple hover:bg-brand-purple-dark">
                <Plus className="mr-2" size={18} />
                Создать новую ссылку
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LinkIcon className="mr-2" size={24} />
                  Генератор реферальных ссылок
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ReferralLinkGenerator />
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Поиск ссылок..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="sm:w-48">
                  <select 
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-purple focus:ring-brand-purple h-10 px-3"
                  >
                    <option>Сортировать по дате</option>
                    <option>Сортировать по кликам</option>
                    <option>Сортировать по имени</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredReferralLinks.length > 0 ? (
                filteredReferralLinks.map(link => (
                  <ReferralLinkItem
                    key={link.id}
                    id={link.id}
                    name={link.name}
                    url={link.url}
                    clicks={link.clicks}
                    createdAt={link.createdAt}
                    onDelete={handleDeleteLink}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <LinkIcon className="mx-auto text-gray-300" size={64} />
                  <p className="mt-4 text-gray-500">
                    {searchTerm
                      ? "Реферальные ссылки, соответствующие запросу, не найдены."
                      : "У вас пока нет сохраненных реферальных ссылок. Создайте свою первую ссылку с помощью генератора выше."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardReferralLinks;
