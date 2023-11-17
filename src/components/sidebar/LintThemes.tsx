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
    <div className="w-full mb-4">
      <div className="flex items-center justify-between w-full">
        <section className="flex">
          <CommandLineIcon className="w-[20px] mr-4" />
          <text>Lint Themes</text>
        </section>
        <section className="flex">
          {isOpen ? (
            <ChevronDownIcon
              onClick={() => setIsOpen(false)}
              className="w-[20px]"
            />
          ) : (
            <ChevronRightIcon
              className="w-[20px]"
              onClick={() => setIsOpen(true)}
            />
          )}
        </section>
      </div>
      <div className="pt-2">
        {isOpen &&
          highlightStyles.map(style => {
            return (
              <ul className="flex items-center cursor-pointer ml-10">
                <text onClick={() => updateLintTheme(style)}>{style}</text>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default LintThemes;
