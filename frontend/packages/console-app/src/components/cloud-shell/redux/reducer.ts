import { Map } from 'immutable';
import { TerminalAction, Actions } from './action';

export type State = Map<string, any>;

export default (state: State, action: TerminalAction) => {
  if (!state) {
    return Map({
      terminal: { isExpanded: false },
    });
  }
  if (action.type === Actions.TerminalDrawerToggleExpanded)
    return state.setIn(['terminal', 'isExpanded'], !state.getIn(['terminal', 'isExpanded']));

  return state;
};
