// App.tsx
import React, { useState } from 'react';
import ImageSelector from './components/ImageSelector';
import CardGenerator from './components/CardGenerator';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectImage = (url: string) => {
    // console.log("handleSelectImage called with URL:", url); 
    setSelectedImage(url);
  };

  const handleChangeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800">Create Your Thank You Card</h1>
      {selectedImage ? (
        <CardGenerator selectedImage={selectedImage} onChangeImage={handleChangeImage} />
      ) : (
        <ImageSelector onSelectImage={handleSelectImage} />
      )}
    </div>
  );
};

export default App;