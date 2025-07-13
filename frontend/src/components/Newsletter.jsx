export default function Newsletter() {
    return (
      <section className="bg-gray-100 py-14 px-6 md:px-16 text-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 text-gray-600">
            Get the latest movie news, trending shows, and fan recommendations straight to your inbox.
          </p>
  
          <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border border-gray-300 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  }
  