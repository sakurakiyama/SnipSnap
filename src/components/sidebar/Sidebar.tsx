import BackGroundPicker from './BackgroundPicker';

interface SidebarProps {
  setBackground: React.Dispatch<React.SetStateAction<string>>;
}
function Sidebar({ setBackground }: SidebarProps) {
  return (
    <div className='flex w-[30%] h-[80%] bg-green-500 m-4'>
      <BackGroundPicker />
    </div>
  );
}

export default Sidebar;
