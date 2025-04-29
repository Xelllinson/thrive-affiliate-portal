
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

const DashboardHistory = () => {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      type: "Регистрация по QR",
      date: "2025-04-28",
      time: "14:32",
      status: "success",
      details: "Новый клиент перешел по QR коду"
    },
    {
      id: 2,
      type: "Реферальная ссылка",
      date: "2025-04-27",
      time: "10:15",
      status: "success",
      details: "Клиент зарегистрировался по реферальной ссылке"
    },
    {
      id: 3,
      type: "Создана сделка",
      date: "2025-04-25",
      time: "16:47",
      status: "pending",
      details: "Сделка передана в отдел продаж"
    },
    {
      id: 4,
      type: "Запрос консультации",
      date: "2025-04-23",
      time: "09:21",
      status: "success",
      details: "Клиент запросил консультацию"
    },
    {
      id: 5,
      type: "Реферальная ссылка",
      date: "2025-04-20",
      time: "12:05",
      status: "error",
      details: "Ошибка при регистрации клиента"
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
      case "success":
        return <Badge className="bg-green-500">Успешно</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">В процессе</Badge>;
      case "error":
        return <Badge className="bg-red-500">Ошибка</Badge>;
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
            <h1 className="text-2xl font-bold mb-6">История активности</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>История действий и событий</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Тип</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Время</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Детали</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historyItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.type}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Calendar size={14} />
                            {item.date}
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Clock size={14} />
                            {item.time}
                          </TableCell>
                          <TableCell>{getStatusBadge(item.status)}</TableCell>
                          <TableCell>{item.details}</TableCell>
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

export default DashboardHistory;
