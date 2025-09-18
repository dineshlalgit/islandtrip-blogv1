export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">IslandTrip</h3>
          <p className="text-sm text-muted-foreground">
            Your ultimate island travel planning companion.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section with Email and Phone */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center">
              <span className="mr-2 font-medium">Email:</span>{" "}
              contactislandtrip@gmail.com
            </p>
            <p className="flex items-center">
              <span className="mr-2 font-medium">Phone:</span> 9531891302
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-6 pt-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} IslandTrip. All rights reserved.
      </div>
    </footer>
  );
}
