import './style.scss';

import { ThemeProvider } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { ThemeManagerContext } from 'gatsby-emotion-dark-mode';
import { useContext } from 'react';
import { Analytics } from "@vercel/analytics/react"
import Footer from '../components/Footer';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import { darkTheme, lightTheme } from '../styles/const';
import GlobalStyle from '../styles/GlobalStyle';
import * as S from './styled';
import { Helmet } from 'react-helmet';

type LayoutProps = {
  location: Location;
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const theme = useContext(ThemeManagerContext);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  const { title } = data.site.siteMetadata;

  return (
    <ThemeProvider theme={theme.isDark ? darkTheme : lightTheme}>
      <Helmet>
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9671858264073035'
          crossOrigin='anonymous'
        />
      </Helmet>
      <GlobalStyle />
      <S.Wrapper>
        <ThemeToggle />
        <S.ContentWrapper>
          {location && <Header location={location} title={title} />}
          <S.Content>{children}</S.Content>
        </S.ContentWrapper>
        <Footer />
      </S.Wrapper>
      <Analytics />
    </ThemeProvider>
  );
};

export default Layout;
