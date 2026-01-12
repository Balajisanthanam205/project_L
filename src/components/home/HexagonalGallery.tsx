import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { galleryImages } from "@/data/events";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const HexagonalGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Show first 6 images for preview
  const previewImages = galleryImages.slice(0, 6);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Captured Moments
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-4">
            Glimpses from the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Multiverse
            </span>
          </h2>
        </motion.div>

        {/* Hexagonal Gallery Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              onClick={() => setSelectedImage(image.src)}
              className="relative cursor-pointer group"
              style={{
                marginTop: index % 2 === 1 ? "50px" : "0",
              }}
            >
              <div
                className="w-32 h-36 md:w-40 md:h-44 overflow-hidden hexagon bg-gradient-to-br from-primary/20 to-secondary/20 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 flex items-center justify-center">
                  <span className="text-foreground/60 text-sm">{image.alt}</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              {/* Border glow */}
              <div className="absolute inset-0 hexagon border-2 border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/gallery">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              View Full Gallery
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[80vh] glass-card p-4">
            <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Image Preview</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HexagonalGallery;
