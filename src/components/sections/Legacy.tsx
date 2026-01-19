export default function Legacy() {
  return (
    <section className="py-20 px-12 flex flex-col md:flex-row items-stretch gap-16 max-w-6xl mx-auto">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-6 text-center md:text-left text-[#1B4332]">The Legacy of Ceylon Tea</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Ceylon tea, renowned worldwide for its exceptional quality and distinctive flavor, has been cultivated in Sri Lanka since the 1860s.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          The island's unique climate, elevation, and soil conditions create the perfect environment for producing the world's finest tea. Camellia connects you with authentic plantation experiences across this beautiful island.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          From the misty highlands of Nuwara Eliya to the verdant hills of Kandy, each tea-growing region contributes its own character to Ceylon tea. Today, Sri Lanka is one of the world's leading tea exporters, maintaining traditions that span over 150 years.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <img 
          src="/images/legecy.jpg" 
          className="rounded-2xl shadow-xl w-120 h-120 object-cover" 
          alt="Tea Culture" 
        />
      </div>
    </section>
  );
}
