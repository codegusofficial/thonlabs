'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  FilterFnOption,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table';
import { cn } from '@repo/ui/core/utils';
import React from 'react';
import { Input } from '@repo/ui/input';
import Utils from '@repo/utils';
import { LuArrowUp } from 'react-icons/lu';

function DataTableHeaderCell({
  accessorKey,
  header,
  columnDef,
}: {
  accessorKey: string;
  header: string;
  columnDef: any;
}) {
  return (
    <div
      role="button"
      className="flex items-center gap-1"
      onClick={() =>
        columnDef.column.toggleSorting(columnDef.column.getIsSorted() === 'asc')
      }
    >
      <div>{header}</div>
      {columnDef.table
        .getState()
        .sorting.some((s: any) => s.id === accessorKey) && (
        <LuArrowUp
          className={cn(
            'w-3 h-3',
            columnDef.column.getIsSorted() === 'asc' ? '' : 'rotate-180',
          )}
        />
      )}
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  noResultsMessage: React.ReactNode;
  cursor?: string;
  defaultSorting?: SortingState;
  defaultSearch?: string;
  searchPlaceholder?: string;
  searchFields?: string[];
}

function DataTable<TData, TValue>({
  columns,
  data,
  noResultsMessage,
  cursor = '',
  defaultSorting = [],
  defaultSearch = '',
  searchPlaceholder = 'Search...',
  searchFields = [],
  ...props
}: DataTableProps<TData, TValue> & React.HTMLAttributes<HTMLElement>) {
  const [sorting, setSorting] = React.useState<SortingState>(defaultSorting);
  const [globalFilter, setGlobalFilter] = React.useState(defaultSearch);

  const table = useReactTable({
    data,
    columns,
    globalFilterFn:
      searchFields.length > 0 ? ('fuzzy' as FilterFnOption<TData>) : undefined,
    state: {
      sorting,
      globalFilter,
    },
    filterFns: {
      fuzzy: (row, _, value) => {
        const data = row.original;
        const search = Utils.normalizeString(value);

        return searchFields.some((field) =>
          Utils.normalizeString(data[field]).includes(search),
        );
      },
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div {...props}>
      {searchFields.length > 0 && (
        <div className="mb-4">
          <div className="max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              size={'sm'}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(String(e.target.value))}
            />
          </div>
        </div>
      )}
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow header key={headerGroup.id} withHover={false}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="select-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn('py-3', {
                        [`cursor-${cursor}`]: cursor,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// export type DataTableColumnDef<TData, TValue> = ColumnDef<TData, TValue>;

export { DataTable, DataTableHeaderCell };
export type { ColumnDef };
