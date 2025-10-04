import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold">Proof of Impact</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#como-funciona"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Como Funciona
          </Link>
          <Link
            href="#impacto"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Impacto
          </Link>
          <Link
            href="#para-agricultores"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Para Agricultores
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {/* <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Entrar</Link>
          </Button> */}
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/test">Criar minha apólice</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
