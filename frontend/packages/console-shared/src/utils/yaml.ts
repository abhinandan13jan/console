import { safeDump, safeLoad } from 'js-yaml';

// Safely parse js obj to yaml. Returns fallback (emtpy string by default) on exception.
export const safeJSToYAML = (js: any, fallback: string = '', options: any = {}): string => {
  try {
    return safeDump(js, options);
  } catch {
    return fallback;
  }
};

// Safely parse yaml to js object. Returns fallback (empty object by default) on exception.
export const safeYAMLToJS = (yaml: string, fallback: any = {}, options: any = {}): any => {
  try {
    return safeLoad(yaml, options);
  } catch {
    return fallback;
  }
};
