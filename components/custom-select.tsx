import * as React from "react";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectOption } from "../types/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface CustomSelectProps {
  options?: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowCustomOption?: boolean;
  onAddCustomOption?: (value: string) => void;
  error?: string;
}

export function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  allowCustomOption,
  onAddCustomOption,
  error,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  const handleAddCustomOption = () => {
    if (customValue.trim()) {
      onAddCustomOption?.(customValue);
      onChange(customValue);
      setCustomValue("");
      setDialogOpen(false);
    }
  };

  const selectedOptionLabel = React.useMemo(() => {
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption ? selectedOption.label : value || placeholder;
  }, [options, value, placeholder]);

  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", error && "border-red-500")}
          >
            {selectedOptionLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${placeholder.toLowerCase()}...`}
            />
            <CommandEmpty>
              {allowCustomOption ? (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Add custom option
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add custom option</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      placeholder="Enter custom value"
                    />
                    <DialogFooter>
                      <Button onClick={handleAddCustomOption}>Add</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                "No results found."
              )}
            </CommandEmpty>
            {options.length > 0 && (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value.toString()}
                    onSelect={() => {
                      onChange(option.value.toString());
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
