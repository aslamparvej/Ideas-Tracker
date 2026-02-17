import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <h4 className="footer__brand-title">Project Tracker</h4>
          <p className="footer__brand-desc">
            Organize your ideas effortlessly with full CRUD project management.
          </p>
        </div>

        {[
          { title: "Product", links: ["Features", "Pricing", "Updates"] },
          { title: "Company", links: ["About", "Blog", "Careers"] },
          { title: "Support", links: ["Help Center", "Contact", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="footer__col-title">{col.title}</h4>
            <ul className="footer__list">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer__bottom">
        <p>&copy; 2026 Project Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
