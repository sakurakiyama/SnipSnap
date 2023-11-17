import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import CodeEditor from './components/preview/CodeEditor';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';

function App() {
  const [background, setBackground] = useState<string>('blush');
  const [lintTheme, setLintTheme] = useState<string>('');
  const [shouldFormat, setShouldFormat] = useState<boolean>(false);

  return (
    <div className="flex flex-row h-full justify-center align-middle mt-14">
      <Sidebar
        setBackground={setBackground}
        setLintTheme={setLintTheme}
        setShouldFormat={setShouldFormat}
      />
      <CodeEditor
        background={background}
        lintTheme={lintTheme}
        setShouldFormat={setShouldFormat}
        shouldFormat={shouldFormat}
      />
      <ToastContainer
        position="top-right"
        transition={Zoom}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
