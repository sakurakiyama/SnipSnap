import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import CodeEditor from './components/preview/CodeEditor';
import NavBar from './components/NavBar';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { useRef } from 'react';

function App() {
  const snippetRef = useRef(null);

  const [background, setBackground] = useState<string>('blush');
  const [lintTheme, setLintTheme] = useState<string>('');
  const [shouldFormat, setShouldFormat] = useState<boolean>(false);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [userSelected, setUserSelected] = useState<undefined | string[]>(
    undefined
  );
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  return (
    <div>
      <NavBar />
      <div className='flex flex-row h-full justify-center align-middle mt-24'>
        <Sidebar
          setBackground={setBackground}
          setLintTheme={setLintTheme}
          setShouldFormat={setShouldFormat}
          detectedLanguage={detectedLanguage}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          snippetRef={snippetRef}
          fileName={fileName}
        />
        <CodeEditor
          snippetRef={snippetRef}
          background={background}
          lintTheme={lintTheme}
          setShouldFormat={setShouldFormat}
          shouldFormat={shouldFormat}
          setDetectedLanguage={setDetectedLanguage}
          detectedLanguage={detectedLanguage}
          userSelected={userSelected}
          setFileName={setFileName}
          fileName={fileName}
        />
        <ToastContainer
          position='top-right'
          transition={Zoom}
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </div>
    </div>
  );
}

export default App;
