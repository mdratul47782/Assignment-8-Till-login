import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { UserProvider } from "./context/UserContext";
import UserProviderClient from "@/components/UserProviderClient";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "MOVIE DB",
  description: "Find Your Favourite Movie Here",
};

export default async function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <UserProviderClient>
      <body className="bg-black text-white">
        
          <NavBar/>
          {children}
          
      </body>
      </UserProviderClient>
    </html>
  );
}
