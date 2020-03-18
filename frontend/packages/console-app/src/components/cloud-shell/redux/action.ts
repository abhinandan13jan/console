import { action, ActionType } from 'typesafe-actions';

export enum Actions {
  TerminalDrawerToggleExpanded = 'terminalDrawerExpanded',
}

export const terminalDrawerToggleExpanded = () => action(Actions.TerminalDrawerToggleExpanded);

const actions = {
  terminalDrawerToggleExpanded,
};

export type TerminalAction = ActionType<typeof actions>;
