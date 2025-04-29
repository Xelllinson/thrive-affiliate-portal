
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, PieChart, ArrowUpRight, TrendingUp, Users, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "Иван Петров",
      company: "ООО Техно",
      email: "ivan@techno.ru",
      phone: "+7 999 123-45-67",
      leads: 15,
      deals: 7,
      status: "active",
      conversion: 47,
      revenue: 125000
    },
    {
      id: 2,
      name: "Анна Сидорова",
      company: "ИП Сидорова А.В.",
      email: "anna@example.com",
      phone: "+7 987 654-32-10",
      leads: 8,
      deals: 3,
      status: "inactive",
      conversion: 38,
      revenue: 45000
    },
    {
      id: 3,
      name: "Сергей Иванов",
      company: "ООО СервисПлюс",
      email: "sergey@service.ru",
      phone: "+7 912 345-67-89",
      leads: 21,
      deals: 12,
      status: "active",
      conversion: 57,
      revenue: 215000
    },
    {
      id: 4,
      name: "Ольга Козлова",
      company: "ИП Козлов М.И.",
      email: "olga@example.com",
      phone: "+7 934 567-89-01",
      leads: 5,
      deals: 1,
      status: "new",
      conversion: 20,
      revenue: 15000
    },
    {
      id: 5,
      name: "Александр Новиков",
      company: "ООО НовТех",
      email: "alex@novtech.ru",
      phone: "+7 945 678-90-12",
      leads: 12,
      deals: 5,
      status: "active",
      conversion: 42,
      revenue: 95000
    },
    {
      id: 6,
      name: "Елена Морозова",
      company: "ИП Морозова Е.С.",
      email: "elena@example.com",
      phone: "+7 956 789-01-23",
      leads: 17,
      deals: 9,
      status: "active",
      conversion: 53,
      revenue: 165000
    },
    {
      id: 7,
      name: "Дмитрий Соколов",
      company: "ООО СоколГрупп",
      email: "dmitry@sokol.ru",
      phone: "+7 967 890-12-34",
      leads: 11,
      deals: 4,
      status: "active",
      conversion: 36,
      revenue: 78000
    }
  ]);

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
      const parsedUser = JSON.parse(storedUser);
      // Проверка на права администратора
      if (!parsedUser.isAdmin) {
        toast({
          variant: "destructive",
          title: "Доступ запрещен",
          description: "У вас нет прав для просмотра этой страницы",
        });
        navigate("/dashboard");
        return;
      }
      
      setUser(parsedUser);
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
    return null;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Активный</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Неактивный</Badge>;
      case "new":
        return <Badge className="bg-blue-500">Новый</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  const totalLeads = partners.reduce((sum, p) => sum + p.leads, 0);
  const totalDeals = partners.reduce((sum, p) => sum + p.deals, 0);
  const totalRevenue = partners.reduce((sum, p) => sum + p.revenue, 0);
  const averageConversion = Math.round(partners.reduce((sum, p) => sum + p.conversion, 0) / partners.length);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Панель администратора</h1>
              <div className="flex items-center space-x-2 mt-2 md:mt-0">
                <Badge className="bg-purple-600">Администратор</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего партнеров</CardTitle>
                  <Users className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{partners.length}</div>
                  <p className="text-xs text-muted-foreground">{partners.filter(p => p.status === "active").length} активных</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общее количество лидов</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalLeads}</div>
                  <p className="text-xs text-muted-foreground">+{Math.round(totalLeads * 0.12)} за последний месяц</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Успешные сделки</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalDeals}</div>
                  <p className="text-xs text-muted-foreground">Конверсия {averageConversion}%</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
                  <BarChart className="h-4 w-4 text-rose-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} руб.</div>
                  <p className="text-xs text-muted-foreground">~{Math.round(totalRevenue/totalDeals/1000)*1000} руб./сделка</p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="partners" className="mb-8">
              <TabsList>
                <TabsTrigger value="partners" className="flex items-center">
                  <Users className="mr-2" size={16} />
                  Партнеры
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center">
                  <BarChart className="mr-2" size={16} />
                  Аналитика
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center">
                  <History className="mr-2" size={16} />
                  Активность
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="partners">
                <Card>
                  <CardHeader>
                    <CardTitle>Список партнеров</CardTitle>
                    <CardDescription>
                      Полный список всех партнеров в системе с их показателями
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Партнер</TableHead>
                            <TableHead>Лиды</TableHead>
                            <TableHead>Сделки</TableHead>
                            <TableHead>Конверсия</TableHead>
                            <TableHead>Доход</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {partners.map((partner) => (
                            <TableRow key={partner.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-brand-purple text-white">
                                      {partner.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{partner.name}</p>
                                    <p className="text-xs text-gray-500">{partner.company}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{partner.leads}</TableCell>
                              <TableCell className="font-medium">{partner.deals}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <span className={`font-medium ${partner.conversion > 50 ? 'text-green-600' : partner.conversion > 30 ? 'text-amber-600' : 'text-red-600'}`}>
                                    {partner.conversion}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{partner.revenue.toLocaleString()} руб.</TableCell>
                              <TableCell>{getStatusBadge(partner.status)}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Подробнее</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Аналитика продаж</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-16 text-gray-500">
                    <PieChart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p>Здесь будут отображаться графики и аналитика по продажам</p>
                    <p className="text-sm mt-2">Функциональность в разработке</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Журнал активности</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-16 text-gray-500">
                    <History className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p>Здесь будут отображаться последние действия партнеров</p>
                    <p className="text-sm mt-2">Функциональность в разработке</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
