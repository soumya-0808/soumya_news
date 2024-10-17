import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <Link href="/" className="text-white font-bold text-xl">
          Soumya News
        </Link>
      </div>
    </nav>
  );
}
