import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "Delivery Areas",
      links: [
        { name: "New York", href: "#" },
        { name: "Los Angeles", href: "#" },
        { name: "Chicago", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#" },
    { icon: <Twitter className="w-5 h-5" />, href: "#" },
    { icon: <Instagram className="w-5 h-5" />, href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900 text-white pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand info */}
          <div>
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-4"
            >
              FoodCart
            </motion.h2>
            <p className="text-gray-400 mb-6">
              Delivering delicious meals to your doorstep with speed and care.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, color: "#f97316" }}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
                <span className="ml-3 text-gray-400">hello@foodcart.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mt-1 text-orange-500 flex-shrink-0" />
                <span className="ml-3 text-gray-400">+1 (555) 123-4567</span>
              </li>
            </ul>

            <div className="mt-8">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">
                DOWNLOAD OUR APP
              </h4>
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ y: -2 }}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  App Store
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Google Play
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FoodCart. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-orange-500 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
