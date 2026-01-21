import apiClient from "./client";
import { AvgPremiumByStatus, DailyPropositionCount } from "../types/types";

export const analyticsApi = {
  getAvgPremiumByStatus: async (): Promise<AvgPremiumByStatus[]> => {
    const response = await apiClient.get("/analytics/avg-premium-by-status");
    return response.data;
  },

  getDailyPropositionCount: async (
    startDate?: string,
    endDate?: string,
  ): Promise<DailyPropositionCount[]> => {
    const response = await apiClient.get("/analytics/daily-proposition-count", {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
