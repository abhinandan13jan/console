import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ResourceLink } from '@console/internal/components/utils';
import { PersistentVolumeClaimModel, ConfigMapModel, SecretModel } from '@console/internal/models';
import {
  PipelineRunWorkspace,
  VolumeTypeConfigMaps,
  VolumeTypePVC,
  VolumeTypeSecret,
  VolumeTypeClaim,
} from '../../../types';
import VolumeClaimTemplateLink from './VolumeClaimTemplateLink';

export interface WorkspaceResourceLinkListProps {
  workspaces: PipelineRunWorkspace[];
  namespace: string;
}

const WorkspaceResourceLinkList: React.FC<WorkspaceResourceLinkListProps> = ({
  workspaces,
  namespace,
}) => {
  const { t } = useTranslation();
  return workspaces?.length > 0 ? (
    <dl>
      <dt>{t('pipelines-plugin~Workspaces')}</dt>
      <dd>
        {workspaces.map((workspace) => {
          if (workspace.persistentVolumeClaim) {
            const persistentVolumeClaim = workspace.persistentVolumeClaim as VolumeTypePVC;
            const displayName = `${persistentVolumeClaim.claimName} (${workspace.name})`;
            return (
              <ResourceLink
                key={workspace.name}
                name={persistentVolumeClaim.claimName}
                namespace={namespace}
                kind={PersistentVolumeClaimModel.kind}
                displayName={displayName}
              />
            );
          }
          if (workspace.configMap) {
            const configMap = workspace.configMap as VolumeTypeConfigMaps;
            const displayName = `${configMap.name} (${workspace.name})`;
            return (
              <ResourceLink
                key={workspace.name}
                name={configMap.name}
                namespace={namespace}
                kind={ConfigMapModel.kind}
                displayName={displayName}
              />
            );
          }
          if (workspace.volumeClaimTemplate) {
            const volumeClaimTemplate = workspace.volumeClaimTemplate as VolumeTypeClaim;
            const { labels } = volumeClaimTemplate.metadata;
            return (
              labels && (
                <VolumeClaimTemplateLink
                  labels={labels}
                  workspaceName={workspace.name}
                  namespace={namespace}
                />
              )
            );
          }
          if (workspace.secret) {
            const secret = workspace.secret as VolumeTypeSecret;
            const displayName = `${secret.secretName} (${workspace.name})`;
            return (
              <ResourceLink
                key={workspace.name}
                name={secret.secretName}
                kind={SecretModel.kind}
                namespace={namespace}
                displayName={displayName}
              />
            );
          }
          return <div key={workspace.name}>{workspace.name}</div>;
        })}
      </dd>
    </dl>
  ) : null;
};

export default WorkspaceResourceLinkList;
