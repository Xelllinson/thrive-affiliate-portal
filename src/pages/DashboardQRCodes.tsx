
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QRCodeGenerator from "@/components/dashboard/QRCodeGenerator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Download, Trash2, Search, Plus } from "lucide-react";

const QRCodeItem = ({ id, name, url, image, onDelete }: { id: string, name: string, url: string, image: string, onDelete: (id: string) => void }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="bg-white border p-2 rounded">
            <img src={image} alt={name} className="w-20 h-20 object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg truncate">{name}</h3>
            <p className="text-sm text-muted-foreground truncate">{url}</p>
          </div>
          <div className="flex flex-nowrap gap-2 self-end sm:self-center">
            <Button variant="outline" size="icon">
              <Download size={18} />
            </Button>
            <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700" onClick={() => onDelete(id)}>
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardQRCodes = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodes, setQRCodes] = useState<any[]>([]);
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
      
      // Mock QR codes data
      setQRCodes([
        {
          id: "qr1",
          name: "Акция Лето 2023",
          url: "https://partnercabinet.ru/?ref=partner123&campaign=summer2023",
          image: "https://api.qrserver.com/v1/create-qr-code/?data=https://partnercabinet.ru/?ref=partner123&campaign=summer2023&size=200x200",
          createdAt: "2023-06-15"
        },
        {
          id: "qr2",
          name: "Партнерская программа",
          url: "https://partnercabinet.ru/?ref=partner123",
          image: "https://api.qrserver.com/v1/create-qr-code/?data=https://partnercabinet.ru/?ref=partner123&size=200x200",
          createdAt: "2023-05-22"
        },
        {
          id: "qr3",
          name: "Промо-акция",
          url: "https://partnercabinet.ru/?ref=partner123&promo=true",
          image: "https://api.qrserver.com/v1/create-qr-code/?data=https://partnercabinet.ru/?ref=partner123&promo=true&size=200x200",
          createdAt: "2023-07-01"
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

  const handleDeleteQRCode = (id: string) => {
    setQRCodes(prev => prev.filter(qr => qr.id !== id));
    toast({
      title: "QR-код удален",
      description: "QR-код был успешно удален из вашего списка.",
    });
  };

  const filteredQRCodes = qrCodes.filter(qr => 
    qr.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    qr.url.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1 className="text-2xl font-bold">QR-коды</h1>
                <p className="text-gray-600">Управление вашими QR-кодами</p>
              </div>
              
              <Button className="mt-3 sm:mt-0 bg-brand-purple hover:bg-brand-purple-dark">
                <Plus className="mr-2" size={18} />
                Создать новый QR-код
              </Button>
            </div>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <QrCode className="mr-2" size={24} />
                  Генератор QR-кодов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QRCodeGenerator />
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Поиск QR-кодов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="sortOrder" className="sr-only">Сортировать по</Label>
                  <select 
                    id="sortOrder"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-brand-purple focus:ring-brand-purple h-10 px-3"
                  >
                    <option>Новые сначала</option>
                    <option>Старые сначала</option>
                    <option>По имени (А-Я)</option>
                    <option>По имени (Я-А)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredQRCodes.length > 0 ? (
                filteredQRCodes.map(qr => (
                  <QRCodeItem
                    key={qr.id}
                    id={qr.id}
                    name={qr.name}
                    url={qr.url}
                    image={qr.image}
                    onDelete={handleDeleteQRCode}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <QrCode className="mx-auto text-gray-300" size={64} />
                  <p className="mt-4 text-gray-500">
                    {searchTerm
                      ? "QR-коды, соответствующие запросу, не найдены."
                      : "У вас пока нет сохраненных QR-кодов. Создайте свой первый QR-код с помощью генератора выше."}
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

export default DashboardQRCodes;
