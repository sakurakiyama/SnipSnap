import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import CodeEditor from './components/preview/CodeEditor';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<string>('#F1EFE4');
  return (
    <div className='flex flex-row h-full'>
      <Sidebar setTheme={setTheme} />
      <CodeEditor theme={theme} />
    </div>
  );
}

export default App;
