import { useState, useEffect } from 'react';

interface HeaderProps {
  lintTheme: string;
  setFileName: React.Dispatch<React.SetStateAction<string | undefined>>;
  fileName: string | undefined;
}
function Header({
  lintTheme,
  setFileName,
  fileName,
}: HeaderProps): JSX.Element {
  const [placeholder, setPlaceholder] = useState<string>('Untitled');
  const [lintBackground, setLintBackground] = useState<string>('');

  const handleFocus = () => {
    if (fileName === undefined) setPlaceholder('');
  };

  const handleBlur = () => {
    if (fileName === undefined) setPlaceholder('Untitled');
  };

  useEffect(() => {
    const codeEditor = document.querySelector('.hljs');
    if (!codeEditor) return;

    const computedStyle = window.getComputedStyle(codeEditor);
    const backgroundColor = computedStyle.backgroundColor;
    setLintBackground(backgroundColor);
  }, [lintTheme]);

  return (
    <div
      data-testid='headerWrapper'
      style={{ backgroundColor: lintBackground }}
      className='rounded-tr-lg rounded-tl-lg h-8 p-2'
    >
      <div className='flex'>
        {/* Buttons */}
        <div className='flex flex-row w-full'>
          <div
            data-testid='redButton'
            className='rounded-[50%] h-[15px] w-[15px] bg-[#fb5d55] mr-2'
          ></div>
          <div
            data-testid='yellowButton'
            className='rounded-[50%] h-[15px] w-[15px] bg-[#fab930] mr-2'
          ></div>
          <div
            data-testid='greenButton'
            className='rounded-[50%] h-[15px] w-[15px] bg-[#28c63e]'
          ></div>
        </div>
        {/* Editable field */}
        <div>
          <input
            type='text'
            style={{ backgroundColor: lintBackground }}
            className='leading-8 rounded-md text-center relative z-10 focus:outline-none text-[var(--text-color)] '
            placeholder={fileName === undefined ? placeholder : ''}
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
        </div>
        {/* Spacer */}
        <div className='w-full'></div>
      </div>
    </div>
  );
}

export default Header;
