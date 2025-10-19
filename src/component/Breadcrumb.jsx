import React from 'react';

export default function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 py-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">›</span>}
          {item.link ? (
            <a href={item.link} className="hover:text-green-500 transition">
              {item.label}
            </a>
          ) : (
            <span className={index === items.length - 1 ? "text-green-500 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
