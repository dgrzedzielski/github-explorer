const API_URL = process.env.REACT_APP_API_URL;

type ParamsType = Record<string, string>;

type MakeRequestConfig = RequestInit & {
  body?: unknown;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  params?: ParamsType;
};

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
