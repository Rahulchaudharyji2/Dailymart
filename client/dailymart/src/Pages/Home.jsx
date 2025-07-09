import React from 'react';
import Carousel from './Carousel';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const sampleProducts = [
  {
    id: 1,
    image: 'https://m.media-amazon.com/images/I/71qB9QESz9L._SX679_.jpg',
    title: 'Samsung Galaxy M14 5G',
    price: '12999',
  },
  {
    id: 2,
    image: 'https://m.media-amazon.com/images/I/51P5Z8P1AML._AC_UF1000,1000_QL80_.jpg',
    title: 'Apple iPhone 14',
    price: '69999',
  },
]

  return (
    <div>
      {/* Carousel */}
      <Carousel />

      {/* Deal of the Day Button */}
      <div className="flex justify-center mt-8">
        <a
          href="/Deals"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out text-lg"
        >
          🔥 Deal of the Day
        </a>
      </div>
      {/* Product Grid */}<div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sampleProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    </div>
  );
};

export default Home;
