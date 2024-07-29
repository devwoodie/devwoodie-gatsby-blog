export default {
  /**
   * basic Information
   */
  title: `dev-woodie.com`,
  description: `개발자 우디`,
  language: `ko`,
  siteUrl: `https://devwoodie.com/`,
  ogImage: ``, // Path to your in the 'static' folder

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
      bachelorDegree: 'Korea National Open Univ. Computer Science (2022.08 ~ )',
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
    // {
    //   title: 'category1',
    //   category: 'featured-category1',
    // },
    {
      title: 'LIFE',
      category: 'featured-회고',
    },
  ],

  /**
   * metadata for About Page
   */
  timestamps: [
    {
      category: 'Career',
      date: '2024.07 - NOW',
      en: 'UNIVS.AI',
      kr: '유니버스 AI',
      info: 'Web/App Frontend Develper',
      link: '',
    },
    {
      category: 'Career',
      date: '2023.05 - 2023.12',
      en: 'Cedars E Platform',
      kr: '시더스이플랫폼',
      info: 'Web/App Frontend Develper',
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
      kr: '스위프',
      info: 'Club with designers and programmers',
      link: 'https://www.instagram.com/swyp_program',
    },
    {
      category: 'Activity',
      date: '2023.04 - 2023.08',
      en: 'B-Side',
      kr: '비사이드',
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
      title: 'Savings Book(가계부)',
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
