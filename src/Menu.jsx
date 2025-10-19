

import React, { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="menu w-full flex items-center justify-between p-4 bg-white shadow z-50 text-black relative">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isAdmin ? '/orders' : '/') }>
        <img src={logo} alt="Pickwell Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
        <span className="font-bold text-lg sm:text-xl">{t('pickwell')}</span>
      </div>
      
      {/* Right: Desktop view (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile view: Cart + Hamburger */}
      <div className="flex md:hidden items-center gap-2">
        {/* Cart button (visible on mobile) */}
        {isAdmin ? (
          <button
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/config')}
          >
            <span className="text-lg">⚙️</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition"
            onClick={() => navigate('/cart')}
          >
            <span className="cart-icon text-xl">🛒</span>
            <span className="points text-xs font-medium">{points.toFixed(2)}</span>
          </button>
        )}

        {/* Hamburger menu button */}
        <button
          className="p-2 rounded hover:bg-gray-100 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t md:hidden">
          <div className="flex flex-col p-4 gap-3">
            {isAdmin ? (
              <button
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition text-left"
                onClick={() => {
                  navigate('/orders');
                  setIsMenuOpen(false);
                }}
              >
                <span className="text-lg">👨‍💼</span>
                <span className="text-sm">Admin</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition text-left"
                onClick={() => {
                  navigate('/profile');
                  setIsMenuOpen(false);
                }}
              >
                <span className="profile-icon">👤</span>
                <span className="profile-label text-sm">{t('profile')}</span>
              </button>
            )}
            
            <div className="px-3 py-2">
              <label className="text-xs text-gray-600 mb-1 block">Language</label>
              <Select value={language} onValueChange={(val) => {
                onLanguageChange(val);
                setIsMenuOpen(false);
              }}>
                <SelectTrigger className="border rounded px-2 py-1 w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
