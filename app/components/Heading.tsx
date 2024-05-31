'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  buttonTitle?: string;
  onButtonClick?: () => void;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  buttonTitle, 
  onButtonClick, 
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between">
        <h1 className="text-[42px] font-semibold">{title}</h1>
        <div>
          {buttonTitle && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="max-h-max px-6 py-4 bg-secondary text-primary rounded-lg"
            >
              {buttonTitle}
            </button>
          )}
        </div>
      </div>
      <p className="text-[18px]">{subtitle}</p>
    </div>
  );
}

export default Heading;
