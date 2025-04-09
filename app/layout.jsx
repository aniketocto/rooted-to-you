import "./globals.css";
import Footer from "@/components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { PaymentProvider } from "./context/PaymentContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex justify-center items-center flex-col min-w-screen min-h-screen`}
      >
        <AuthProvider>
          <PaymentProvider>
            <Navbar />
            <div className="flex-1 w-full">{children}</div>
            <Footer />
          </PaymentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
