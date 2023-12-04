import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import { useState } from 'react';

interface SaveSnippetProps {
  snippetRef: React.MutableRefObject<null>;
  fileName: string | undefined;
}
function SaveSnippet({ snippetRef, fileName }: SaveSnippetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const downloadImage = async (method: string) => {
    try {
      if (snippetRef) {
        const element = snippetRef.current;
        if (element) {
          const canvas = await html2canvas(element);
          const data = canvas.toDataURL(`image/${method}`);
          const link = document.createElement('a');
          if (typeof link.download === 'string') {
            link.href = data;
            if (fileName) {
              link.download = `${fileName}.${method}`;
            } else {
              link.download = `Image.${method}`;
            }
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            window.open(data);
          }
        }
      }
    } catch (error) {
      console.error('Error downloading snippet:', error);
    }
  };

  const saveMethods = [
    { text: 'Save PNG', method: 'png', function: downloadImage },
    { text: 'Save JPG', method: 'jpg', function: downloadImage },
  ];

  return (
    <div className='w-full mb-4 text-[var(--text-color)]'>
      <div className='flex items-center justify-between w-full'>
        <section className='flex'>
          <DocumentArrowUpIcon className='w-[20px] mr-4' />
          <span>Export</span>
        </section>
        <section className='flex'>
          {isOpen ? (
            <ChevronDownIcon
              data-testid='snippetDownIcon'
              onClick={() => setIsOpen(false)}
              className='w-[20px]'
            />
          ) : (
            <ChevronRightIcon
              data-testid='snippetRightIcon'
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
          saveMethods.map((currentMethod) => {
            return (
              <ul
                data-testid={currentMethod.method}
                onClick={() => currentMethod.function(currentMethod.method)}
                key={currentMethod.method}
                className='flex items-center cursor-pointer ml-8 border border-[var(--border-color)] m-2 p-2 rounded-md hover:bg-[var(--hover-color)] '
              >
                <span>{currentMethod.text}</span>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default SaveSnippet;
