import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/registry/base-nova/ui/pagination";

export default function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#preview"
            aria-disabled={page === 1}
            onClick={(event) => {
              event.preventDefault();
              setPage((current) => Math.max(1, current - 1));
            }}
          />
        </PaginationItem>
        {[1, 2, 3].map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#preview"
              isActive={page === number}
              onClick={(event) => {
                event.preventDefault();
                setPage(number);
              }}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#preview"
            aria-disabled={page === 3}
            onClick={(event) => {
              event.preventDefault();
              setPage((current) => Math.min(3, current + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
