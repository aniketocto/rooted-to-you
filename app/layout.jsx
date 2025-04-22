import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import Navbar from "@/components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Rooted to you</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Meta Pixel Code */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '29264955653119924');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P0YFDFL9TZ"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P0YFDFL9TZ');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-T6KS6PRS');
          `}
        </Script>
      </head>
      <body className="antialiased flex justify-center items-center flex-col min-w-screen min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T6KS6PRS"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              </noscript>
            `,
          }}
        />

        {/* Facebook Pixel (noscript) */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <noscript>
                <img height="1" width="1" style="display:none"
                  src="https://www.facebook.com/tr?id=29264955653119924&ev=PageView&noscript=1"
                />
              </noscript>
            `,
          }}
        />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <AuthProvider>
            <PaymentProvider>
              <Navbar />
              <div className="flex-1 w-full">{children}</div>
              <Footer />
            </PaymentProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
