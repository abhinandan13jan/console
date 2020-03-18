import * as React from 'react';
import { referenceForModel, k8sCreate, k8sList } from '@console/internal/module/k8s';
import { LoadingBox, Firehose, FirehoseResource } from '@console/internal/components/utils';

import { WorkspaceModel } from '../../models';
import CloudshellResource from './CloudshellResource';
import { newCloudShellWorkSpace, CloudShellResource } from './utils/cloudshell-resource';

type CloudShellTerminalProps = {};

const CloudShellTerminal: React.FC<CloudShellTerminalProps> = () => {
  /* Change dedicated name and namespace as per update */
  const namespace = 'che-workspace-controller';
  const name = 'cloudshell-userID';
  const [cloudShell, setCloudShell] = React.useState<CloudShellResource>(null);

  const createCloudShell = () => {
    k8sCreate(WorkspaceModel, newCloudShellWorkSpace(name, namespace))
      .then((newShell) => {
        setCloudShell(newShell);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Cloudshell creation Error', error);
      });
  };

  React.useEffect(() => {
    k8sList(WorkspaceModel, { ns: namespace })
      .then((existingShells) => {
        if (!existingShells || existingShells.length === 0) {
          createCloudShell();
        } else {
          setCloudShell(existingShells[0]);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('Cloud Shell resuming error', error);
      });
  }, []);

  if (cloudShell && cloudShell.metadata) {
    const resources: FirehoseResource[] = [
      {
        kind: referenceForModel(WorkspaceModel),
        name: cloudShell.metadata.name,
        namespace,
        prop: `cloudShell`,
        isList: false,
      },
    ];

    return (
      <Firehose resources={resources}>
        <CloudshellResource />
      </Firehose>
    );
  }
  return <LoadingBox />;
};

export default CloudShellTerminal;
