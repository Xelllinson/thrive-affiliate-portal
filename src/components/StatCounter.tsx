
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
}

const Counter = ({ end, duration = 2000, suffix = '', prefix = '', separator = ',' }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  
  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(Math.min(progress / duration, 1));
      
      const nextCount = Math.floor(easedProgress * end);
      
      if (nextCount !== countRef.current) {
        countRef.current = nextCount;
        setCount(nextCount);
      }
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(end); // Ensure we end at the exact target
      }
    };
    
    requestAnimationFrame(animate);
    
    return () => {
      startTimeRef.current = null;
    };
  }, [end, duration]);
  
  // Format the number with separators
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  
  return (
    <span>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  delay?: number;
}

const Stat = ({ value, label, suffix = '', prefix = '', delay = 0 }: StatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statRef.current) {
      observer.observe(statRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [delay]);
  
  return (
    <div 
      ref={statRef} 
      className={cn(
        "text-center transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-4xl md:text-5xl font-bold text-brand-purple">
        {isVisible ? (
          <Counter end={value} suffix={suffix} prefix={prefix} />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      <div className="mt-2 text-lg text-gray-600">{label}</div>
    </div>
  );
};

const StatCounter = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Нам доверяют</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Цифры говорят сами за себя
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat value={1500} label="Партнеров" suffix="+" delay={100} />
          <Stat value={12000} label="Сгенерированных QR-кодов" delay={300} />
          <Stat value={52} label="Миллиона рублей выплат" prefix="₽" delay={500} />
          <Stat value={98} label="Процент удовлетворенности" suffix="%" delay={700} />
        </div>
      </div>
    </section>
  );
};

export default StatCounter;
