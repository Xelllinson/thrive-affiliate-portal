
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    content: "Партнерский кабинет позволил нам увеличить продажи через партнеров на 45% за первые 3 месяца работы. Очень довольны результатом!",
    author: "Екатерина Смирнова",
    position: "Коммерческий директор, ООО «Технологии Будущего»",
    rating: 5,
  },
  {
    content: "Система очень простая в использовании. Регистрация партнеров, создание QR-кодов и ссылок, отслеживание конверсий — всё работает отлично!",
    author: "Алексей Петров",
    position: "CEO, Digital Marketing Agency",
    rating: 5,
  },
  {
    content: "Интеграция с Битрикс24 работает безупречно, все лиды автоматически попадают в нашу CRM и закрепляются за нужными партнерами.",
    author: "Дмитрий Иванов",
    position: "Руководитель отдела продаж, «Инвест Групп»",
    rating: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Отзывы наших клиентов
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Узнайте, что говорят о нас компании, уже использующие нашу платформу.
          </p>
        </div>
        
        <div className="mt-12 max-w-lg mx-auto md:max-w-xl lg:max-w-3xl relative">
          <div className="relative animate-fade-in">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < testimonials[currentIndex].rating ? "#FFD700" : "none"} 
                    stroke={i < testimonials[currentIndex].rating ? "#FFD700" : "#CBD5E0"} 
                    className="mr-1"
                  />
                ))}
              </div>
              <p className="text-lg sm:text-xl font-medium text-gray-900 italic mb-6">"{testimonials[currentIndex].content}"</p>
              <div>
                <h4 className="font-bold text-gray-900">{testimonials[currentIndex].author}</h4>
                <p className="text-gray-500">{testimonials[currentIndex].position}</p>
              </div>
            </div>
            
            <div className="absolute -bottom-4 w-full flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors", 
                    index === currentIndex ? "bg-brand-purple" : "bg-gray-300"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-8">
            <Button 
              onClick={prevSlide}
              variant="outline" 
              size="icon"
              className="rounded-full shadow-md animate-fade-in"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8">
            <Button 
              onClick={nextSlide}
              variant="outline" 
              size="icon"
              className="rounded-full shadow-md animate-fade-in"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
