export type PortfolioComment = {
  id: number;
  text: string;
  author: {
    id: string;
    thumbnail: string;
    username: string;
    createdAt: string;
  };
  replies: PortfolioComment[];
  createdAt: string;
};

export type Portfolio = {
  accountNumber: string;
  author: {
    id: string;
    thumbnail: string;
    username: string;
    createdAt: string;
  };
  bankname: string;
  categories: string;
  contents: string[];
  coverImage: string;
  createdAt: string;
  description: string;
  fkUserId: string;
  id: string;
  liked: false;
  likesCount: number;
  pdfImageCount: number;
  pdfImages: { page: number; path: string }[];
  previewImagePage: [1, 2, 3];
  price: string;
  title: string;
  viewCount: number;
  comments: PortfolioComment[];
};
