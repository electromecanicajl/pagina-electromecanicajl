"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/images/logo-oficial.png"
                alt="Electromecánica JL"
                width={60}
                height={60}
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Electromecánica JL</h1>
              <p className="text-sm text-muted-foreground">Servicios Profesionales</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("productos")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Productos
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </button>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span>3002680520</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>electromecanicajl@gmail.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("productos")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Productos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium"
              >
                Contacto
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
