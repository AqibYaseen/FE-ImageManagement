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
  image: File;
};

export type TImageResponse = {
  id: number;
  user: string;
  dateCreated: string;
  description: string;
  url: string;
};
