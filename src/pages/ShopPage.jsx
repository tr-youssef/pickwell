import React, { useState } from 'react';
import FilterSidebar from '../component/FilterSidebar';
import ProductCard from '../component/ProductCard';
import Breadcrumb from '../component/Breadcrumb';
import { products, categories } from '../data/products';

export default function ShopPage() {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortBy, setSortBy] = useState('latest');

    const handleCategoryChange = (categoryId) => {
        if (categoryId === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(p =>
                p.category.toLowerCase().replace(/\s+/g, '-') === categoryId
            );
            setFilteredProducts(filtered);
        }
    };

    const handlePriceChange = (priceRange) => {
        const filtered = products.filter(p =>
            p.price >= priceRange[0] && p.price <= priceRange[1]
        );
        setFilteredProducts(filtered);
    };

    const handleAddToCart = (product) => {
        console.log('Added to cart:', product);
        // Add your cart logic here
    };

    // Sorting logic
    const sortedProducts = React.useMemo(() => {
        let sorted = [...filteredProducts];
        if (sortBy === 'price-low') {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'latest') {
            sorted.sort((a, b) => b.rating - a.rating);
        }
        return sorted;
    }, [filteredProducts, sortBy]);

    return (
        <div className="min-h-screen bg-white pb-10 border-t border-gray-200 px-4 sm:px-6 md:px-10 lg:px-20">
            {/* Grid 3 and 9 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6">
                <div className="lg:col-span-2 rounded">
                    <FilterSidebar
                        categories={categories}
                        onCategoryChange={handleCategoryChange}
                        onPriceChange={handlePriceChange}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>
                <div className="lg:col-span-10 p-2 sm:p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
