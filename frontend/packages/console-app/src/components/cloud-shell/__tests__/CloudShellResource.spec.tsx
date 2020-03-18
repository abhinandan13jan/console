import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { LoadingBox } from '@console/internal/components/utils';
import CloudShellResource from '../CloudshellResource';

let CloudShellWrapper: ShallowWrapper;
type CloudShellResourceProps = React.ComponentProps<typeof CloudShellResource>;
const cloudShellResourceProps: CloudShellResourceProps = {
  resources: {
    cloudShell: {
      data: {
        metadata: {
          name: 'cloudshell-userid',
          namespace: 'default',
        },
        kind: 'Workspace',
        status: {
          phase: 'Starting',
          ideUrl: 'dummy',
        },
      },
    },
  },
};

describe('CloudShellResourceComponent', () => {
  beforeAll(() => {
    CloudShellWrapper = shallow(<CloudShellResource {...cloudShellResourceProps} />);
  });

  it('should render loading box', () => {
    expect(CloudShellWrapper.find(LoadingBox).exists()).toBe(true);
  });
});

describe('CloudShellResourceComponent', () => {
  beforeAll(() => {
    cloudShellResourceProps.resources.cloudShell.data.status.phase = 'Running';
    CloudShellWrapper = shallow(<CloudShellResource {...cloudShellResourceProps} />);
  });

  it('should render loading box', () => {
    expect(CloudShellWrapper.find('iframe').exists()).toBe(true);
    expect(CloudShellWrapper.find('iframe').prop('src')).toBe(
      cloudShellResourceProps.resources.cloudShell.data.status.ideUrl,
    );
  });
});
