import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { ResourceLink } from '@console/internal/components/utils';
import WorkspaceResourceLinkList, {
  WorkspaceResourceLinkListProps,
} from '../WorkspaceResourceLinkList';
import { taskRunWithWorkspaces } from '../../../taskruns/__tests__/taskrun-test-data';
import { SecretModel, PersistentVolumeClaimModel, ConfigMapModel } from '@console/internal/models';

jest.mock('react-i18next', () => {
  const reactI18next = require.requireActual('react-i18next');
  return {
    ...reactI18next,
    useTranslation: () => ({ t: (key) => key }),
  };
});

describe('WorkspaceResourceLinkList', () => {
  let WorkspaceResourceListWrapper: ShallowWrapper<WorkspaceResourceLinkListProps>;
  let WorkspaceResourceListWrapperProps: WorkspaceResourceLinkListProps;

  it('Should not render dd or dt heading if no workspaces are found', () => {
    WorkspaceResourceListWrapperProps = {
      workspaces: taskRunWithWorkspaces[0].spec.workspaces,
      namespace: 'test',
    };
    WorkspaceResourceListWrapper = shallow(
      <WorkspaceResourceLinkList {...WorkspaceResourceListWrapperProps} />,
    );
    expect(WorkspaceResourceListWrapper.find('dd').exists()).toBe(false);
    expect(WorkspaceResourceListWrapper.find('dt').exists()).toBe(false);
  });

  it('Should render correct workspace list with ResourceLink and Text', () => {
    WorkspaceResourceListWrapperProps = {
      workspaces: taskRunWithWorkspaces[1].spec.workspaces,
      namespace: 'test',
    };
    WorkspaceResourceListWrapper = shallow(
      <WorkspaceResourceLinkList {...WorkspaceResourceListWrapperProps} />,
    );
    expect(WorkspaceResourceListWrapper.find('dd').exists()).toBe(true);
    expect(WorkspaceResourceListWrapper.find('dt').exists()).toBe(true);

    const workspaceResources = WorkspaceResourceListWrapper.find('dd').find(ResourceLink);
    expect(workspaceResources.length).toBe(3); // Should show 3 resourceLinks and 1 simple text

    // renders correct PVC ResourceLink
    expect(
      workspaceResources
        .at(0)
        .find(ResourceLink)
        .exists(),
    ).toBe(true);

    expect(
      workspaceResources
        .at(0)
        .find(ResourceLink)
        .prop('name'),
    ).toBe(taskRunWithWorkspaces[1].spec.workspaces[0].persistentVolumeClaim.claimName);

    expect(
      workspaceResources
        .at(0)
        .find(ResourceLink)
        .prop('kind'),
    ).toBe(PersistentVolumeClaimModel.kind);

    // renders correct Secret Link
    expect(
      workspaceResources
        .at(1)
        .find(ResourceLink)
        .exists(),
    ).toBe(true);

    expect(
      workspaceResources
        .at(1)
        .find(ResourceLink)
        .prop('name'),
    ).toBe(taskRunWithWorkspaces[1].spec.workspaces[1].secret.secretName);

    expect(
      workspaceResources
        .at(1)
        .find(ResourceLink)
        .prop('kind'),
    ).toBe(SecretModel.kind);

    // renders correct ConfigMaplink
    expect(
      workspaceResources
        .at(2)
        .find(ResourceLink)
        .exists(),
    ).toBe(true);

    expect(
      workspaceResources
        .at(2)
        .find(ResourceLink)
        .prop('name'),
    ).toBe(taskRunWithWorkspaces[1].spec.workspaces[2].configMap.name);

    expect(
      workspaceResources
        .at(2)
        .find(ResourceLink)
        .prop('kind'),
    ).toBe(ConfigMapModel.kind);

    const workspaceText = WorkspaceResourceListWrapper.find('dd').find('div');
    expect(workspaceText.length).toBe(1); // Should show 3 resourceLinks and 1 simple text
    expect(workspaceText.at(0).text()).toBe(taskRunWithWorkspaces[1].spec.workspaces[3].name);
  });
});
