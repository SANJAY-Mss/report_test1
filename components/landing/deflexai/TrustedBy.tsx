export function TrustedBy() {
  const logos = [
    "Google", "Airbnb", "Coinbase", "Notion", "Gumroad", 
    "PayPal", "Upwork", "Shopify", "Stripe", "Zoom"
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm font-medium text-gray-400 mb-8 tracking-wide">
          Trusted by 200,000+ users worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo) => (
            <div key={logo} className="text-xl font-bold font-serif text-gray-800 tracking-tight hover:text-black transition-colors">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
