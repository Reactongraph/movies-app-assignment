import CheckAuthLayout from "@/components/CheckAuthLayout";

export default function RootLayout({ children }) {
  return <CheckAuthLayout isAuthPage={false}>{children}</CheckAuthLayout>;
}
