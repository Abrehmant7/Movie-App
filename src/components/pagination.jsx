import React from "react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor((maxPages / 2)));
    let endPage = (startPage + maxPages);

    if(endPage > totalPages){
        endPage = totalPages;
        startPage = Math.max(1, (endPage - maxPages) + 1);
    }

    const visiblePages = [];

    for (let index = startPage; index < endPage; index++) {
        visiblePages.push(index);
    }
    
    return (
        <>
        <button disabled={currentPage == 1}
                className="p-2 rounded-md m-2 bg-stone-500 hover:bg-stone-700"
                onClick={() => setCurrentPage(currentPage-1)}>
                    Prevous
        </button>

        {visiblePages.map((page) => (
            <button className = {currentPage == page?
                 "px-3 py-1 rounded-md bg-blue-500 m-2 hover:bg-blue-700":
                  "px-3 py-1 rounded-md bg-stone-500 m-2 hover:bg-stone-700"} 
                  onClick={() => setCurrentPage(page)}
                  key={page}
            >{page}</button>
        ))}

        <button disabled={currentPage == totalPages}
                className="p-2 rounded-md m-2 bg-stone-500 hover:bg-stone-700"
                onClick={() => setCurrentPage(currentPage+1)}>
                    Next
        </button>
        </>
    )
}