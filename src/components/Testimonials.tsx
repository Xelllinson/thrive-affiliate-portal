
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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "Система очень простая в использовании. Регистрация партнеров, создание QR-кодов и ссылок, отслеживание конверсий — всё работает отлично!",
    author: "Алексей Петров",
    position: "CEO, Digital Marketing Agency",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "Интеграция с Битрикс24 работает безупречно, все лиды автоматически попадают в нашу CRM и закрепляются за нужными партнерами.",
    author: "Дмитрий Иванов",
    position: "Руководитель отдела продаж, «Инвест Групп»",
    rating: 4,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-base text-brand-purple font-semibold tracking-wide uppercase">Отзывы</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Что говорят наши клиенты
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Узнайте, что думают о нас компании, уже использующие нашу партнерскую программу
          </p>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in lg:flex items-start gap-8">
              <div className="flex-shrink-0 hidden lg:block">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].author}
                  className="w-24 h-24 rounded-full object-cover border-2 border-brand-purple shadow-md"
                />
              </div>
              <div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      fill={i < testimonials[currentIndex].rating ? "#9b87f5" : "none"} 
                      stroke={i < testimonials[currentIndex].rating ? "#9b87f5" : "#CBD5E0"} 
                      className="mr-1"
                    />
                  ))}
                </div>
                <p className="text-xl md:text-2xl font-medium text-gray-900 italic mb-6">"{testimonials[currentIndex].content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-purple shadow-md mr-4 lg:hidden"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonials[currentIndex].author}</h4>
                    <p className="text-gray-500">{testimonials[currentIndex].position}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 w-full flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors", 
                    index === currentIndex ? "bg-brand-purple" : "bg-gray-300"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-8">
              <Button 
                onClick={prevSlide}
                variant="outline" 
                size="icon"
                className="rounded-full shadow-md animate-fade-in bg-white hover:bg-gray-50"
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
                className="rounded-full shadow-md animate-fade-in bg-white hover:bg-gray-50"
                aria-label="Next testimonial"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
