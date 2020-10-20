export type PortfolioComment = {
  id: number;
  text: string;
  author: { id: number; nickname: string; profilePhoto: string };
  replies: PortfolioComment[];
  createdAt: string;
};

export type Portfolio = {
  id: number;
  title: string;
  photos: string[];
  photoCount: number;
  description: string;
  //? 무료면 ok 유료면 결제하면 ok
  isFullOffer: boolean;
  //? 미니인턴이 선정한 포트폴리오 ㅋㅋ
  isMiniinternPick: boolean;
  project: {
    id: number;
    name: string;
    company: {
      name: string;
      logo: string;
    };
  };
  isPurchased: boolean;
  isMiniinternPortfolio: boolean;
  author: {
    id: number;
    nickname: string;
    profilePhoto: string;
  };
  comments: PortfolioComment[];
  tags: string[];
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
};
