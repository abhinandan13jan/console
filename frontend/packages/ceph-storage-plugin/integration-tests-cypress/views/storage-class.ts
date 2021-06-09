const configureKms = () => {
  cy.byTestID('storage-class-encryption').check();
  cy.byTestID('kms-service-name-text').type('vault');
  cy.exec('echo http://$(oc get route vault --no-headers -o custom-columns=HOST:.spec.host)').then(
    (hostname) => {
      cy.byTestID('kms-address-text').type(hostname.stdout);
    },
  );
  cy.byTestID('kms-address-port-text').type('80');
  cy.byTestID('kms-advanced-settings-link').click();
  cy.byTestID('kms-service-backend-path').type('secret');

  // save
  cy.byTestID('confirm-action').click();
  cy.byTestID('save-action').click();
  cy.byTestID('edit-kms-link').contains('Change connection details');
};

export const createStorageClass = (scName: string, encrypted?: boolean) => {
  cy.clickNavLink(['Storage', 'StorageClasses']);
  cy.byTestID('item-create').click();
  cy.byLegacyTestID('storage-class-form')
    .get('input#storage-class-name')
    .type(scName);

  // select provisioner
  cy.byTestID('storage-class-provisioner-dropdown').click();
  cy.byLegacyTestID('dropdown-text-filter').type('openshift-storage.rbd.csi.ceph.com');
  cy.byTestID('dropdown-menu-item-link').should('contain', 'openshift-storage.rbd.csi.ceph.com');
  cy.byTestID('dropdown-menu-item-link').click();

  // select block pool
  cy.byTestID('pool-dropdown-toggle').click();
  cy.byTestID('ocs-storagecluster-cephblockpool').click();

  // encryption
  encrypted && configureKms();

  // create new sc
  cy.byLegacyTestID('storage-class-form')
    .get('button#save-changes')
    .click();
  cy.byLegacyTestID('resource-title').contains(scName);
};
