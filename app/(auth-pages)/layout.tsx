import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // will setup layout for login and signup pages soon
    <main className="flex min-h-screen w-full justify-between">
      <Image
        src="/card.jpg"
        alt="Auth image"
        quality={100}
        width={1000}
        height={1000}
        className="flex h-screen w-full sticky top-0 items-center justify-end max-lg:hidden"
      />
      {children}
    </main>
  );
}
