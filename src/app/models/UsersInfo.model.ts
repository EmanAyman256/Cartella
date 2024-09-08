export interface UserInfo {
    totalUsers: number,
    metadata: {
        "currentPage": number,
        "numberOfPages": number,
        "limit": number,
        "nextPage": number
    },
    users:{   
    _id: string;
    name: string;
    email: string;
    createdAt: Date;
    }[]
  }
  