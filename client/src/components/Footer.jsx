import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
