const Navigation = () => {
  const navItems = [
    { label: "Home", href: "#home", active: true },
    { label: "Products", href: "#products" },
    { label: "Farmers", href: "#farmers" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`text-sm font-medium transition-colors ${
            item.active ? "text-white" : "text-white/90 hover:text-white"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
