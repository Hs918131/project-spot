import { Button } from "@/components/ui/button";
import { instrumentSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Dices, Github } from "lucide-react";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

export default function HeroSection() {
  const router = useRouter();

  const glowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="flex-grow flex flex-col justify-start ~pt-8/16 ~px-4/8 text-center">
      <h2
        className={cn(
          "~text-3xl/6xl mb-2 relative pb-4",
          instrumentSerif.className
        )}
      >
        {["Showcase", "Your"].map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.2em]"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={glowVariants}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          className="inline-block cursor-pointer relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient px-3 py-1 hover:scale-105 transition-transform"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={glowVariants}
          whileHover={{ scale: 1.01 }}
        >
          Projects
        </motion.span>
      </h2>
      <motion.p
        className="~text-base/xl text-muted-foreground ~max-w-xl/2xl mx-auto ~mb-4/8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        A curated space for developers to share and discover amazing side
        projects. Add the{" "}
        <code className="bg-green-500/30 p-1 rounded-md text-primary">
          project-spot
        </code>{" "}
        topic to your GitHub repositories & showcase them at{" "}
        <code className="bg-muted/20 p-1 rounded-md">
          <span className="hidden sm:inline">projectspot.vercel.app</span>
          <span>/your_github_username</span>
        </code>
        .
      </motion.p>

      
      <div className="flex flex-col sm:flex-row ~gap-2/4 justify-center items-center">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="#side-projects">
            <Github className="mr-2" />
            Browse Projects
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => router.push("/hs918131")}
        >
          <Dices className="mr-2" />
          View Example
        </Button>
      </div>
    </section>
  );
}
