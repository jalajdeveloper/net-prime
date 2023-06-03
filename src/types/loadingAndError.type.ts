import { JSX } from 'react';

export interface loadingAndErrorType {
  loading?: boolean | unknown;
  error?: boolean | unknown;
  status?: string | unknown;
  children?: JSX.Element | JSX.Element[];
  page?: number | undefined;
  componentName?: string;
}
