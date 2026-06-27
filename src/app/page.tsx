"use client";

import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Menu,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  shipping: number;
  oldPrice?: number;
  fcfa: string;
  image: string;
  badge: string;
  tag: "Offre" | "Upsell" | "Preuve";
  description: string;
};

type CartLine = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: "free-metal-straw",
    name: "Paille metal gratuite",
    subtitle: "Tu paies seulement la livraison",
    price: 0,
    shipping: 4.99,
    oldPrice: 9.99,
    fcfa: "4,99 € livre chez toi",
    image: "/images/products/metal-straw-kit.webp",
    badge: "Offre virale",
    tag: "Offre",
    description: "1 paille inox reutilisable + goupillon de nettoyage. Produit a 0 €, frais de livraison fixes.",
  },
  {
    id: "family-metal-straw",
    name: "Pack foyer gratuit",
    subtitle: "4 pailles metal + brosse",
    price: 0,
    shipping: 8.99,
    oldPrice: 19.99,
    fcfa: "8,99 € livraison incluse",
    image: "/images/products/metal-straw-kit.webp",
    badge: "Panier moyen",
    tag: "Upsell",
    description: "Le meme mecanisme, mais pour augmenter le panier : plusieurs pailles, toujours 0 € produit.",
  },
  {
    id: "extra-brush",
    name: "Brosse nettoyage offerte",
    subtitle: "Ajout automatique",
    price: 0,
    shipping: 0,
    fcfa: "Incluse",
    image: "/images/products/metal-straw-kit.webp",
    badge: "Preuve usage",
    tag: "Preuve",
    description: "L'objection hygienique est levee directement dans l'offre.",
  },
];

const proofPoints = [
  "Produit gratuit : la friction prix disparait",
  "4,99 € de livraison : le prix final reste psychologiquement bas",
  "Visuel tortue : le probleme est compris instantanement",
  "Paille metal : alternative simple, durable et facile a expliquer",
];

const bundles = [
  { title: "Hook", text: "Une tortue, une paille plastique, une phrase choc." },
  { title: "Offre", text: "La paille vaut 0 €. Le client paie seulement 4,99 € de livraison." },
  { title: "Funnel", text: "Le jeu se gagne sur le hook, la clarte de l'offre et la logistique derriere." },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export default function Home() {
  const [filter, setFilter] = useState<Product["tag"] | "Tous">("Tous");
  const [cart, setCart] = useState<Record<string, CartLine>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProducts = useMemo(
    () => (filter === "Tous" ? products : products.filter((product) => product.tag === filter)),
    [filter],
  );

  const cartLines = Object.values(cart);
  const cartCount = cartLines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const delivery = cartLines.reduce((sum, line) => sum + line.product.shipping * line.quantity, 0);
  const total = subtotal + delivery;

  const addToCart = (product: Product) => {
    setCart((current) => ({
      ...current,
      [product.id]: {
        product,
        quantity: (current[product.id]?.quantity ?? 0) + 1,
      },
    }));
    setDrawerOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[productId];
      } else if (next[productId]) {
        next[productId] = { ...next[productId], quantity };
      }
      return next;
    });
  };

  const checkoutText = encodeURIComponent(
    `Bonjour, je souhaite commander l'offre NoPlastic Straw : ${cartLines
      .map((line) => `${line.quantity} x ${line.product.name}`)
      .join(", ")}. Total estime : ${formatPrice(total)}.`,
  );

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary-dark/70 text-white backdrop-blur-xl">
        <div className="container-site flex h-20 items-center justify-between gap-6">
          <a href="#accueil" className="flex items-center gap-3" aria-label="NoPlastic accueil">
            <Image src={asset("/brand/logo.svg")} alt="NoPlastic Straw" width={164} height={52} priority />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-extrabold text-white/82 lg:flex">
            <a href="#catalogue">Boutique</a>
            <a href="#mecanisme">Mecanisme</a>
            <a href="#preuves">Funnel</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="btn-ghost hidden sm:inline-flex" onClick={() => setDrawerOpen(true)}>
              <ShoppingBag size={17} />
              Panier {cartCount > 0 ? `(${cartCount})` : ""}
            </button>
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-background px-6 pt-7">
          <div className="flex items-center justify-between">
            <Image src={asset("/brand/logo.svg")} alt="NoPlastic Straw" width={164} height={52} />
            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={21} />
            </button>
          </div>
          <nav className="mt-12 grid gap-4 text-3xl font-black">
            {["catalogue", "mecanisme", "preuves", "faq"].map((item) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)} className="border-b border-border py-4 capitalize">
                {item === "faq" ? "FAQ" : item}
              </a>
            ))}
          </nav>
        </div>
      )}

      <section id="accueil" className="relative min-h-screen overflow-hidden bg-primary-dark pt-20 text-white">
        <div className="absolute inset-0">
          <Image
            src={asset("/images/lifestyle/turtle-straw-real-bw.webp")}
            alt=""
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="h-full w-full object-cover opacity-55"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(95deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.58) 47%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </div>

        <div className="container-site relative grid min-h-[calc(100vh-80px)] items-center gap-10 py-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-4xl">
            <p className="eyebrow text-accent">Offre simple. Produit visible. Execution propre.</p>
            <h1 className="display-title mt-5">
              Si vous ne voulez plus que ca arrive, prenez une paille en metal.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82">
              La paille est gratuite. Vous payez seulement les frais de livraison : 4,99 €. C'est le mecanisme exact de la video : une landing choc, une offre irresistible, un achat sans hesitation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#catalogue" className="btn-secondary">
                Obtenir ma paille gratuite <ArrowRight size={18} />
              </a>
              <a href="#mecanisme" className="btn-ghost">
                Voir le mecanisme <ChevronRight size={18} />
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["0 €", "la paille"],
                ["4,99 €", "livraison"],
                ["1 clic", "panier"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[var(--global-radius)] border border-white/14 bg-white/10 p-4 backdrop-blur-md">
                  <strong className="stat-value block text-2xl font-black">{value}</strong>
                  <span className="text-xs font-bold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative mx-auto max-w-[520px] rounded-[28px] border border-white/20 bg-white/12 p-4 shadow-2xl backdrop-blur-md">
              <div className="rounded-[20px] bg-background p-6 text-foreground">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.16em] text-accent-dark">Offre du reel</p>
                    <h2 className="mt-2 text-3xl font-black">Paille metal gratuite</h2>
                    <p className="mt-2 text-sm leading-6 text-muted">Le produit est a 0 €. La marge et le cashflow viennent de la livraison, du volume et des upsells.</p>
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-white">0 €</span>
                </div>
                <div className="mt-6 grid grid-cols-[1fr_.8fr] gap-4">
                  <div className="rounded-[var(--global-radius)] bg-surface p-3">
                    <Image src={asset("/images/products/metal-straw-kit.webp")} alt="Kit paille metal" width={500} height={500} className="aspect-square rounded-[var(--global-radius)] object-contain" />
                  </div>
                  <div className="grid gap-3">
                    {bundles.map((item) => (
                      <div key={item.title} className="rounded-[var(--global-radius)] border border-border bg-white p-3">
                        <strong className="text-sm">{item.title}</strong>
                        <p className="mt-1 text-xs leading-5 text-muted">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn-primary mt-6 w-full" onClick={() => addToCart(products[0])}>
                  Ajouter au panier <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space pattern-reeds bg-surface-alt" id="catalogue">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-end">
            <div>
              <p className="eyebrow">Catalogue optimise conversion</p>
              <h2 className="section-title mt-4">Une seule promesse : paille gratuite, livraison 4,99 €.</h2>
            </div>
            <div>
              <p className="section-lead">
                La landing ne vend pas une gamme complexe. Elle vend un geste simple : remplacer le plastique par du metal, maintenant, sans payer le produit.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {(["Tous", "Offre", "Upsell", "Preuve"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-full border px-4 py-2 text-sm font-black ${
                      filter === item ? "border-primary bg-primary text-white" : "border-border bg-white text-primary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  <Image src={asset(product.image)} alt={product.name} width={700} height={700} />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-surface-alt px-3 py-1 text-xs font-black text-primary">{product.badge}</span>
                    <span className="text-xs font-black uppercase tracking-[.12em] text-muted">{product.tag}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{product.name}</h3>
                  <p className="mt-1 font-extrabold text-terracotta">{product.subtitle}</p>
                  <p className="mt-3 min-h-12 text-sm leading-6 text-muted">{product.description}</p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <strong className="text-3xl font-black">{formatPrice(product.price)}</strong>
                        {product.oldPrice && <span className="text-sm font-bold text-muted line-through">{formatPrice(product.oldPrice)}</span>}
                      </div>
                      <p className="text-xs font-bold text-muted">+ livraison {formatPrice(product.shipping)}. {product.fcfa}</p>
                    </div>
                    <button className="btn-primary px-4" onClick={() => addToCart(product)} aria-label={`Ajouter ${product.name}`}>
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-background" id="mecanisme">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_.92fr] lg:items-center">
          <div>
            <p className="eyebrow">Positionnement reel</p>
            <h2 className="section-title mt-4">La page fait exactement trois choses.</h2>
            <p className="section-lead mt-6">
              Elle montre le probleme, enlève le prix du produit, puis fait payer une livraison acceptable. C'est simple, presque brutal, et c'est justement pour ca que ca convertit.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="card flex gap-3 p-4">
                  <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success text-white">
                    <Check size={15} />
                  </span>
                  <p className="text-sm font-bold leading-6">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <figure className="overflow-hidden rounded-[var(--global-radius)] border border-border bg-surface">
              <Image src={asset("/images/lifestyle/turtle-straw-real-bw.webp")} alt="Tortue marine avec une paille plastique" width={1600} height={900} className="h-full w-full object-cover" />
            </figure>
            <div className="grid gap-4">
              <figure className="overflow-hidden rounded-[var(--global-radius)] border border-border bg-surface">
                <Image src={asset("/images/products/metal-straw-kit.webp")} alt="Kit de pailles metal reutilisables" width={1024} height={1024} className="h-full w-full object-cover" />
              </figure>
              <figure className="overflow-hidden rounded-[var(--global-radius)] border border-border bg-surface">
                <Image src={asset("/images/products/metal-straw-kit.webp")} alt="Paille metal et brosse" width={1024} height={1024} className="h-full w-full object-cover" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-primary text-white" id="preuves">
        <div className="container-site grid gap-10 lg:grid-cols-[.86fr_1.14fr]">
          <aside className="sticky-panel">
            <p className="eyebrow text-accent">Pourquoi le mecanisme convertit</p>
            <h2 className="section-title mt-4">Ce n'est pas la paille. C'est le funnel.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
              Le produit est banal, mais l'offre est limpide. Avec du trafic payant, un hook fort et une page sans friction, meme un produit ordinaire peut faire du volume.
            </p>
            <a href="#catalogue" className="btn-secondary mt-8">
              Reprendre l'offre <ArrowRight size={18} />
            </a>
          </aside>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              { icon: Sparkles, title: "Hook emotionnel", text: "La tortue cree l'urgence morale avant meme que le produit apparaisse." },
              { icon: CreditCard, title: "Prix impossible", text: "0 € produit. Le cerveau ne compare plus avec Amazon." },
              { icon: Truck, title: "Livraison monetisee", text: "4,99 € devient le vrai prix, presente comme un frais logique." },
              { icon: Package, title: "Upsell discret", text: "Le pack foyer augmente le panier sans casser l'offre gratuite." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[var(--global-radius)] border border-white/14 bg-white/9 p-6 backdrop-blur-md">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-white/74">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-background">
        <div className="container-site">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Page faite pour vendre</p>
            <h2 className="section-title mx-auto mt-4">Le client ne doit jamais se demander quoi faire.</h2>
            <p className="section-lead mx-auto mt-6">
              La sequence est volontairement directe : choc visuel, phrase culpabilisante, offre gratuite, livraison, panier.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              { value: "1", title: "Probleme", text: "Une tortue blessee par une paille plastique. Tout le monde comprend." },
              { value: "2", title: "Solution", text: "Une paille metal reutilisable, offerte, sans long argumentaire." },
              { value: "3", title: "Paiement", text: "Le client regle 4,99 € de livraison. L'offre reste irresistible." },
            ].map((item) => (
              <article key={item.title} className="card p-7">
                <span className="text-6xl font-black text-terracotta">{item.value}</span>
                <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface-alt pattern-reeds" id="faq">
        <div className="container-site grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">FAQ anti-friction</p>
            <h2 className="section-title mt-4">Toutes les objections sont neutralisees.</h2>
          </div>
          <div className="grid gap-3">
            {[
              ["Pourquoi la paille est gratuite ?", "Parce que l'offre est construite pour enlever la friction d'achat. Le client paie uniquement la livraison."],
              ["Combien je paie vraiment ?", "4,99 € pour l'offre principale : 0 € de produit + 4,99 € de livraison."],
              ["La paille est-elle reutilisable ?", "Oui. Elle est en acier inoxydable, lavable et livree avec une brosse de nettoyage."],
              ["Est-ce un vrai checkout ?", "Non. Cette demo reproduit le mecanisme de la video, mais aucun paiement reel n'est branche."],
            ].map(([question, answer]) => (
              <details key={question} className="card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-black">
                  {question}
                  <Plus className="shrink-0 transition group-open:rotate-45" size={20} />
                </summary>
                <p className="mt-4 leading-7 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-14 text-white">
        <div className="container-site flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-accent">Offre a 0 €</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">La paille est gratuite. La livraison est a 4,99 €.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="btn-secondary" onClick={() => setDrawerOpen(true)}>
              Voir le panier <ShoppingBag size={18} />
            </button>
            <a href="mailto:contact@noplastic-straw.demo" className="btn-ghost">
              Contact <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-background py-10">
        <div className="container-site flex flex-col gap-6 border-t border-border pt-8 text-sm font-bold text-muted md:flex-row md:items-center md:justify-between">
          <Image src={asset("/brand/logo.svg")} alt="NoPlastic Straw" width={164} height={52} />
          <p>Demo e-commerce statique inspiree du reel. Paiement non connecte. Noindex actif.</p>
        </div>
      </footer>

      {drawerOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <aside className="drawer flex flex-col">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[.16em] text-accent-dark">Panier</p>
                <h2 className="text-2xl font-black">{cartCount} article{cartCount > 1 ? "s" : ""}</h2>
              </div>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white" onClick={() => setDrawerOpen(false)} aria-label="Fermer le panier">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartLines.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto text-muted" size={42} />
                    <h3 className="mt-5 text-xl font-black">Votre panier est vide</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">Ajoutez votre paille gratuite pour preparer une commande.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {cartLines.map((line) => (
                    <div key={line.product.id} className="grid grid-cols-[84px_1fr] gap-4 rounded-[var(--global-radius)] border border-border bg-white p-3">
                      <Image src={asset(line.product.image)} alt={line.product.name} width={160} height={160} className="aspect-square rounded-[var(--global-radius)] bg-surface object-contain" />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-black">{line.product.name}</h3>
                            <p className="text-xs font-bold text-muted">{line.product.subtitle}</p>
                          </div>
                          <strong>{formatPrice(line.product.price * line.quantity)}</strong>
                        </div>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white" onClick={() => updateQuantity(line.product.id, line.quantity - 1)} aria-label="Retirer un article">
                            <Minus size={15} />
                          </button>
                          <span className="min-w-7 text-center text-sm font-black">{line.quantity}</span>
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white" onClick={() => updateQuantity(line.product.id, line.quantity + 1)} aria-label="Ajouter un article">
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border bg-surface p-5">
              <div className="grid gap-2 text-sm font-bold">
                <div className="flex justify-between"><span>Produit</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Livraison</span><span>{formatPrice(delivery)}</span></div>
                <div className="mt-2 flex justify-between border-t border-border pt-3 text-xl font-black"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
              <a
                href={`mailto:commande@noplastic-straw.demo?subject=Commande%20paille%20gratuite&body=${checkoutText}`}
                target="_blank"
                rel="noreferrer"
                className={`btn-primary mt-5 w-full ${cartLines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
              >
                Simuler la commande <ArrowRight size={18} />
              </a>
              <p className="mt-3 text-center text-xs font-bold leading-5 text-muted">Checkout visuel de demo, sans paiement en ligne.</p>
            </div>
          </aside>
        </>
      )}

      <button
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 min-w-14 items-center justify-center rounded-full bg-accent px-5 font-black text-primary shadow-2xl lg:hidden"
        onClick={() => setDrawerOpen(true)}
        aria-label="Ouvrir le panier"
      >
        <ShoppingBag size={20} />
        {cartCount > 0 && <span className="ml-2">{cartCount}</span>}
      </button>
    </main>
  );
}
