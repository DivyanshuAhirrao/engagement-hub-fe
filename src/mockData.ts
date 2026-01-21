import {
  Proposition,
  PropositionDetail,
  PropositionRequest,
  PageResponse,
  LineOfBusiness,
  PropositionStatus,
  Plan,
  AvgPremiumByStatus,
  DailyPropositionCount,
} from "./types/types";

let mockPropositions: PropositionDetail[] = [
  {
    id: 1,
    name: "Global Travel Shield",
    lineOfBusiness: LineOfBusiness.TRAVEL,
    status: PropositionStatus.ACTIVE,
    description:
      "Comprehensive travel insurance covering medical emergencies, trip cancellations, and lost baggage worldwide.",
    plans: [
      { id: 1, name: "Basic Coverage", basePremium: 49.99 },
      { id: 2, name: "Premium Coverage", basePremium: 99.99 },
      { id: 3, name: "Platinum Coverage", basePremium: 199.99 },
    ],
    createdAt: "2026-01-10T10:30:00",
    updatedAt: "2026-01-15T14:20:00",
  },
  {
    id: 2,
    name: "Auto Protection Plus",
    lineOfBusiness: LineOfBusiness.AUTO,
    status: PropositionStatus.ACTIVE,
    description:
      "Complete auto insurance with collision, comprehensive, and liability coverage.",
    plans: [
      { id: 4, name: "Liability Only", basePremium: 89.0 },
      { id: 5, name: "Standard Protection", basePremium: 150.0 },
      { id: 6, name: "Full Coverage", basePremium: 275.0 },
    ],
    createdAt: "2026-01-08T09:15:00",
    updatedAt: "2026-01-16T11:45:00",
  },
  {
    id: 3,
    name: "Home Guardian Insurance",
    lineOfBusiness: LineOfBusiness.HOME,
    status: PropositionStatus.ACTIVE,
    description:
      "Protect your home and belongings with comprehensive property insurance coverage.",
    plans: [
      { id: 7, name: "Basic Home", basePremium: 125.0 },
      { id: 8, name: "Enhanced Home", basePremium: 200.0 },
      { id: 9, name: "Premium Home", basePremium: 350.0 },
    ],
    createdAt: "2026-01-12T08:00:00",
    updatedAt: "2026-01-17T16:30:00",
  },
  {
    id: 4,
    name: "Smart Gadget Protect",
    lineOfBusiness: LineOfBusiness.GADGET,
    status: PropositionStatus.ACTIVE,
    description:
      "Insurance coverage for smartphones, tablets, laptops, and other electronic devices.",
    plans: [
      { id: 10, name: "Single Device", basePremium: 15.99 },
      { id: 11, name: "Family Pack (3 devices)", basePremium: 39.99 },
      { id: 12, name: "Ultimate Pack (5 devices)", basePremium: 59.99 },
    ],
    createdAt: "2026-01-14T13:20:00",
    updatedAt: "2026-01-14T13:20:00",
  },
  {
    id: 5,
    name: "HealthCare Essential",
    lineOfBusiness: LineOfBusiness.HEALTH,
    status: PropositionStatus.ACTIVE,
    description:
      "Affordable health insurance with hospital coverage, outpatient care, and prescription benefits.",
    plans: [
      { id: 13, name: "Individual Plan", basePremium: 299.0 },
      { id: 14, name: "Family Plan", basePremium: 599.0 },
      { id: 15, name: "Senior Plan", basePremium: 450.0 },
    ],
    createdAt: "2026-01-11T07:45:00",
    updatedAt: "2026-01-18T09:10:00",
  },
  {
    id: 6,
    name: "Business Travel Suite",
    lineOfBusiness: LineOfBusiness.TRAVEL,
    status: PropositionStatus.DRAFT,
    description:
      "Tailored insurance solution for frequent business travelers with premium benefits.",
    plans: [
      { id: 16, name: "Corporate Basic", basePremium: 75.0 },
      { id: 17, name: "Executive Plan", basePremium: 150.0 },
    ],
    createdAt: "2026-01-16T11:00:00",
    updatedAt: "2026-01-16T11:00:00",
  },
  {
    id: 7,
    name: "Electric Vehicle Coverage",
    lineOfBusiness: LineOfBusiness.AUTO,
    status: PropositionStatus.DRAFT,
    description:
      "Specialized insurance for electric and hybrid vehicles with battery coverage.",
    plans: [
      { id: 18, name: "EV Standard", basePremium: 180.0 },
      { id: 19, name: "EV Premium", basePremium: 300.0 },
    ],
    createdAt: "2026-01-17T14:30:00",
    updatedAt: "2026-01-17T14:30:00",
  },
  {
    id: 8,
    name: "Rental Property Insurance",
    lineOfBusiness: LineOfBusiness.HOME,
    status: PropositionStatus.INACTIVE,
    description: "Insurance coverage for landlords and rental properties.",
    plans: [{ id: 20, name: "Single Property", basePremium: 175.0 }],
    createdAt: "2026-01-05T10:00:00",
    updatedAt: "2026-01-05T10:00:00",
  },
  {
    id: 9,
    name: "Student Health Plan",
    lineOfBusiness: LineOfBusiness.HEALTH,
    status: PropositionStatus.ACTIVE,
    description:
      "Affordable health insurance designed specifically for students.",
    plans: [
      { id: 21, name: "Campus Plan", basePremium: 120.0 },
      { id: 22, name: "Extended Plan", basePremium: 180.0 },
    ],
    createdAt: "2026-01-09T12:15:00",
    updatedAt: "2026-01-15T08:30:00",
  },
  {
    id: 10,
    name: "Tech Startup Package",
    lineOfBusiness: LineOfBusiness.GADGET,
    status: PropositionStatus.DRAFT,
    description:
      "Comprehensive gadget insurance for tech startups and small businesses.",
    plans: [
      { id: 23, name: "Startup Basic", basePremium: 99.0 },
      { id: 24, name: "Startup Pro", basePremium: 199.0 },
      { id: 25, name: "Enterprise", basePremium: 499.0 },
    ],
    createdAt: "2026-01-18T09:00:00",
    updatedAt: "2026-01-18T09:00:00",
  },
];

let nextId = 11;
let nextPlanId = 26;

// ============================================
// HELPER FUNCTIONS
// ============================================

const calculateStats = (proposition: PropositionDetail) => {
  const planCount = proposition.plans.length;
  const minimumPremium =
    proposition.plans.length > 0
      ? Math.min(...proposition.plans.map((p) => p.basePremium))
      : 0;

  return { planCount, minimumPremium };
};

const toPropositionResponse = (detail: PropositionDetail): Proposition => {
  const { planCount, minimumPremium } = calculateStats(detail);
  return {
    id: detail.id,
    name: detail.name,
    lineOfBusiness: detail.lineOfBusiness,
    status: detail.status,
    planCount,
    minimumPremium,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// MOCK API SERVICE
// ============================================

export class MockDataService {
  // Get all propositions with filters, pagination, sorting
  static async getAll(params: {
    name?: string;
    lineOfBusiness?: LineOfBusiness;
    status?: PropositionStatus;
    page?: number;
    size?: number;
    sortBy?: string;
    direction?: "ASC" | "DESC";
  }): Promise<PageResponse<Proposition>> {
    await delay(500); // Simulate network delay

    let filtered = [...mockPropositions];

    // Apply filters
    if (params.name) {
      const searchTerm = params.name.toLowerCase();
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm),
      );
    }

    if (params.lineOfBusiness) {
      filtered = filtered.filter(
        (p) => p.lineOfBusiness === params.lineOfBusiness,
      );
    }

    if (params.status) {
      filtered = filtered.filter((p) => p.status === params.status);
    }

    // Apply sorting
    const sortBy = params.sortBy || "id";
    const direction = params.direction || "ASC";

    filtered.sort((a: any, b: any) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === "planCount") {
        aVal = a.plans.length;
        bVal = b.plans.length;
      } else if (sortBy === "minimumPremium") {
        aVal = calculateStats(a).minimumPremium;
        bVal = calculateStats(b).minimumPremium;
      }

      if (aVal < bVal) return direction === "ASC" ? -1 : 1;
      if (aVal > bVal) return direction === "ASC" ? 1 : -1;
      return 0;
    });

    // Apply pagination
    const page = params.page || 0;
    const size = params.size || 10;
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / size);

    const start = page * size;
    const end = start + size;
    const paginatedData = filtered.slice(start, end);

    return {
      content: paginatedData.map(toPropositionResponse),
      pageNumber: page,
      pageSize: size,
      totalElements,
      totalPages,
      first: page === 0,
      last: page === totalPages - 1,
    };
  }

  // Get proposition by ID
  static async getById(id: number): Promise<PropositionDetail> {
    await delay(300);

    const proposition = mockPropositions.find((p) => p.id === id);
    if (!proposition) {
      throw new Error("Proposition not found");
    }

    return { ...proposition };
  }

  // Create new proposition
  static async create(data: PropositionRequest): Promise<PropositionDetail> {
    await delay(800);

    // Check duplicate name
    if (mockPropositions.some((p) => p.name === data.name)) {
      throw new Error("Proposition with this name already exists");
    }

    const now = new Date().toISOString();
    const plans: Plan[] = data.plans.map((planReq) => ({
      id: nextPlanId++,
      name: planReq.name,
      basePremium: planReq.basePremium,
    }));

    const newProposition: PropositionDetail = {
      id: nextId++,
      name: data.name,
      lineOfBusiness: data.lineOfBusiness,
      status: data.status,
      description: data.description,
      plans,
      createdAt: now,
      updatedAt: now,
    };

    mockPropositions.push(newProposition);

    return { ...newProposition };
  }

  // Update proposition
  static async update(
    id: number,
    data: PropositionRequest,
  ): Promise<PropositionDetail> {
    await delay(800);

    const index = mockPropositions.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Proposition not found");
    }

    // Check duplicate name (excluding current)
    if (mockPropositions.some((p) => p.id !== id && p.name === data.name)) {
      throw new Error("Proposition with this name already exists");
    }

    const plans: Plan[] = data.plans.map((planReq) => ({
      id: planReq.id || nextPlanId++,
      name: planReq.name,
      basePremium: planReq.basePremium,
    }));

    const updated: PropositionDetail = {
      ...mockPropositions[index],
      name: data.name,
      lineOfBusiness: data.lineOfBusiness,
      status: data.status,
      description: data.description,
      plans,
      updatedAt: new Date().toISOString(),
    };

    mockPropositions[index] = updated;

    return { ...updated };
  }

  // Delete proposition
  static async delete(id: number): Promise<void> {
    await delay(500);

    const index = mockPropositions.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Proposition not found");
    }

    mockPropositions.splice(index, 1);
  }

  // Analytics: Average premium by status
  static async getAvgPremiumByStatus(): Promise<AvgPremiumByStatus[]> {
    await delay(400);

    const grouped: Record<string, number[]> = {};

    mockPropositions.forEach((prop) => {
      const status = prop.status;
      if (!grouped[status]) {
        grouped[status] = [];
      }
      prop.plans.forEach((plan) => {
        grouped[status].push(plan.basePremium);
      });
    });

    const result: AvgPremiumByStatus[] = Object.entries(grouped).map(
      ([status, premiums]) => ({
        status: status as PropositionStatus,
        averagePremium:
          premiums.length > 0
            ? premiums.reduce((a, b) => a + b, 0) / premiums.length
            : 0,
      }),
    );

    return result;
  }

  // Analytics: Daily proposition count
  static async getDailyPropositionCount(
    startDate?: string,
    endDate?: string,
  ): Promise<DailyPropositionCount[]> {
    await delay(400);

    const grouped: Record<string, number> = {};

    mockPropositions.forEach((prop) => {
      const date = prop.createdAt.split("T")[0];
      grouped[date] = (grouped[date] || 0) + 1;
    });

    const result: DailyPropositionCount[] = Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return result;
  }
}

// ============================================
// Update API clients to use mock data
// src/api/propositions.api.ts (UPDATED)
// ============================================

// import { MockDataService } from "@/services/mockData.service";

export interface GetPropositionsParams {
  name?: string;
  lineOfBusiness?: LineOfBusiness;
  status?: PropositionStatus;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: "ASC" | "DESC";
}

export const propositionsApi = {
  getAll: (params: GetPropositionsParams = {}) =>
    MockDataService.getAll(params),
  getById: (id: number) => MockDataService.getById(id),
  create: (data: PropositionRequest) => MockDataService.create(data),
  update: (id: number, data: PropositionRequest) =>
    MockDataService.update(id, data),
  delete: (id: number) => MockDataService.delete(id),
};

// ============================================
// src/api/analytics.api.ts (UPDATED)
// ============================================

export const analyticsApi = {
  getAvgPremiumByStatus: () => MockDataService.getAvgPremiumByStatus(),
  getDailyPropositionCount: (startDate?: string, endDate?: string) =>
    MockDataService.getDailyPropositionCount(startDate, endDate),
};

// ============================================
// Additional Mock Data - Sample Data Generator
// ============================================

export class MockDataGenerator {
  static generateSamplePropositions(count: number): void {
    const lobs = Object.values(LineOfBusiness);
    const statuses = Object.values(PropositionStatus);
    const descriptions = [
      "Comprehensive coverage with premium benefits",
      "Affordable protection for your needs",
      "Tailored solution with flexible options",
      "Industry-leading coverage and service",
      "Complete protection package",
    ];

    for (let i = 0; i < count; i++) {
      const lob = lobs[Math.floor(Math.random() * lobs.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const planCount = Math.floor(Math.random() * 4) + 1;

      const plans: Plan[] = [];
      for (let j = 0; j < planCount; j++) {
        plans.push({
          id: nextPlanId++,
          name: `Plan ${j + 1}`,
          basePremium: Math.floor(Math.random() * 400) + 50,
        });
      }

      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));

      mockPropositions.push({
        id: nextId++,
        name: `${lob} Insurance ${nextId}`,
        lineOfBusiness: lob,
        status,
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        plans,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      });
    }
  }

  static resetData(): void {
    mockPropositions = mockPropositions.slice(0, 10); // Keep original 10
    nextId = 11;
    nextPlanId = 26;
  }
}

// ============================================
// Export all sample data as JSON
// ============================================

export const SAMPLE_JSON_DATA = {
  propositions: mockPropositions,
  analytics: {
    avgPremiumByStatus: [
      { status: "ACTIVE", averagePremium: 165.5 },
      { status: "DRAFT", averagePremium: 142.75 },
      { status: "INACTIVE", averagePremium: 175.0 },
    ],
    dailyCount: [
      { date: "2026-01-05", count: 1 },
      { date: "2026-01-08", count: 1 },
      { date: "2026-01-09", count: 1 },
      { date: "2026-01-10", count: 1 },
      { date: "2026-01-11", count: 1 },
      { date: "2026-01-12", count: 1 },
      { date: "2026-01-14", count: 1 },
      { date: "2026-01-16", count: 1 },
      { date: "2026-01-17", count: 1 },
      { date: "2026-01-18", count: 1 },
    ],
  },
};
