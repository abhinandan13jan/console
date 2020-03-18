import * as React from 'react';
import { TerminalIcon } from '@patternfly/react-icons';
import { Button, ToolbarItem } from '@patternfly/react-core';
import { connectToFlags } from '@console/internal/reducers/features';
import { FLAG_DEVWORKSPACE } from '../../consts';

type terminalToggle = () => void;

type TerminalTooliconProps = {
  flags: Record<string, any>;
  terminalToggle: terminalToggle;
};

const TerminalToolicon: React.FC<TerminalTooliconProps> = ({ flags, terminalToggle }) => {
  if (!flags[FLAG_DEVWORKSPACE]) return null;
  return (
    <ToolbarItem>
      <Button variant="plain" aria-label="Terminal" onClick={terminalToggle}>
        <TerminalIcon className="co-masthead-icon" />
      </Button>
    </ToolbarItem>
  );
};

export default connectToFlags(FLAG_DEVWORKSPACE)(TerminalToolicon);
