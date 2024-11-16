import type { Agent, AgentSorting, AgentViewState, AgentMetrics } from '$lib/types/agent.types';

// Define base metrics for each agent type
const BASE_METRICS: Record<Agent['type'], AgentMetrics> = {
  processor: {
    intelligence: 85,
    efficiency: 95,
    reliability: 90,
    adaptability: 80,
    throughput: 98
  },
  analyzer: {
    intelligence: 95,
    efficiency: 88,
    reliability: 92,
    adaptability: 85,
    throughput: 90
  },
  creator: {
    intelligence: 90,
    efficiency: 85,
    reliability: 88,
    adaptability: 95,
    throughput: 82
  },
  communicator: {
    intelligence: 88,
    efficiency: 92,
    reliability: 95,
    adaptability: 90,
    throughput: 85
  }
};

export const AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: "Task Planner",
    type: 'processor',
    status: 'active',
    corners: [
      { icon: "⚡", text: "Fast", position: "top-left" },
      { icon: "📊", text: "Smart", position: "top-right" },
      { icon: "🎯", text: "Focus", position: "bottom-left" },
      { icon: "🔄", text: "Active", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.processor,
      efficiency: 98, // Enhanced efficiency for Task Planner
    },
    lastActive: new Date()
  },
  {
    id: 'agent-2',
    name: "Data Analyst",
    type: 'analyzer',
    status: 'active',
    corners: [
      { icon: "📈", text: "Analytics", position: "top-left" },
      { icon: "🧮", text: "Math", position: "top-right" },
      { icon: "🔍", text: "Research", position: "bottom-left" },
      { icon: "📊", text: "Reports", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.analyzer,
      intelligence: 98, // Enhanced intelligence for Data Analyst
    },
    lastActive: new Date()
  },
  {
    id: 'agent-3',
    name: "Content Creator",
    type: 'creator',
    status: 'busy',
    corners: [
      { icon: "✍️", text: "Writing", position: "top-left" },
      { icon: "🎨", text: "Creative", position: "top-right" },
      { icon: "📱", text: "Social", position: "bottom-left" },
      { icon: "🎯", text: "SEO", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.creator,
      adaptability: 98, // Enhanced adaptability for Content Creator
    },
    lastActive: new Date()
  },
  {
    id: 'agent-4',
    name: "Support Agent",
    type: 'communicator',
    status: 'idle',
    corners: [
      { icon: "💬", text: "Chat", position: "top-left" },
      { icon: "🤝", text: "Help", position: "top-right" },
      { icon: "⚡", text: "Quick", position: "bottom-left" },
      { icon: "😊", text: "Friendly", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.communicator,
      reliability: 98, // Enhanced reliability for Support Agent
    },
    lastActive: new Date()
  },
  {
    id: 'agent-5',
    name: "Content Creator",
    type: 'creator',
    status: 'busy',
    corners: [
      { icon: "✍️", text: "Writing", position: "top-left" },
      { icon: "🎨", text: "Creative", position: "top-right" },
      { icon: "📱", text: "Social", position: "bottom-left" },
      { icon: "🎯", text: "SEO", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.creator,
      intelligence: 95, // Different specialization
    },
    lastActive: new Date()
  },
  {
    id: 'agent-6',
    name: "Content Creator",
    type: 'creator',
    status: 'busy',
    corners: [
      { icon: "✍️", text: "Writing", position: "top-left" },
      { icon: "🎨", text: "Creative", position: "top-right" },
      { icon: "📱", text: "Social", position: "bottom-left" },
      { icon: "🎯", text: "SEO", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.creator,
      throughput: 95, // Different specialization
    },
    lastActive: new Date()
  },
  {
    id: 'agent-7',
    name: "Content Creator",
    type: 'creator',
    status: 'busy',
    corners: [
      { icon: "✍️", text: "Writing", position: "top-left" },
      { icon: "🎨", text: "Creative", position: "top-right" },
      { icon: "📱", text: "Social", position: "bottom-left" },
      { icon: "🎯", text: "SEO", position: "bottom-right" }
    ],
    metrics: {
      ...BASE_METRICS.creator,
      efficiency: 95, // Different specialization
    },
    lastActive: new Date()
  }
];

// Rest of the constants remain the same
export const AGENT_TYPE_LABELS: Record<Agent['type'], string> = {
  processor: 'Task Processor',
  analyzer: 'Data Analyzer',
  creator: 'Content Creator',
  communicator: 'Support Agent'
};

export const AGENT_STATUS_LABELS: Record<Agent['status'], string> = {
  active: 'Active',
  idle: 'Idle',
  busy: 'Busy',
  offline: 'Offline'
};

export const AGENT_STATUS_COLORS: Record<Agent['status'], string> = {
  active: '#4CAF50',
  idle: '#FFC107',
  busy: '#F44336',
  offline: '#9E9E9E'
};

export const DEFAULT_AGENT_SORTING: AgentSorting = {
    field: 'metrics.intelligence', // Updated to use metrics
    direction: 'desc',
};

export const DEFAULT_AGENT_VIEW_STATE: AgentViewState = {
    isGridView: true,
    filter: {
      type: undefined,
      status: undefined,
      search: undefined,
    },
    sorting: DEFAULT_AGENT_SORTING,
};