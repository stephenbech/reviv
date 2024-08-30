import React, { useRef, useState, useEffect } from 'react';
import { toJpeg } from 'html-to-image';

const CardGenerator: React.FC<{ selectedImage: string; onChangeImage: () => void }> = ({ selectedImage, onChangeImage }) => {
  const [name, setName] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadImage = () => {
    if (cardRef.current) {
      toJpeg(cardRef.current, { quality: 0.99 }).then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'thank-you-card.jpg';
        link.click();
      });
    }
  };

  useEffect(() => {
    // console.log("Selected Image URL:", selectedImage);
  }, [selectedImage]);

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-2xl max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-4 mb-6 w-full px-5 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        style={{
          backgroundColor: '#f0f0f0',
          color: '#34495e',
          fontFamily: 'Inter, sans-serif',
        }}
      />

      <div
        ref={cardRef}
        className="relative w-full rounded-[1px] overflow-hidden shadow-lg"
        style={{
          paddingBottom: '125%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: `url(${selectedImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <h1 className="absolute top-4 left-0 right-0 text-white text-3xl font-extrabold tracking-wide uppercase drop-shadow-md">Thank You</h1>
        <h2 className="absolute bottom-4 left-0 right-0 text-white text-xl font-medium drop-shadow-md">{name}</h2>
      </div>

      <button
        onClick={downloadImage}
        className="mt-8 w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      >
        Download Image
      </button>

      <button
        onClick={onChangeImage}
        className="mt-4 text-blue-600 text-lg font-medium hover:underline focus:outline-none"
      >
        Change Image
      </button>
    </div>
  );
};

export default CardGenerator;
