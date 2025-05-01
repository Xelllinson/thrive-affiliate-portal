
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-purple-dark opacity-95"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl animate-fade-in">
            Готовы начать партнерскую программу?
          </h2>
          <p className="mt-6 text-xl text-white/95 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Регистрируйтесь сейчас и получите 30 дней бесплатного доступа ко всем функциям платформы.
            <br />Без указания платежной карты.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" className="bg-white text-brand-purple-dark hover:bg-gray-100 btn-animate text-lg">
              <Link to="/register" className="flex items-center gap-2">
                Начать бесплатно
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 btn-animate text-lg">
              <Link to="/contacts">
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 text-white/10"
          width="300" 
          height="300" 
          fill="none" 
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
        </svg>
        <svg 
          className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-white/10"
          width="400" 
          height="400" 
          fill="none" 
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
