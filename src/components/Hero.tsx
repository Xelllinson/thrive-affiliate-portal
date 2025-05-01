
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      <div className="relative pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-purple-darker">
                Партнерская программа для вашего бизнеса
              </h1>
              <p className="mt-3 text-lg text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Зарабатывайте с каждого привлеченного клиента. 
                Используйте персональные QR-коды и реферальные ссылки для 
                привлечения новых клиентов и отслеживайте эффективность в реальном времени.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button asChild size="lg" className="btn-animate bg-brand-purple hover:bg-brand-purple-dark text-lg">
                  <Link to="/register" className="flex items-center gap-2">
                    Начать бесплатно
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-animate text-lg">
                  <Link to="/benefits">Узнать больше</Link>
                </Button>
              </div>
              <div className="mt-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <p>30 дней бесплатно. Без указания карты.</p>
              </div>
            </div>
            <div className="hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Партнерский кабинет"
                className="rounded-xl shadow-2xl object-cover w-full h-[450px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 -z-10 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="de119a3e-555a-4c05-8ea1-dff2ec26219b"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-brand-purple" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#de119a3e-555a-4c05-8ea1-dff2ec26219b)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 -z-10 opacity-20">
        <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7ddfa69"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-brand-purple" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="384" fill="url(#85737c0e-0916-41d7-917f-596dc7ddfa69)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
