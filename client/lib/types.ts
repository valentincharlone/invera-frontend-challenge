export interface UserType {
  id: number
  name: string
  email: string
  company: string
  status: string
  phone?: string
  location?: string
}

export interface StatisticsType {
  totalUsers: number;
  newUsers: number;
  topUsers: number;
  otherUsers: number;
}

export interface UserTypesType {
  distribution: {
    type: string;
    percentage: number;
  }[];
  totalUsers: number;
  organic: number;
  social: number;
  direct: number;
}

export interface FetchUsersParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: string;
  status?: string;
}
