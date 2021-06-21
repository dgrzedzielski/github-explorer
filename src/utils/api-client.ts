export type ListResponse<TItem> = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<TItem>;
};

type ParamsType = Record<string, string>;

type MakeRequestConfig = Omit<RequestInit, 'body'> & {
  body?: unknown;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  params?: ParamsType;
};

export const API_URL = process.env.REACT_APP_API_URL;

function getUrlWithParams(url: string, params?: ParamsType) {
  if (params) return url + '?' + new URLSearchParams(params).toString();

  return url;
}

export async function makeRequest<TResponse = unknown>(
  path: string,
  {
    body,
    params,
    headers: customHeaders,
    ...customConfig
  }: MakeRequestConfig = {}
): Promise<TResponse> {
  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders,
    },
    ...customConfig,
  };

  const response = await fetch(
    getUrlWithParams(`${API_URL}/${path}`, params),
    config
  );
  const data = await response.json();

  if (response.ok) {
    return data;
  }

  return Promise.reject(data);
}
