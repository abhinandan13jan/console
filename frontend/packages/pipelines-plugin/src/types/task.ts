import { K8sResourceCommon } from '@console/internal/module/k8s';
import { TektonParam, TektonResource } from './coreTekton';
import { PipelineWorkspace } from './pipeline';

export type TaskResult = {
  name: string;
  description?: string;
};

export type TaskWorkspace = PipelineWorkspace & {
  readonly?: boolean;
};

export type TaskKind = K8sResourceCommon & {
  spec: {
    params?: TektonParam[];
    resources?: {
      inputs?: TektonResource[];
      outputs?: TektonResource[];
    };
    workspaces?: TaskWorkspace[];

    steps: {
      // TODO: Figure out required fields
      name: string;
      args?: string[];
      command?: string[];
      image?: string;
      resources?: {}[];
    }[];
    results?: TaskResult[];
  };
};
