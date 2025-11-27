import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Globe, Menu, Home, BookOpen, Play, Book, Mic, MessageSquare, Award } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink as AppNavLink } from "@/components/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { mockUser } from "@/lib/mockData";

interface NavigationProps {
  showAuthButtons?: boolean;
}

export function Navigation({ showAuthButtons = false }: NavigationProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  // Standard English navigation links (include Home and Placement Test)
  type NavItem = { href: string; label: string; icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> };

  const navLinks: NavItem[] = [
    { href: "/", label: "Home", icon: Home },
    { href: "/courses", label: "Courses", icon: BookOpen },
    { href: "/lessons", label: "Lessons", icon: Play },
    { href: "/vocabulary", label: "Vocabulary", icon: Book },
    { href: "/speech", label: "Speech", icon: Mic },
    { href: "/ai-chatbot", label: "AI Chatbot", icon: MessageSquare },
    { href: "/placement-test", label: "Placement Test", icon: Award },
  ];

  // Helpful utility to mark a nav item active for nested routes
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">BizTalk</span>
          </Link>
          
          {/* Desktop Navigation (Màn hình máy tính) */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;

              // Render Home with hover dropdown for About/Contact
              if (link.href === "/") {
                return (
                  <div
                    key={link.href}
                    onPointerEnter={() => setHomeOpen(true)}
                    onPointerLeave={() => setHomeOpen(false)}
                    onFocus={() => setHomeOpen(true)}
                    onBlur={() => setHomeOpen(false)}
                    className="relative"
                  >
                    <DropdownMenu open={homeOpen} onOpenChange={setHomeOpen}>
                      <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-2 cursor-pointer text-sm font-medium transition-colors hover:text-primary">
                          {Icon && <Icon className="w-4 h-4 opacity-80" />}
                          <AppNavLink
                            to={link.href}
                            className="text-sm font-medium"
                            activeClassName="text-primary font-bold"
                            pendingClassName="text-muted-foreground"
                          >
                            {link.label}
                          </AppNavLink>
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent sideOffset={4} align="start">
                        <DropdownMenuItem asChild>
                          <a href="/#about">About Us</a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href="/#contact">Contact</a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              }

              return (
                <AppNavLink
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                  activeClassName="text-primary font-bold"
                  pendingClassName="text-muted-foreground"
                >
                  {Icon && <Icon className="w-4 h-4 opacity-80" />}
                  <span>{link.label}</span>
                </AppNavLink>
              );
            })}
          </nav>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {showAuthButtons ? (
              <div className="flex gap-2 items-center">
                {/* Keep only primary CTA on Landing to avoid duplication with Home dropdown */}
                <Link to="/placement-test">
                  <Button>Get Started</Button>
                </Link>
              </div>
            ) : (
              // Profile dropdown for authenticated pages (shows Dashboard + Sign Out)
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button aria-label="Open profile menu" className="p-0 rounded-full hover:opacity-90">
                      <Avatar>
                        <AvatarFallback>{mockUser.name.split(" ").map(n => n[0]).slice(0,2).join("")}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Button (Màn hình điện thoại) */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => {
                    const Icon = link.icon;

                    if (link.href === "/") {
                      return (
                        <div key={link.href}>
                          <AppNavLink
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium flex items-center gap-3"
                            activeClassName="text-primary"
                            pendingClassName="text-foreground"
                          >
                            {Icon && <Icon className="w-5 h-5" />}
                            <span>{link.label}</span>
                          </AppNavLink>
                          <div className="pl-8 mt-1 flex flex-col gap-2">
                            <a href="/#about" onClick={() => setIsOpen(false)} className="text-md font-medium">About Us</a>
                            <a href="/#contact" onClick={() => setIsOpen(false)} className="text-md font-medium">Contact</a>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <AppNavLink
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium flex items-center gap-3"
                        activeClassName="text-primary"
                        pendingClassName="text-foreground"
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{link.label}</span>
                      </AppNavLink>
                    );
                  })}
                  {/* If not landing, show profile + sign out inside mobile sheet */}
                  {!showAuthButtons && (
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{mockUser.name.split(" ").map(n => n[0]).slice(0,2).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mockUser.name}</div>
                          <div className="text-sm text-muted-foreground">{mockUser.email}</div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-medium">Dashboard</Link>
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg font-medium">Profile</Link>
                        <Link to="/settings" onClick={() => setIsOpen(false)} className="text-lg font-medium">Settings</Link>
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Sign Out</Link>
                      </div>
                    </div>
                  )}
                  {showAuthButtons && (
                    <>
                      <div className="h-px bg-border my-2" />
                      <Link to="/placement-test" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mt-4">Get Started</Button>
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}