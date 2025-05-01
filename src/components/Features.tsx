
import { BadgeCheck, Globe, ChartBar, Users, Link as LinkIcon, QrCode } from "lucide-react";

const features = [
  {
    name: "QR-коды для партнеров",
    description: "Создавайте персональные QR-коды для каждого партнера, которые можно использовать в любых рекламных материалах.",
    icon: QrCode,
  },
  {
    name: "Реферальные ссылки",
    description: "Генерируйте уникальные реферальные ссылки для отслеживания источников трафика и конверсий.",
    icon: LinkIcon,
  },
  {
    name: "Интеграция с Битрикс24",
    description: "Автоматическое создание сделок и их распределение между партнерами в CRM Битрикс24.",
    icon: Globe,
  },
  {
    name: "Аналитика и отчеты",
    description: "Получайте детальную статистику по каждому партнеру, каналу и рекламной кампании.",
    icon: ChartBar,
  },
  {
    name: "Многоуровневая структура",
    description: "Создавайте иерархию партнеров с разными уровнями комиссий и вознаграждений.",
    icon: Users,
  },
  {
    name: "Автоматизация выплат",
    description: "Настройте автоматическую систему выплат вознаграждений вашим партнерам.",
    icon: BadgeCheck,
  },
];

const Features = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-base text-brand-purple font-semibold tracking-wide uppercase">Возможности</h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Все необходимое для управления партнерами
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Наша платформа предоставляет полный набор инструментов для эффективной работы с партнерской сетью.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className="relative p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in flex flex-col h-full"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-purple text-white mb-5">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
              <p className="text-gray-500 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
