import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="">
      <main>
        <div className="flex flex-col gap-2">
          <h2>You are:</h2>
          <Link href="/create/rob">Rob</Link>
          <Link href="/create/nat">Nat</Link>
        </div>
      </main>
    </div>
  );
}
