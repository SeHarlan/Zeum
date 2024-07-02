import { generateArrayAroundNumber } from "@/utils/math";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import IconButton from "./IconButton";

interface PaginationProps { 
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  perPage: number;
  totalItems: number;
  iconClass?: string;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  perPage,
  totalItems,
  iconClass = "w-5 h-5 stroke-2",
  className
}) => { 

  const totalPages  = Math.floor(totalItems / perPage);
  return (
    <div className={twMerge("relative mx-auto w-fit", className)}>
      <div className="flex justify-center items-center gap-2">
        <IconButton onClick={() => setPage(0)} disabled={page === 0}>
          <ChevronDoubleLeftIcon className={iconClass} />
        </IconButton>
        <IconButton
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          <ChevronLeftIcon className={iconClass} />
        </IconButton>

        <p className="lg:hidden bg-stone-200 hover:bg-stone-200/75 text-stone-900 font-bold px-2 rounded-full ">
          {page + 1} / {totalPages + 1}
        </p>
        
        <div className="lg:flex hidden gap-1">
          {generateArrayAroundNumber({
            num: page,
            lowerBound: 0,
            upperBound: totalPages,
          }).map((num, i) => (
            <IconButton
              key={i}
              active={num === page}
              onClick={() => setPage(num)}
            >
              {num + 1}
            </IconButton>
          ))}
        </div>
        <IconButton
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= totalPages}
        >
          <ChevronRightIcon className={iconClass} />
        </IconButton>
        <IconButton
          onClick={() => setPage(totalPages)}
          disabled={page >= totalPages}
        >
          <ChevronDoubleRightIcon className={iconClass} />
        </IconButton>
      </div>
    </div>
  );
}

export default Pagination;