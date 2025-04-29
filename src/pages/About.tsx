
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Алексей Петров",
      role: "Генеральный директор",
      bio: "Более 10 лет опыта в создании B2B SaaS-решений. Эксперт в области партнерского маркетинга и построения маркетинговых экосистем.",
      initials: "АП"
    },
    {
      name: "Екатерина Смирнова",
      role: "Технический директор",
      bio: "Опытный архитектор программного обеспечения с фокусом на создание масштабируемых и безопасных веб-приложений.",
      initials: "ЕС"
    },
    {
      name: "Дмитрий Иванов",
      role: "Руководитель отдела продаж",
      bio: "Специалист по построению и развитию партнерских отношений с опытом работы в крупнейших IT-компаниях.",
      initials: "ДИ"
    },
    {
      name: "Мария Козлова",
      role: "Руководитель службы поддержки",
      bio: "Эксперт в области клиентского сервиса с многолетним опытом работы с партнерскими программами и CRM-системами.",
      initials: "МК"
    }
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-fade-in">
                О нашей компании
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Мы создаем инновационные решения для управления партнерскими программами и автоматизации маркетинга
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="lg:col-span-6 mb-12 lg:mb-0 animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                  Наша миссия
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Мы стремимся сделать партнерский маркетинг доступным и эффективным инструментом для бизнеса любого масштаба. Наша цель — предоставить простое в использовании, но мощное решение для управления партнерскими программами.
                </p>
                <p className="text-lg text-gray-600">
                  С 2018 года мы помогаем компаниям масштабировать их бизнес через построение эффективных партнерских сетей, автоматизацию процессов и обеспечение полной прозрачности всех операций.
                </p>
              </div>
              <div className="lg:col-span-6 relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                    alt="Наш офис"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Наша команда
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                Талантливые специалисты, которые создают и развивают нашу платформу
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={member.name} className="border shadow-sm hover:shadow-md transition-shadow text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-6 pb-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarFallback className="bg-brand-purple text-white text-xl">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-brand-purple font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Почему нам доверяют
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                Ключевые принципы нашей работы
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Высокое качество и надежность",
                  description: "Мы уделяем особое внимание качеству нашего продукта и обеспечиваем его стабильную работу 24/7."
                },
                {
                  title: "Поддержка клиентов",
                  description: "Наша команда поддержки всегда готова помочь вам с любыми вопросами и обеспечить быстрое решение проблем."
                },
                {
                  title: "Постоянное развитие",
                  description: "Мы непрерывно улучшаем нашу платформу, добавляя новые функции и оптимизируя существующие."
                }
              ].map((item, index) => (
                <div key={item.title} className="text-center p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-brand-purple text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-6 animate-fade-in">
              Присоединяйтесь к нам!
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/90 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Начните использовать нашу партнерскую платформу уже сегодня и увеличьте ваши продажи
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                <Link to="/register">
                  Зарегистрироваться
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/contacts">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
