export class Pagination{
    currentPage?:number;
    itemsPerPage?:number=5;
    totalItems?:number;
    totalPages?:number;
}

export class PaginatedResult<T>{
    result?:T;
    pagination?:Pagination;
    
}