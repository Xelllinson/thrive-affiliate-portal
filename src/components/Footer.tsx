
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gradient">ПартнерКабинет</h3>
            <p className="text-sm text-gray-600">
              Платформа для управления партнерскими программами и генерации реферальных ссылок.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Главная</Link>
              </li>
              <li>
                <Link to="/benefits" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Преимущества</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">О нас</Link>
              </li>
              <li>
                <Link to="/contacts" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Аккаунт</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Войти</Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Регистрация</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 hover:text-brand-purple transition-colors">Панель управления</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Контакты</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Email: info@partnercabinet.ru</li>
              <li className="text-sm text-gray-600">Телефон: +7 (123) 456-78-90</li>
              <li className="text-sm text-gray-600">Адрес: г. Москва, ул. Примерная, д. 123</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} ПартнерКабинет. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
