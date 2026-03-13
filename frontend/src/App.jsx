import { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import hero1 from "./assets/images/hero-1.svg";
import hero2 from "./assets/images/hero-2.svg";
import banner1 from "./assets/images/banner-1.svg";
import banner2 from "./assets/images/banner-2.svg";
import banner3 from "./assets/images/banner-1.svg";
import banner4 from "./assets/images/banner-4.svg";
import service1 from "./assets/images/service-1.svg";
import service2 from "./assets/images/service-2.svg";
import service3 from "./assets/images/service-3.svg";
import detail1 from "./assets/images/detail-1.svg";
import detail2 from "./assets/images/detail-2.svg";
import detail3 from "./assets/images/detail-3.svg";

const heroSlides = [
  {
    title: "Decouvrez comment concretiser vos projets !",
    text: "Demandez votre devis gratuit des maintenant et transformez vos idees en realite avec une equipe qui con?oit des experiences digitales modernes et credibles.",
    cta: "Demarrer mon projet",
    image: "/images/banner-user.jpg",
    fallback: hero1,
    imagePosition: "center center"
  },
  {
    title: "X-MOMO - La gestion du cursus academique",
    text: "Concu pour optimiser votre gestion academique grace a des services et fonctionnalites innovantes ainsi qu'une fiabilite de pointe.",
    cta: "Decouvrir X-MOMO",
    image: "/images/banner-4.jpg",
    fallback: hero2,
    imagePosition: "center 38%"
  }
];
const devisSlides = [
  {
    label: "devis",
    title: "Découvrez comment concrétiser vos projets !",
    text: "Demandez votre devis gratuit dès maintenant et transformez vos idées en réalité.",
    image: "/images/hero-1.jpg",
    fallback: hero1
  },
  {
    label: "devis",
    title: "X-MOMO : La gestion du cursus académique",
    text: "Conçu pour optimiser votre gestion académique grâce à des services et fonctionnalités innovantes.",
    image: "/images/hero-2.jpg",
    fallback: hero2
  }
];
const trustSignals = [
  { value: "24h", label: "Delai moyen de reponse", text: "Qualification rapide des demandes et retour clair." },
  { value: "B2B", label: "Execution orientee entreprise", text: "Solutions pensees pour PME, ecoles et institutions." },
  { value: "Cloud", label: "Infrastructure evolutive", text: "Architecture deployee, maintenable et extensible." }
];

const targetSegments = [
  {
    title: "Ecoles et universites",
    text: "Digitaliser l'administration, la communication et le suivi academique avec des outils simples a adopter."
  },
  {
    title: "PME et structures commerciales",
    text: "Structurer les operations, accelerer la facturation et centraliser les flux de travail critiques."
  },
  {
    title: "Institutions et organisations",
    text: "Deployer des plateformes robustes avec accompagnement, gouvernance et support durable."
  }
];

const bannerSlides = [
  {
    title: "L'equipe Xender-MU en action",
    image: "/images/banner-user.jpg",
    fallback: banner1
  },
  {
    title: "Nous transformons vos projets en realite",
    image: "/images/banner-1.jpg",
    fallback: banner1
  },
  {
    title: "Des solutions sur mesure pour votre croissance",
    image: "/images/banner-2.jpg",
    fallback: banner2
  },
  {
    title: "Innovation, performance et fiabilite",
    image: "/images/banner-3.jpg",
    fallback: banner3
  },
  {
    title: "Technologie et excellence operationnelle",
    image: "/images/banner-4.jpg",
    fallback: banner4
  }
];

const services = [
  {
    title: "Applications ERP pour votre gestion d'entreprise",
    description:
      "Nous concevons des logiciels adaptes aux besoins de votre entreprise; un systeme sur mesure, fiable et securise.",
    image: "/images/service-1.jpg",
    fallback: service1
  },
  {
    title: "Conception d'application mobile",
    description:
      "Apportez vos services dans la poche de vos utilisateurs grace a des applications Android/iOS performantes.",
    image: "/images/service-2.jpg",
    fallback: service2
  },
  {
    title: "Creation et hebergement site internet",
    description:
      "Des sites internet modernes pour interagir efficacement avec votre clientele et renforcer l'engagement.",
    image: "/images/service-3.jpg",
    fallback: service3
  }
];

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim().replace(/\/$/, "");
const apiUrl = (path) => `${API_BASE_URL}${path}`;

const fallbackProducts = [
  {
    slug: "rise",
    name:"X-MOMO",
    headline: "X-MOMO - Application de gestion Academique",
    tag: "Populaire",
    category: "Education",
    is_available: true,
    description:
      "Concu pour optimiser votre gestion academique grace a des services et fonctionnalites innovantes ainsi qu'une fiabilite de pointe.",
    long_description:
      "X-MOMO centralise inscriptions, planning, bulletins et suivi administratif dans une plateforme academique complete.",
    stack: "React, Node.js, PostgreSQL",
    delivery: "8 semaines",
    features: ["Gestion cursus", "Portail enseignant", "Rapports automatises", "Notifications"]
  },
  {
    slug: "rise-school",
    name: "MU-SAU SCHOOL",
    headline: "X-MOMO SCHOOL - Gestion scolaire innovante",
    tag: "Nouveau",
    category: "Education",
    is_available: true,
    description:
      "Pour une gestion scolaire innovante et une implication etroite des parents dans l'education de leurs enfants.",
    long_description:
      "X-MOMO SCHOOL renforce la communication parents-ecole, facilite le suivi pedagogique et digitalise les operations.",
    stack: "React, Express, PostgreSQL",
    delivery: "10 semaines",
    features: ["Portail parents", "Suivi eleves", "Dashboard pedagogique", "Communication proactive"]
  },
  {
    slug: "xmomo",
    name: "XMOMO",
    headline: "XMOMO - Gestion d'evenements",
    tag: "Bientot",
    category: "Evenements",
    is_available: false,
    description:
      "Simplifier la gestion de vos evenements avec des invitations numeriques et un suivi en temps reel.",
    long_description:
      "XMOMO est une solution evenementielle avec invitations numeriques et pilotage complet des participants.",
    stack: "A venir",
    delivery: "A venir",
    features: ["Invitations numeriques", "Suivi participants", "Tableau de bord live", "Rappels automatiques"]
  },
  {
    slug: "facture-sign",
    name: "FACTURE SIGN",
    headline: "FACTURE SIGN - Gestion de factures",
    tag: "Nouveau",
    category: "Facturation",
    is_available: true,
    description:
      "Generez, signez et gerez vos factures en toute conformite avec les standards de la Direction Generale des Impots.",
    long_description:
      "FACTURE SIGN automatise la facturation, la signature numerique et l'archivage securise pour votre entreprise.",
    stack: "React, API Node, PostgreSQL",
    delivery: "6 semaines",
    features: ["Signature numerique", "Conformite fiscale", "Export PDF", "Historique complet"]
  }
];

function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;
  const slug = String(raw.slug || raw.id || "").trim();
  if (!slug) return null;
  return {
    id: Number(raw.id) || 0,
    slug,
    name: raw.name || "",
    headline: raw.headline || "",
    tag: raw.tag || "Nouveau",
    category: raw.category || "",
    description: raw.description || "",
    long_description: raw.long_description || raw.longDescription || "",
    stack: raw.stack || "",
    delivery: raw.delivery || "",
    features: Array.isArray(raw.features) ? raw.features : [],
    image_url: raw.image_url || raw.imageUrl || "",
    gallery_images: Array.isArray(raw.gallery_images) ? raw.gallery_images : (Array.isArray(raw.galleryImages) ? raw.galleryImages : []),
    is_available: raw.is_available !== false && raw.isAvailable !== false,
    is_published: raw.is_published !== false && raw.isPublished !== false,
    sort_order: Number(raw.sort_order ?? raw.sortOrder ?? 0) || 0
  };
}
const detailGalleryFallback = [
  "/images/detail-1.jpg",
  "/images/detail-2.jpg",
  "/images/detail-3.jpg",
  "/images/banner-2.jpg",
  "/images/banner-3.jpg"
];

const detailGalleryBySlug = {
  rise: ["/images/detail-1.jpg", "/images/detail-2.jpg", "/images/detail-3.jpg", "/images/banner-1.jpg"],
  "rise-school": ["/images/detail-1.jpg", "/images/detail-2.jpg", "/images/detail-3.jpg", "/images/banner-user.jpg"],
  xmomo: ["/images/banner-4.jpg", "/images/banner-1.jpg", "/images/banner-2.jpg", "/images/banner-3.jpg"],
  "facture-sign": ["/images/detail-3.jpg", "/images/detail-1.jpg", "/images/detail-2.jpg", "/images/banner-2.jpg"]
};

function buildDetailGallery(product) {
  const adminMain = product?.image_url ? [product.image_url] : [];
  const adminGallery = Array.isArray(product?.gallery_images) ? product.gallery_images : [];
  const adminImages = [...new Set([...adminMain, ...adminGallery].filter(Boolean))];

  if (adminImages.length >= 4) {
    return adminImages.slice(0, 8);
  }

  const fromSlug = detailGalleryBySlug[product?.slug] || [];
  const merged = [...adminImages, ...fromSlug, ...detailGalleryFallback].filter(Boolean);
  const unique = [...new Set(merged)];
  while (unique.length < 4) {
    unique.push(detailGalleryFallback[unique.length % detailGalleryFallback.length]);
  }
  return unique.slice(0, 8);
}
const productDetailsContent = {
  rise: {
    title: "MU-SAU - Vision produit",
    intro:
      "Une plateforme academique complete pour centraliser la gestion des etudiants, des enseignants et des operations administratives.",
    outcomes: [
      "Reduction du temps de traitement des operations academiques",
      "Meilleure visibilite sur la progression des etudiants",
      "Pilotage en temps reel via tableaux de bord"
    ],
    modules: [
      "Admission et inscriptions",
      "Gestion des programmes et emplois du temps",
      "Evaluation, bulletins et releves",
      "Suivi financier et reporting"
    ],
    useCases: [
      "Universites et instituts superieurs",
      "Ecoles professionnalisantes",
      "Centres de formation continue"
    ]
  },
  "facture-sign": {
    title: "FACTURE SIGN - Vision produit",
    intro:
      "Une solution de facturation moderne pour produire, signer, archiver et suivre les factures en conformite fiscale.",
    outcomes: [
      "Automatisation des cycles de facturation",
      "Fiabilite de la conformite documentaire",
      "Suivi des paiements et relances centralises"
    ],
    modules: [
      "Generation intelligente de factures",
      "Signature numerique et validation",
      "Historique, recherche et export PDF",
      "Tableau de bord de performance"
    ],
    useCases: [
      "PME de services et commerce",
      "Cabinets comptables",
      "Equipes administratives multi-sites"
    ]
  }
};
const MUSAUSchoolFeatures = [
  {
    title: "Presence en ligne",
    text: "Consultez la fiche de presence de votre enfant."
  },
  {
    title: "Communique",
    text: "Recevez et consultez les communiques et informations envoyes par l'ecole."
  },
  {
    title: "Frais scolaire",
    text: "Un tableau recapitulant les differents frais payes et ceux restants a payer."
  },
  {
    title: "Devoirs et exercices",
    text: "Telechargement des devoirs et exercices pratiques directement depuis la plateforme."
  },
  {
    title: "Cotation numerisee",
    text: "Consultation des cotes des eleves directement via l'application."
  },
  {
    title: "Notification et SMS",
    text: "Recevez des notifications et des SMS concernant l'activite scolaire de votre enfant."
  },
  {
    title: "Tableau des cours",
    text: "Consultez l'horaire des cours et les lecons apprises chaque semaine par votre enfant."
  },
  {
    title: "Parcours scolaire",
    text: "Suivez la courbe de progression de votre enfant, consultez ses resultats et ses statistiques."
  }
];

const faqData = [
  {
    q: "Combien de temps pour livrer un projet ?",
    a: "En moyenne 4 a 10 semaines selon la complexite et vos integrations externes."
  },
  {
    q: "Le formulaire est-il connecte a PostgreSQL ?",
    a: "Oui. Toutes les demandes sont enregistrees dans la table contact_requests."
  }
];
const keyStats = [
  { value: "120+", label: "Projets livres" },
  { value: "40+", label: "Entreprises accompagnees" },
  { value: "98%", label: "Satisfaction client" },
  { value: "< 24h", label: "Reponse moyenne" }
];

const workProcess = [
  {
    step: "01",
    title: "Diagnostic",
    text: "Nous analysons votre besoin metier, vos contraintes et vos objectifs de croissance."
  },
  {
    step: "02",
    title: "Prototype",
    text: "Nous construisons une maquette claire pour valider rapidement la direction produit."
  },
  {
    step: "03",
    title: "Developpement",
    text: "L'equipe livre par iterations avec des points de suivi courts et transparents."
  },
  {
    step: "04",
    title: "Lancement & support",
    text: "Mise en ligne, monitoring, formation et support actif pour garantir la performance."
  }
];

const testimonials = [
  {
    name: "Direction Academique - Kinshasa",
    quote: "Xender-MU a digitalise notre gestion scolaire avec une vraie rigueur et un delai respecte."
  },
  {
    name: "Responsable Operations - PME",
    quote: "Le projet ERP a reduit nos erreurs manuelles et ameliore notre pilotage quotidien."
  },
  {
    name: "Fondatrice - Startup locale",
    quote: "Nous avons lance notre application mobile rapidement, avec une equipe disponible et proactive."
  }
];
function BrandIdentity() {

  return (
    <span className="brand-identity">
      <span className="brand-mark" aria-hidden="true">
        <i className="brand-ring" />
        <i className="brand-core" />
        <i className="brand-dot brand-dot-1" />
        <i className="brand-dot brand-dot-2" />
        <i className="brand-dot brand-dot-3" />
      </span>
      <span className="brand-word">Xender-MU</span>
    </span>
  );
}

function DetailBackgroundMark() {

  return (
    <div className="detail-mark" aria-hidden="true">
      <div className="detail-mark-ring" />
      <div className="detail-mark-core">
        <div className="detail-mark-orbit">
          <i className="detail-mark-dot detail-mark-dot-1" />
          <i className="detail-mark-dot detail-mark-dot-2" />
          <i className="detail-mark-dot detail-mark-dot-3" />
        </div>
        <i className="detail-mark-center" />
      </div>
    </div>
  );
}
function SiteHeader({ mobileOpen, setMobileOpen }) {


  return (
    <header className="topbar">
      <div className="container nav-row">
        <Link to="/" className="brand" aria-label="Xender-MU"><BrandIdentity /></Link>

        <nav className="desktop-menu">
          <Link to="/">Accueil</Link>
          <a href="/#services">Services</a>
          <a href="/#products">Produits</a>
          
          <a href="/#contact" className="btn btn-red">Demarrer mon projet</a>
        </nav>

        <button className={`mobile-toggle ${mobileOpen ? "open" : ""}`} onClick={() => setMobileOpen((v) => !v)} type="button" aria-label="Menu mobile">
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Accueil</Link>
        <a href="/#services" onClick={() => setMobileOpen(false)}>Services</a>
        <a href="/#products" onClick={() => setMobileOpen(false)}>Produits</a>
        <a href="/#contact" onClick={() => setMobileOpen(false)}>Demarrer mon projet</a>
      </div>
    </header>
  );
}

function HeroCarousel() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

  return () => clearInterval(timer);
  }, []);

  const hero = heroSlides[heroIndex];


  return (
    <section className="hero-section" id="accueil">
      <div className="container hero-grid">
        <div className="hero-content hero-content-premium">
          <span className="pill premium-pill">Agence digitale premium</span>
          <h1 className="hero-luxe-title">{hero.title}</h1>
          <p className="hero-luxe-copy">{hero.text}</p>
          <div className="hero-actions">
            <a className="btn btn-red" href="#contact">{hero.cta}</a>
            <a className="btn btn-ghost-light" href="#products">Voir nos solutions</a>
          </div>
          <div className="hero-proof-row">
            <div className="hero-proof-item">
              <strong>Applications web</strong>
              <span>Conception, architecture et livraison rapide</span>
            </div>
            <div className="hero-proof-item">
              <strong>Applications mobiles</strong>
              <span>Experiences fluides pour Android et iPhone</span>
            </div>
            <div className="hero-proof-item">
              <strong>Support durable</strong>
              <span>Accompagnement reel apres mise en ligne</span>
            </div>
          </div>

          <div className="dots">
            {heroSlides.map((_, idx) => (
              <button
                type="button"
                key={idx}
                className={heroIndex === idx ? "dot active" : "dot"}
                onClick={() => setHeroIndex(idx)}
                aria-label={`Hero ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-image-wrap hero-image-stage">
          <img src={hero.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = hero.fallback; }} alt={hero.title} className="hero-image" style={{ objectPosition: hero.imagePosition || "center center" }} loading="eager" decoding="async" />
          <div className="hero-floating-card hero-floating-card-main">
            <span>Experience premium</span>
            <strong>Sites, apps et plateformes qui inspirent confiance</strong>
          </div>
          <div className="hero-floating-card hero-floating-card-side">
            <strong>Architecture claire</strong>
            <p>Design, produit, support et mise en ligne dans une logique agence moderne.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerCarousel() {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % bannerSlides.length);
    }, 4300);

  return () => clearInterval(timer);
  }, []);

  const banner = bannerSlides[bannerIndex];


  return (
    <section className="banner-section">
      <div className="container banner-card banner-card-premium">
        <img src={banner.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = banner.fallback; }} alt="Banniere carousel" className="banner-image" loading="eager" decoding="async" />
        <div className="banner-layer">
          <span className="banner-kicker">Xender-MU Studio</span>
          <h3>{banner.title}</h3>
          <p>Des interfaces plus credibles, une execution plus rapide et un accompagnement oriente impact.</p>
          <div className="dots">
            {bannerSlides.map((_, idx) => (
              <button
                type="button"
                key={idx}
                className={bannerIndex === idx ? "dot active" : "dot"}
                onClick={() => setBannerIndex(idx)}
                aria-label={`Banner ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {

  return (
    <section className="trust-strip-section">
      <div className="container trust-strip-grid">
        {trustSignals.map((item) => (
          <article key={item.label} className="trust-chip">
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SegmentSection() {

  return (
    <section className="section segment-section">
      <div className="container segment-shell">
        <div className="segment-copy">
          <span className="pill">Positionnement marche</span>
          <h2>Des offres pensees pour des clients qui veulent des resultats rapides</h2>
          <p className="sub">Nous presentons une proposition claire, concrete et facile a acheter pour des structures qui veulent numeriser sans complexite inutile.</p>
        </div>
        <div className="grid cols-3 segment-grid">
          {targetSegments.map((item) => (
            <article key={item.title} className="segment-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalConversionSection() {

  return (
    <section className="section conversion-section">
      <div className="container conversion-shell">
        <div>
          <span className="pill">Partenariat & execution</span>
          <h2>Une base technique deja prete. La prochaine etape, c'est l'acceleration commerciale.</h2>
          <p>Nous aidons les organisations a lancer vite, vendre mieux et structurer leurs operations avec des plateformes modernes et credibles.</p>
        </div>
        <div className="conversion-actions">
          <a href="#contact" className="btn btn-red">Demander un devis</a>
          <Link to="/services" className="btn btn-dark">Voir nos services</Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ showAllLink = false }) {

  return (
    <section className="section" id="services">
      <div className="container">
        <h2>Services</h2>
        <p className="sub">Nous transformons vos projets en realite</p>
        <div className="grid cols-3">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <img src={service.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = service.fallback; }} alt={service.title} loading="lazy" decoding="async" />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
        {showAllLink && (
          <div className="services-more">
            <Link to="/services" className="btn btn-red">Voir la page services</Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductSection({ items = fallbackProducts, loading = false }) {

  return (
    <section className="section product-section" id="products">
      <div className="container">
        <h2>Decouvrez Nos Produits</h2>
        <p className="sub">Une gamme variee d'applications pretes a l'emploi</p>
        {loading ? <p className="sub">Chargement des produits...</p> : null}
        <div className="grid cols-4 product-grid">
          {items.map((product) => (
            <article key={product.slug} className="product-card vod-card">
              <span className="product-tag">{product.tag}</span>
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-card-image"
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <h3>{product.headline}</h3>
              <p>{product.description}</p>
              <small>{product.category}</small>
              {product.is_available ? (
                <Link to={`/details/${product.slug}`} className="text-link">Voir les details</Link>
              ) : (
                <span className="coming">Bientot disponible</span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {

  return (
    <section className="section alt why-section" id="why">
      <div className="container">
        <h2 className="why-title">Pourquoi Choisir Xender-MU ?</h2>
        <p className="sub why-sub">Nous placons le client au coeur de chaque projet pour des solutions sur mesure</p>
        <div className="grid cols-3 why-grid">
          <article className="info-card why-card">
            <span className="why-badge">AGILE</span>
            <h3>Developpement AGILE</h3>
            <p>Xender-MU axe ses developpements sur les methodes agiles pour que le client soit aussi acteur de sa propre numerisation.</p>
            <ul>
              <li>Iterations rapides</li>
              <li>Feedback continu</li>
              <li>Adaptabilite</li>
            </ul>
          </article>

          <article className="info-card why-card why-card-smart">
            <span className="why-badge">SMART</span>
            <h3>Technologie SMART</h3>
            <p>Nous developpons des solutions sur mesure qui repondent parfaitement a vos besoins specifiques.</p>
            <ul>
              <li>Specifique</li>
              <li>Mesurable</li>
              <li>Ambition</li>
              <li>Realiste</li>
              <li>Temporel</li>
            </ul>
          </article>

          <article className="info-card why-card why-card-support">
            <span className="why-badge">SUPPORT</span>
            <h3>Support Actif</h3>
            <p>Conscient de l'importance du service apres vente, notre support vous accompagne au quotidien.</p>
            <ul>
              <li>Support 6j/7</li>
              <li>Accompagnement</li>
              <li>Conseils experts</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function KeyStatsSection({ items = [] }) {

  return (
    <section className="section compact" id="stats">
      <div className="container">
        <div className="grid cols-4 stats-grid">
          {items.map((item, idx) => (
            <article key={`${item.label}-${item.value}-${idx}`} className="info-card stat-card">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {

  return (
    <section className="section" id="process">
      <div className="container">
        <h2>Notre methode de travail</h2>
        <p className="sub">Une execution rapide, claire et orientee resultats.</p>
        <div className="grid cols-4 process-home-grid">
          {workProcess.map((item) => (
            <article key={item.step} className="info-card process-home-card">
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ items = [] }) {

  return (
    <section className="section compact" id="temoignages">
      <div className="container">
        <h2>Ils nous font confiance</h2>
        <p className="sub">Des retours concrets sur nos livraisons.</p>
        <div className="grid cols-3 testimonials-grid">
          {items.map((item, idx) => (
            <article key={`${item.name}-${idx}`} className="info-card testimonial-card">
              <p>"{item.quote}"</p>
              <h4>{item.name}{item.role ? ` - ${item.role}` : ""}</h4>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      try {
        const response = await fetch(apiUrl("/api/news"));
        const data = await response.json();
        if (!cancelled) {
          setNews(Array.isArray(data.news) ? data.news : []);
        }
      } catch {
        if (!cancelled) {
          setNews([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadNews();

  return () => {
      cancelled = true;
    };
  }, []);


  return (
    <section className="section" id="news">
      <div className="container">
        <h2>Actualites Xender-MU</h2>
        <p className="sub">Restez informe de nos dernieres innovations et actualites</p>

        {loading ? (
          <article className="info-card">
            <h3>Chargement des actualites...</h3>
          </article>
        ) : news.length === 0 ? (
          <article className="info-card">
            <h3>Aucune actualite pour le moment</h3>
            <p>Revenez bientot pour decouvrir nos dernieres nouveautes.</p>
            <a href="#accueil" className="text-link">Voir toutes les actualites</a>
          </article>
        ) : (
          <div className="grid cols-3">
            {news.slice(0, 4).map((item) => (
              <article key={item.id} className="info-card">
                <img src={item.image_url || "/images/banner-user.jpg"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/hero-1.jpg"; }} alt={item.title} className="news-card-image" />
                <h3>{item.title}</h3>
                <p>{item.excerpt || item.content.slice(0, 140)}</p>
                <small className="news-date">Publie le {new Date(item.created_at).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</small>
                <Link to={`/actualites/${item.id}`} className="text-link">Voir plus</Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function useContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    serviceType: "Application Web",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, message: "Envoi en cours...", type: "info" });

    try {
      const response = await fetch(apiUrl("/api/contacts"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setStatus({
        loading: false,
        message: "Message envoye avec succes. Notre equipe vous contacte sous 24h.",
        type: "success"
      });
      setFormData({
        fullName: "",
        email: "",
        company: "",
        serviceType: "Application Web",
        message: ""
      });
    } catch (error) {
      setStatus({ loading: false, message: error.message, type: "error" });
    }
  };

  return { formData, status, handleChange, handleSubmit };
}

function ContactSection() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();


  return (
    <section className="section" id="contact">
      <div className="container contact-wrap">
        <div>
          <h2>Pret a transformer vos idees en realite ?</h2>
          <p>Chaque demande est enregistree dans XMOMO et traitee rapidement.</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="grid cols-2">
            <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nom complet" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email professionnel" required />
          </div>

          <div className="grid cols-2">
            <input name="company" value={formData.company} onChange={handleChange} placeholder="Entreprise" />
            <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
              <option>Application Web</option>
              <option>Application Mobile</option>
              <option>Site Vitrine</option>
              <option>Refonte UX/UI</option>
            </select>
          </div>

          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Decrivez votre besoin..." rows={5} required />

          <button className="btn btn-red" type="submit" disabled={status.loading}>
            {status.loading ? "Envoi..." : "Envoyer la demande"}
          </button>

          {status.message && <p className={`status ${status.type}`}>{status.message}</p>}
        </form>
      </div>
    </section>
  );
}

function SharedFooter() {

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>XENDER-MU</h4>
          <p>Votre partenaire privilegie dans la transformation numerique. Nous concevons des solutions logicielles innovantes pour propulser votre entreprise vers l'avenir.</p>
        </div>
        <div>
          <h4>Navigation</h4>
          <Link to="/">Accueil</Link>
          <a href="/#services">Services</a>
          <a href="/#products">Produits</a>
          <a href="/#news">Blog</a>
          <a href="/#contact">Contact</a>
          
        </div>
        <div>
          <h4>Adresse</h4>
          <p>Kinshasa</p>
          <p>Republique Democratique Du Congo</p>
          <h4>Telephone</h4>
          <p>+243 89 191 9192</p>
          <h4>Email</h4>
          <p>hubxender@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [statsItems, setStatsItems] = useState([]);
  const [testimonialItems, setTestimonialItems] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

  return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.add("home-voda");

  return () => document.body.classList.remove("home-voda");
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadDynamicHomeContent() {
      setProductLoading(true);
      try {
        const [statsResponse, testimonialsResponse, productsResponse] = await Promise.all([
          fetch(apiUrl("/api/stats")),
          fetch(apiUrl("/api/testimonials")),
          fetch(apiUrl("/api/products"))
        ]);

        const statsData = await statsResponse.json().catch(() => ({}));
        const testimonialsData = await testimonialsResponse.json().catch(() => ({}));
        const productsData = await productsResponse.json().catch(() => ({}));

        if (!cancelled && statsResponse.ok && Array.isArray(statsData.stats) && statsData.stats.length > 0) {
          setStatsItems(statsData.stats.map((item) => ({ value: item.value, label: item.label })));
        }

        if (!cancelled && testimonialsResponse.ok && Array.isArray(testimonialsData.testimonials) && testimonialsData.testimonials.length > 0) {
          setTestimonialItems(testimonialsData.testimonials.map((item) => ({
            name: item.name,
            role: item.role || "",
            quote: item.quote
          })));
        }

        if (!cancelled && productsResponse.ok && Array.isArray(productsData.products) && productsData.products.length > 0) {
          const normalized = productsData.products.map(normalizeProduct).filter(Boolean);
          if (normalized.length > 0) {
            setProductItems(normalized);
          }
        }
      } catch {
        // fallback: keep local defaults
      } finally {
        if (!cancelled) {
          setProductLoading(false);
        }
      }
    }

    loadDynamicHomeContent();

  return () => {
      cancelled = true;
    };
  }, []);


  return (
    <>
      <SiteHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main id="accueil" className={showIntro ? "home-main intro-active" : "home-main"}>
        {showIntro ? (
          <div className="intro-loader" aria-hidden="true">
            <div className="xender-mark intro-mark">
              <div className="xender-ring" />
              <div className="xender-core">
                <div className="tomoe-orbit">
                  <i className="tomoe tomoe-1" />
                  <i className="tomoe tomoe-2" />
                  <i className="tomoe tomoe-3" />
                </div>
                <i className="center-dot" />
              </div>
              
            </div>
          </div>
        ) : null}
        <HeroCarousel />
        <TrustStrip />
        <BannerCarousel />
        <KeyStatsSection items={statsItems} />
        <ServicesSection showAllLink />
        <SegmentSection />

        <section className="section compact">
          <div className="container cta-block">
            <h3>Pret a transformer vos idees en realite ?</h3>
            <p>Rejoignez les nombreuses entreprises qui nous font confiance.</p>
            <a href="#contact" className="btn btn-dark">Demarrer mon projet</a>
          </div>
        </section>

        <ProductSection items={productItems} loading={productLoading} />
        <WhySection />
        <ProcessSection />
        <NewsSection />
        <TestimonialsSection items={testimonialItems} />
        <FinalConversionSection />

        <section className="section" id="faq">
          <div className="container">
            <h2>Questions frequentes</h2>
            <div className="faq-list">
              {faqData.map((item, idx) => {
                const open = openFaq === idx;

  return (
                  <article key={item.q} className={open ? "faq-item open" : "faq-item"}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : idx)}>
                      <span>{item.q}</span>
                      <strong>{open ? "-" : "+"}</strong>
                    </button>
                    <p>{item.a}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <SharedFooter />
    </>
  );
}
function ServicesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    document.body.classList.add("services-voda", "home-voda");

  return () => {
      document.body.classList.remove("services-voda");
      document.body.classList.remove("home-voda");
    };
  }, []);

  return (
    <>
      <SiteHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="services-page services-page-simple">
        <section className="hero-section services-hero-simple">
          <div className="container services-hero-simple-wrap premium-services-hero">
            <span className="pill premium-pill">Services Xender-MU</span>
            <h1>Nous concevons des experiences digitales premium, utiles et vendables</h1>
            <p>
              Une page plus claire pour presenter notre valeur: architecture metier, applications mobiles et experiences web qui donnent une vraie image professionnelle.
            </p>
            <div className="services-hero-actions">
              <Link to="/#contact" className="btn btn-red">Demander un devis</Link>
              <Link to="/" className="btn btn-dark">Retour accueil</Link>
            </div>
            <div className="services-hero-metrics">
              <div><strong>UX plus premium</strong><span>interfaces modernes et lisibles</span></div>
              <div><strong>Execution rapide</strong><span>cadre agile, iterations courtes</span></div>
              <div><strong>Support durable</strong><span>maintenance et accompagnement reel</span></div>
            </div>
          </div>
        </section>

        <TrustStrip />

        <section className="section" id="services-content">
          <div className="container">
            <h2>Nos Services</h2>
            <p className="sub">3 services principaux, faciles a comprendre, a presenter et a vendre</p>

            <div className="services-page-intro">
              <div className="service-intro-card">
                <h3>Approche simple</h3>
                <p>Nous clarifions vite le besoin, la priorite business et la feuille de route de livraison.</p>
              </div>
              <div className="service-intro-card">
                <h3>Livraison concrete</h3>
                <p>Chaque service est pense pour etre deploye, maintenu et monnayable rapidement.</p>
              </div>
              <div className="service-intro-card">
                <h3>Support reel</h3>
                <p>Nous restons presents apres la mise en ligne pour stabiliser et faire evoluer la solution.</p>
              </div>
            </div>

            <div className="grid cols-3 services-simple-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <img src={service.image} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = service.fallback; }} alt={service.title} loading="lazy" decoding="async" />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section compact services-process">
          <div className="container">
            <h2>Comment nous travaillons</h2>
            <div className="grid cols-3 process-grid">
              <article className="info-card process-card">
                <h3>1. Echange</h3>
                <p>Nous clarifions votre besoin en 30 minutes.</p>
              </article>
              <article className="info-card process-card">
                <h3>2. Proposition</h3>
                <p>Vous recevez une proposition claire: delai, budget, livrables.</p>
              </article>
              <article className="info-card process-card">
                <h3>3. Livraison</h3>
                <p>Nous livrons vite avec suivi et support apres mise en ligne.</p>
              </article>
            </div>
          </div>
        </section>

        <SegmentSection />
        <FinalConversionSection />

        <section className="section compact">
          <div className="container cta-block">
            <h3>Un projet en tete ?</h3>
            <p>Obtenez une estimation gratuite et concrete pour demarrer rapidement.</p>
            <Link to="/#contact" className="btn btn-dark">Demarrer mon projet gratuit</Link>
          </div>
        </section>
      </main>

      <SharedFooter />
    </>
  );
}

function AdminLoginPage() {
  const [tokenInput, setTokenInput] = useState("");
  const token = localStorage.getItem("xmu_admin_token") || "";

  if (token) {
    return <Navigate to="/admin" replace />;
  }

  const login = (event) => {
    event.preventDefault();
    if (!tokenInput.trim()) return;
    localStorage.setItem("xmu_admin_token", tokenInput.trim());
    window.location.href = "/admin";
  };


  return (
    <main className="admin-page">
      <div className="container admin-login">
        <h1>Admin Xender-MU</h1>
        <p>Connectez-vous pour gerer les demandes et les actualites.</p>
        <form onSubmit={login} className="admin-form-card">
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Token admin"
            required
          />
          <button className="btn btn-red" type="submit">Se connecter</button>
        </form>
      </div>
    </main>
  );
}

function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("xmu_admin_token") || "");
  const [contacts, setContacts] = useState([]);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState([]);
  const [testimonialsAdmin, setTestimonialsAdmin] = useState([]);
  const [productsAdmin, setProductsAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [contactPage, setContactPage] = useState(1);
  const PAGE_SIZE = 8;

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    isPublished: true
  });

  const [editingStatId, setEditingStatId] = useState(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [dragGalleryIndex, setDragGalleryIndex] = useState(null);

  const [statForm, setStatForm] = useState({
    label: "",
    value: "",
    sortOrder: 0,
    isActive: true
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    quote: "",
    sortOrder: 0,
    isActive: true
  });

  const [productForm, setProductForm] = useState({
    slug: "",
    name: "",
    headline: "",
    tag: "Nouveau",
    category: "",
    description: "",
    longDescription: "",
    stack: "",
    delivery: "",
    featuresText: "",
    imageUrl: "",
    galleryImages: [],
    galleryLimit: 8,
    isAvailable: true,
    isPublished: true,
    sortOrder: 0
  });

  const apiRequest = async (path, options = {}) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {})
    };

    const response = await fetch(apiUrl(path), { ...options, headers });
    const raw = await response.text();
    let data = {};

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { error: raw };
      }
    }

    if (!response.ok) {
      throw new Error(data.error || `Erreur admin (${response.status}).`);
    }

    return data;
  };

  const loadAdminData = async () => {
    setLoading(true);
    setMessage("");
    try {
      const [contactData, newsData, statsData, testimonialsData, productsData] = await Promise.all([
        apiRequest("/api/admin/contacts"),
        apiRequest("/api/admin/news"),
        apiRequest("/api/admin/stats"),
        apiRequest("/api/admin/testimonials"),
        apiRequest("/api/admin/products")
      ]);
      setContacts(contactData.contacts || []);
      setNews(newsData.news || []);
      setStats(statsData.stats || []);
      setTestimonialsAdmin(testimonialsData.testimonials || []);
      setProductsAdmin((productsData.products || []).map(normalizeProduct).filter(Boolean));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAdminData();
    }
  }, [token]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(contacts.length / PAGE_SIZE));
    if (contactPage > totalPages) {
      setContactPage(totalPages);
    }
  }, [contacts, contactPage]);

  const logout = () => {
    localStorage.removeItem("xmu_admin_token");
    setToken("");
    setContacts([]);
    setNews([]);
    setStats([]);
    setTestimonialsAdmin([]);
    setProductsAdmin([]);
    setMessage("");
    setEditingId(null);
    setEditingProductId(null);
    window.location.href = "/admin/login";
  };

  const deleteContact = async (id) => {
    if (!confirm("Supprimer cette demande ?")) return;
    try {
      await apiRequest(`/api/admin/contacts/${id}`, { method: "DELETE" });
      setContacts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setEditingProductId(null);
    setForm({ title: "", excerpt: "", content: "", imageUrl: "", isPublished: true });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Veuillez selectionner une image valide.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image trop lourde. Taille max: 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setForm((prev) => ({ ...prev, imageUrl: result }));
      setMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleProductImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Veuillez selectionner une image valide.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image produit trop lourde. Taille max: 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setProductForm((prev) => ({ ...prev, imageUrl: result }));
      setMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleProductGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const limit = Number(productForm.galleryLimit) === 4 ? 4 : 8;
    const validFiles = files.filter((file) => file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024);
    const hasInvalid = validFiles.length !== files.length;

    const readAsDataUrl = (file) => new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.readAsDataURL(file);
    });

    const dataUrls = (await Promise.all(validFiles.map(readAsDataUrl))).filter(Boolean);
    if (dataUrls.length === 0) {
      if (hasInvalid) {
        setMessage("Certaines images ont ete ignorees (format invalide ou > 2MB).");
      }
      return;
    }

    setProductForm((prev) => ({
      ...prev,
      galleryImages: [...new Set([...(Array.isArray(prev.galleryImages) ? prev.galleryImages : []), ...dataUrls])].slice(0, limit)
    }));

    const currentCount = Array.isArray(productForm.galleryImages) ? productForm.galleryImages.length : 0;
    const wouldOverflow = currentCount + dataUrls.length > limit;
    if (hasInvalid || wouldOverflow) {
      setMessage(`Galerie mise a jour. Limite active: ${limit} images.`);
    } else {
      setMessage("");
    }

    event.target.value = "";
  };
  const handleGalleryLimitChange = (value) => {
    const limit = Number(value) === 4 ? 4 : 8;
    setProductForm((prev) => ({
      ...prev,
      galleryLimit: limit,
      galleryImages: (Array.isArray(prev.galleryImages) ? prev.galleryImages : []).slice(0, limit)
    }));
  };

  const reorderGalleryImages = (fromIndex, toIndex) => {
    if (!Number.isInteger(fromIndex) || !Number.isInteger(toIndex) || fromIndex === toIndex) return;
    setProductForm((prev) => {
      const list = Array.isArray(prev.galleryImages) ? [...prev.galleryImages] : [];
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
        return prev;
      }
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return { ...prev, galleryImages: list };
    });
  };
  const submitNews = async (event) => {
    event.preventDefault();
    setMessage("");

    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      imageUrl: form.imageUrl,
      isPublished: form.isPublished
    };

    try {
      if (editingId) {
        const data = await apiRequest(`/api/admin/news/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setNews((prev) => prev.map((item) => (item.id === editingId ? data.news : item)));
        setMessage("Actualite mise a jour.");
      } else {
        const data = await apiRequest("/api/admin/news", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setNews((prev) => [data.news, ...prev]);
        setMessage("Actualite ajoutee.");
      }
      resetForm();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const editNews = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      imageUrl: item.image_url || "",
      isPublished: Boolean(item.is_published)
    });
  };

  const deleteNews = async (id) => {
    if (!confirm("Supprimer cette actualite ?")) return;
    try {
      await apiRequest(`/api/admin/news/${id}`, { method: "DELETE" });
      setNews((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };
  const resetProductForm = () => {
    setEditingProductId(null);
    setProductForm({
      slug: "",
      name: "",
      headline: "",
      tag: "Nouveau",
      category: "",
      description: "",
      longDescription: "",
      stack: "",
      delivery: "",
      featuresText: "",
      imageUrl: "",
      galleryImages: [],
      galleryLimit: 8,
      isAvailable: true,
      isPublished: true,
      sortOrder: 0
    });
  };

  const editProduct = (item) => {
    setEditingProductId(item.id);
    setProductForm({
      slug: item.slug || "",
      name: item.name || "",
      headline: item.headline || "",
      tag: item.tag || "Nouveau",
      category: item.category || "",
      description: item.description || "",
      longDescription: item.long_description || "",
      stack: item.stack || "",
      delivery: item.delivery || "",
      featuresText: Array.isArray(item.features) ? item.features.join(", ") : "",
      imageUrl: item.image_url || "",
      galleryImages: Array.isArray(item.gallery_images) ? item.gallery_images : [],
      galleryLimit: Array.isArray(item.gallery_images) && item.gallery_images.length <= 4 ? 4 : 8,
      isAvailable: item.is_available !== false,
      isPublished: item.is_published !== false,
      sortOrder: Number(item.sort_order) || 0
    });
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    setMessage("");

    const features = String(productForm.featuresText || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      slug: productForm.slug.trim(),
      name: productForm.name.trim(),
      headline: productForm.headline.trim(),
      tag: productForm.tag.trim() || "Nouveau",
      category: productForm.category.trim(),
      description: productForm.description.trim(),
      longDescription: productForm.longDescription.trim(),
      stack: productForm.stack.trim(),
      delivery: productForm.delivery.trim(),
      features,
      imageUrl: productForm.imageUrl.trim(),
      galleryImages: (Array.isArray(productForm.galleryImages) ? productForm.galleryImages : []).slice(0, Number(productForm.galleryLimit) === 4 ? 4 : 8),
      isAvailable: productForm.isAvailable,
      isPublished: productForm.isPublished,
      sortOrder: Number(productForm.sortOrder) || 0
    };

    try {
      if (editingProductId) {
        const data = await apiRequest(`/api/admin/products/${editingProductId}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setProductsAdmin((prev) => prev.map((item) => (item.id === editingProductId ? normalizeProduct(data.product) : item)));
        setMessage("Produit mis a jour.");
      } else {
        const data = await apiRequest("/api/admin/products", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setProductsAdmin((prev) => [...prev, normalizeProduct(data.product)].filter(Boolean));
        setMessage("Produit ajoute.");
      }
      resetProductForm();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await apiRequest(`/api/admin/products/${id}`, { method: "DELETE" });
      setProductsAdmin((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };


  const resetStatForm = () => {
    setEditingStatId(null);
    setStatForm({ label: "", value: "", sortOrder: 0, isActive: true });
  };

  const editStat = (item) => {
    setEditingStatId(item.id);
    setStatForm({
      label: item.label || "",
      value: item.value || "",
      sortOrder: Number(item.sort_order) || 0,
      isActive: Boolean(item.is_active)
    });
  };

  const submitStat = async (event) => {
    event.preventDefault();
    setMessage("");
    const payload = {
      label: statForm.label,
      value: statForm.value,
      sortOrder: Number(statForm.sortOrder) || 0,
      isActive: statForm.isActive
    };

    try {
      if (editingStatId) {
        const data = await apiRequest(`/api/admin/stats/${editingStatId}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setStats((prev) => prev.map((item) => (item.id === editingStatId ? data.stat : item)));
        setMessage("Chiffre mis a jour.");
      } else {
        const data = await apiRequest("/api/admin/stats", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setStats((prev) => [...prev, data.stat]);
        setMessage("Chiffre ajoute.");
      }
      resetStatForm();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteStat = async (id) => {
    if (!confirm("Supprimer ce chiffre ?")) return;
    try {
      await apiRequest(`/api/admin/stats/${id}`, { method: "DELETE" });
      setStats((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({ name: "", role: "", quote: "", sortOrder: 0, isActive: true });
  };

  const editTestimonial = (item) => {
    setEditingTestimonialId(item.id);
    setTestimonialForm({
      name: item.name || "",
      role: item.role || "",
      quote: item.quote || "",
      sortOrder: Number(item.sort_order) || 0,
      isActive: Boolean(item.is_active)
    });
  };

  const submitTestimonial = async (event) => {
    event.preventDefault();
    setMessage("");
    const payload = {
      name: testimonialForm.name,
      role: testimonialForm.role,
      quote: testimonialForm.quote,
      sortOrder: Number(testimonialForm.sortOrder) || 0,
      isActive: testimonialForm.isActive
    };

    try {
      if (editingTestimonialId) {
        const data = await apiRequest(`/api/admin/testimonials/${editingTestimonialId}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
        setTestimonialsAdmin((prev) => prev.map((item) => (item.id === editingTestimonialId ? data.testimonial : item)));
        setMessage("Temoignage mis a jour.");
      } else {
        const data = await apiRequest("/api/admin/testimonials", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setTestimonialsAdmin((prev) => [...prev, data.testimonial]);
        setMessage("Temoignage ajoute.");
      }
      resetTestimonialForm();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm("Supprimer ce temoignage ?")) return;
    try {
      await apiRequest(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      setTestimonialsAdmin((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const totalPages = Math.max(1, Math.ceil(contacts.length / PAGE_SIZE));
  const start = (contactPage - 1) * PAGE_SIZE;
  const paginatedContacts = contacts.slice(start, start + PAGE_SIZE);

  const publishedNewsCount = news.filter((item) => item.is_published).length;
  const availableProductsCount = productsAdmin.filter((item) => item.is_available).length;
  const activeStatsCount = stats.filter((item) => item.is_active).length;
  const activeTestimonialsCount = testimonialsAdmin.filter((item) => item.is_active).length;


  return (
    <main className="admin-page">
      <div className="container admin-header">
        <div>
          <h1>Tableau de bord admin</h1>
          <p className="admin-header-sub">Gestion complete de la plateforme Xender-MU</p>
        </div>
        <div className="admin-actions">
          <button type="button" className="btn btn-dark" onClick={loadAdminData}>Actualiser</button>
          <button type="button" className="btn btn-red" onClick={logout}>Se deconnecter</button>
        </div>
      </div>

      <section className="container admin-kpi-grid" aria-label="Statistiques admin">
        <article className="admin-kpi-card">
          <small>Demandes</small>
          <h3>{contacts.length}</h3>
          <p>Messages clients recus</p>
        </article>
        <article className="admin-kpi-card">
          <small>Actualites publiees</small>
          <h3>{publishedNewsCount}</h3>
          <p>Total articles: {news.length}</p>
        </article>
        <article className="admin-kpi-card">
          <small>Produits disponibles</small>
          <h3>{availableProductsCount}</h3>
          <p>Total produits: {productsAdmin.length}</p>
        </article>
        <article className="admin-kpi-card">
          <small>Stats actives</small>
          <h3>{activeStatsCount}</h3>
          <p>Temoignages actifs: {activeTestimonialsCount}</p>
        </article>
      </section>

      <section className="container admin-shortcuts" aria-label="Navigation rapide admin">
        <a className="admin-shortcut" href="#admin-contacts">Demandes</a>
        <a className="admin-shortcut" href="#admin-news-create">Creer actualite</a>
        <a className="admin-shortcut" href="#admin-news-list">Liste actualites</a>
        <a className="admin-shortcut" href="#admin-products">Produits</a>
        <a className="admin-shortcut" href="#admin-stats">Stats</a>
        <a className="admin-shortcut" href="#admin-testimonials">Temoignages</a>
      </section>

      <div className="container admin-grid">
        <section id="admin-contacts" className="admin-panel">
          <h2>Demandes clients ({contacts.length})</h2>
          <p className="admin-subtitle">Liste des demandes recues avec actions rapides</p>
          {loading ? <p>Chargement...</p> : null}
          <div className="admin-list">
            {paginatedContacts.map((item) => (
              <article key={item.id} className="admin-item">
                <h3>{item.full_name}</h3>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Entreprise:</strong> {item.company || "-"}</p>
                <p><strong>Service:</strong> {item.service_type || "-"}</p>
                <p>{item.message}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
                <button type="button" className="btn btn-dark" onClick={() => deleteContact(item.id)}>Supprimer</button>
              </article>
            ))}
            {!loading && contacts.length === 0 ? <p>Aucune demande.</p> : null}
          </div>
          {contacts.length > PAGE_SIZE ? (
            <div className="admin-pagination">
              <button type="button" className="btn btn-dark" disabled={contactPage === 1} onClick={() => setContactPage((p) => Math.max(1, p - 1))}>Precedent</button>
              <span>Page {contactPage} / {totalPages}</span>
              <button type="button" className="btn btn-dark" disabled={contactPage === totalPages} onClick={() => setContactPage((p) => Math.min(totalPages, p + 1))}>Suivant</button>
            </div>
          ) : null}
        </section>

        <section id="admin-news-create" className="admin-panel">
          <h2>{editingId ? "Modifier actualite" : "Nouvelle actualite"}</h2>
          <p className="admin-subtitle">Creer ou mettre a jour une actualite</p>
          <form className="contact-form" onSubmit={submitNews}>
            <input
              id="news-title"
              name="title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Titre"
              required
            />
            <input
              id="news-excerpt"
              name="excerpt"
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Resume court"
            />
            <label className="admin-upload">
              <span>Image de l'actualite</span>
              <input id="news-image" name="image" type="file" accept="image/*" onChange={handleImageUpload} />
            </label>
            {form.imageUrl ? (
              <div className="admin-image-preview">
                <img src={form.imageUrl} alt="Apercu actualite" />
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
                >
                  Retirer l'image
                </button>
              </div>
            ) : null}
            <textarea
              id="news-content"
              name="content"
              rows={6}
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Contenu"
              required
            />
            <label className="admin-check">
              <input
                id="news-published"
                name="isPublished"
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
              />
              Publie
            </label>
            <div className="admin-actions">
              <button className="btn btn-red" type="submit">{editingId ? "Mettre a jour" : "Publier"}</button>
              {editingId ? (
                <button type="button" className="btn btn-dark" onClick={resetForm}>Annuler</button>
              ) : null}
            </div>
          </form>
        </section>
      </div>

      <section id="admin-news-list" className="container admin-panel admin-news-list">
        <h2>Actualites ({news.length})</h2>
        <p className="admin-subtitle">Liste complete, modification et suppression</p>
        <div className="admin-list">
          {news.map((item) => (
            <article key={item.id} className="admin-item">
              <h3>{item.title}</h3>
              {item.image_url ? <img src={item.image_url} alt={item.title} className="admin-news-thumb" /> : null}
              <p>{item.excerpt || item.content.slice(0, 180)}</p>
              <small>{item.is_published ? "Publie" : "Brouillon"} - {new Date(item.created_at).toLocaleDateString()}</small>
              <div className="admin-actions">
                <button type="button" className="btn btn-dark" onClick={() => editNews(item)}>Modifier</button>
                <button type="button" className="btn btn-red" onClick={() => deleteNews(item.id)}>Supprimer</button>
              </div>
            </article>
          ))}
          {news.length === 0 ? <p>Aucune actualite.</p> : null}
        </div>
      </section>
      <section id="admin-products" className="container admin-panel admin-news-list">
        <h2>{editingProductId ? "Modifier produit" : "Nouveau produit"}</h2>
        <p className="admin-subtitle">Partie creation/modification produit</p>
        <form className="contact-form" onSubmit={submitProduct}>
          <div className="grid cols-2">
            <input
              id="product-slug"
              name="slug"
              value={productForm.slug}
              onChange={(e) => setProductForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="Slug (ex: mu-sau)"
              required
            />
            <input
              id="product-name"
              name="name"
              value={productForm.name}
              onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nom"
              required
            />
          </div>
          <input
            id="product-headline"
            name="headline"
            value={productForm.headline}
            onChange={(e) => setProductForm((prev) => ({ ...prev, headline: e.target.value }))}
            placeholder="Titre complet"
            required
          />
          <div className="grid cols-2">
            <input
              id="product-tag"
              name="tag"
              value={productForm.tag}
              onChange={(e) => setProductForm((prev) => ({ ...prev, tag: e.target.value }))}
              placeholder="Tag (Populaire, Nouveau...)"
            />
            <input
              id="product-category"
              name="category"
              value={productForm.category}
              onChange={(e) => setProductForm((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Categorie"
              required
            />
          </div>
          <textarea
            id="product-description"
            name="description"
            rows={3}
            value={productForm.description}
            onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description courte"
            required
          />
          <textarea
            id="product-long-description"
            name="longDescription"
            rows={4}
            value={productForm.longDescription}
            onChange={(e) => setProductForm((prev) => ({ ...prev, longDescription: e.target.value }))}
            placeholder="Description detail"
          />
          <div className="grid cols-2">
            <input
              id="product-stack"
              name="stack"
              value={productForm.stack}
              onChange={(e) => setProductForm((prev) => ({ ...prev, stack: e.target.value }))}
              placeholder="Stack"
            />
            <input
              id="product-delivery"
              name="delivery"
              value={productForm.delivery}
              onChange={(e) => setProductForm((prev) => ({ ...prev, delivery: e.target.value }))}
              placeholder="Delai"
            />
          </div>
          <input
            id="product-features"
            name="featuresText"
            value={productForm.featuresText}
            onChange={(e) => setProductForm((prev) => ({ ...prev, featuresText: e.target.value }))}
            placeholder="Fonctionnalites (separees par des virgules)"
          />
          <label className="admin-upload">
            <span>Image miniature produit (Parcourir)</span>
            <input id="product-image" name="imageUrl" type="file" accept="image/*" onChange={handleProductImageUpload} />
          </label>
          {productForm.imageUrl ? (
            <div className="admin-image-preview">
              <img src={productForm.imageUrl} alt="Apercu miniature produit" />
              <button
                type="button"
                className="btn btn-dark"
                onClick={() => setProductForm((prev) => ({ ...prev, imageUrl: "" }))}
              >
                Retirer la miniature
              </button>
            </div>
          ) : null}

          <label className="admin-upload">
            <span>Galerie detail produit (glisser/deposer)</span>
            <input id="product-gallery" name="galleryImages" type="file" accept="image/*" multiple onChange={handleProductGalleryUpload} />
            <div className="admin-gallery-config">
              <label htmlFor="product-gallery-limit">Limite images</label>
              <select id="product-gallery-limit" name="galleryLimit" value={productForm.galleryLimit} onChange={(e) => handleGalleryLimitChange(e.target.value)}>
                <option value={4}>4 images</option>
                <option value={8}>8 images</option>
              </select>
              <small>Glisse une miniature pour changer l'ordre.</small>
            </div>
          </label>
          {Array.isArray(productForm.galleryImages) && productForm.galleryImages.length > 0 ? (
            <div className="admin-image-preview">
              <div className="admin-gallery-grid">
                {productForm.galleryImages.map((img, idx) => (
                  <div
                    key={`${img}-${idx}`}
                    className="admin-gallery-item"
                    draggable
                    onDragStart={() => setDragGalleryIndex(idx)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragGalleryIndex !== null) {
                        reorderGalleryImages(dragGalleryIndex, idx);
                        setDragGalleryIndex(null);
                      }
                    }}
                    onDragEnd={() => setDragGalleryIndex(null)}
                  >
                    <img src={img} alt={`Galerie produit ${idx + 1}`} />
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => setProductForm((prev) => ({
                        ...prev,
                        galleryImages: (prev.galleryImages || []).filter((_, i) => i !== idx)
                      }))}
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className="grid cols-3">
            <input
              id="product-sort-order"
              name="sortOrder"
              type="number"
              value={productForm.sortOrder}
              onChange={(e) => setProductForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
              placeholder="Ordre"
            />
            <label className="admin-check">
              <input
                id="product-available"
                name="isAvailable"
                type="checkbox"
                checked={productForm.isAvailable}
                onChange={(e) => setProductForm((prev) => ({ ...prev, isAvailable: e.target.checked }))}
              />
              Disponible
            </label>
            <label className="admin-check">
              <input
                id="product-published"
                name="isPublished"
                type="checkbox"
                checked={productForm.isPublished}
                onChange={(e) => setProductForm((prev) => ({ ...prev, isPublished: e.target.checked }))}
              />
              Publie
            </label>
          </div>
          <div className="admin-actions">
            <button className="btn btn-red" type="submit">{editingProductId ? "Mettre a jour" : "Ajouter"}</button>
            {editingProductId ? <button type="button" className="btn btn-dark" onClick={resetProductForm}>Annuler</button> : null}
          </div>
        </form>

        <div className="admin-list-head">
          <h3 className="admin-subsection-title">Liste des produits ({productsAdmin.length})</h3>
          <p className="admin-list-hint">Choisir un produit pour modifier ou supprimer.</p>
        </div>
        <div className="admin-list admin-list-products">
          {productsAdmin.map((item) => (
            <article key={item.id || item.slug} className="admin-item">
              <h3>{item.headline}</h3>
              {item.image_url ? <img src={item.image_url} alt={item.name} className="admin-news-thumb" /> : null}
              <small>
                /details/{item.slug} - {item.is_available ? "Disponible" : "Bientot"} - {item.is_published ? "Publie" : "Brouillon"} - Galerie: {(item.gallery_images || []).length} images
              </small>
              <p>{item.description}</p>
              <div className="admin-actions">
                <button type="button" className="btn btn-dark" onClick={() => editProduct(item)}>Modifier</button>
                <button type="button" className="btn btn-red" onClick={() => deleteProduct(item.id)}>Supprimer</button>
              </div>
            </article>
          ))}
          {productsAdmin.length === 0 ? <p>Aucun produit.</p> : null}
        </div>
      </section>


      <section id="admin-stats" className="container admin-panel admin-news-list">
        <h2>{editingStatId ? "Modifier chiffre cle" : "Nouveau chiffre cle"}</h2>
        <p className="admin-subtitle">Creation / edition des indicateurs</p>
        <form className="contact-form" onSubmit={submitStat}>
          <div className="grid cols-2">
            <input
              id="stat-label"
              name="label"
              value={statForm.label}
              onChange={(e) => setStatForm((prev) => ({ ...prev, label: e.target.value }))}
              placeholder="Label (ex: Projets livres)"
              required
            />
            <input
              id="stat-value"
              name="value"
              value={statForm.value}
              onChange={(e) => setStatForm((prev) => ({ ...prev, value: e.target.value }))}
              placeholder="Valeur (ex: 120+)"
              required
            />
          </div>
          <div className="grid cols-2">
            <input
              id="stat-sort-order"
              name="sortOrder"
              type="number"
              value={statForm.sortOrder}
              onChange={(e) => setStatForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
              placeholder="Ordre"
            />
            <label className="admin-check">
              <input
                id="stat-active"
                name="isActive"
                type="checkbox"
                checked={statForm.isActive}
                onChange={(e) => setStatForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              Actif
            </label>
          </div>
          <div className="admin-actions">
            <button className="btn btn-red" type="submit">{editingStatId ? "Mettre a jour" : "Ajouter"}</button>
            {editingStatId ? <button type="button" className="btn btn-dark" onClick={resetStatForm}>Annuler</button> : null}
          </div>
        </form>
        <div className="admin-list">
          {stats.map((item) => (
            <article key={item.id} className="admin-item">
              <h3>{item.value} - {item.label}</h3>
              <small>Ordre: {item.sort_order} - {item.is_active ? "Actif" : "Inactif"}</small>
              <div className="admin-actions">
                <button type="button" className="btn btn-dark" onClick={() => editStat(item)}>Modifier</button>
                <button type="button" className="btn btn-red" onClick={() => deleteStat(item.id)}>Supprimer</button>
              </div>
            </article>
          ))}
          {stats.length === 0 ? <p>Aucun chiffre cle.</p> : null}
        </div>
      </section>

      <section id="admin-testimonials" className="container admin-panel admin-news-list">
        <h2>{editingTestimonialId ? "Modifier temoignage" : "Nouveau temoignage"}</h2>
        <p className="admin-subtitle">Creation / edition des temoignages</p>
        <form className="contact-form" onSubmit={submitTestimonial}>
          <div className="grid cols-2">
            <input
              id="testimonial-name"
              name="name"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nom / entreprise"
              required
            />
            <input
              id="testimonial-role"
              name="role"
              value={testimonialForm.role}
              onChange={(e) => setTestimonialForm((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="Role (optionnel)"
            />
          </div>
          <textarea
            id="testimonial-quote"
            name="quote"
            rows={4}
            value={testimonialForm.quote}
            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, quote: e.target.value }))}
            placeholder="Citation"
            required
          />
          <div className="grid cols-2">
            <input
              id="testimonial-sort-order"
              name="sortOrder"
              type="number"
              value={testimonialForm.sortOrder}
              onChange={(e) => setTestimonialForm((prev) => ({ ...prev, sortOrder: e.target.value }))}
              placeholder="Ordre"
            />
            <label className="admin-check">
              <input
                id="testimonial-active"
                name="isActive"
                type="checkbox"
                checked={testimonialForm.isActive}
                onChange={(e) => setTestimonialForm((prev) => ({ ...prev, isActive: e.target.checked }))}
              />
              Actif
            </label>
          </div>
          <div className="admin-actions">
            <button className="btn btn-red" type="submit">{editingTestimonialId ? "Mettre a jour" : "Ajouter"}</button>
            {editingTestimonialId ? <button type="button" className="btn btn-dark" onClick={resetTestimonialForm}>Annuler</button> : null}
          </div>
        </form>
        <div className="admin-list">
          {testimonialsAdmin.map((item) => (
            <article key={item.id} className="admin-item">
              <h3>{item.name}{item.role ? ` - ${item.role}` : ""}</h3>
              <p>{item.quote}</p>
              <small>Ordre: {item.sort_order} - {item.is_active ? "Actif" : "Inactif"}</small>
              <div className="admin-actions">
                <button type="button" className="btn btn-dark" onClick={() => editTestimonial(item)}>Modifier</button>
                <button type="button" className="btn btn-red" onClick={() => deleteTestimonial(item.id)}>Supprimer</button>
              </div>
            </article>
          ))}
          {testimonialsAdmin.length === 0 ? <p>Aucun temoignage.</p> : null}
        </div>
      </section>

      {message ? <p className="container status info">{message}</p> : null}
    </main>
  );
}

function NewsDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDetail() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(apiUrl(`/api/news/${id}`));
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Actualite introuvable.");
        }

        if (!cancelled) {
          setItem(data.news || null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Erreur serveur.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDetail();

  return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {

  return (
      <main className="detail-page">
        <div className="container detail-layout">
          <p>Chargement de l'actualite...</p>
        </div>
      </main>
    );
  }

  if (error || !item) {

  return (
      <main className="detail-page">
        <div className="container detail-layout">
          <h1>Actualite introuvable</h1>
          <p>{error || "Cette actualite n'existe pas."}</p>
          <Link to="/#news" className="btn btn-red">Retour aux actualites</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <header className="topbar">
        <div className="container nav-row">
          <Link to="/" className="brand" aria-label="Xender-MU"><BrandIdentity /></Link>
          <Link to="/#news" className="btn btn-red">Retour aux actualites</Link>
        </div>
      </header>

      <div className="container detail-layout">
        <article className="detail-hero news-detail-card">
          <img src={item.image_url || "/images/banner-user.jpg"} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/hero-1.jpg"; }} alt={item.title} className="news-detail-image" />
          <h1>{item.title}</h1>
          <p><strong>Date:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
          {item.excerpt ? <p className="sub">{item.excerpt}</p> : null}
          <p className="news-detail-content">{item.content}</p>
        </article>
      </div>
    </main>
  );
}

function ProductMediaGallery({ images = [], title = "Produit" }) {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [title, safeImages.join("|")]);

  if (safeImages.length === 0) {
    return null;
  }

  const activeImage = safeImages[Math.min(activeIndex, safeImages.length - 1)] || safeImages[0];


  return (
    <div className="detail-media-gallery">
      <div className="detail-media-main-wrap">
        <img
          src={activeImage}
          alt={`${title} image principale`}
          className="detail-media-main"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/hero-1.jpg";
          }}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="detail-media-thumbs" aria-label="Miniatures produit">
        {safeImages.slice(0, 5).map((image, index) => (
          <button
            type="button"
            key={`${image}-${index}`}
            className={activeIndex === index ? "detail-thumb active" : "detail-thumb"}
            onClick={() => setActiveIndex(index)}
            aria-label={`Voir image ${index + 1}`}
          >
            <img
              src={image}
              alt={`${title} miniature ${index + 1}`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/images/hero-1.jpg";
              }}
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
function DetailPage() {
  const { id } = useParams();
  const slug = id === "kosmos" ? "xmomo" : id;
  const fallbackProduct = fallbackProducts.find((item) => item.slug === slug) || null;
  const [remoteProduct, setRemoteProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const product = remoteProduct || fallbackProduct;
  const galleryImages = buildDetailGallery(product);

  useEffect(() => {
    document.body.classList.add("detail-voda");

  return () => document.body.classList.remove("detail-voda");
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(apiUrl(`/api/products/${slug}`));
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || "Produit introuvable.");
        }

        if (!cancelled) {
          setRemoteProduct(normalizeProduct(data.product));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Erreur serveur.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

  return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading && !product) {

  return (
      <main className="detail-page">
        <DetailBackgroundMark />
        <div className="container detail-layout">
          <p>Chargement du produit...</p>
        </div>
      </main>
    );
  }

  if (!product) {

  return (
      <main className="detail-page">
        <DetailBackgroundMark />
        <div className="container detail-layout">
          <h1>Produit introuvable</h1>
          <p>{error || "Le produit demande n'existe pas."}</p>
          <Link to="/" className="btn btn-red">Retour a l'accueil</Link>
        </div>
      </main>
    );
  }

  if (product.slug === "rise-school") {

  return (
      <main className="detail-page">
        <DetailBackgroundMark />
        <header className="topbar">
          <div className="container nav-row">
            <Link to="/" className="brand" aria-label="Xender-MU"><BrandIdentity /></Link>
            <Link to="/#contact" className="btn btn-red">Demarrer mon projet</Link>
          </div>
        </header>

        <div className="container detail-layout">
          <Link to="/" className="text-link">Retour aux produits</Link>

          <section className="detail-hero rise-school-hero">
            <div className="rise-school-intro">
              <span className="product-tag">{product.tag || "Nouveau"}</span>
              <h1>MU-SAU SCHOOL : Application scolaire de suivi parental</h1>
              <p>Pour une implication etroite des parents dans l'education de leurs enfants.</p>
              <a href="/#contact" className="btn btn-red">demo</a>
            </div>
            <img src="/images/detail-1.jpg" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = detail1; }} alt="MU-SAU SCHOOL mobile app" className="rise-school-main-image" loading="lazy" decoding="async" />
          </section>

          <section className="detail-features">
            <h2>Galerie MU-SAU SCHOOL</h2>
            <p className="sub">4 images minimum + miniatures pour presenter le produit comme un site corporate moderne.</p>
            <ProductMediaGallery images={galleryImages} title={product.name} />
          </section>

          <section className="detail-features">
            <h2>S'impliquer etroitement dans la scolarite de ses enfants</h2>
            <p className="sub">
              MU-SAU SCHOOL dispose de plusieurs fonctionnalites permettant aux tuteurs de suivre de maniere reguliere et precise le parcours scolaire de leurs enfants.
            </p>
            <div className="grid cols-2">
              {MUSAUSchoolFeatures.map((feature) => (
                <article key={feature.title} className="info-card">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="detail-features app-showcase">
            <h2>Un systeme leger et evolutif</h2>
            <p className="sub">
              L'application multiplatforme vous suit partout. Vous gardez a portee de main toutes les informations scolaires de vos enfants de maniere securisee, en tout lieux et a tout moment.
            </p>
            <div className="showcase-grid">
              <div className="showcase-phone">
                <img src="/images/detail-2.jpg" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = detail2; }} alt="Application MU-SAU SCHOOL" loading="lazy" decoding="async" />
              </div>
              <div className="showcase-content">
                <h3>Interface riche d'informations et simple d'utilisation</h3>
                <p>Acces rapide et facile a l'application que vous soyez sur smartphone Android, iPhone, tablette ou PC.</p>
                <div className="store-row">
                  <a href="/#contact" className="store-btn">Download on the Play Store</a>
                  <a href="/#contact" className="store-btn">Download on the App Store</a>
                </div>
              </div>
            </div>
          </section>

          <section className="detail-features">
            <h2>Interface administrateur complete</h2>
            <p className="sub">
              Une interface d'administration facilitant aux administrateurs et enseignants la saisie et l'enregistrement des informations.
            </p>
            <div className="grid cols-3">
              <article className="info-card">
                <h3>Administration simple</h3>
                <p>Acces rapide et gestion intuitive des donnees scolaires.</p>
              </article>
              <article className="info-card">
                <h3>Saisie organisee</h3>
                <p>Flux de saisie structure pour les enseignants et gestionnaires.</p>
              </article>
              <article className="info-card">
                <h3>Suivi centralise</h3>
                <p>Tableaux de bord pour piloter l'ensemble de l'activite scolaire.</p>
              </article>
            </div>
            <div className="admin-panel-preview">
              <img src="/images/detail-3.jpg" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = detail3; }} alt="Interface administrateur" loading="lazy" decoding="async" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (product.slug === "facture-sign") {

  return (
      <main className="detail-page facture-sign-page">
        <DetailBackgroundMark />
        <header className="topbar">
          <div className="container nav-row">
            <Link to="/" className="brand" aria-label="Xender-MU"><BrandIdentity /></Link>
            <Link to="/#contact" className="btn btn-red">Demarrer mon projet</Link>
          </div>
        </header>

        <div className="container detail-layout">
          <Link to="/" className="text-link">Retour aux produits</Link>

          <section className="detail-hero facture-hero">
            <div>
              <span className="product-tag">Conforme DGI</span>
              <h1>Facture Sign : Solution de Facturation 100% Normee DGI</h1>
              <p>Generez, signez et gerez vos factures en toute conformite avec les standards de la Direction Generale des Impots.</p>
              <p className="sub">Conforme aux normes DGI en vigueur</p>
            </div>
            <div className="facture-hero-logo" aria-hidden="true">
              <div className="facture-hero-logo-ring" />
              <div className="facture-hero-logo-core">
                <div className="facture-hero-logo-orbit">
                  <i className="facture-hero-logo-dot facture-hero-logo-dot-1" />
                  <i className="facture-hero-logo-dot facture-hero-logo-dot-2" />
                  <i className="facture-hero-logo-dot facture-hero-logo-dot-3" />
                </div>
                <i className="facture-hero-logo-center" />
              </div>
            </div>
          </section>

          <section className="detail-features">
            <h2>Galerie Facture Sign</h2>
            <p className="sub">Presentation visuelle premium: image principale + miniatures cliquables.</p>
            <ProductMediaGallery images={galleryImages} title={product.name} />
          </section>

          <section className="detail-features">
            <h2>Conformite DGI Garantie</h2>
            <p className="sub">Facture Sign respecte scrupuleusement les standards de facturation electronique definis par la Direction Generale des Impots pour une gestion financiere en toute serenite.</p>
            <div className="grid cols-2">
              <article className="info-card"><h3>Format standardise DGI</h3><p>Champs obligatoires pre-configures et structure conforme.</p></article>
              <article className="info-card"><h3>Numerotation sequentielle</h3><p>Mentions legales integrees automatiquement.</p></article>
              <article className="info-card"><h3>Archivage securise 10 ans</h3><p>Conservation fiable de vos documents fiscaux.</p></article>
              <article className="info-card"><h3>Mises a jour reglementaires</h3><p>Vos factures restent toujours conformes.</p></article>
            </div>
          </section>

          <section className="detail-features">
            <h2>Une Solution Complete de Facturation</h2>
            <p className="sub">Decouvrez toutes les fonctionnalites concues pour simplifier votre gestion financiere.</p>
            <div className="grid cols-3">
              <article className="info-card"><h3>Facturation Normee</h3><p>Creez des factures conformes DGI avec modeles personnalisables.</p></article>
              <article className="info-card"><h3>Signature Electronique</h3><p>Signez vos documents en ligne de maniere securisee et valide.</p></article>
              <article className="info-card"><h3>Design Personnalisable</h3><p>Adaptez logo, couleurs et mise en page de vos factures.</p></article>
              <article className="info-card"><h3>Mode Cloud Collaboratif</h3><p>Travail en equipe avec acces multi-utilisateurs securise.</p></article>
              <article className="info-card"><h3>Analytiques Avancees</h3><p>Tableaux de bord clairs pour piloter vos performances.</p></article>
              <article className="info-card"><h3>Application Mobile</h3><p>Gerez vos factures depuis smartphone, partout.</p></article>
            </div>
          </section>

          <section className="detail-features">
            <h2>Decouvrez l'Interface Facture Sign</h2>
            <div className="grid cols-2">
              <article className="info-card"><h3>Personnalisation Avancee</h3><p>Adaptez vos factures a votre image de marque.</p></article>
              <article className="info-card"><h3>Rapports detailles</h3><p>Suivez vos performances avec des graphiques clairs.</p></article>
            </div>
            <div className="facture-mini-kpis">
              <span>Rapide: factures en moins de 2 minutes</span>
              <span>Securise: donnees cryptees et sauvegardees</span>
              <span>Mobile: accessible sur tous vos appareils</span>
              <span>Support: assistance technique dediee</span>
            </div>
          </section>

          <section className="detail-features">
            <h2>Deux Modes d'Utilisation Adaptes a Vos Besoins</h2>
            <div className="grid cols-2">
              <article className="info-card">
                <h3>Mode Solo</h3>
                <p>Parfait pour les freelances et petites entreprises.</p>
                <ul>
                  <li>Utilisation individuelle</li>
                  <li>Installation locale</li>
                  <li>Donnees stockees en local</li>
                  <li>Pas d'abonnement mensuel</li>
                </ul>
              </article>
              <article className="info-card">
                <h3>Mode Cloud Collaboratif</h3>
                <p>Ideal pour les equipes et entreprises.</p>
                <ul>
                  <li>Acces multi-utilisateurs</li>
                  <li>Acces depuis n'importe ou</li>
                  <li>Sauvegarde automatique</li>
                  <li>Mises a jour automatiques</li>
                </ul>
              </article>
            </div>
          </section>

          <section className="detail-features facture-cta">
            <h2>Pret a Optimiser Votre Facturation ?</h2>
            <p className="sub">Rejoignez des centaines d'entreprises qui utilisent deja Facture Sign en toute conformite DGI.</p>
            <p className="sub">Aucune carte de credit requise • Annulation a tout moment</p>
            <Link to="/#contact" className="btn btn-red">Demarrer maintenant</Link>
          </section>
        </div>
      </main>
    );
  }


  return (
    <main className="detail-page">
      <DetailBackgroundMark />
      <header className="topbar">
        <div className="container nav-row">
          <Link to="/" className="brand" aria-label="Xender-MU"><BrandIdentity /></Link>
          <Link to="/#contact" className="btn btn-red">Demarrer mon projet</Link>
        </div>
      </header>

      <div className="container detail-layout">
        <Link to="/" className="text-link">Retour aux produits</Link>

        <section className="detail-hero">
          <div>
            <span className="product-tag">{product.tag}</span>
            <h1>{product.name}</h1>
            <p>{product.long_description || product.description}</p>
            <p><strong>Categorie:</strong> {product.category}</p>
            <p><strong>Stack:</strong> {product.stack}</p>
            <p><strong>Delai:</strong> {product.delivery}</p>
          </div>
        </section>

        <section className="detail-features">
          <h2>Galerie Produit</h2>
          <p className="sub">4 images minimum et miniatures pour une presentation claire et moderne.</p>
          <ProductMediaGallery images={galleryImages} title={product.name} />
        </section>

        <section className="detail-features">
          <h2>Fonctionnalites</h2>
          <div className="grid cols-2">
            {(product.features || []).map((feature) => (
              <article key={feature} className="info-card">
                <h3>{feature}</h3>
                <p>Implementation professionnelle selon vos besoins metier.</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
export default function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/actualites/:id" element={<NewsDetailPage />} />
      <Route path="/details/:id" element={<DetailPage />} />
    </Routes>
  );
}










































































































































