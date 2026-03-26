import React from "react";
import { motion } from "framer-motion";

const Brands = React.memo(({ user, isOwner }) => {
  const clients = user?.clients || [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
  ];

  if (!clients.length && !isOwner) return null;

  return (
    <section id="brands" className="py-12 border-b border-[var(--card-border)] bg-[var(--bg-primary)]/10 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 group">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="h-6 md:h-8 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-full w-auto object-contain brightness-0 invert" 
                title={client.name}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Brands;
