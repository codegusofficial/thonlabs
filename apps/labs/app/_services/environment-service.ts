'use server';

import { EnvironmentDetail } from '@/_interfaces/environment';
import { EnvironmentAppData } from '@/_interfaces/environment-app-data';
import {
  serverEnvHeaders,
  serverLabsEnvAPI,
  serverLabsInternalAPI,
} from '@helpers/api/server';
import { AxiosResponse } from 'axios';

export async function getEnvironmentById(environmentId: string) {
  const [{ data: environment }, { data: environmentData }] = await Promise.all([
    serverLabsEnvAPI.get<EnvironmentDetail, AxiosResponse<EnvironmentDetail>>(
      `/environments/${environmentId}`,
      serverEnvHeaders(environmentId),
    ),
    serverLabsInternalAPI.get<
      EnvironmentAppData,
      AxiosResponse<EnvironmentAppData>
    >(`/environments/${environmentId}/data/app`),
  ]);

  return { ...environment, ...environmentData };
}
