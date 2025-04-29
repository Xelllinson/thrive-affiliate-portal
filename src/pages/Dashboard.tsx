
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QRCodeGenerator from "@/components/dashboard/QRCodeGenerator";
import ReferralLinkGenerator from "@/components/dashboard/ReferralLinkGenerator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChartHorizontal, LineChart } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
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

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Панель управления</h1>
            
            <DashboardStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Создание QR-кодов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <QRCodeGenerator />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Создание реферальных ссылок
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ReferralLinkGenerator />
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2" size={24} />
                    Аналитика
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview">
                    <TabsList className="mb-4">
                      <TabsTrigger value="overview" className="flex items-center">
                        <LineChart className="mr-2" size={16} />
                        Общая статистика
                      </TabsTrigger>
                      <TabsTrigger value="conversions" className="flex items-center">
                        <BarChartHorizontal className="mr-2" size={16} />
                        Конверсии
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border">
                          <h3 className="font-medium mb-4">Переходы по QR-кодам</h3>
                          <div className="h-40 flex items-center justify-center bg-gray-50 rounded">
                            <p className="text-gray-500">График переходов по QR-кодам</p>
                          </div>
                          <div className="mt-4 text-sm">
                            <div className="flex justify-between">
                              <span>Всего переходов:</span>
                              <span className="font-medium">1,245</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>Уникальных:</span>
                              <span className="font-medium">876</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg border">
                          <h3 className="font-medium mb-4">Переходы по реферальным ссылкам</h3>
                          <div className="h-40 flex items-center justify-center bg-gray-50 rounded">
                            <p className="text-gray-500">График переходов по реферальным ссылкам</p>
                          </div>
                          <div className="mt-4 text-sm">
                            <div className="flex justify-between">
                              <span>Всего переходов:</span>
                              <span className="font-medium">3,782</span>
                            </div>
                            <div className="flex justify-between mt-1">
                              <span>Уникальных:</span>
                              <span className="font-medium">2,341</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="conversions">
                      <div className="bg-white p-6 rounded-lg border">
                        <h3 className="font-medium mb-4">Конверсия в заявки</h3>
                        <div className="h-40 flex items-center justify-center bg-gray-50 rounded">
                          <p className="text-gray-500">График конверсии переходов в заявки</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Переходы</p>
                            <p className="text-xl font-bold">5,027</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Заявки</p>
                            <p className="text-xl font-bold">378</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-500">Конверсия</p>
                            <p className="text-xl font-bold text-green-600">7.5%</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
