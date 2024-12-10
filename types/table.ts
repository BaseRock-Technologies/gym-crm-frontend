import { LucideIcon } from "lucide-react"

export interface TableConfig {
  columns: ColumnDef[]
  actions?: ActionConfig[]
  bulkActions?: BulkActionConfig[]
  filters?: FilterConfig[]
  searchableColumns?: string[]
}

export interface ColumnDef {
  id: string
  header: string
  accessorKey: string
  enableSorting?: boolean
  cell?: (props: any) => JSX.Element
}

export interface ActionConfig {
  id: string
  label: string
  icon?: string
  onClick: (row: any) => void
}

export interface BulkActionConfig {
  id: BulkActions
  label: string
  icon?: LucideIcon
  btnVariant: BulkActionsBtnVariant,
  onClick: (selectedRows: any[]) => void
}

export type BulkActions = "SMS" | "follow-up" | "whatsapp" | "email";
export type BulkActionsBtnVariant = "default" | "whatsapp" | "secondary" | "email";

export interface FilterConfig {
  id: string;
  label: string;
  type: "select" | "search" | "date" | "date-range";
  dateRange?: {
    from: Date;
    to: Date;
  };
  options?: { label: string; value: string }[];
}

export interface TableState {
  page: number
  pageSize: number
  filters: Record<string, any>
  sorting: { id: string; desc: boolean }[]
}

