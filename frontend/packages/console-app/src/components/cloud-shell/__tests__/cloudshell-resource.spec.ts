import { newCloudShellWorkSpace } from '../utils/cloudshell-resource';

describe('CloudShell Resource Util', () => {
  const expectedData = {
    name: 'cloud-shell',
    namespace: 'default',
    kind: 'Workspace',
  };

  const newResource = newCloudShellWorkSpace(expectedData.name, expectedData.namespace);

  it('creates new cloudshell Resource with correct name, kind, metadata', () => {
    expect(newResource.kind).toEqual(expectedData.kind);
    expect(newResource.metadata.name).toEqual(expectedData.name);
    expect(newResource.metadata.namespace).toEqual(expectedData.namespace);
  });
});
