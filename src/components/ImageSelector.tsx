import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ImageSelector: React.FC<{ onSelectImage: (url: string) => void }> = ({
  onSelectImage,
}) => {
  const [images, setImages] = useState<string[]>([]);
  const isFetching = useRef(false);

  useEffect(() => {
    const fetchImages = async () => {
      if (isFetching.current) {
        return; 
      }

      isFetching.current = true;
      try {
        const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
        if (!accessKey) {
          throw new Error('Missing Unsplash access key.');
        }
        const res = await axios.get('https://api.unsplash.com/photos/random', {
          params: { count: 4, orientation: 'portrait' },
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });

        const fetchedImages = res.data.map((image: any) => image.urls.regular);
        // console.log('Fetched Images:', fetchedImages);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        isFetching.current = false;
      }
    };

    fetchImages();

    return () => {}; 
  }, []); 

  const handleImageClick = (url: string) => {
    onSelectImage(url); 
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-8 max-w-md mx-auto">
      {images.map((url, index) => (
        <img
          key={index}
          src={url}
          alt="Unsplash Random"
          className="cursor-pointer rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300"
          onClick={() => handleImageClick(url)}
        />
      ))}
    </div>
  );
};

export default ImageSelector;