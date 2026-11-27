import { DemoProvider } from "@/components/DemoProvider";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <DemoProvider>{children}</DemoProvider>;
}
