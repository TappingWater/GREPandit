import "@/styles/globals.css";
import "@/styles/amplify-overide.css";
import type { AppProps } from "next/app";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";
import { Nunito, Roboto_Condensed, Roboto } from "next/font/google";
import { Authenticator, View } from "@aws-amplify/ui-react";
import Layout from "@/components/Layout";
import Head from "next/head";

// Optimized fonts
// Load optimized fonts for self hosting to avoid CLS.
const textFont = Nunito({
  subsets: ["latin"],
  variable: "--font-text",
  style: ["italic", "normal"],
  weight: ["200", "300", "400", "600", "700"],
});
const headerFont = Roboto({
  subsets: ["latin"],
  variable: "--font-heading",
  style: ["normal"],
  weight: ["300", "400", "700"],
});
const subTextFont = Roboto_Condensed({
  subsets: ["latin"],
  variable: "--font-subText",
  style: ["normal"],
  weight: ["300", "400", "700"],
});

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  // Tailwind styling
  const fontStyling = `${textFont.variable} ${headerFont.variable} ${subTextFont.variable}`;
  return (
    <Authenticator.Provider>
      <View>
        <Head>
          <title>GREPandit</title>
          <meta
            name="description"
            content="A platform to assist GRE test takers"
          />
          <meta
            name="keywords"
            content="Study platform, GRE Exam, Online quiz, Verbal questions, Math questions"
          />
          <link rel="icon" type="image/png" href="/icons/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        </Head>
        <main className={`${fontStyling} text-white bg-slate-900 font-text`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </View>
    </Authenticator.Provider>
  );
}

export default MyApp;
