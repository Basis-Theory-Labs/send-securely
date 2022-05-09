interface StubMapping {
  id?: string;
  uuid?: string;
  name?: string;
  request: StubMappingRequest;
  response: StubMappingResponse;
  metadata?: Record<string, string>;
}

interface StubMappingRequest {
  method: string;
  url?: string;
  urlPath?: string;
  urlPathPattern?: string;
  urlPattern?: string;
  queryParameters?: Record<string, string>;
  headers?: Record<string, string>;
  bodyPatterns?: any;
}

interface StubMappingResponse {
  status: number;
  headers?: Record<string, string>;
  body?: string;
  base64Body?: string;
  jsonBody?: any;
}

export type { StubMapping, StubMappingRequest, StubMappingResponse };
