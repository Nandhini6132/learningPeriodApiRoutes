import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="h-[500px] flex items-center flex-col justify-center"> 
          <h2 className="text-4xl font-bold mb-4">Browse the blog collection</h2>
          <Link href={'/blogs'} className="bg-white rounded font-bold text-lg text-blue-700 py-2 px-6">Explore</Link>
        </div>
    </main>
  );
}
