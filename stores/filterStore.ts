import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'

interface FilterStore {
  filters: any[]
  chooseFilter: any
  setChooseFilter: (filters: any) => void
  setFilters: (filters: any[]) => void
  addFilter: (filter: any) => void
  removeFilter: (index: number) => void
  removeChooseFilter: () => void
}

const persistOptions: PersistOptions<FilterStore> = {
  name: 'filter-storage', // The name key of localStorage
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: [],
      chooseFilter: {} as any,
      setChooseFilter: (chooseFilter: any) => set({ chooseFilter }),
      removeChooseFilter: () => set(() => ({ chooseFilter: null })),
      setFilters: (filters) => set({ filters }),

      addFilter: (filter) =>
        set((state) => ({
          filters: [...state.filters, filter],
        })),

      removeFilter: (index) =>
        set((state) => ({
          filters: state.filters.filter((_, i) => i !== index),
        })),
    }),
    persistOptions
  )
)
