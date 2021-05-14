import * as classNames from 'classnames';
import { Kebab } from '@console/internal/components/utils';

export const tableColumnClasses = [
  classNames('pf-u-w-16-on-lg', 'pf-u-w-25-on-md', 'pf-u-w-33-on-xs'), // name
  classNames('pf-u-w-8-on-lg', 'pf-u-w-16-on-xs'), // namespace
  classNames('pf-u-w-16-on-lg', 'pf-u-w-25-on-md', 'pf-u-w-33-on-xs'), // last run
  classNames('pf-m-hidden', 'pf-m-visible-on-md'), // task status
  classNames('pf-m-hidden', 'pf-m-visible-on-lg'), // last run status
  classNames('pf-m-hidden', 'pf-m-visible-on-lg'), // last run time
  Kebab.columnClass,
];
