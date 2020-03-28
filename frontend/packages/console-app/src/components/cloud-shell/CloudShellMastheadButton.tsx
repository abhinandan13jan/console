import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TerminalIcon } from '@patternfly/react-icons';
import { Button, ToolbarItem } from '@patternfly/react-core';
import { connectToFlags, WithFlagsProps } from '@console/internal/reducers/features';
import { FLAG_DEVWORKSPACE } from '../../consts';
import { toggleCloudShellExpanded } from '../../redux/actions/cloud-shell-actions';
import { useAccessReview } from '@console/internal/components/utils';
import { WorkspaceModel } from '../../models';

type DispatchProps = {
  onClick: () => void;
};

type Props = WithFlagsProps & DispatchProps;

// TODO use proper namespace and resource name
const namespace = 'che-workspace-controller';
const name = 'cloudshell-userid';

const ClouldShellMastheadButton: React.FC<Props> = ({ flags, onClick }) => {
  const editAccess = useAccessReview({
    group: WorkspaceModel.apiGroup,
    resource: WorkspaceModel.plural,
    verb: 'create',
    name,
    namespace,
  });

  if (!editAccess || !flags[FLAG_DEVWORKSPACE]) {
    return null;
  }

  return (
    <ToolbarItem>
      <Button variant="plain" aria-label="Command Line Terminal" onClick={onClick}>
        <TerminalIcon className="co-masthead-icon" />
      </Button>
    </ToolbarItem>
  );
};

const cloudlPropsToState = (dispatch: Dispatch): DispatchProps => ({
  onClick: () => dispatch(toggleCloudShellExpanded()),
});

export default connect<{}, DispatchProps>(
  null,
  cloudlPropsToState,
)(connectToFlags(FLAG_DEVWORKSPACE)(ClouldShellMastheadButton));
