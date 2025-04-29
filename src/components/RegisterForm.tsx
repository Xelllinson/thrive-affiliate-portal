
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: "Пожалуйста, примите условия использования сервиса",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка в пароле",
        description: "Пароли не совпадают",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Here we'll simulate a registration. In a real app, this would connect to a backend
      console.log("Registration attempt with:", { email, companyName, fullName });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      localStorage.setItem("user", JSON.stringify({ email, companyName, fullName }));
      
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в Партнерский кабинет!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description: error instanceof Error ? error.message : "Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Создать аккаунт</CardTitle>
        <CardDescription>
          Заполните форму для регистрации в партнерской программе
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input 
              id="fullName" 
              placeholder="Иванов Иван Иванович" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Название компании</Label>
            <Input 
              id="companyName" 
              placeholder="ООО «Компания»" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">
                  {showPassword ? "Скрыть пароль" : "Показать пароль"}
                </span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative">
              <Input 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                <span className="sr-only">
                  {showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked === true)}
            />
            <Label 
              htmlFor="terms" 
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Я принимаю{" "}
              <Link to="/terms" className="text-brand-purple hover:underline">
                Условия использования
              </Link>{" "}
              и{" "}
              <Link to="/privacy" className="text-brand-purple hover:underline">
                Политику конфиденциальности
              </Link>
            </Label>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-purple-dark"
            disabled={isLoading}
          >
            {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-brand-purple hover:underline font-medium">
            Войти
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
