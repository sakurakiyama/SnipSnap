import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Workspace from './components/preview/Workspace';

import { useState } from 'react';

function App() {
  const [background, setBackground] = useState<string>('#F1EFE4');
  return (
    <div>
      <div className='flex flex-row bg-green-500'>
        <Sidebar setBackground={setBackground} />
        <Workspace />
      </div>
    </div>
  );
}

export default App;
