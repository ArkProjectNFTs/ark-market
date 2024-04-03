import AvatarTest from "./_components/avatar";

export default async function HomePage() {
  return (
    <main className="container h-screen py-16">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> Turbo
        </h1>
        <AvatarTest />
        <div className="w-full max-w-2xl overflow-y-scroll">hello</div>
      </div>
    </main>
  );
}
