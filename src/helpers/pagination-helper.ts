import type { IPaginationOptions, IPaginationOptionsResult } from "@interfaces/pagination.js";
import type { SortOrder } from "mongoose";

const calculatePagination = (options: IPaginationOptions): IPaginationOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = (options.sortOrder || "desc") as SortOrder;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
