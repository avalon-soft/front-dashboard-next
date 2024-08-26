export interface IUser {
  id: number
  name: string
  username: string
}

export interface INavigation {
  label: string
  badge?: string | number
  icon?: string
  path: string
  sub_list?: IItem[]
}

interface IItem {
  label: string
  path: string
}

export interface IisLoading {
  isTable?: boolean | undefined
  isButton?: boolean | undefined
}

export interface IQueryParams {
  page?: number
  size?: number
}
export interface IMeta {
  page: number
  size: number
  itemCount: number
  pageCount: number
  previous: string | null
  next: string | null
}