import * as React from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DynamicForm } from "./dynamic-form";
import {
  FieldsToAddInOptions,
  FormConfig,
  GroupedSelectOption,
  SelectApiData,
  SelectOption,
} from "../types/form";

interface CustomSelectProps {
  fieldName: string;
  primaryFields?: Record<string, string[]>;
  fieldsInOptions?: FieldsToAddInOptions;
  options?: GroupedSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowAddCustomOption?: boolean;
  addCustomOptionForm?: Record<string, FormConfig>;
  onDeleteOption?: (optionId: string) => void;
  onAddCustomOption?: (
    fieldName: string,
    fields: string[],
    value: string[],
    group: string,
    fieldsInOptions: FieldsToAddInOptions,
    additionalFieldsToFocus: Array<string>,
    additionalValuesToFocus: Array<string | number>
  ) => void;
  error?: string;
  disabled: boolean;
  apiData?: SelectApiData | null;
  customAddOptionsGroups?: string[];
}

export function CustomSelect({
  fieldName,
  options = [],
  fieldsInOptions,
  primaryFields,
  value,
  onChange,
  placeholder = "Select an option",
  allowAddCustomOption,
  addCustomOptionForm,
  onAddCustomOption,
  onDeleteOption,
  error,
  disabled,
  apiData,
  customAddOptionsGroups,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (customAddOptionsGroups && customAddOptionsGroups.length === 1) {
      setSelectedGroup(customAddOptionsGroups[0]);
    }
  }, [customAddOptionsGroups]);

  const selectOptionsGroups = options
    .filter((element) => element.group && element.group !== "default")
    .map((element) => element.group);

  const selectTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleAddCustomOption = (value: Record<string, any>) => {
    if (
      onAddCustomOption &&
      allowAddCustomOption &&
      selectedGroup &&
      primaryFields
    ) {
      const fields = primaryFields[selectedGroup] || [];
      const primaryValues = fields.map((field: string) => value[field]);
      let additionalFieldsToFocus: string[] = [];
      let additionalValuesToFocus: Array<string | number> = [];
      if (fieldsInOptions) {
        additionalFieldsToFocus = Object.keys(fieldsInOptions);
        additionalValuesToFocus = additionalFieldsToFocus.map(
          (field: string) => value[field]
        );
      }
      onAddCustomOption(
        fieldName,
        fields,
        primaryValues,
        selectedGroup,
        fieldsInOptions ?? {},
        additionalFieldsToFocus,
        additionalValuesToFocus
      );
    }
    setDialogOpen(false);
    setSelectedGroup(null);
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
      <Popover
        open={open && !disabled && !dialogOpen}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) {
            setDialogOpen(false);
          }
        }}
        modal={!dialogOpen}
      >
        <PopoverTrigger asChild>
          <Button
            ref={selectTriggerRef}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full flex justify-between truncate",
              error && "border-red-500",
              !value && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
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
              {options.length > 0 &&
                options.map((selectGroups) => (
                  <CommandGroup
                    key={selectGroups.group}
                    heading={options.length > 1 ? selectGroups.group : ""}
                  >
                    {selectGroups.options &&
                      selectGroups.options.length > 0 &&
                      selectGroups.options.map((option, index) => (
                        <CommandItem
                          key={option.value + index}
                          value={option.value}
                          onSelect={() => {
                            onChange(option.value);
                            setOpen(false);
                          }}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {option.label}
                          </div>
                          {fieldName === "sourceOfInquiry" && onDeleteOption && option.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteOption(option.id);
                              }}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                ))}
              {allowAddCustomOption && addCustomOptionForm && (
                <CommandGroup>
                  <CommandItem className="px-0 py-0 text-white mt-1">
                    <Button
                      variant="command"
                      className="cursor-pointer w-full justify-start bg-helper-primary"
                      disabled={disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDialogOpen(true);
                        setOpen(false);
                        if (
                          customAddOptionsGroups &&
                          customAddOptionsGroups.length === 1
                        ) {
                          setSelectedGroup(customAddOptionsGroups[0]);
                        }
                      }}
                    >
                      <Plus />
                      Add option
                    </Button>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {allowAddCustomOption && addCustomOptionForm && (
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setSelectedGroup(null);
            }
          }}
        >
          <DialogContent
            className={cn(
              "bg-backgroundSupport",
              selectedGroup &&
                addCustomOptionForm &&
                addCustomOptionForm[selectedGroup].fields.length > 8
                ? "max-w-5xl  max-h-[80vh] overflow-y-auto scrollbar-thin"
                : ""
            )}
          >
            <DialogHeader>
              <DialogTitle>
                {customAddOptionsGroups &&
                customAddOptionsGroups.length > 1 &&
                !selectedGroup
                  ? "Select Group"
                  : ""}
              </DialogTitle>
            </DialogHeader>
            {customAddOptionsGroups &&
            customAddOptionsGroups.length > 1 &&
            !selectedGroup ? (
              <div className="relative flex flex-wrap gap-2">
                {customAddOptionsGroups.map((group) => (
                  <Button
                    key={group}
                    variant="default"
                    size="lg"
                    onClick={() => setSelectedGroup(group)}
                  >
                    {group}
                  </Button>
                ))}
              </div>
            ) : (
              selectedGroup &&
              addCustomOptionForm && (
                <DynamicForm
                  submitBtnText="Add"
                  storeFormValues={handleAddCustomOption}
                  config={addCustomOptionForm[selectedGroup]}
                  shouldFlex={true}
                  apiData={apiData ?? null}
                  formCategory={selectedGroup}
                  resetOnSubmit={true}
                />
              )
            )}
          </DialogContent>
        </Dialog>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
