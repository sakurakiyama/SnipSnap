import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Slide from './components/preview/Slide';
import { useState } from 'react';

function App() {
  const [background, setBackground] = useState<string>('#F1EFE4');
  return (
    <div>
      <div className='flex flex-row'>
        <Sidebar setBackground={setBackground} />
        <Slide />
      </div>
    </div>
  );
}

export default App;
