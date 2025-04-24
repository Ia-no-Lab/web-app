import "@/app/globals.css";

export default function WithHeaderLayout({
  children
}: { children: React.ReactNode }) {


  return <main>{children}</main>
}
