import React, { createContext, useContext, useMemo, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { twMerge } from "tailwind-merge";

//------------------------------------------------
// Context
//------------------------------------------------

type DataDisplayGridContextValue<T> = {
  items: T[];
  filtered: T[];
  query: string;
  setQuery: (q: string) => void;
  itemToText: (item: T) => string;
};

const DataGridContext =
  createContext<DataDisplayGridContextValue<unknown> | null>(null);

function useDataDisplayGridContext<T>() {
  const ctx = useContext(DataGridContext);
  if (!ctx)
    throw new Error(
      "DataDisplayGrid components must be used inside <DataDisplayGrid />",
    );
  return ctx as DataDisplayGridContextValue<T>;
}

function defaultItemToText(item: unknown): string {
  try {
    return typeof item === "string" ? item : JSON.stringify(item);
  } catch {
    return String(item);
  }
}

//------------------------------------------------
// Root
//------------------------------------------------

interface DataDisplayGridRootProps<
  T,
> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  itemToText?: (item: T) => string;
  children: React.ReactNode;
}

export const Root = <T,>({
  items,
  itemToText,
  children,
  className,
  ...rest
}: DataDisplayGridRootProps<T>) => {
  const [query, setQuery] = useState("");

  const toText = useMemo(
    () => itemToText ?? (defaultItemToText as (item: T) => string),
    [itemToText],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => toText(item).toLowerCase().includes(q));
  }, [items, toText, query]);

  return (
    <DataGridContext.Provider
      value={{
        items,
        filtered,
        query,
        setQuery,
        itemToText: (item) => toText(item as T),
      }}
    >
      <div
        className={twMerge(" text-rave-white font-chakraBold", className)}
        {...rest}
      >
        {children}
      </div>
    </DataGridContext.Provider>
  );
};

//------------------------------------------------
// Search
//------------------------------------------------

type SearchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  wrapperClassName?: string;
};

const Search = ({
  className,
  wrapperClassName,
  placeholder = "Search...",
  ...rest
}: SearchProps) => {
  const { query, setQuery } = useDataDisplayGridContext<unknown>();

  return (
    <div className={twMerge("relative", wrapperClassName)}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rave-white/55">
        <SearchIcon fontSize="small" />
      </span>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={twMerge(
          "h-12 w-full border border-rave-white/20 bg-rave-white/5 pl-12 pr-4",
          "text-rave-white placeholder:text-rave-white/40",
          "transition-colors duration-150 focus:border-rave-red focus:outline-none focus:ring-2 focus:ring-rave-red/30",
          className,
        )}
        {...rest}
      />
    </div>
  );
};

//------------------------------------------------
// Content
//------------------------------------------------

interface ContentProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3;
  renderItem?: (item: T, index: number) => React.ReactNode;
}

const DefaultEmpty = () => (
  <div className="border border-rave-white/15 bg-rave-white/5 p-8">
    <div className="text-[11px] tracking-[0.22em] text-rave-white/60">
      RESULT
    </div>
    <div className="mt-2 text-2xl tracking-tight">NO RESULTS</div>
    <div className="mt-2 text-sm tracking-[0.14em] text-rave-white/70">
      Try a different search.
    </div>
  </div>
);

const Tile = ({ title }: { title: string }) => {
  return (
    <div className="border border-rave-white/15 bg-rave-white/5 p-5">
      <div className="text-2xl tracking-tight text-rave-white">{title}</div>
    </div>
  );
};

const Content = <T,>({
  className,
  columns = 2,
  renderItem,
  ...rest
}: ContentProps<T>) => {
  const { filtered, itemToText } = useDataDisplayGridContext<T>();

  const gridCols =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={twMerge("py-8", className)} {...rest}>
      {filtered.length === 0 ? (
        <DefaultEmpty />
      ) : (
        <div className={`grid ${gridCols} gap-4 `}>
          {filtered.map((item, index) => (
            <React.Fragment key={index}>
              {renderItem ? (
                renderItem(item, index)
              ) : (
                <Tile title={itemToText(item)} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

//------------------------------------------------
// Export
//------------------------------------------------

export const DataDisplayGrid = Object.assign(Root, {
  Root,
  Search,
  Content,
});
