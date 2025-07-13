export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Cinema Fanatics</h3>
            <p className="text-sm text-gray-400">
              Your source for the hottest movies, shows, and fan favorites. Stay informed, stay entertained.
            </p>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold mb-2">Explore</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><a href="#" className="hover:text-red-500">Home</a></li>
              <li><a href="#" className="hover:text-red-500">Movies</a></li>
              <li><a href="#" className="hover:text-red-500">TV Shows</a></li>
              <li><a href="#" className="hover:text-red-500">News</a></li>
            </ul>
          </div>
  
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: info@cinemafanatics.com<br />
              Twitter: @cinemafanatics
            </p>
          </div>
        </div>
  
        <div className="text-center text-xs text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Cinema Fanatics. All rights reserved.
        </div>
      </footer>
    );
  }
  