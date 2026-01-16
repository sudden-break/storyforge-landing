export default function Hero() {
  return (
    <section className="hero-gradient min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          StoryForge
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #F58529, #DD2A7B, #8134AF)'
            }}
          >
            .cloud
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-400">
          Instagram Story Monitoring neu definiert. Launch bald.
        </p>
      </div>
    </section>
  );
}
