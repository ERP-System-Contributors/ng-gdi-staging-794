export interface ICrbAgentServiceType {
  id: number;
  agentServiceTypeCode?: string | null;
  agentServiceTypeDetails?: string | null;
}

export type NewCrbAgentServiceType = Omit<ICrbAgentServiceType, 'id'> & { id: null };
