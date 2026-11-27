import * as React from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "../../lib/utils";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        "mx-auto flex w-full justify-center",
        className
      )}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}) {
  return (
    <ul
      className={cn(
        "flex flex-row items-center gap-1",
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({
  className,
  ...props
}) {
  return (
    <li
      className={cn(
        "list-none",
        className
      )}
      {...props}
    />
  );
}

const paginationLinkVariants = ({
  isActive,
  size = "icon",
}) => {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
    "disabled:pointer-events-none disabled:opacity-50",
    size === "default"
      ? "h-9 px-4"
      : "h-9 w-9",
    isActive
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "hover:bg-slate-100 text-slate-700"
  );
};

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return (
    <a
      aria-current={
        isActive ? "page" : undefined
      }
      className={cn(
        paginationLinkVariants({
          isActive,
          size,
        }),
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-1 px-3",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />

      <span className="hidden sm:block">
        Previous
      </span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-1 px-3",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">
        Next
      </span>

      <ChevronRightIcon className="h-4 w-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-9 w-9 items-center justify-center",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="h-4 w-4" />

      <span className="sr-only">
        More pages
      </span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};