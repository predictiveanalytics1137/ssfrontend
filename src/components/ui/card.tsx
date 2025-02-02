// import React from 'react';

// interface CardProps {
//   children: React.ReactNode;
// }

// export const Card: React.FC<CardProps> = ({ children }) => {
//   return <div className="p-4 shadow-lg rounded-md bg-white">{children}</div>;
// };

// export const CardHeader: React.FC<CardProps> = ({ children }) => {
//   return <div className="font-bold text-lg">{children}</div>;
// };

// export const CardContent: React.FC<CardProps> = ({ children }) => {
//   return <div className="mt-2 text-gray-600">{children}</div>;
// };



import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string; // Add className as an optional prop
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 shadow-lg rounded-md bg-white ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`font-bold text-lg ${className || ''}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`mt-2 text-gray-600 ${className || ''}`}>
      {children}
    </div>
  );
};
