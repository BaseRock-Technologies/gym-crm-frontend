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
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormConfig, SelectOption } from "../types/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DynamicForm } from "./dynamic-form";

interface CustomSelectProps {
  fieldName: string;
  options?: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowAddCustomOption?: boolean;
  addCustomOptionForm?: FormConfig;
  onAddCustomOption?: (value: string) => void;
  error?: string;
}

export function CustomSelect({
  fieldName,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  allowAddCustomOption,
  addCustomOptionForm,
  onAddCustomOption,
  error,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");

  const selectTriggerRef = React.useRef<HTMLButtonElement>(null);

  const [dialogFormValues, setDialogFormVaulues] = React.useState<
    Record<string, any>
  >({});

  const handleAddCustomOption = () => {
    //   if (customValue.trim()) {
    //     onAddCustomOption?.(customValue);
    //     onChange(customValue);
    //     setCustomValue("");
    //     setDialogOpen(false);
    //   }
    console.log(dialogFormValues);
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
            ref={selectTriggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              error && "border-red-500",
              !value && "text-muted-foreground"
            )}
          >
            {selectedOptionLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" containerRef={selectTriggerRef}>
          <Command className="w-full">
            <CommandInput placeholder="Search an option" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.length > 0 &&
                  options.map((option) => (
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
                <CommandItem className="px-0 py-0 text-white mt-1">
                  {allowAddCustomOption && addCustomOptionForm && (
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                      <DialogTrigger className="w-full" asChild>
                        <Button
                          variant="command"
                          className="cursor-pointer w-full justify-start bg-helper-primary"
                        >
                          <Plus />
                          Add option
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add {fieldName} option</DialogTitle>
                        </DialogHeader>
                        {/* <Input
                          value={customValue}
                          onChange={(e) => setCustomValue(e.target.value)}
                          placeholder="Enter custom value"
                        /> */}
                        <DynamicForm
                          submitBtnText="Add"
                          storeFormValues={setDialogFormVaulues}
                          config={addCustomOptionForm}
                        />
                        {/* <DialogFooter>
                          <Button onClick={handleAddCustomOption}>Add</Button>
                        </DialogFooter> */}
                      </DialogContent>
                    </Dialog>
                  )}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
