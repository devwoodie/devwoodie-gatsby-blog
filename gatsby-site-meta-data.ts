export default {
  /**
   * basic Information
   */
  title: `devwoodie.com`,
  description: `개발자 우디`,
  language: `ko`,
  siteUrl: `https://devwoodie.com/`,
  ogImage: `/thumbnail2.png`, // Path to your in the 'static' folder

  /**
   * comments setting
   */
  comments: {
    utterances: {
      repo: `devwoodie/devwoodie-gatsby-blog`,
    },
  },

  /**
   * introduce yourself
   */
  author: {
    name: `유동우`,
    nickname: `우디`,
    stack: ['Frontend', 'React', 'TypeScript'],
    bio: {
      email: `ehddl453@naver.com`,
      residence: 'Seoul, South Korea',
      bachelorDegree: 'Korea National Open Univ. Computer Science',
    },
    social: {
      github: `https://github.com/devwoodie`,
      linkedIn: `https://www.linkedin.com/in/dongwoo-yu`,
      resume: `https://spring-fang-155.notion.site/Tidy-Code-3b8fa188e4e34a95bd5b2299d7ff86bd`,
    },
    dropdown: {
      blog: 'https://devwoodie.github.io',
      portfolio: 'https://portfolio-devwoodie.vercel.app'
    },
  },

  /**
   * definition of featured posts
   */
  featured: [
    {
      title: 'LIFE',
      category: 'featured-회고',
    },
    {
      title: 'EXPERIENCE',
      category: 'featured-Experience',
    },
    {
      title: 'DEV',
      category: 'featured-Dev',
    },
  ],

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Career',
      date: '2025.02 - NOW',
      en: 'ITALL',
      kr: '잇올',
      info: 'Web Frontend Developer',
      // link: '',
    },
    {
      category: 'Career',
      date: '2024.07 - 2025.01',
      en: 'UNIVS.AI',
      kr: '유니버스 AI',
      info: 'Web/App Frontend Developer',
      link: 'https://spring-fang-155.notion.site/AI-9fed11e37edd4232b7484c6936c17299',
    },
    {
      category: 'Career',
      date: '2023.05 - 2023.12',
      en: 'Cedars E Platform',
      kr: '시더스이플랫폼',
      info: 'Web/App Frontend Developer',
      link: 'https://spring-fang-155.notion.site/IT-d6c34909dee04beaa351cf4d58e02c6a',
    },
    {
      category: 'Career',
      date: '2022.02 - 2023.05',
      en: 'eMoney',
      kr: '이머니',
      info: 'Web/Mobile Publisher',
      link: 'https://spring-fang-155.notion.site/eMoney-91fcd7af8d1a4788b255f0d6c6966674',
    },
    {
      category: 'Activity',
      date: '2023.11 - 2023.12',
      en: 'SWYP',
      kr: '스위프 2기',
      info: 'Club with designers and programmers',
      link: 'https://www.instagram.com/swyp_program',
    },
    {
      category: 'Activity',
      date: '2023.04 - 2023.08',
      en: 'B-Side',
      kr: '비사이드 15기',
      info: 'Club with designers and programmers',
      link: 'https://bside.best',
    },
  ],

  /**
   * metadata for Playground Page
   */
  projects: [
    {
      title: '별자취',
      description: '마음을 기록하는 관계 관리 앱',
      techStack: ['React-Native', 'React', 'TypeScript'],
      thumbnailUrl: 'projects-thumb/1.png',
      links: {
        post: '',
        github: 'https://github.com/bsideproject/startrail-front-end',
        demo: '',
        googlePlay: 'https://play.google.com/store/apps/details?id=com.mamgwanboowebview&pcampaignid=web_share',
        appStore: 'https://apps.apple.com/kr/app/%EB%B3%84%EC%9E%90%EC%B7%A8/id6453561008',
      },
    },
    {
      title: '일기록',
      description: '일기 쓰고, 포인트 모아 미니홈 꾸미기',
      techStack: ['React', 'TypeScript'],
      thumbnailUrl: 'projects-thumb/2.png',
      links: {
        post: '',
        github: 'https://github.com/ilgilog/ilgilog-fe',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '읽어보새',
      description: '책 읽고, 키우고, 날아보자! - 목표를 정하고 책을 읽어보아요.',
      techStack: ['React', 'TypeScript'],
      thumbnailUrl: 'projects-thumb/3.png',
      links: {
        post: '',
        github: 'https://github.com/Read-bird/readbird-fe',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: 'Savings Book',
      description: '수입/지출 기록하고 그래프로 한 눈에 보기',
      techStack: ['React', 'JavaScript'],
      thumbnailUrl: 'projects-thumb/6.png',
      links: {
        post: '',
        github: 'https://github.com/devwoodie/savings-book-frontend',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: 'wmii - what movie is it?',
      description: '영화 소개, 검색, 커뮤니티로 구성된 모바일 웹',
      techStack: ['React', 'JavaScript'],
      thumbnailUrl: 'projects-thumb/7.png',
      links: {
        post: '',
        github: 'https://github.com/devwoodie/wmii-frontend',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '유니버스 AI - 회사',
      description: '얼굴 인식 기술을 기반으로 편리하고 안전한 결제 솔루션을 제공하는 기업',
      techStack: ['Next.js', 'TypeScript'],
      thumbnailUrl: 'projects-thumb/default.png',
      links: {
        post: 'https://spring-fang-155.notion.site/AI-9fed11e37edd4232b7484c6936c17299',
        github: '',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '시더스이플랫폼 - 회사',
      description: 'React-Native webview를 이용한 하이브리드 앱 개발',
      techStack: ['React-Native', 'React', 'JavaScript'],
      thumbnailUrl: 'projects-thumb/default.png',
      links: {
        post: 'https://spring-fang-155.notion.site/IT-d6c34909dee04beaa351cf4d58e02c6a',
        github: '',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
    {
      title: '이머니 - 회사',
      description: '증권 투자의 길을 안내하는 AI 종목 추천 서비스 제공 기업',
      techStack: ['JavaScript', 'Css', 'Html'],
      thumbnailUrl: 'projects-thumb/default.png',
      links: {
        post: 'https://spring-fang-155.notion.site/eMoney-91fcd7af8d1a4788b255f0d6c6966674',
        github: '',
        demo: '',
        googlePlay: '',
        appStore: '',
      },
    },
  ],

  /**
   * metadata for Buy Me A Coffee
   */
  remittances: {
    toss: {
      link: '',
      qrCode: '',
    },
    kakaopay: {
      qrCode: 'qr_kakao.png',
    },
  },
};
