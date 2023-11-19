import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface FormatProps {
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
  language: string;
  userSelected: undefined | string[];
  setUserSelected: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

function Format({
  setShouldFormat,
  language,
  userSelected,
  setUserSelected,
}: FormatProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const programmingLanguages = [
    { readableLanguage: 'XML', hljsLanguage: 'xml', disabled: true },
    { readableLanguage: 'Bash', hljsLanguage: 'bash', disabled: true },
    { readableLanguage: 'C', hljsLanguage: 'c', disabled: true },
    { readableLanguage: 'C++', hljsLanguage: 'cpp', disabled: true },
    { readableLanguage: 'C#', hljsLanguage: 'csharp', disabled: true },
    { readableLanguage: 'Markdown', hljsLanguage: 'markdown', disabled: false },
    { readableLanguage: 'Diff', hljsLanguage: 'diff', disabled: true },
    { readableLanguage: 'Ruby', hljsLanguage: 'ruby', disabled: true },
    { readableLanguage: 'Go', hljsLanguage: 'go', disabled: true },
    { readableLanguage: 'GraphQL', hljsLanguage: 'graphql', disabled: false },
    { readableLanguage: 'INI', hljsLanguage: 'ini', disabled: true },
    { readableLanguage: 'Java', hljsLanguage: 'java', disabled: true },
    {
      readableLanguage: 'JavaScript',
      hljsLanguage: 'javascript',
      disabled: false,
    },
    { readableLanguage: 'JSON', hljsLanguage: 'json', disabled: true },
    { readableLanguage: 'Kotlin', hljsLanguage: 'kotlin', disabled: true },
    { readableLanguage: 'Less', hljsLanguage: 'less', disabled: true },
    { readableLanguage: 'Lua', hljsLanguage: 'lua', disabled: true },
    { readableLanguage: 'Makefile', hljsLanguage: 'makefile', disabled: true },
    { readableLanguage: 'Perl', hljsLanguage: 'perl', disabled: true },
    {
      readableLanguage: 'Objective-C',
      hljsLanguage: 'objectivec',
      disabled: true,
    },
    { readableLanguage: 'PHP', hljsLanguage: 'php', disabled: false },
    {
      readableLanguage: 'PHP Template',
      hljsLanguage: 'php-template',
      disabled: true,
    },
    {
      readableLanguage: 'Plain Text',
      hljsLanguage: 'plaintext',
      disabled: true,
    },
    { readableLanguage: 'Python', hljsLanguage: 'python', disabled: true },
    {
      readableLanguage: 'Python REPL',
      hljsLanguage: 'python-repl',
      disabled: true,
    },
    { readableLanguage: 'R', hljsLanguage: 'r', disabled: true },
    { readableLanguage: 'Rust', hljsLanguage: 'rust', disabled: true },
    { readableLanguage: 'SCSS', hljsLanguage: 'scss', disabled: false },
    { readableLanguage: 'Shell', hljsLanguage: 'shell', disabled: true },
    { readableLanguage: 'SQL', hljsLanguage: 'sql', disabled: true },
    { readableLanguage: 'Swift', hljsLanguage: 'swift', disabled: true },
    { readableLanguage: 'YAML', hljsLanguage: 'yaml', disabled: true },
    {
      readableLanguage: 'TypeScript',
      hljsLanguage: 'typescript',
      disabled: false,
    },
    { readableLanguage: 'VB.NET', hljsLanguage: 'vbnet', disabled: true },
    { readableLanguage: 'WebAssembly', hljsLanguage: 'wasm', disabled: true },
  ];

  function findReadable(hljsLanguage: string) {
    const object = programmingLanguages.find(
      (arr) => arr.hljsLanguage === hljsLanguage
    );
    return object?.readableLanguage ? object?.readableLanguage : 'JavaScript';
  }

  const handleFormatting = async (hljsLanguage: string) => {
    setUserSelected([hljsLanguage, findReadable(hljsLanguage)]);
    setShouldFormat(true);
  };

  const getLanguageDisplay = () => {
    if (userSelected) {
      if (userSelected[0] === language) {
        return userSelected[1] + ' (Autodetected)';
      }
      return userSelected[1];
    }
  };
  return (
    <div className='w-full mb-4 text-[var(--text-color)]'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <CodeBracketIcon className='w-[20px] mr-4' />
          <button
            onClick={() => handleFormatting(language)}
            className='border border-[var(--border-color)] p-1 px-2 rounded-md hover:bg-[var(--hover-color)] text-[var(--text-color)]'
          >
            {userSelected
              ? getLanguageDisplay()
              : `${findReadable(language)} (Autodetected)`}
          </button>
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
          programmingLanguages.map((currentLanguage) => {
            return (
              <ul
                key={`${currentLanguage.hljsLanguage}+${currentLanguage.disabled}`}
                onClick={() =>
                  !currentLanguage.disabled &&
                  handleFormatting(currentLanguage.hljsLanguage)
                }
                className={`flex items-center cursor-pointer ml-8 border border-[var(--border-color)] m-2 p-2 rounded-md hover:bg-[var(--hover-color)] ${
                  currentLanguage.disabled
                    ? 'opacity-50 pointer-events-none'
                    : ''
                }`}
              >
                <span>
                  {currentLanguage.hljsLanguage === language
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
