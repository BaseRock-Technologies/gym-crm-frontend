import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  useState,
  useDeferredValue,
  useCallback,
  useTransition,
  useEffect,
} from "react";

interface AnimatedSearchInputProps {
  searchableColumns: string[];
  onSearch: (value: string) => void;
}

export function AnimatedSearchInput({
  searchableColumns,
  onSearch,
}: AnimatedSearchInputProps) {
  const [inputValue, setInputValue] = useState("");
  const deferredInputValue = useDeferredValue(inputValue);
  const [isPending, startTransition] = useTransition();
  // const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      startTransition(() => {
        onSearch(value);
      });
    },
    [onSearch]
  );

  // Commented out animation logic
  /*
  const cycleSearchableColumns = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % searchableColumns.length);
  }, [searchableColumns]);

  useEffect(() => {
    const intervalId = setInterval(cycleSearchableColumns, 2000);
    return () => clearInterval(intervalId);
  }, [cycleSearchableColumns]);
  */

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-2.5 h-4 w-4 text-gray-500 z-10" />
        <Input
          value={deferredInputValue}
          onChange={handleInputChange}
          className={`pl-9 pr-4 h-9 bg-white ${isPending ? "opacity-50" : ""}`}
        />
        {!deferredInputValue && (
          <div
            className="absolute left-[40px] top-1/2 -translate-y-1/2 flex items-center pointer-events-none overflow-hidden truncate text-ellipsis whitespace-nowrap"
            style={{ width: "calc(100% - 60px)" }}
          >
            <span className="text-gray-400 text-ellipsis overflow-hidden">
              Search for {searchableColumns.join(", ")}
              {/* Search by {searchableColumns[currentIndex]} */}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
