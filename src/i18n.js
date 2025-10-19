import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { categories } from './data/products';

const resources = {
    en: {
        translation: {
            profile: 'Profile',
            cart: 'Cart',
            points: 'pts',
            pickwell: 'Pickwell',
            filter: 'Filter',
            sortBy: 'Sort By',
            latest: 'Latest',
            priceLow: 'Points: Low to High',
            priceHigh: 'Points: High to Low',
            categories: 'Categories',
        },
    },
    fr: {
        translation: {
            profile: 'Profil',
            cart: 'Panier',
            points: 'pts',
            pickwell: 'Pickwell',
            filter: 'Filtres',
            sortBy: 'Trier par',
            latest: 'Dernier',
            priceLow: 'Points : du plus bas au plus élevé',
            priceHigh: 'Points : du plus élevé au plus bas',
            categories: 'Catégories',
        },
    },
    es: {
        translation: {
            profile: 'Perfil',
            cart: 'Carrito',
            points: 'pts',
            pickwell: 'Pickwell',
            filter: 'Filtros',
            sortBy: 'Ordenar por',
            latest: 'Último',
            priceLow: 'Puntos: de menor a mayor',
            priceHigh: 'Puntos: de mayor a menor',
            categories: 'Categorías',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
