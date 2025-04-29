
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
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center animate-fade-in">
          <h2 className="text-base text-brand-purple font-semibold tracking-wide uppercase">Возможности</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Все необходимое для управления партнерами
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Наша платформа предоставляет полный набор инструментов для эффективной работы с партнерской сетью.
          </p>
        </div>

        <div className="mt-16">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-12">
            {features.map((feature, index) => (
              <div key={feature.name} className="relative card-hover p-6 rounded-lg bg-white border shadow-sm animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-purple text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features;
