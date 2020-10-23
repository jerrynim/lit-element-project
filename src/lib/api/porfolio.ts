import { AxiosResponse } from "axios";
import { update } from "lodash";
import { Portfolio, PortfolioComment } from "../../../types/portfolio";
import axios from "./apiClient";

const comments: PortfolioComment[] = [
  {
    id: 1,
    text:
      "디자인도 디자인인데 영상도 너무너무 잘만드셨습니다. 뉴모피즘 인가요? 적용한 디자인들을 보고있는데 매력적이에요 ㅎㅎ",
    author: {
      id: "1",
      username: "yungdi",
      thumbnail:
        "https://api.miniintern.com/images/profile/profile_image_default.svg",
      createdAt: new Date().toISOString(),
    },
    replies: [
      {
        id: 111,
        text: "네! 뉴모피즘입니다! 감사합니다",
        author: {
          id: "111",
          username: "이온",
          thumbnail:
            "https://api.miniintern.com/images/profile/profile_image_default.svg",
          createdAt: new Date().toISOString(),
        },
        replies: [],
        createdAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    text:
      "디자인도 디자인인데 영상도 너무너무 잘만드셨습니다. 뉴모피즘 인가요? 적용한 디자인들을 보고있는데 매력적이에요 ㅎㅎ",
    author: {
      id: "1",
      username: "yungdi",
      thumbnail:
        "https://api.miniintern.com/images/profile/profile_image_default.svg",
      createdAt: new Date().toISOString(),
    },
    replies: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    text:
      "디자인도 디자인인데 영상도 너무너무 잘만드셨습니다. 뉴모피즘 인가요? 적용한 디자인들을 보고있는데 매력적이에요 ㅎㅎ",
    author: {
      id: "1",
      username: "yungdi",
      thumbnail:
        "https://api.miniintern.com/images/profile/profile_image_default.svg",
      createdAt: new Date().toISOString(),
    },
    replies: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    text:
      "디자인도 디자인인데 영상도 너무너무 잘만드셨습니다. 뉴모피즘 인가요? 적용한 디자인들을 보고있는데 매력적이에요 ㅎㅎ",
    author: {
      id: "1",
      username: "yungdi",
      thumbnail:
        "https://api.miniintern.com/images/profile/profile_image_default.svg",
      createdAt: new Date().toISOString(),
    },
    replies: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    text:
      "디자인도 디자인인데 영상도 너무너무 잘만드셨습니다. 뉴모피즘 인가요? 적용한 디자인들을 보고있는데 매력적이에요 ㅎㅎ",
    author: {
      id: "1",
      username: "yungdi",
      thumbnail:
        "https://api.miniintern.com/images/profile/profile_image_default.svg",
      createdAt: new Date().toISOString(),
    },
    replies: [],
    createdAt: new Date().toISOString(),
  },
];
//* 포트폴리오 상세 불러오기 API
export const getPortfolioAPI = (id: string) => {
  const portfolio = new Promise<AxiosResponse<Portfolio>>((resolve, reject) => {
    setTimeout(() => resolve(axios.get(`api/v1/portfolios/${id}`)), 2000);
  });
  return portfolio;
};

//* 포트폴리오 댓글 불러오기 API
export const getPorfolioCommentsAPI = () => {
  const portfolio = new Promise<PortfolioComment[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(comments);
    }, 2000);
  });
  return portfolio;
};

//* 포트폴리오 댓글 작성하기 API
export const addPortfolioCommentAPI = () => axios.post("");

export const loginAPI = () =>
  axios.post("api/v1/auth/login", {
    username: "제리님",
  });
//* 포트폴리오 생성하기 API
export const addPortfolioAPI = () =>
  axios.post("api/v1/portfolios", {
    title: "서울메이트 - 룸메이트 매칭 서비스",
    categories: "마케팅",
    description: `ⓒ2019
    copyright by Heo Ji Eun
     
    본 프로젝트는 개인적인 작업물 입니다.
     
    
     -
    
     
    
    외주 또는 협업 문의는 메일로 부탁드립니다 :)
    
     
    
    Email
    
    heo_design@naver.com
    
     
    
    -
    
     
    
    감사합니다`,
    contents: ["마케팅이란?", "마케팅 직무에 대한 이해"],
    bankname: "신한",
    accountNumber: "110-344-375136",
    price: 10000,
    coverImage: "https://notefolio.net/truu/173593",
    previewImagePage: [1, 2, 3],
    pdfImages: [
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14512/fa7bc280-637f-4486-96bc-fce3cb3ad55a/pofol1.jpg",
        page: 1,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14513/06b45491-6f6d-4fa9-853f-95c186024900/pofol2.jpg",
        page: 2,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14514/4796b131-49ae-4614-92c0-821a518a51c0/pofol3.jpg",
        page: 3,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14515/19f1fe00-848f-49ef-91a2-512de71ec732/pofol4.jpg",
        page: 4,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14516/a06e41c3-4596-4c84-b0ea-6b9f93237882/pofol5.jpg",
        page: 5,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14517/db87bdf4-1cb5-47b6-adf2-3ce9258b0f71/pofol6.jpg",
        page: 6,
      },
      {
        path:
          "https://s3.ap-northeast-2.amazonaws.com/miniintern-upload/14518/9f8bc02a-67f8-4cc4-b3d6-1b949ede5c93/pofol7.jpg",
        page: 7,
      },
    ],
  });
