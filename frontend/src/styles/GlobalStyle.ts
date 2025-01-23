import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${props => props.theme.spacing.md};
    font-weight: 600;
  }

  p {
    margin-bottom: ${props => props.theme.spacing.sm};
  }
`;

export default GlobalStyle;
