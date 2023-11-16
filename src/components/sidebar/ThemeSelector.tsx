import { SwatchIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import '../../stylesheets/Themes.scss';

interface ThemeSelectorProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
function ThemeSelector({ setTheme }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const themes = [
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

  console.log(themes[1].toLowerCase());
  return (
    <div className='w-full'>
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
          themes.map((theme) => {
            const lowercaseTheme = theme.toLowerCase();
            return (
              <ul className='flex items-center ml-10 pb-2'>
                <div
                  onClick={() => setTheme(lowercaseTheme)}
                  className={`${lowercaseTheme} cursor-pointer rounded-[50%] h-[25px] w-[25px]`}
                ></div>
                <text
                  onClick={() => setTheme(lowercaseTheme)}
                  className='ml-2 cursor-pointer'
                >
                  {theme}
                </text>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default ThemeSelector;
