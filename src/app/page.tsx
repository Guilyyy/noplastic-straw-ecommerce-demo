"use client";

import {
  ArrowRight,
  Check,
  Menu,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Waves,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const OFFER = {
  id: "metal-straw",
  name: "Paille metal reutilisable",
  subtitle: "Offerte aujourd'hui",
  price: 0,
  shipping: 4.99,
  oldPrice: 9.99,
  image: "/images/products/metal-straw-kit.webp",
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = quantity;
  const subtotal = OFFER.price * quantity;
  const delivery = OFFER.shipping * quantity;
  const total = subtotal + delivery;
  const checkoutText = encodeURIComponent(
    `Bonjour, je souhaite commander ${quantity} paille(s) metal NoPlastic Straw. Total estime : ${formatPrice(total)}.`,
  );

  const addToCart = () => {
    setQuantity((current) => current + 1);
    setDrawerOpen(true);
  };

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary-dark/76 text-white backdrop-blur-xl">
        <div className="container-site flex h-20 items-center justify-between gap-5">
          <a href="#accueil" aria-label="NoPlastic Straw accueil">
            <Image src={asset("/brand/logo.svg")} alt="NoPlastic Straw" width={164} height={52} priority />
          </a>

          <nav className="hidden items-center gap-7 text-sm font-extrabold text-white/84 lg:flex">
            <a href="#produit">Le produit</a>
            <a href="#pourquoi">Pourquoi</a>
            <a href="#commande">Commander</a>
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
            {[
              ["produit", "Le produit"],
              ["pourquoi", "Pourquoi"],
              ["commande", "Commander"],
              ["faq", "FAQ"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="border-b border-border py-4">
                {label}
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
            className="h-full w-full object-cover opacity-52"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(95deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.66) 45%, rgba(0,0,0,0.22) 100%)",
            }}
          />
        </div>

        <div className="container-site relative grid min-h-[calc(100vh-80px)] items-center gap-10 py-14 lg:grid-cols-[1fr_.86fr]">
          <div className="max-w-3xl">
            <p className="eyebrow text-accent">Une paille plastique peut finir dans l'ocean.</p>
            <h1 className="display-title mt-5">Passez a une paille metal reutilisable.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/84">
              Aujourd'hui, la paille est offerte. Vous payez seulement les frais de livraison : 4,99 €.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button className="btn-secondary" onClick={addToCart}>
                Obtenir ma paille gratuite <ArrowRight size={18} />
              </button>
              <a href="#produit" className="btn-ghost">
                Voir le produit
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["0 €", "paille"],
                ["4,99 €", "livraison"],
                ["inox", "lavable"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[var(--global-radius)] border border-white/14 bg-white/10 p-4 backdrop-blur-md">
                  <strong className="stat-value block text-2xl font-black">{value}</strong>
                  <span className="text-xs font-bold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[24px] border border-white/18 bg-white/12 p-4 shadow-2xl backdrop-blur-md">
            <div className="rounded-[18px] bg-background p-5 text-foreground">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.16em] text-accent-dark">Offre simple</p>
                  <h2 className="mt-2 text-3xl font-black">Paille metal gratuite</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">1 paille inox reutilisable + 1 brosse de nettoyage.</p>
                </div>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-black text-white">0 €</span>
              </div>

              <div className="mt-6 rounded-[var(--global-radius)] bg-surface p-3">
                <Image
                  src={asset(OFFER.image)}
                  alt="Kit paille metal reutilisable"
                  width={720}
                  height={720}
                  className="aspect-square rounded-[var(--global-radius)] object-contain"
                />
              </div>

              <div className="mt-5 grid gap-2 text-sm font-bold">
                <div className="flex justify-between">
                  <span>Produit</span>
                  <span>0 €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>4,99 €</span>
                </div>
              </div>

              <button className="btn-primary mt-6 w-full" onClick={addToCart}>
                Ajouter au panier <ShoppingBag size={18} />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-space bg-background" id="produit">
        <div className="container-site grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Le produit</p>
            <h2 className="section-title mt-4">Une seule paille. Une seule offre. Aucun pack complique.</h2>
            <p className="section-lead mt-6">
              Vous recevez une paille en acier inoxydable, reutilisable, lavable, avec sa brosse de nettoyage. Le produit est offert, la livraison est a 4,99 €.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Acier inoxydable", "Solide, reutilisable, simple a laver."],
                ["Brosse incluse", "Pour nettoyer l'interieur apres usage."],
                ["Format quotidien", "Pour soda, jus, cocktail ou boisson froide."],
              ].map(([title, text]) => (
                <div key={title} className="card p-5">
                  <Check className="text-success" size={22} />
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="rounded-[var(--global-radius)] border border-border bg-surface p-6">
            <Image
              src={asset(OFFER.image)}
              alt="Paille metal reutilisable avec brosse"
              width={1200}
              height={1200}
              className="aspect-square rounded-[var(--global-radius)] object-contain"
            />
          </figure>
        </div>
      </section>

      <section className="section-space pattern-reeds bg-surface-alt" id="pourquoi">
        <div className="container-site">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Pourquoi changer</p>
            <h2 className="section-title mx-auto mt-4">Une paille jetable sert quelques minutes. Le plastique, lui, reste.</h2>
            <p className="section-lead mx-auto mt-6">
              L'objectif de cette page est volontairement simple : rappeler le probleme, proposer une alternative reusable, et rendre le passage a l'action facile.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Waves, title: "Moins de jetable", text: "Remplacez une habitude plastique par un objet reutilisable." },
              { icon: ShieldCheck, title: "Simple a nettoyer", text: "La brosse fournie permet de laver la paille apres chaque utilisation." },
              { icon: Truck, title: "Offre claire", text: "La paille est a 0 €. Le total a payer est la livraison : 4,99 €." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="card p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-primary text-white" id="commande">
        <div className="container-site grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow text-accent">Commander</p>
            <h2 className="section-title mt-4">Ajoutez la paille au panier. Le total est clair : 4,99 €.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/76">
              Cette demo ne prend pas encore de paiement reel. Le panier sert a montrer exactement le parcours d'achat attendu.
            </p>
          </div>

          <div className="rounded-[var(--global-radius)] border border-white/14 bg-white/10 p-6 backdrop-blur-md">
            <div className="grid gap-5 sm:grid-cols-[160px_1fr] sm:items-center">
              <Image
                src={asset(OFFER.image)}
                alt="Paille metal gratuite"
                width={320}
                height={320}
                className="aspect-square rounded-[var(--global-radius)] bg-white/90 object-contain p-3"
              />
              <div>
                <h3 className="text-3xl font-black">Paille metal gratuite</h3>
                <p className="mt-2 text-white/74">Produit offert. Livraison 4,99 €.</p>
                <button className="btn-secondary mt-6" onClick={addToCart}>
                  Ajouter au panier <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-background" id="faq">
        <div className="container-site grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 className="section-title mt-4">Les reponses simples avant de commander.</h2>
          </div>
          <div className="grid gap-3">
            {[
              ["Combien je paie vraiment ?", "Le produit est a 0 €. Vous payez seulement 4,99 € de livraison."],
              ["Qu'est-ce qui est inclus ?", "Une paille metal reutilisable et une brosse de nettoyage."],
              ["La paille est-elle lavable ?", "Oui. Elle est reutilisable et peut etre nettoyee avec la brosse fournie."],
              ["Est-ce un vrai paiement ?", "Non. Pour le moment, c'est une demo de landing page et de panier. Le paiement reel devra etre branche avant d'acheter du trafic."],
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
            <p className="eyebrow text-accent">Offre simple</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">La paille est offerte. La livraison est a 4,99 €.</h2>
          </div>
          <button className="btn-secondary" onClick={addToCart}>
            Obtenir ma paille <ShoppingBag size={18} />
          </button>
        </div>
      </section>

      <footer className="bg-background py-10">
        <div className="container-site flex flex-col gap-6 border-t border-border pt-8 text-sm font-bold text-muted md:flex-row md:items-center md:justify-between">
          <Image src={asset("/brand/logo.svg")} alt="NoPlastic Straw" width={164} height={52} />
          <p>Demo e-commerce statique. Paiement non connecte. Noindex actif.</p>
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
              {quantity === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingBag className="mx-auto text-muted" size={42} />
                    <h3 className="mt-5 text-xl font-black">Votre panier est vide</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">Ajoutez votre paille gratuite pour preparer une commande.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-[84px_1fr] gap-4 rounded-[var(--global-radius)] border border-border bg-white p-3">
                  <Image src={asset(OFFER.image)} alt={OFFER.name} width={160} height={160} className="aspect-square rounded-[var(--global-radius)] bg-surface object-contain" />
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-black">{OFFER.name}</h3>
                        <p className="text-xs font-bold text-muted">Produit offert, livraison 4,99 €</p>
                      </div>
                      <strong>{formatPrice(subtotal)}</strong>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background p-1">
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white" onClick={() => setQuantity((current) => Math.max(0, current - 1))} aria-label="Retirer un article">
                        <Minus size={15} />
                      </button>
                      <span className="min-w-7 text-center text-sm font-black">{quantity}</span>
                      <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white" onClick={() => setQuantity((current) => current + 1)} aria-label="Ajouter un article">
                        <Plus size={15} />
                      </button>
                    </div>
                  </div>
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
                className={`btn-primary mt-5 w-full ${quantity === 0 ? "pointer-events-none opacity-50" : ""}`}
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
