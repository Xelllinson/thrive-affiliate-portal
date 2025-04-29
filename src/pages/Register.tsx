
import { useEffect } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gradient">
          ПартнерКабинет
        </Link>
        <Button asChild variant="outline" size="sm">
          <Link to="/" className="flex items-center">
            <Home className="mr-2" size={16} />
            На главную
          </Link>
        </Button>
      </div>
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
