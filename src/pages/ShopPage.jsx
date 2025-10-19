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

    const handleRatingChange = (rating) => {
        const filtered = products.filter(p => p.rating >= rating);
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
        <div className="min-h-screen bg-white pb-10 border-t border-gray-200 px-20">
            {/*<div className="mx-auto" style={{ paddingLeft: '118px', paddingRight: '118px', marginTop: '20px' }}>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-72">
                        <FilterSidebar
                            categories={categories}
                            onCategoryChange={handleCategoryChange}
                            onPriceChange={handlePriceChange}
                            onRatingChange={handleRatingChange}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="price-low">Points: Low to High</option>
                                    <option value="price-high">Points: High to Low</option>
                                </select>
                            </div>
                            <div className="text-sm font-medium">
                                <span className="text-green-600 font-bold">{filteredProducts.length}</span> Results Found
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>*/}
            {/* Grid 3 and 9 */}
            <div className="grid grid-cols-12 gap-8 mt-6">
                <div className="col-span-2 rounded">
                    <FilterSidebar
                        categories={categories}
                        onCategoryChange={handleCategoryChange}
                        onPriceChange={handlePriceChange}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>
                <div className="col-span-10 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
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
