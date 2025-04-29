
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Clock, Shield, RefreshCcw, Zap } from "lucide-react";
import CTASection from "@/components/CTASection";

const benefits = [
  {
    title: "Увеличение продаж",
    description: "Партнерская программа позволяет значительно расширить охват потенциальных клиентов и увеличить объем продаж без дополнительных затрат на маркетинг.",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Оплата за результат",
    description: "Вы платите комиссию только за фактические результаты: привлеченных клиентов, завершенные сделки или конкретные действия.",
    icon: CheckCircle2,
    color: "text-brand-purple",
  },
  {
    title: "Экономия времени",
    description: "Автоматизация процессов регистрации партнеров, учета переходов, создания сделок и распределения комиссионных освобождает ваше время для других задач.",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    title: "Безопасность и прозрачность",
    description: "Встроенные механизмы защиты обеспечивают безопасность данных и прозрачность всех операций в партнерской сети.",
    icon: Shield,
    color: "text-red-500",
  },
  {
    title: "Масштабируемость",
    description: "Легко масштабируйте вашу партнерскую программу от нескольких до сотен и тысяч партнеров без потери эффективности.",
    icon: RefreshCcw,
    color: "text-yellow-500",
  },
  {
    title: "Быстрый запуск",
    description: "Запустите собственную партнерскую программу за несколько минут благодаря простому и интуитивно понятному интерфейсу.",
    icon: Zap,
    color: "text-orange-500",
  },
];

const Benefits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-fade-in">
              <span className="block">Преимущества</span>
              <span className="block text-gradient mt-2">партнерской программы</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Узнайте, как наша партнерская программа может помочь вам масштабировать бизнес, увеличить продажи и оптимизировать маркетинговый бюджет.
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={benefit.title} className="border shadow-sm hover:shadow-md transition-shadow card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6">
                    <div className={`p-3 rounded-full inline-flex ${benefit.color} bg-opacity-10 mb-4`}>
                      <benefit.icon className={benefit.color} size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div className="mb-8 lg:mb-0 animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Как это работает
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Процесс организации партнерской программы с нашей платформой прост и понятен:
                </p>
                <div className="mt-6 space-y-4">
                  {[
                    "Регистрируйтесь и настраивайте параметры своей партнерской программы",
                    "Приглашайте партнеров или разместите форму регистрации на своем сайте",
                    "Партнеры получают доступ к своим уникальным QR-кодам и реферальным ссылкам",
                    "Отслеживайте все переходы, регистрации и сделки в реальном времени",
                    "Автоматически начисляйте комиссии и управляйте выплатами"
                  ].map((step, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-purple text-white">
                          {i + 1}
                        </div>
                      </div>
                      <p className="ml-3 text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative lg:col-start-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden border-8 border-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                    alt="Партнерская программа в действии"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Benefits;
