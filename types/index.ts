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
