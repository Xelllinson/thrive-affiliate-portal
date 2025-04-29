
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here we'll simulate a login. In a real app, this would connect to a backend
      console.log("Login attempt with:", { email, password });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password) {
        // Mock successful login
        localStorage.setItem("user", JSON.stringify({ email }));
        
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в Партнерский кабинет!",
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("Пожалуйста, заполните все поля");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: error instanceof Error ? error.message : "Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-scale-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Вход в систему</CardTitle>
        <CardDescription>
          Введите свои данные для входа в личный кабинет
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link to="/forgot-password" className="text-sm text-brand-purple hover:underline">
                Забыли пароль?
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-purple-dark"
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 items-center">
        <div className="text-sm text-gray-500">
          Еще нет аккаунта?{" "}
          <Link to="/register" className="text-brand-purple hover:underline font-medium">
            Зарегистрироваться
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
