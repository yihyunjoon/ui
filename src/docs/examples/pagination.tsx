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
          <PaginationPrevious href="#preview" />
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
          <PaginationNext href="#preview" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
