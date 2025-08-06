import { LucideIcon } from "lucide-react"
import { GroupedSelectOption } from "./form"

export interface ColumnDef {
  id: string
  header: string
  accessorKey: string
  enableSorting?: boolean
  cell?: (props: any) => JSX.Element
  parseDateToStr?: boolean
  parseTimeToStr?: boolean
  startCase?: boolean
}

export interface ActionFieldsConfig {
  id: string
  label: string
  icon?: LucideIcon
  alertTrigger?: boolean
  onClick: (row: any) => void
}
export interface ActionWithAlert extends ActionFieldsConfig {
  alertTrigger: true;
  alertTitle: string;
  alertDescription: string;
  alertAction: string;
}
export interface ActionWithoutAlert extends ActionFieldsConfig {
  alertTrigger?: false;
  alertTitle?: never;
  alertDescription?: never;
  alertAction?: never;
}

export type ActionConfig = ActionWithAlert | ActionWithoutAlert;

export interface TableConfig {
  columns: ColumnDef[]
  actions?: ActionConfig[]
  outOfActions?: Array<OutOfActionsConfig>
  bulkActions?: BulkActionConfig[]
  filters?: FilterConfig[]
  searchableColumns?: string[]
  components?: React.JSX.Element[]
  showSelector?: boolean
}

interface OutOfActionsLinkConfig {
  id: string
  label: string
  href: string
  type: "link"
  icon?: LucideIcon
  customClass?: string,
  getLinkFrom?: string,
  additionalHref?: string,
}
interface OutOfActionsBtnConfig {
  id: string
  type: "button"
  label: string
  icon: LucideIcon,
  customClass?: string,
  btnType: "icon" | "btn" | "icon-btn"
  onClick: (row: any) => void
  showLabel?: boolean
}

export type OutOfActionsConfig = OutOfActionsLinkConfig | OutOfActionsBtnConfig;

export interface BulkActionConfig {
  id: BulkActions
  label: string
  icon?: LucideIcon
  btnVariant: BulkActionsBtnVariant,
  onClick: (selectedRows: any[]) => void
}

export type BulkActions = "SMS" | "follow-up" | "whatsapp" | "email" | "transfer-inquiry";
export type BulkActionsBtnVariant = "default" | "whatsapp" | "secondary" | "email";

export interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "search" | "date" | "date-range";
  dateRange?: {
    from: Date;
    to: Date;
  };
  options?: GroupedSelectOption[] | [];
}

export interface TableState {
  page: number
  pageSize: number
  filters: Record<string, any>
  sorting: { id: string; desc: boolean }[]
}

