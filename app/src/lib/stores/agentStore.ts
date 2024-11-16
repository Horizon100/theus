import { writable, derived } from 'svelte/store';
import type { Agent, AgentFilter, AgentViewState } from '$lib/types/agent.types';
import { AGENTS, DEFAULT_AGENT_VIEW_STATE } from '$lib/constants/agents.constants';

function createAgentStore() {
  const agents = writable<Agent[]>(AGENTS);
  const viewState = writable<AgentViewState>(DEFAULT_AGENT_VIEW_STATE);

  const filteredAgents = derived(
    [agents, viewState],
    ([$agents, $viewState]) => {
      console.log('Original Agents:', $agents);
      console.log('ViewState:', $viewState);

      let result = [...$agents];

      // Apply type filter
      if ($viewState.filter.type?.length) {
        result = result.filter(agent => $viewState.filter.type?.includes(agent.type));
      }
      console.log('After Type Filter:', result);

      // Apply status filter
      if ($viewState.filter.status?.length) {
        result = result.filter(agent => $viewState.filter.status?.includes(agent.status));
      }
      console.log('After Status Filter:', result);

      // Apply search filter
      if ($viewState.filter.search) {
        const search = $viewState.filter.search.toLowerCase();
        result = result.filter(agent =>
          agent.name.toLowerCase().includes(search) ||
          agent.corners.some(corner =>
            corner.text.toLowerCase().includes(search)
          )
        );
      }
      console.log('After Search Filter:', result);

      // Apply sorting
      const { field, direction } = $viewState.sorting;
      result.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        const modifier = direction === 'asc' ? 1 : -1;

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        return aValue < bValue ? -1 * modifier : aValue > bValue ? 1 * modifier : 0;
      });

      console.log('After Sorting:', result);
      return result;
    }
  );

  return {
    agents,
    filteredAgents,
    viewState,
    setViewState: (newState: Partial<AgentViewState>) => {
      viewState.update(state => ({
        ...state,
        ...newState
      }));
    },
    reset: () => agents.set(AGENTS)
  };
}

// Create and export the store
export const agentStore = createAgentStore();

// Export filteredAgents for direct usage
export const filteredAgents = agentStore.filteredAgents;