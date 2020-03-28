import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '@console/internal/redux';
import { isCloudShellExpanded } from '../../redux/reducers/cloud-shell-reducer';
import { toggleCloudShellExpanded } from '../../redux/actions/cloud-shell-actions';
import CloudShellDrawer from './CloudShellDrawer';
import CloudShellTerminal from './CloudShellTerminal';

type StateProps = {
  open?: boolean;
};

type DispatchProps = {
  onClose: () => void;
};

type CloudShellProps = StateProps & DispatchProps;

const CloudShell: React.FC<CloudShellProps> = ({ open, onClose }) => (
  <CloudShellDrawer open={open} onClose={onClose}>
    <CloudShellTerminal />
  </CloudShellDrawer>
);

const stateToProps = (state: RootState): StateProps => ({
  open: isCloudShellExpanded(state),
});

const dispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onClose: () => dispatch(toggleCloudShellExpanded()),
});

export default connect<StateProps, DispatchProps>(stateToProps, dispatchToProps)(CloudShell);
