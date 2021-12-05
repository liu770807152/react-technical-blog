import App from 'next/app';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import '../styles/pages/comm.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
