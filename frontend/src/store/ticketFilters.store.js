import { create } from "zustand";

const useTicketFiltersStore = create((set) => ({
  search: "",
  status: "",
  priority: "",
  sort: "newest",

  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setSort: (sort) => set({ sort }),

  resetFilters: () =>
    set({
      search: "",
      status: "",
      priority: "",
      sort: "newest",
    }),
}));

export default useTicketFiltersStore;
