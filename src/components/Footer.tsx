
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-xl font-bold text-gradient">ПартнерКабинет</h3>
            </Link>
            <p className="text-gray-600">
              Платформа для управления партнерскими программами и генерации реферальных ссылок.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-purple transition-colors">Главная</Link>
              </li>
              <li>
                <Link to="/benefits" className="text-gray-600 hover:text-brand-purple transition-colors">Преимущества</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-purple transition-colors">О нас</Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-600 hover:text-brand-purple transition-colors">Контакты</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Аккаунт</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-brand-purple transition-colors">Войти</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-brand-purple transition-colors">Регистрация</Link>
              </li>
              <li>
                <Link to="/apply" className="text-gray-600 hover:text-brand-purple transition-colors">Подать заявку</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-brand-purple transition-colors">Кабинет партнера</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="text-gray-600">Email: info@partnercabinet.ru</li>
              <li className="text-gray-600">Телефон: +7 (123) 456-78-90</li>
              <li className="text-gray-600">Адрес: г. Москва, ул. Примерная, д. 123</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">© {new Date().getFullYear()} ПартнерКабинет. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
