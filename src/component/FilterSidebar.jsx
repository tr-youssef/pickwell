import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useTranslation } from "react-i18next";

export default function FilterSidebar({ categories, onCategoryChange, onPriceChange, sortBy, setSortBy }) {
    const [selectedCategory, setSelectedCategory] = useState('vegetables');
    const [priceRange, setPriceRange] = useState([0, 1500]);
    const { t } = useTranslation();

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        onCategoryChange(categoryId);
    };

    const handlePriceRangeChange = (e) => {
        const value = parseInt(e.target.value);
        setPriceRange([0, value]);
        onPriceChange([0, value]);
    };

    return (
        <div className="w-full lg:w-64">
            <div className="text-2xl font-bold">{t('filter')}</div>
            <div className='border-b border-gray-300 pb-6'>
                <div className="text-xl font-bold mt-4 mb-2">
                    {t('sortBy')}
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full bg-white border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                        <SelectValue placeholder={t('sortBy')} />
                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectItem value="latest">{t('latest')}</SelectItem>
                        <SelectItem value="price-low">{t('priceLow')}</SelectItem>
                        <SelectItem value="price-high">{t('priceHigh')}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='w-100 pb-6'>
                <div className="text-xl font-bold mt-4 mb-2">
                    {t('Categories')}
                </div>
                 <RadioGroup value={selectedCategory} onValueChange={handleCategoryChange} className="space-y-3">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                            <span className="text-gray-700">
                                {category.name} <span className="text-gray-400">({category.count})</span>
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}
