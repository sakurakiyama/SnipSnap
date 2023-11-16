import hljs from 'highlight.js/lib/common';
import { useRef, useState } from 'react';
import 'highlight.js/styles/atom-one-dark.css';

function CodeEditor(): JSX.Element {
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [language, setLanguage] = useState<string>('javascript');

  const handleCodeChange = () => {
    const inputValue = inputRef.current!.innerText;
    const highlightedCode = hljs.highlightAuto(inputValue);
    setLanguage(highlightedCode.language!);
    codeBlockRef.current!.innerHTML = highlightedCode.value;
  };
  return (
    <div className='flex rounded-md bg-red-500 w-[80vw] h-[70vh] m-4 overflow-auto'>
      <pre className='flex rounded-md m-auto max-w-[70vw] hljs atom-one-dark'>
        {/* Display Code */}
        <code
          className={`${`language-${language}`} hljs rounded-lg min-h-[50vh] max-w-[60vw] min-w-[50vw] !break-words	`}
          ref={codeBlockRef}
        ></code>
        {/* Handle Input */}
        <code
          className='hljs !caret-black min-h-[50vh] max-w-[60vw] min-w-[50vw] !outline-none !bg-transparent !text-transparent rounded-lg absolute  !break-words '
          contentEditable={true}
          onInput={handleCodeChange}
          ref={inputRef}
        ></code>
      </pre>
    </div>
  );
}

export default CodeEditor;
