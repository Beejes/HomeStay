import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// WANT TO ADD PHOTOS, ADD YOUR PHOTOS TO src/assets/ , AND IMPORT HERE
import heroImg from './assets/kitchen_3.webp';
import kitchenImg from './assets/kitchen_4.webp';
import bedroomImg from './assets/bed_2.webp';
import scooterImg from './assets/bike.webp';

const PACKAGES = [
  { id: '1d', duration: '1 Day', tag: 'Quick Stop', npr: 1800, usd: 14, scooterNpr: 700, scooterUsd: 6, note: 'Ideal for transit travelers' },
  { id: '3d', duration: '3 Days', tag: 'Weekend', npr: 5000, usd: 38, scooterNpr: 1900, scooterUsd: 15, note: 'Save ~7% on short stays' },
  { id: '1w', duration: '1 Week', tag: 'Explorer', npr: 10500, usd: 80, scooterNpr: 4200, scooterUsd: 32, note: 'Great for city exploration' },
  { id: '2w', duration: '2 Weeks', tag: 'Popular', npr: 19500, usd: 148, scooterNpr: 7800, scooterUsd: 60, note: 'Best value for 14-day trips', featured: true },
  { id: '1m', duration: '1 Month', tag: 'Digital Nomad', npr: 34000, usd: 258, scooterNpr: 13500, scooterUsd: 102, note: 'Full monthly home living', featured: true },
  { id: '3m', duration: '3 Months', tag: 'Quarterly', npr: 93000, usd: 705, scooterNpr: 36000, scooterUsd: 275, note: 'Discounted long-stay rate' },
  { id: '6m', duration: '6 Months', tag: 'Half-Year', npr: 174000, usd: 1320, scooterNpr: 68000, scooterUsd: 515, note: 'Priority maintenance & Wi-Fi' },
  { id: '1y', duration: '1 Year', tag: 'Annual Lease', npr: 324000, usd: 2450, scooterNpr: 125000, scooterUsd: 950, note: 'Lowest per-day living cost' },
];

const ESSENTIALS = [
  { title: 'Gas Stove & Full Cylinder', desc: '2-burner gas stove with cylinder ready on arrival just buy groceries and cook.' },
  { title: 'Cookware & Utensils', desc: 'Refrigerator, mixer-grinder, pressure cooker, frying pan, pots, plates, bowls, mugs, knives, and basic spices rack.' },
  { title: '4-Seater Dining Table', desc: 'Dedicated wooden dining set so you can enjoy home-cooked meals comfortably.' },
  { title: 'Fully Furnished Bedroom', desc: 'Comfortable bed with clean orthopedic mattress, fresh linens, wardrobe, and blackout curtains.' },
  { title: 'High-Speed Fiber Wi-Fi', desc: 'Reliable internet ideal for remote work and streaming.' },
  { title: '24/7 Hot & Cold Water', desc: 'Attached private bathroom with solar geyser and washing area.' },
];

export default function App() {
  const [currency, setCurrency] = useState('NPR'); // 'NPR' | 'USD'
  const [includeScooter, setIncludeScooter] = useState(false);
  const [copiedText, setCopiedText] = useState('');
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const OWNER_PHONE = '+977-9840372703';
  const WHATSAPP_NUMBER = '9779840372703';
  const OWNER_EMAIL = 'ranivahomestay@gmail.com';

  const formatPrice = (pkg) => {
    const base = currency === 'NPR' ? pkg.npr : pkg.usd;
    const scooter = includeScooter ? (currency === 'NPR' ? pkg.scooterNpr : pkg.scooterUsd) : 0;
    const total = base + scooter;
    return currency === 'NPR' ? `रू ${total.toLocaleString()}` : `$${total.toLocaleString()}`;
  };

  const getWhatsAppLink = (pkgName = 'an apartment stay') => {
    const scooterNote = includeScooter ? ' + Scooter Rental' : '';
    const msg = encodeURIComponent(
      `Hello Raniva Homestay! I am interested in ${pkgName}${scooterNote} (${currency}). Is the apartment available?`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-content">
          <div className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src="/raniva_logo.svg" alt="Raniva Homestay Logo" className="brand-logo"/>
            <div>
              <strong>Raniva Homestay</strong>
              <small>Stay in Kathmandu</small>
            </div>
          </div>

          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#essentials" onClick={() => setMenuOpen(false)}>What's Included</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Apartment Photos</a>
            <a href="#packages" onClick={() => setMenuOpen(false)}>Packages</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Direct Contact</a>
          </nav>

          <div className="nav-actions">
            <div className="currency-toggle" role="group" aria-label="Currency Switch">
              <button
                className={currency === 'NPR' ? 'active' : ''}
                onClick={() => setCurrency('NPR')}
              >
                रू NPR
              </button>
              <button
                className={currency === 'USD' ? 'active' : ''}
                onClick={() => setCurrency('USD')}
              >
                $ USD
              </button>
            </div>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <span className="pill">No Meal Orders • Cook Your Own Food • Local & Foreign Guests</span>
            <h1>Live Like a Local. Cook Your Own Meals. Feel at Home.</h1>
            <p>
              Stay comfortably in our private, fully furnished homestay apartments in Raniban, Kathmandu. Enjoy a complete kitchen setup including a <strong>gas stove, cylinder, cookware, and dining table alongside cozy beds</strong>. Shop fresh at the nearby market, cook at your own pace, and rent a vehicle directly from the owner.
            </p>
            <div className="hero-actions">
              <a href="#packages" className="btn btn-primary">View Stay Packages</a>
              <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-outline">
                Chat on WhatsApp
              </a>
            </div>
            <div className="hero-highlights">
              <div><strong>1 Day – 1 Year</strong><span>Flexible Plans</span></div>
              <div><strong>Full Kitchen</strong><span>Gas & Utensils Ready</span></div>
              <div><strong>Vehicles Ready</strong><span>Optional Add-On</span></div>
            </div>
          </div>

          <div className="hero-media">
            <img src={heroImg} alt="Raniva Homestay Main Apartment Kitchen" className="photo-card main-photo"/>
          </div>
        </div>
      </section>

      {/* SELF-CATERING ESSENTIALS */}
      <section id="essentials" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Everything Provided by the Owner</h2>
            <p>Just bring your luggage and market groceries, as the apartment is 100% set up for independent living.</p>
          </div>
          <div className="essentials-grid">
            {ESSENTIALS.map((item, idx) => (
              <div key={idx} className="card essential-card">
                <div className="step-num">0{idx + 1}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY (SRC/ASSETS READY) */}
      <section id="gallery" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2>Inside the Apartment & Vehicles</h2>
            <p>Real spaces designed for comfort, home cooking, and easy city mobility.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
               <img src={kitchenImg} alt="Kitchen with Gas and Dining Table" /> 
              <p className="caption">Gas stove, cylinder, cookware & 4-seater dining table</p>
            </div>

            <div className="gallery-item">
              <img src={bedroomImg} alt="Furnished Bedroom" />
              <p className="caption">Clean beds, wardrobe & bright ventilation</p>
            </div>

            <div className="gallery-item">
              <img src={scooterImg} alt="Owner Scooter Rental" />
              <p className="caption">Well-maintained vehicles available directly from owner</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 STAY PACKAGES */}
      <section id="packages" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Flexible Stay Packages (1 Day to 1 Year)</h2>
            <p>Transparent rates for both local and international guests. No online payment gateway—inquire directly.</p>
          </div>

          {/* CONTROLS BAR */}
          <div className="controls-bar">
            <label className="scooter-switch">
              <input
                type="checkbox"
                checked={includeScooter}
                onChange={(e) => setIncludeScooter(e.target.checked)}
              />
              <span>Include Owner Vehicles Rental in Package Price</span>
            </label>

            <div className="currency-toggle">
              <button className={currency === 'NPR' ? 'active' : ''} onClick={() => setCurrency('NPR')}>
                Local Rate (रू NPR)
              </button>
              <button className={currency === 'USD' ? 'active' : ''} onClick={() => setCurrency('USD')}>
                Tourist Rate ($ USD)
              </button>
            </div>
          </div>

          <div className="packages-grid">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className={`card package-card ${pkg.featured ? 'featured' : ''}`}>
                <div className="pkg-top">
                  <span className="pkg-tag">{pkg.tag}</span>
                  {pkg.featured && <span className="badge-popular">Best Value</span>}
                </div>
                <h3>{pkg.duration}</h3>
                <div className="price">{formatPrice(pkg)}</div>
                <p className="pkg-note">{pkg.note}</p>
                <ul className="pkg-list">
                  <li>✓ Furnished Room & Bed</li>
                  <li>✓ Gas Stove, Cylinder & Utensils</li>
                  <li>✓ Dining Table & Wi-Fi</li>
                  <li>{includeScooter ? '✓ Scooter Included' : '• Vehicles Optional'}</li>
                </ul>
                <a
                  href={getWhatsAppLink(`${pkg.duration} Package (${formatPrice(pkg)})`)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-block"
                >
                  Ask Availability
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT OWNER CONTACT (NO BOOKING/PAYMENT GATEWAY) */}
      <section id="contact" className="section section-alt">
        <div className="container contact-box">
          <div>
            <h2>Direct Inquiry With the Owner</h2>
            <p>
              No middleman fees or complicated checkout forms. Message or call directly to check room availability, inspect the kitchen, or reserve the vehicles.
            </p>
            <div className="contact-details">
              <div className="contact-row">
                <span>Phone / WhatsApp: <strong>{OWNER_PHONE}</strong></span>
                <button className="btn-copy" onClick={() => handleCopy(OWNER_PHONE, 'phone')}>
                  {copiedText === 'phone' ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="contact-row">
                <span>Email: <strong>{OWNER_EMAIL}</strong></span>
                <button className="btn-copy" onClick={() => handleCopy(OWNER_EMAIL, 'email')}>
                  {copiedText === 'email' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          <div className="contact-cta">
            <a href={getWhatsAppLink()} target="_blank" rel="noreferrer" className="btn btn-primary btn-large">
              WhatsApp Owner Now
            </a>
            <a href={`tel:${OWNER_PHONE}`} className="btn btn-outline btn-large">
              Call Directly
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER  */}
      <footer className="footer">
        <div className="container footer-top">
          <p>© {new Date().getFullYear()} Raniva Homestay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}