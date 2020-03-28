import * as React from 'react';
import { Tooltip, Flex, FlexItem, FlexModifiers, Button } from '@patternfly/react-core';
import { CloseIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import Drawer from '@console/shared/src/components/drawer/Drawer';
import MinimizeRestoreButton from './MinimizeRestoreButton';

import './CloudShellDrawer.scss';

type CloudShellDrawerProps = {
  open?: boolean;
  onClose: () => void;
};

const getMastheadHeight = (): number => {
  const masthead = document.getElementById('page-main-header');
  if (!masthead) return 0;
  const { height } = masthead.getBoundingClientRect();
  return height;
};

const CloudShellDrawer: React.FC<CloudShellDrawerProps> = ({ open, children, onClose }) => {
  const [height, setHeight] = React.useState(326);
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const onMRButtonClick = (expandedState: boolean) => {
    setExpanded(!expandedState);
  };
  const handleChange = (openState: boolean, resizeHeight: number) => {
    setExpanded(openState);
    setHeight(resizeHeight);
  };
  const header = (
    <Flex style={{ flexGrow: 1 }}>
      <FlexItem className="co-cloud-shell-drawer__heading">Command Line Terminal</FlexItem>
      <FlexItem breakpointMods={[{ modifier: FlexModifiers['align-right'] }]}>
        <Tooltip content="Open terminal in new tab">
          <Button
            variant="plain"
            component="a"
            // change this once we can open terminal in new tab
            href={null}
            target="_blank"
            aria-label="Open terminal in new tab"
          >
            <ExternalLinkAltIcon />
          </Button>
        </Tooltip>
        <MinimizeRestoreButton
          minimize={expanded}
          minimizeText="Minimize terminal"
          restoreText="Restore terminal"
          onClick={onMRButtonClick}
        />
        <Tooltip content="Close terminal">
          <Button variant="plain" type="button" onClick={onClose} aria-label="Close terminal">
            <CloseIcon />
          </Button>
        </Tooltip>
      </FlexItem>
    </Flex>
  );
  return open ? (
    <Drawer
      open={expanded}
      height={height}
      header={header}
      maxHeight={`calc(100vh - ${getMastheadHeight()}px)`}
      onChange={handleChange}
      resizable
    >
      {children}
    </Drawer>
  ) : null;
};

export default CloudShellDrawer;
