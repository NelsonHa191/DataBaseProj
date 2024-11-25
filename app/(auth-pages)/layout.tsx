import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // will setup layout for login and signup pages soon
    <main className="flex min-h-screen w-full justify-between">
      <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-black max-lg:hidden">
        <div>
          {/* <Image
            src="public\card.jpg"
            alt="Auth image"
            width={500}
            height={500}
          /> */}
        </div>
      </div>
      {children}
    </main>
  );
}