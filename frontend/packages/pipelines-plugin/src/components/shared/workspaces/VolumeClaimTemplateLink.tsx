import * as React from 'react';
import { useK8sWatchResource } from '@console/internal/components/utils/k8s-watch-hook';
import { K8sResourceKind } from '@console/internal/module/k8s';
import { PersistentVolumeClaimModel } from '@console/internal/models';
import { ResourceLink } from '@console/internal/components/utils';

export interface VolumeClaimTemplateLinkProps {
  labels: { [key: string]: string };
  workspaceName: string;
  namespace: string;
}

const VolumeClaimTemplateLink: React.FC<VolumeClaimTemplateLinkProps> = ({
  labels,
  workspaceName,
  namespace,
}) => {
  const [pvcResource, loaded, loadError] = useK8sWatchResource<K8sResourceKind>({
    kind: PersistentVolumeClaimModel.kind,
    isList: false,
    selector: { matchLabels: labels },
  });

  if (loaded && !loadError && pvcResource?.metadata) {
    const displayName = pvcResource.metadata.name
      ? `${pvcResource.metadata.name} (${workspaceName})`
      : workspaceName;
    return (
      <ResourceLink
        name={pvcResource.metadata.name}
        namespace={namespace}
        kind={PersistentVolumeClaimModel.kind}
        displayName={displayName}
      />
    );
  }

  return null;
};

export default VolumeClaimTemplateLink;
