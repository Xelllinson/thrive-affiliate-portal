
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-purple-dark opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl animate-fade-in">
            Готовы начать партнерскую программу?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Регистрируйтесь сейчас и получите 30 дней бесплатного доступа ко всем функциям платформы.
          </p>
          <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="inline-flex rounded-md shadow">
              <Button asChild size="lg" className="bg-white text-brand-purple-dark hover:bg-gray-100 btn-animate">
                <Link to="/register">
                  Начать бесплатно
                </Link>
              </Button>
            </div>
            <div className="ml-3 inline-flex">
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10 btn-animate">
                <Link to="/contacts">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
