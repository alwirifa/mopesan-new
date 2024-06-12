"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto w-full p-0 sm:p-6 md:p-8 xl:p-0">
      {children}
    </div>
  );
};

export default Container;
