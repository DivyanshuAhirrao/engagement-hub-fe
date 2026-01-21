import apiClient from "./client";
import {
  Proposition,
  PropositionDetail,
  PropositionRequest,
  PageResponse,
  LineOfBusiness,
  PropositionStatus,
} from "../types/types";

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
  getAll: async (
    params: GetPropositionsParams = {},
  ): Promise<PageResponse<Proposition>> => {
    const response = await apiClient.get("/propositions", { params });
    return response.data;
  },

  getById: async (id: number): Promise<PropositionDetail> => {
    const response = await apiClient.get(`/propositions/${id}`);
    return response.data;
  },

  create: async (data: PropositionRequest): Promise<PropositionDetail> => {
    const response = await apiClient.post("/propositions", data);
    return response.data;
  },

  update: async (
    id: number,
    data: PropositionRequest,
  ): Promise<PropositionDetail> => {
    const response = await apiClient.put(`/propositions/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/propositions/${id}`);
  },
};
