import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s /  The Elegant Escape",
    default: "The Elegant Escape",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};
export default function RootLayout({ children }) {
  return (
    <html className="lg:text-[62.5%] md:text-[56.25%] text-[50%]" lang="en">
      <body
        className={`${josefin.className} text-[1.6rem] leading-[1.2] bg-primary-950 text-primary-100 min-h-screen flex flex-col
        antialiased relative`}
      >
        <Header />
        <div className="grid flex-1">
          <main>
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
