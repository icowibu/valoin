import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

import { Inter, Poppins } from "next/font/google";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "100" });

export const metadata = {
  title: "valoin",
  description: "temukan lineup mu di valoin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
