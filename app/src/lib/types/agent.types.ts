// agent.types.ts
export interface AgentCorner {
    icon: string;
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export interface AgentMetrics {
    intelligence: number;  // Problem-solving capability
    efficiency: number;   // Resource optimization
    reliability: number;  // Consistency and uptime
    adaptability: number; // Learning and flexibility
    throughput: number;   // Processing capacity
}

export interface Agent {
    id: string;
    name: string;
    corners: AgentCorner[];
    icon?: string;
    type: 'processor' | 'analyzer' | 'creator' | 'communicator';
    status: 'active' | 'idle' | 'busy' | 'offline';
    metrics: AgentMetrics;
    lastActive?: Date;
}

export type AgentType = Agent['type'];
export type AgentStatus = Agent['status'];

export interface AgentFilter {
    type?: AgentType[];
    status?: AgentStatus[];
    search?: string;
}

export type AgentSortingField = keyof Agent | `metrics.${keyof AgentMetrics}`;

export interface AgentSorting {
    field: AgentSortingField;
    direction: 'asc' | 'desc';
}

export interface AgentViewState {
    isGridView: boolean;
    filter: AgentFilter;
    sorting: AgentSorting;
}