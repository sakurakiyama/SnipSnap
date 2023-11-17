import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import CodeEditor from './components/preview/CodeEditor';
import { useState } from 'react';

function App() {
  const [background, setBackground] = useState<string>('blush');
  const [lintTheme, setLintTheme] = useState<string>('');

  return (
    <div className='flex flex-row h-full justify-center align-middle mt-14'>
      <Sidebar setBackground={setBackground} setLintTheme={setLintTheme} />
      <CodeEditor background={background} lintTheme={lintTheme} />
    </div>
  );
}

export default App;
