import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

export const GET = async <T>(
  httpService: HttpService,
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return await firstValueFrom(
    httpService
      .get(url, config)
      .pipe(map((response: AxiosResponse<T>) => response.data)),
  );
};
