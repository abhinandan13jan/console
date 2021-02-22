import * as React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import WorkspaceDefinitionList, { WorkspaceDefinitionListProps } from '../WorkspaceDefinitionList';
import { pipelineWithWorkspace } from '../../../../utils/__tests__/pipeline-test-data';

jest.mock('react-i18next', () => {
  const reactI18next = require.requireActual('react-i18next');
  return {
    ...reactI18next,
    useTranslation: () => ({ t: (key) => key }),
  };
});

describe('WorkspaceDefinitionList', () => {
  let WorkspaceDefinitionListWrapper: ShallowWrapper<WorkspaceDefinitionListProps>;
  let WorkspaceDefinitionListWrapperProps: WorkspaceDefinitionListProps;

  it('Should not render dd or dt heading if no workspaces are found', () => {
    WorkspaceDefinitionListWrapperProps = {
      workspaces: pipelineWithWorkspace[0].spec.workspaces,
    };
    WorkspaceDefinitionListWrapper = shallow(
      <WorkspaceDefinitionList {...WorkspaceDefinitionListWrapperProps} />,
    );
    expect(WorkspaceDefinitionListWrapper.find('dd').exists()).toBe(false);
    expect(WorkspaceDefinitionListWrapper.find('dt').exists()).toBe(false);
  });

  it('Should render workspace list', () => {
    WorkspaceDefinitionListWrapperProps = {
      workspaces: pipelineWithWorkspace[1].spec.workspaces,
    };
    WorkspaceDefinitionListWrapper = shallow(
      <WorkspaceDefinitionList {...WorkspaceDefinitionListWrapperProps} />,
    );
    expect(WorkspaceDefinitionListWrapper.find('dd').exists()).toBe(true);
    expect(WorkspaceDefinitionListWrapper.find('dt').exists()).toBe(true);

    const workspaces = WorkspaceDefinitionListWrapper.find('dd').find('div');

    expect(workspaces.length).toBe(2);
    expect(workspaces.at(0).text()).toBe(pipelineWithWorkspace[1].spec.workspaces[0].name);
    expect(workspaces.at(1).text()).toBe(pipelineWithWorkspace[1].spec.workspaces[1].name);
  });
});
