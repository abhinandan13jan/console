import { TFunction } from 'i18next';
import * as classNames from 'classnames';
import { sortable } from '@patternfly/react-table';

export const tableColumnClasses = {
  name: classNames('pf-u-w-33-on-sm', 'pf-u-w-50-on-xs'),
  type: classNames('pf-u-w-16-on-lg', 'pf-u-w-33-on-sm', 'pf-u-w-50-on-xs'),
  status: classNames(
    'pf-m-hidden',
    'pf-m-visible-on-sm',
    'pf-u-w-16-on-lg',
    'pf-u-w-25-on-md',
    'pf-u-w-33-on-sm',
  ),
  created: classNames('pf-m-hidden', 'pf-m-visible-on-md', 'pf-u-w-33-on-lg', 'pf-u-w-25-on-md'),
};

const HelmReleaseResourcesHeader = (t: TFunction) => () => {
  return [
    {
      title: t('helm-plugin~Name'),
      sortField: 'metadata.name',
      transforms: [sortable],
      props: { className: tableColumnClasses.name },
    },
    {
      title: t('helm-plugin~Type'),
      sortField: 'kind',
      transforms: [sortable],
      props: { className: tableColumnClasses.type },
    },
    {
      title: t('helm-plugin~Status'),
      sortField: 'status.phase',
      transforms: [sortable],
      props: { className: tableColumnClasses.status },
    },
    {
      title: t('helm-plugin~Created'),
      sortField: 'metadata.creationTimestamp',
      transforms: [sortable],
      props: { className: tableColumnClasses.created },
    },
  ];
};

export default HelmReleaseResourcesHeader;
