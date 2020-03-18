import * as React from 'react';
import * as _ from 'lodash';
import { LoadingBox } from '@console/internal/components/utils';
import { CloudShellResource } from './utils/cloudshell-resource';
import './CloudshellResource.scss';

type CloudshellResourceProps = {
  resources?: { cloudShell: { data: CloudShellResource } };
};

const CloudshellResource: React.FC<CloudshellResourceProps> = (props) => {
  const cloudShell = _.get(props, ['resources', 'cloudShell', 'data']);
  const phase = _.get(cloudShell, ['status', 'phase']);
  const ideUrl = _.get(cloudShell, ['status', 'ideUrl']);
  if (phase === 'Running' && ideUrl)
    return <iframe title="cloudshell" className="co-cloud-shell-resource__iframe" src={ideUrl} />;
  return <LoadingBox />;
};

export default CloudshellResource;
