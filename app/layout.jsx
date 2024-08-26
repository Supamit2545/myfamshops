import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "./components/Topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Phappusa Shops",
  description: "This Website for my family shops",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
        {children}
        </body>
    </html>
  );
}
