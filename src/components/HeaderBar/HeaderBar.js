import React from 'react';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  SkipToContent,
} from 'carbon-components-react/lib/components/UIShell';

const HeaderBar = () => (
  <Header aria-label="Publication Trends">
    <SkipToContent />
    <HeaderName href="/" prefix="">
      Publication Trends
    </HeaderName>
    <HeaderNavigation aria-label="Publication Trends">
      <HeaderMenuItem href="/">Explore</HeaderMenuItem>
    </HeaderNavigation>
  </Header>
);

export default HeaderBar;
