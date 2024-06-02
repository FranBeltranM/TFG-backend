export interface ResultsWithPagination<T> {
  results: T[]
  total: number
  page: number
  totalPages: number
}
