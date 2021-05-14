import * as classNames from 'classnames';
import { TFunction } from 'i18next';
import { sortable } from '@patternfly/react-table';
import { Kebab } from '@console/internal/components/utils';

export const tableColumnClasses = {
  name: classNames('pf-u-w-16-on-lg', 'pf-u-w-33-on-xs'),
  revision: classNames('pf-u-w-16-on-lg', 'pf-u-w-25-on-xs'),
  updated: classNames('pf-u-w-16-on-lg', 'pf-u-w-25-on-md', 'pf-u-w-40-on-xs'),
  status: classNames('pf-m-hidden', 'pf-m-visible-on-md', 'pf-u-w-8-on-lg', 'pf-u-w-16-on-md'),
  chartName: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
  chartVersion: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
  appVersion: classNames('pf-m-hidden', 'pf-m-visible-on-lg', 'pf-u-w-8-on-lg'),
  kebab: Kebab.columnClass,
};

const HelmReleaseListHeader = (t: TFunction) => () => {
  return [
    {
      title: t('helm-plugin~Name'),
      sortField: 'name',
      transforms: [sortable],
      props: { className: tableColumnClasses.name },
    },
    {
      title: t('helm-plugin~Revision'),
      sortField: 'version',
      transforms: [sortable],
      props: { className: tableColumnClasses.revision },
    },
    {
      title: t('helm-plugin~Updated'),
      sortField: 'info.last_deployed',
      transforms: [sortable],
      props: { className: tableColumnClasses.updated },
    },
    {
      title: t('helm-plugin~Status'),
      sortField: 'info.status',
      transforms: [sortable],
      props: { className: tableColumnClasses.status },
    },
    {
      title: t('helm-plugin~Chart name'),
      sortField: 'chart.metadata.name',
      transforms: [sortable],
      props: { className: tableColumnClasses.chartName },
    },
    {
      title: t('helm-plugin~Chart version'),
      sortField: 'chart.metadata.version',
      transforms: [sortable],
      props: { className: tableColumnClasses.chartVersion },
    },
    {
      title: t('helm-plugin~App version'),
      sortField: 'chart.metadata.appVersion',
      transforms: [sortable],
      props: { className: tableColumnClasses.appVersion },
    },
    {
      title: '',
      props: { className: tableColumnClasses.kebab },
    },
  ];
};

export default HelmReleaseListHeader;
