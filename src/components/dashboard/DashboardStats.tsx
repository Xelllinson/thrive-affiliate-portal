
import { 
  TrendingUp, 
  Users, 
  QrCode, 
  Link as LinkIcon,
  ArrowUpRight,
  ArrowDownRight 
} from "lucide-react";

const stats = [
  {
    title: "Общий доход",
    value: "₽124,500",
    change: "+12.5%",
    increasing: true,
    icon: TrendingUp,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Активные партнеры",
    value: "48",
    change: "+4.2%",
    increasing: true,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Сканирований QR",
    value: "1,245",
    change: "-2.3%",
    increasing: false,
    icon: QrCode,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Переходы по ссылкам",
    value: "3,782",
    change: "+7.1%",
    increasing: true,
    icon: LinkIcon,
    color: "bg-orange-100 text-orange-600",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={stat.title}
          className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-2.5 rounded-lg ${stat.color}`}>
              <stat.icon size={20} />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            {stat.increasing ? (
              <ArrowUpRight className="text-green-500 mr-1" size={16} />
            ) : (
              <ArrowDownRight className="text-red-500 mr-1" size={16} />
            )}
            <span className={stat.increasing ? "text-green-500" : "text-red-500"}>
              {stat.change}
            </span>
            <span className="text-gray-500 ml-1">за месяц</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
