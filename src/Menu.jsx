

import React from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./component/ui/select";

import { useCart } from "./lib/useCart";
import { useNavigate } from "react-router-dom";

export default function Menu({ language, onLanguageChange, isAdmin }) {
  const { t } = useTranslation();
  const { points } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="menu w-full flex items-center justify-between p-4 bg-white shadow z-50 text-black">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isAdmin ? '/orders' : '/') }>
        <img src={logo} alt="Pickwell Logo" className="h-10 w-10" />
        <span className="font-bold text-xl">{t('pickwell')}</span>
      </div>
      {/* Right: Cart/Config, Profile/Admin, Language Selector */}
      <div className="flex items-center gap-4">
        {isAdmin ? (
          // Admin view: Config button instead of cart
          <button
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/config')}
          >
            <span className="text-lg">⚙️</span>
            <span className="text-sm font-medium">Config</span>
          </button>
        ) : (
          // Regular user view: Cart with points
          <button
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/cart')}
          >
            <span className="cart-icon">🛒</span>
            <span className="points text-sm font-medium">{points.toFixed(2)} {t('points')}</span>
          </button>
        )}
        
        {isAdmin ? (
          // Admin view: Admin button
          <button
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/orders')}
          >
            <span className="text-lg">👨‍💼</span>
            <span className="text-sm">Admin</span>
          </button>
        ) : (
          // Regular user view: Profile button
          <button
            className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/profile')}
          >
            <span className="profile-icon">👤</span>
            <span className="profile-label text-sm">{t('profile')}</span>
          </button>
        )}
        
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="border rounded px-2 py-1 w-20">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">En</SelectItem>
            <SelectItem value="fr">Fr</SelectItem>
            <SelectItem value="es">Es</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
