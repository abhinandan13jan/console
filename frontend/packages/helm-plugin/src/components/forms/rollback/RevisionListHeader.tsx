import * as classNames from 'classnames';
import { TFunction } from 'i18next';
import { sortable } from '@patternfly/react-table';
import { Kebab } from '@console/internal/components/utils';

export const tableColumnClasses = {
  input: Kebab.columnClass,
  revision: classNames('pf-u-w-8-on-lg', 'pf-u-w-25-on-xs'),
  updated: classNames('pf-u-w-16-on-lg', 'pf-u-w-25-on-md', 'pf-u-w-40-on-xs'),
  status: classNames('pf-m-hidden', 'pf-m-visible-on-md', 'pf-u-w-8-on-lg', 'pf-u-w-16-on-md'),
  chartName: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
  chartVersion: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
  appVersion: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
  description: classNames('pf-m-hidden', 'pf-m-visible-on-lg'),
};

const RevisionListHeader = (t: TFunction) => () => {
  return [
    {
      title: '',
      props: { className: tableColumnClasses.input },
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
      title: t('helm-plugin~Description'),
      props: { className: tableColumnClasses.description },
    },
  ];
};

export default RevisionListHeader;
