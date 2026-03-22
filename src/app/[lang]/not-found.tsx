import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl text-muted mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue hover:bg-blue-dark text-white font-semibold rounded-xl transition-colors"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
