// components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  bookTitle: string;
  bookDescription: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ bookTitle, bookDescription }) => {
  return (
    <div>
      <h3>{bookTitle}</h3>
      <p>{bookDescription}</p>
    </div>
  );
};

export default MyComponent;
