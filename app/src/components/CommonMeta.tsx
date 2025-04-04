import { white } from '../stylesheets/colors.css';

export default () => (
  <>
    <meta name="theme-color" content={white.color} />
    <meta name="msapplication-navbutton-color" content={white.color} />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content={white.color} />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  </>
);
