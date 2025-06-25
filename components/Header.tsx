import Logo from './Logo';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <Logo size={48} />
      <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
        <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
        <a href="#features" className="hover:text-black transition-colors">Features</a>
        <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
        <a href="/login" className="hover:text-black transition-colors">Login</a>
      </nav>
    </header>
  );
}
