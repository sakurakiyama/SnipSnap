import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { programmingLanguages } from '../../constants';

interface FormatProps {
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
  detectedLanguage: string;
  userSelected: undefined | string[];
  setUserSelected: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

function Format({
  setShouldFormat,
  detectedLanguage,
  userSelected,
  setUserSelected,
}: FormatProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [displayTitle, setDisplayTitle] = useState('');

  const getReadable = (language: string) => {
    const object = programmingLanguages.find(
      (arr) => arr.hljsLanguage === language
    );
    return object?.readableLanguage ? object?.readableLanguage : '';
  };

  const handleUserSelectedFormatting = (hljsLanguage: string) => {
    setUserSelected([hljsLanguage, getReadable(hljsLanguage)]);
    setShouldFormat(true);
  };

  const determineDisabled = (language: string) => {
    const object = programmingLanguages.find(
      (arr) => arr.hljsLanguage === language
    );
    return object?.disabled ? object?.disabled : false;
  };

  useEffect(() => {
    const determineButtonDetails = () => {
      if (userSelected && userSelected[0] === detectedLanguage) {
        setIsDisabled(determineDisabled(userSelected[0]));
        setDisplayTitle(userSelected[1] + ' (Autodetected)');
      } else if (userSelected) {
        setIsDisabled(determineDisabled(userSelected[0]));
        setDisplayTitle(userSelected[1]);
      } else if (!detectedLanguage) {
        setIsDisabled(false);
        setDisplayTitle('JavaScript (Default)');
      } else {
        setIsDisabled(determineDisabled(detectedLanguage));
        setDisplayTitle(getReadable(detectedLanguage) + ' (Autodetected)');
      }
    };

    determineButtonDetails();
  }, [detectedLanguage, userSelected]);

  return (
    <div className='w-full mb-4 text-[var(--text-color)]'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <CodeBracketIcon className='w-[20px] mr-4' />
          <button
            data-testid='formatMainButton'
            disabled={isDisabled}
            onClick={() => setShouldFormat(true)}
            className={`border border-[var(--border-color)] p-1 px-2 rounded-md hover:bg-[var(--hover-color)] text-[var(--text-color)] ${
              isDisabled ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            {displayTitle}
          </button>
        </section>
        <section className='flex'>
          {isOpen ? (
            <ChevronDownIcon
              data-testid='formatDownIcon'
              onClick={() => setIsOpen(false)}
              className='w-[20px]'
            />
          ) : (
            <ChevronRightIcon
              data-testid='formatRightIcon'
              className='w-[20px]'
              onClick={() => setIsOpen(true)}
            />
          )}
        </section>
      </div>
      <div
        data-testid='formatContent'
        className={`pt-2 overflow-hidden transition-all duration-1000 
        ${isOpen ? 'max-h-[300px] overflow-scroll	' : 'max-h-0'}`}
      >
        {isOpen &&
          programmingLanguages.map((currentLanguage) => {
            return (
              <ul
                data-testid={currentLanguage.hljsLanguage}
                key={`${currentLanguage.hljsLanguage}+${currentLanguage.disabled}`}
                onClick={() =>
                  !currentLanguage.disabled &&
                  handleUserSelectedFormatting(currentLanguage.hljsLanguage)
                }
                className={`flex items-center cursor-pointer ml-8 border border-[var(--border-color)] m-2 p-2 rounded-md hover:bg-[var(--hover-color)] ${
                  currentLanguage.disabled
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }`}
              >
                <span>
                  {currentLanguage.hljsLanguage === detectedLanguage
                    ? `${currentLanguage.readableLanguage} (Autodetected)`
                    : currentLanguage.readableLanguage}
                </span>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default Format;
