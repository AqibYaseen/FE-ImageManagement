export type TImage = {
  id: number;
  user: string;
  dateCreated: string;
  description: string;
  url: string;
};

export type TImageRequest = {
  user: string;
  description: string;
  url: string;
};

export type TImageResponse = {
  id: number;
  user: string;
  dateCreated: string;
  description: string;
  url: string;
};

export type TImageUpdateRequest = {
  id: number;
  user: string;
  dateCreated: string;
  description: string;
  url: string;
};
