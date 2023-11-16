import { useState } from 'react';

function Header(): JSX.Element {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [placeholder, setPlaceholder] = useState<string>('Untitled');

  const handleFocus = () => {
    if (fileName === undefined) setPlaceholder('');
  };

  const handleBlur = () => {
    if (fileName === undefined) setPlaceholder('Untitled');
  };
  return (
    <div className='rounded-tr-lg rounded-tl-lg h-8 p-2 bg-[#282c34]'>
      <div className='flex'>
        {/* Buttons */}
        <div className='flex flex-row w-full'>
          <div className='rounded-[50%] h-[15px] w-[15px] bg-[#fb5d55] mr-2'></div>
          <div className='rounded-[50%] h-[15px] w-[15px] bg-[#fab930] mr-2'></div>
          <div className='rounded-[50%] h-[15px] w-[15px] bg-[#28c63e]'></div>
        </div>
        {/* Editable field */}
        <div className=''>
          <input
            type='text'
            className='rounded-md bg-[#282c34] text-center relative z-10 focus:outline-none text-[#abb2bf]'
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
