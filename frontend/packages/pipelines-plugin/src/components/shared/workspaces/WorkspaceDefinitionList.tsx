import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { PipelineWorkspace } from 'packages/pipelines-plugin/src/types';

export interface WorkspaceDefinitionListProps {
  workspaces: PipelineWorkspace[];
}

const WorkspaceDefinitionList: React.FC<WorkspaceDefinitionListProps> = ({ workspaces }) => {
  const { t } = useTranslation();
  return workspaces?.length > 0 ? (
    <dl>
      <dt>{t('pipelines-plugin~Workspaces')}</dt>
      <dd>
        {workspaces.map((workspace) => (
          <div key={workspace.name}>{workspace.name}</div>
        ))}
      </dd>
    </dl>
  ) : null;
};

export default WorkspaceDefinitionList;
