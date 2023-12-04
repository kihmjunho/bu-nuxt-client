export interface Category {
  id: number;
  name: string;
}

export interface CreateResponse {
  id: string;
}

export interface Content {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  subCategory: string;
}

export interface ContentDetail {
  title: string;
  thumbnail: string;
  images: {
    url: string;
  }[];
  userId: string;
  metaDescription?: string;
}

export interface Contents {
  data: Content[];
  totalPages: number;
}

export interface Params {
  category: string;
  subCategory: string;
  id: string;
}

export interface SubmitUser {
  email: string;
  password: string;
  nickname?: string;
}
