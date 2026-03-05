"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PartnerCard() {
  return (
    <section className="py-24 bg-[#F0F4F2]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-xanael-dark rounded-md p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="md:max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              ¿Quieres colaborar?
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              Forma parte de la red XANAEL. Instala, distribuye o representa la solución en tu territorio.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-xanael-accent text-white hover:bg-xanael-green">
            <Link href="/colaboradores">Más información</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
