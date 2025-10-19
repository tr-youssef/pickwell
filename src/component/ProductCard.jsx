import React from 'react';
import { useCart } from '../lib/useCart';

export default function ProductCard({ product }) {
    const { cart, addToCart } = useCart();
    const inCart = cart.some((item) => item.id === product.id);
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-4 flex flex-col">
            <div className="relative flex items-center justify-center h-48">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14">No Image</text></svg>';
                    }}
                />
            </div>
            <div className="space-y-2 px-2 pb-2">
                <div className="flex items-center justify-between mt-2 mb-2 gap-2">
                    <div>
                        <div className="text-base text-gray-800 font-medium">{product.name}</div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">{parseInt(product.price, 10)} pts</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">{parseInt(product.originalPrice, 10)} pts</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.qty <= 0 || inCart}
                        className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold transition border ${product.qty > 0 && !inCart
                            ? 'bg-green-500 text-white border-green-500 hover:bg-green-600'
                            : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                            }`}
                    >
                        <span className="text-lg">{inCart ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m-7-7h14" />
                            </svg>
                        )}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
