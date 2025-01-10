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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  primaryFields?: string[];
  fieldsInOptions?: FieldsToAddInOptions;
  options?: GroupedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowAddCustomOption?: boolean;
  addCustomOptionForm?: FormConfig;
  onAddCustomOption?: (
    fields: string[],
    value: string[],
    group: string,
    fieldsInOptions: FieldsToAddInOptions,
    additionalFieldsToFoucs: Array<String>,
    additionalValuesToFocus: Array<String | Number>
  ) => void;
  error?: string;
  disabled: boolean;
  shouldAskGroup?: boolean;
  apiData?: SelectApiData | null;
}

export function CustomSelect({
  options = [],
  fieldsInOptions,
  primaryFields,
  value,
  onChange,
  placeholder = "Select an option",
  allowAddCustomOption,
  addCustomOptionForm,
  onAddCustomOption,
  error,
  disabled,
  shouldAskGroup,
  apiData,
}: CustomSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [customOptionGroupDialog, setCustomOptionGroupDialog] =
    React.useState<string>(options.length === 1 ? options[0].group : "");

  const selectOptionsGroups = options
    .filter((element) => element.group && element.group !== "default")
    .map((element) => element.group);

  const selectTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleAddCustomOption = (value: Record<string, any>) => {
    if (primaryFields && onAddCustomOption && allowAddCustomOption) {
      const primaryValues = primaryFields.map((field) => value[field]);
      let additionalFieldsToFoucs: String[] = [];
      let additionalValuesToFocus: Array<String> = [];
      if (fieldsInOptions) {
        additionalFieldsToFoucs = Object.keys(fieldsInOptions);
        additionalValuesToFocus = additionalFieldsToFoucs.map(
          (field: any) => value[field]
        );
      }
      if (shouldAskGroup) {
        onAddCustomOption(
          primaryFields,
          primaryValues,
          customOptionGroupDialog,
          fieldsInOptions ?? {},
          additionalFieldsToFoucs,
          additionalValuesToFocus
        );
      } else {
        const optionsGroup = options[0] ? options[0].group : "default";
        onAddCustomOption(
          primaryFields,
          primaryValues,
          optionsGroup,
          fieldsInOptions ?? {},
          additionalFieldsToFoucs,
          additionalValuesToFocus
        );
      }
    }
    setDialogOpen(false);
    if (shouldAskGroup) {
      setCustomOptionGroupDialog("");
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
              {options.length && options.length > 0
                ? options.map((selectGroups) => (
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
                  ))
                : null}
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
            if (!open && shouldAskGroup) {
              setCustomOptionGroupDialog("");
            }
          }}
        >
          <DialogContent className="bg-backgroundSupport">
            <DialogHeader>
              <DialogTitle>
                {shouldAskGroup && !customOptionGroupDialog && "Select Group"}
              </DialogTitle>
            </DialogHeader>
            {shouldAskGroup && !customOptionGroupDialog ? (
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {selectOptionsGroups.map((group) => (
                  <Button
                    key={group}
                    variant="default"
                    size="lg"
                    onClick={() => setCustomOptionGroupDialog(group)}
                  >
                    {group}
                  </Button>
                ))}
              </div>
            ) : (
              <DynamicForm
                submitBtnText="Add"
                storeFormValues={handleAddCustomOption}
                config={addCustomOptionForm}
                shouldFlex={true}
                apiData={apiData ?? null}
                formCategory={customOptionGroupDialog}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
