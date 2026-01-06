import ShortenerForm from "./ShortenerForm";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 items-center">
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-center text-gray-900">
          Short links, big results
        </h2>
        <p className="mt-2 text-lg text-gray-600 text-center">
          A URL shortener built with powerful analytics and security.
          Track clicks, manage links, and grow faster.
        </p>
        <ShortenerForm />
      </div>
    </section>
  );
};

export default Hero;