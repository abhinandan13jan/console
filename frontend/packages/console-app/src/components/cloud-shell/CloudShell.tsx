import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '@console/internal/redux';
import * as UIActions from '@console/internal/actions/ui';
import CloudShellDrawer from './CloudShellDrawer';
import CloudShellTerminal from './CloudshellTerminal';

type CloudshellContentProps = {
  isTerminalExpanded: boolean;
  toggleTerminal: any;
};

const CloudshellContent: React.FC<CloudshellContentProps> = ({
  isTerminalExpanded,
  toggleTerminal,
}) => (
  <CloudShellDrawer open={isTerminalExpanded} onClose={() => toggleTerminal()}>
    <CloudShellTerminal />
  </CloudShellDrawer>
);

const cloudshellStateToProps = ({ UI }: RootState) => ({
  isTerminalExpanded: UI.getIn(['terminal', 'isExpanded']),
});

const cloudlPropsToState = {
  toggleTerminal: UIActions.terminalDrawerToggleExpanded,
};
export default connect(cloudshellStateToProps, cloudlPropsToState)(CloudshellContent);
