import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">QF</span>
            </div>
            <span className="font-bold text-xl">QualFirst</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <Link to="/contact" className="hidden sm:block">
            <Button size="sm" variant="outline" className="border-black text-black hover:bg-gray-50">
              Contact
            </Button>
          </Link>
          <Link to="/inquiry" className="hidden sm:block">
            <Button size="sm" className="bg-black hover:bg-gray-800">
              Get Quote
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <Link to="/contact">
                    <Button size="sm" variant="outline" className="w-full border-black text-black hover:bg-gray-50">
                      Contact
                    </Button>
                  </Link>
                  <Link to="/inquiry">
                    <Button size="sm" className="w-full bg-black hover:bg-gray-800">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 