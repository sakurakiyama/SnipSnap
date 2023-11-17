interface FormatProps {
  setShouldFormat: React.Dispatch<React.SetStateAction<boolean>>;
}

function Format({ setShouldFormat }: FormatProps) {
  const handleFormatting = async () => {
    setShouldFormat(true);
  };
  return (
    <div className="w-full flex items-center justify-center">
      <button
        onClick={handleFormatting}
        className="border p-1 px-2 rounded-md hover:bg-sky-600"
      >
        Format
      </button>
    </div>
  );
}

export default Format;
