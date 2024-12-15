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
import { FormConfig, GroupedSelectOption, SelectOption } from "../types/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DynamicForm } from "./dynamic-form";

interface CustomSelectProps {
  fieldName: string;
  primaryField?: string;
  options?: GroupedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowAddCustomOption?: boolean;
  addCustomOptionForm?: FormConfig;
  onAddCustomOption?: (value: string, group: string) => void;
  error?: string;
}

export function CustomSelect({
  fieldName,
  options = [],
  primaryField,
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

  const [customOptionGroupDialog, setCustomOptionGroupDialog] =
    React.useState<string>(options.length === 1 ? options[0].group : "");

  const selectOptionsGroups = options.map((element) => element.group);

  const selectTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleAddCustomOption = (value: Record<string, any>) => {
    if (primaryField && onAddCustomOption && allowAddCustomOption) {
      onAddCustomOption(value[primaryField], customOptionGroupDialog);
    }
  };

  const selectedOptionLabel = React.useMemo(() => {
    const optionsFromGroup: SelectOption[] = options.flatMap(
      (optionGroup) => optionGroup.options
    );
    const selectedOption = optionsFromGroup.find(
      (option) => option.value === value
    );
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
              "w-full flex justify-between truncate",
              error && "border-red-500",
              !value && "text-muted-foreground"
            )}
          >
            <p className="relative truncate">{selectedOptionLabel}</p>
            <ChevronsUpDown className="relative ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" containerRef={selectTriggerRef}>
          <Command className="w-full">
            <CommandInput placeholder="Search an option" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {options.length &&
                options.length > 0 &&
                options.map((selectGroups) => (
                  <CommandGroup
                    key={selectGroups.group}
                    heading={options.length > 1 ? selectGroups.group : ""}
                  >
                    {selectGroups.options &&
                      selectGroups.options.length > 0 &&
                      selectGroups.options.map((option) => (
                        <CommandItem
                          key={option.value}
                          value={option.value}
                          onSelect={() => {
                            onChange(option.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              <CommandGroup>
                <CommandItem className="px-0 py-0 text-white mt-1">
                  {allowAddCustomOption && addCustomOptionForm && (
                    <Dialog
                      open={dialogOpen}
                      onOpenChange={(open) => {
                        setDialogOpen(open);
                        if (!open && options.length > 1) {
                          setCustomOptionGroupDialog("");
                        }
                      }}
                    >
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
                          <DialogTitle
                            className={`${
                              customOptionGroupDialog ? "hidden" : "flex"
                            }`}
                          >
                            {customOptionGroupDialog
                              ? `Add ${fieldName} option`
                              : "Select Group"}
                          </DialogTitle>
                        </DialogHeader>
                        {customOptionGroupDialog ? (
                          <DynamicForm
                            submitBtnText="Add"
                            storeFormValues={handleAddCustomOption}
                            config={addCustomOptionForm}
                          />
                        ) : (
                          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {selectOptionsGroups.map((group) => (
                              <Button
                                key={group}
                                variant="default"
                                size="lg"
                                onClick={() =>
                                  setCustomOptionGroupDialog(group)
                                }
                              >
                                {group}
                              </Button>
                            ))}
                          </div>
                        )}
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
