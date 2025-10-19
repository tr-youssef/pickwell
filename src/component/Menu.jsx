
import React from "react";
import logo from "../assets/logo.svg";
import "../App.css";
import { useTranslation } from "react-i18next";

export default function Menu({ points, language, onLanguageChange }) {
  const { t } = useTranslation();
  return (
  <nav className="menu w-full flex items-center justify-between bg-white shadow z-50 text-black px-20 py-8" style={{height: '92px'}}>
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Pickwell Logo" className="h-10 w-10" />
        <span className="font-bold text-xl">{t('pickwell')}</span>
      </div>
      {/* Right: Cart, Profile, Language Selector */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => window.location.href = '/cart'}
        >
          <span className="cart-icon">🛒</span>
          <span className="points text-sm font-medium">{points} {t('points')}</span>
        </button>
        <button
          className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition"
          onClick={() => window.location.href = '/profil'}
        >
          <span className="profile-icon">👤</span>
          <span className="profile-label text-sm">{t('profile')}</span>
        </button>
        <select value={language} onChange={onLanguageChange} className="border rounded px-2 py-1">
          <option value="en">En</option>
          <option value="fr">Fr</option>
          <option value="es">Es</option>
        </select>
      </div>
    </nav>
  );
}
