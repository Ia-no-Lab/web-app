import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/globals.css";


export default function WithHeaderLayout({
  children
}: { children: React.ReactNode }) {


  return (
    <>
      <nav><Header /></nav>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
