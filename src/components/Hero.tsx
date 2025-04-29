
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-20">
      <div className="relative pt-10 pb-20 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-base font-semibold text-brand-purple uppercase tracking-wide sm:text-lg lg:text-base xl:text-lg animate-fade-in">
                  Зарабатывайте с нами
                </span>
                <span className="mt-1 block text-3xl font-extrabold tracking-tight sm:text-4xl xl:text-5xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <span className="block text-gray-900">Партнерская программа для </span>
                  <span className="block text-gradient">вашего бизнеса</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Создавайте персональные QR-коды и реферальные ссылки, которые будут приводить к вам клиентов. 
                Отслеживайте эффективность своих партнеров в режиме реального времени.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                  <Button asChild size="lg" className="btn-animate bg-brand-purple hover:bg-brand-purple-dark">
                    <Link to="/register">Начать бесплатно</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="btn-animate">
                    <Link to="/benefits">Узнать больше</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:mt-0 lg:max-w-none lg:col-span-6 animate-scale-in">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="relative block w-full bg-white sm:overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Партнерский кабинет" 
                    className="w-full object-cover h-64 sm:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center">
                    <Button variant="secondary" size="lg" className="btn-animate">
                      <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Смотреть демо
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 text-gray-50"
          width="400"
          height="400"
          fill="none"
          viewBox="0 0 400 400"
        >
          <defs>
            <pattern
              id="pattern1"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-gray-100" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#pattern1)" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;
