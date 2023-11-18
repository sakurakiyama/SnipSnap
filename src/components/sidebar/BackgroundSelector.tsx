import { SwatchIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../stylesheets/Background.scss';

interface BackgroundSelectorProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}
function BackgroundSelector({
  setBackground,
}: BackgroundSelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const backgrounds = [
    'Fiery',
    'Citrus',
    'Fuchsia',
    'Blush',
    'Sky',
    'Midnight',
    'Forest',
    'Zest',
    'Slate',
    'Noir',
    'Sunny',
    'Regal',
  ];

  return (
    <div className='w-full mb-4'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <SwatchIcon className='w-[20px] mr-4' />
          <text>Background</text>
        </section>
        <section className='flex'>
          {isOpen ? (
            <ChevronDownIcon
              onClick={() => setIsOpen(false)}
              className='w-[20px]'
            />
          ) : (
            <ChevronRightIcon
              className='w-[20px]'
              onClick={() => setIsOpen(true)}
            />
          )}
        </section>
      </div>
      <div className='pt-2'>
        {isOpen &&
          backgrounds.map((background) => {
            const lowercaseBackground = background.toLowerCase();
            return (
              <ul className='flex items-center ml-8 border m-2 p-2 rounded-md hover:bg-gray-200'>
                <div
                  onClick={() => setBackground(lowercaseBackground)}
                  className={`${lowercaseBackground} cursor-pointer rounded-[50%] h-[25px] w-[25px]`}
                ></div>
                <text
                  onClick={() => setBackground(lowercaseBackground)}
                  className='ml-2 cursor-pointer'
                >
                  {background}
                </text>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default BackgroundSelector;
