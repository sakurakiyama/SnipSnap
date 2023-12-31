import { SwatchIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../stylesheets/Background.scss';
import { backgrounds } from '../../constants';

interface BackgroundSelectorProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}
function BackgroundSelector({
  setBackground,
}: BackgroundSelectorProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='w-full mb-4 text-[var(--text-color)]'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <SwatchIcon className='w-[20px] mr-4' />
          <span>Background</span>
        </section>
        <section className='flex'>
          {isOpen ? (
            <ChevronDownIcon
              data-testid='backgroundDownIcon'
              onClick={() => setIsOpen(false)}
              className='w-[20px]'
            />
          ) : (
            <ChevronRightIcon
              data-testid='backgroundRightIcon'
              className='w-[20px]'
              onClick={() => setIsOpen(true)}
            />
          )}
        </section>
      </div>
      <div
        data-testid='backgroundContent'
        className={`pt-2 overflow-hidden transition-all duration-1000 
        ${isOpen ? 'max-h-[300px] overflow-scroll	' : 'max-h-0'}`}
      >
        {isOpen &&
          backgrounds.map((background) => {
            const lowercaseBackground = background.toLowerCase();
            return (
              <ul
                key={background}
                data-testid={lowercaseBackground}
                onClick={() => setBackground(lowercaseBackground)}
                className='flex items-center ml-8 border border-[var(--border-color)] m-2 p-2 rounded-md hover:bg-[var(--hover-color)] cursor-pointer'
              >
                <div
                  className={`${lowercaseBackground} cursor-pointer rounded-[50%] h-[25px] w-[25px]`}
                ></div>
                <span className='ml-2 cursor-pointer'>{background}</span>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default BackgroundSelector;
