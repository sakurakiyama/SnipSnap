import { useState } from 'react';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface LintThemesProps {
  setLintTheme: React.Dispatch<React.SetStateAction<string>>;
}
function LintThemes({ setLintTheme }: LintThemesProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const updateLintTheme = (style: string) => {
    document.documentElement.setAttribute('data-theme', style);
    setLintTheme(style);
  };

  const highlightStyles = [
    'atom-one-dark',
    'an-old-hope',
    'arta',
    'ashes',
    'atelier-cave',
    'atelier-dune',
    'atelier-estuary',
    'atelier-forest',
    'atelier-lakeside',
    'atelier-plateau',
    'atelier-savanna',
    'atelier-seaside',
    'atlas',
    'bespin',
    'chalk',
    'circus',
    'classic-dark',
    'codeschool',
    'colors',
    'darcula',
    'dark-violet',
    'darkmoss',
    'darktooth',
    'decaf',
    'default-dark',
    'dracula',
    'edge-dark',
  ];

  return (
    <div className='w-full mb-4 text-[var(--text-color)]'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <CommandLineIcon className='w-[20px] mr-4' />
          <span>Lint Themes</span>
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
      <div
        className={`pt-2 overflow-hidden transition-all duration-1000 
        ${isOpen ? 'max-h-[300px] overflow-scroll	' : 'max-h-0'}`}
      >
        {isOpen &&
          highlightStyles.map((style) => {
            return (
              <ul
                key={style}
                onClick={() => updateLintTheme(style)}
                className='flex items-center cursor-pointer ml-8 border border-[var(--border-color)] m-2 p-2 rounded-md hover:bg-[var(--hover-color)] '
              >
                <span>{style}</span>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default LintThemes;
