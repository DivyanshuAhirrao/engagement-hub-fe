export enum LineOfBusiness {
  TRAVEL = "TRAVEL",
  AUTO = "AUTO",
  HOME = "HOME",
  GADGET = "GADGET",
  HEALTH = "HEALTH",
}

export enum PropositionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

export interface Proposition {
  id: number;
  name: string;
  lineOfBusiness: LineOfBusiness;
  status: PropositionStatus;
  planCount: number;
  minimumPremium: number;
  createdAt: string;
  updatedAt: string;
}

export interface PropositionDetail {
  id: number;
  name: string;
  lineOfBusiness: LineOfBusiness;
  status: PropositionStatus;
  description?: string;
  plans: Plan[];
  createdAt: string;
  updatedAt: string;
}

export interface PropositionRequest {
  name: string;
  lineOfBusiness: LineOfBusiness;
  status: PropositionStatus;
  description?: string;
  plans: PlanRequest[];
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface Plan {
  id: number;
  name: string;
  basePremium: number;
}

export interface PlanRequest {
  id?: number;
  name: string;
  basePremium: number;
}

export interface AvgPremiumByStatus {
  status: PropositionStatus;
  averagePremium: number;
}

export interface DailyPropositionCount {
  date: string;
  count: number;
}
