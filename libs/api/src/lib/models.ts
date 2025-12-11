export interface Product {
  id: string;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Version {
  id: string;
  productId: string;
  version: string;
  releaseDate: string;
  status: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  schema: any;
  responses?: any;
}

export interface Evidence {
  id: string;
  fileName: string;
  fileSize: number;
  uploadProgress: number;
  url?: string;
}
