import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header1() {
    const navigationItems = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Products",
            href: "/products",
        },
        {
            title: "About Us",
            href: "/about-us",
        },
        {
            title: "Contact",
            href: "/contact",
        },
        {
            title: "Services",
            href: "/services",
        },
        {
            title: "Blog",
            href: "/blog",
        },
        {
            title: "Post Requirement",
            href: "/post-requirement",
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background border-b border-gray-200">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink asChild>
                                        <Link to={item.href}>
                                            <Button variant="ghost">{item.title}</Button>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <Link to="/" className="font-semibold text-xl tracking-tight">QualFirst</Link>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button asChild variant="outline" className="hidden md:inline">
                        <Link to="/contact">Contact Us</Link>
                    </Button>
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            to={item.href}
                                            className="flex justify-between items-center"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="text-lg">{item.title}</span>
                                            <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 }; 