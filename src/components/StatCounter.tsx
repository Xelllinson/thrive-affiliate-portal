
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
        "text-center transition-opacity duration-500 bg-white p-8 rounded-xl border border-gray-100 shadow-sm",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="text-4xl md:text-5xl font-bold text-brand-purple mb-2">
        {isVisible ? (
          <Counter end={value} suffix={suffix} prefix={prefix} />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>
      <div className="text-lg text-gray-600">{label}</div>
    </div>
  );
};

const StatCounter = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-base text-brand-purple font-semibold tracking-wide uppercase">Нам доверяют</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Впечатляющие результаты
          </p>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Цифры говорят сами за себя. Наша партнерская программа приносит реальные результаты.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat value={1500} label="Активных партнеров" suffix="+" delay={100} />
          <Stat value={12000} label="QR-кодов создано" delay={300} />
          <Stat value={52} label="Миллиона рублей выплат" prefix="₽" delay={500} />
          <Stat value={98} label="Процент удовлетворенности" suffix="%" delay={700} />
        </div>
      </div>
    </section>
  );
};

export default StatCounter;
