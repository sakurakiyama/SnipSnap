interface FormatProps {
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

function Format({ setShouldFormat }: FormatProps) {
  const handleFormatting = async () => {
    setShouldFormat(true);
  };
  return (
    <div className='w-full flex items-center justify-center'>
      <button
        onClick={handleFormatting}
        className='border border-[var(--border-color)] p-1 px-2 rounded-md hover:bg-[var(--hover-color)] text-[var(--text-color)]'
      >
        Format
      </button>
    </div>
  );
}

export default Format;
