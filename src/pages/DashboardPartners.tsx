
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, ArrowUpRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardPartners = () => {
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
      status: "active"
    },
    {
      id: 2,
      name: "Анна Сидорова",
      company: "ИП Сидорова А.В.",
      email: "anna@example.com",
      phone: "+7 987 654-32-10",
      leads: 8,
      deals: 3,
      status: "inactive"
    },
    {
      id: 3,
      name: "Сергей Иванов",
      company: "ООО СервисПлюс",
      email: "sergey@service.ru",
      phone: "+7 912 345-67-89",
      leads: 21,
      deals: 12,
      status: "active"
    },
    {
      id: 4,
      name: "Ольга Козлова",
      company: "ИП Козлов М.И.",
      email: "olga@example.com",
      phone: "+7 934 567-89-01",
      leads: 5,
      deals: 1,
      status: "new"
    },
    {
      id: 5,
      name: "Александр Новиков",
      company: "ООО НовТех",
      email: "alex@novtech.ru",
      phone: "+7 945 678-90-12",
      leads: 12,
      deals: 5,
      status: "active"
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

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader user={user} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Партнеры</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Всего партнеров</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{partners.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активные лиды</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{partners.reduce((sum, p) => sum + p.leads, 0)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Завершенные сделки</CardTitle>
                  <BarChart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{partners.reduce((sum, p) => sum + p.deals, 0)}</div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Список партнеров</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Партнер</TableHead>
                        <TableHead>Контакты</TableHead>
                        <TableHead>Лиды</TableHead>
                        <TableHead>Сделки</TableHead>
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
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-1">
                                <Mail size={14} />
                                <span className="text-sm">{partner.email}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <Phone size={14} />
                                <span className="text-sm">{partner.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{partner.leads}</TableCell>
                          <TableCell className="font-medium">{partner.deals}</TableCell>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPartners;
