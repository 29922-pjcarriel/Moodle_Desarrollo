import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#006d6f] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 600 }}>Información de Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contacto@neurostudy.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Education Street, Learning City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 600 }}>Enlaces Rápidos</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block hover:text-[#00bfbf] transition-colors">Acerca de Nosotros</a>
              <a href="#" className="block hover:text-[#00bfbf] transition-colors">Términos y Condiciones</a>
              <a href="#" className="block hover:text-[#00bfbf] transition-colors">Política de Privacidad</a>
              <a href="#" className="block hover:text-[#00bfbf] transition-colors">Soporte Técnico</a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 600 }}>Síguenos:</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00bfbf] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00bfbf] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00bfbf] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00bfbf] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
          <p>© 2025 NeuroStudy. Todos los derechos reservados. | Plataforma Educativa Inteligente</p>
        </div>
      </div>
    </footer>
  );
}
