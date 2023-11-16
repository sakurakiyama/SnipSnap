import hljs from 'highlight.js/lib/common';
import { useRef, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';
import '../../stylesheets/Themes.scss';
import Header from './Header';

interface CodeEditorProps {
  theme: string;
}

function CodeEditor({ theme }: CodeEditorProps): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('javascript');

  const handleCodeChange = () => {
    const inputValue = inputRef.current!.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };
  console.log(language);
  return (
    // Background color
    <div className='relative block rounded-md w-[680px] p-4'>
      <pre className={`flex flex-col w-[600px] p-4 rounded-md m-auto ${theme}`}>
        <div className=' ml-auto mr-auto '>
          <Header />
          {/* Display Code */}
          <code
            className={`${`language-${language}`} hljs rounded-br-lg rounded-bl-lg w-[500px] min-h-[300px] !break-words  left-0 right-0 ml-auto mr-auto`}
            ref={codeBlockRef}
          ></code>
        </div>
        <div className=' min-h-[300px] w-[500px] left-0 right-0 ml-auto mr-auto absolute'>
          {/* Invisible Spacer */}
          <div className='rounded-tr-lg rounded-tl-lg h-8 p-2'></div>
          {/* Handle Input */}
          <code
            className='hljs !caret-gray-500 !outline-none !bg-transparent !text-transparent rounded-br-lg rounded-bl-lg !break-words'
            contentEditable={true}
            onInput={handleCodeChange}
            ref={inputRef}
          ></code>
        </div>
      </pre>
    </div>
  );
}

export default CodeEditor;
