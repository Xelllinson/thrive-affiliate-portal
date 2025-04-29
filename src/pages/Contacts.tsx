
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Сообщение отправлено",
        description: "Мы ответим вам в ближайшее время",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-50 to-white py-20 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl animate-fade-in">
              Свяжитесь с нами
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              У вас есть вопросы или предложения? Мы будем рады помочь вам!
            </p>
          </div>
        </section>
        
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold mb-6">Контактная информация</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-brand-purple/10 text-brand-purple rounded-lg">
                      <Phone size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Телефон</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="tel:+74951234567" className="hover:text-brand-purple">+7 (495) 123-45-67</a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Пн-Пт с 9:00 до 18:00 (МСК)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-brand-purple/10 text-brand-purple rounded-lg">
                      <Mail size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Электронная почта</h3>
                      <p className="mt-1 text-gray-600">
                        <a href="mailto:info@partnercabinet.ru" className="hover:text-brand-purple">
                          info@partnercabinet.ru
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">
                        Мы отвечаем в течение 24 часов
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-brand-purple/10 text-brand-purple rounded-lg">
                      <MapPin size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Адрес</h3>
                      <p className="mt-1 text-gray-600">
                        123456, г. Москва, ул. Примерная, д. 123, офис 456
                      </p>
                      <p className="text-sm text-gray-500">
                        Встречи по предварительной записи
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">Часто задаваемые вопросы</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Как стать партнером?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Для того чтобы стать партнером, необходимо зарегистрироваться на нашей платформе и заполнить анкету партнера.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Как происходит оплата?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        Выплаты партнерам производятся ежемесячно, через удобные для вас платежные системы.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Что такое QR-код и как его использовать?</h4>
                      <p className="text-gray-600 text-sm mt-1">
                        QR-код — это двухмерный штрихкод, который можно разместить на любых рекламных материалах для быстрого перехода на вашу партнерскую ссылку.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input 
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема</Label>
                      <Input 
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea 
                        id="message"
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={18} />
                          Отправить сообщение
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
                
                <div className="mt-8 rounded-lg overflow-hidden h-64 border shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.347702921067!2d37.618687677629004!3d55.75537997259071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQstCwLCDQoNC-0YHRgdC40Y8!5e0!3m2!1sru!2sru!4v1698162699412!5m2!1sru!2sru" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
