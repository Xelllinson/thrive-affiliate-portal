
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Building2, Phone, Mail, MessageSquare, Loader2, Check } from "lucide-react";
import Footer from "@/components/Footer";

const ApplicationForm = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Get referral details from URL
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get("ref") || "";
  const campaignId = queryParams.get("campaign") || "";
  const source = queryParams.get("source") || "direct";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !email) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // This would be a real API call to Bitrix24 in production
      // Simulate API request for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Lead submitted:", {
        name,
        company,
        phone,
        email,
        message,
        referralCode,
        campaignId,
        source,
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Заявка отправлена",
        description: "Спасибо за обращение! Мы свяжемся с вами в ближайшее время.",
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось отправить заявку. Пожалуйста, попробуйте еще раз.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <div className="flex-grow flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-4xl mx-auto">
          {submitted ? (
            <Card className="animate-fade-in">
              <CardContent className="pt-10 pb-10 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-6">Заявка успешно отправлена!</h2>
                <p className="text-gray-500 mt-3 mb-6">
                  Спасибо за обращение. Наш менеджер свяжется с вами в ближайшее время.
                </p>
                <Button 
                  onClick={() => window.location.href = "/"} 
                  className="mt-4"
                >
                  Вернуться на главную
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className={`h-12 w-12 rounded-full bg-brand-purple/10 flex items-center justify-center ${referralCode ? 'text-brand-purple' : 'text-gray-400'}`}>
                    <User size={24} />
                  </div>
                  <div className="h-0.5 w-6 bg-gray-200"></div>
                  <div className="h-12 w-12 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
                    <MessageSquare size={24} />
                  </div>
                </div>
                <CardTitle className="text-center text-3xl font-bold">Оставить заявку</CardTitle>
                {referralCode && (
                  <p className="text-center text-gray-500 mt-2">
                    Вас пригласил партнер: <span className="font-medium">{referralCode}</span>
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      ФИО <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input
                        id="name"
                        placeholder="Введите ваше полное имя"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Компания</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input
                        id="company"
                        placeholder="Название вашей компании"
                        className="pl-10"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Телефон <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        className="pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите подробнее о вашем запросе..."
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Отправка...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationForm;
