(() => {
  'use strict';
  const projects = window.PORTFOLIO_PROJECTS || [];
  const main = document.getElementById('main');
  const nav = document.getElementById('site-nav');
  const menu = document.querySelector('.menu-toggle');
  document.getElementById('year').textContent = String(new Date().getFullYear());

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }
  const e = escapeHTML;
  function projectCard(project, index) {
    return `<a class="project-card reveal" href="#/work/${encodeURIComponent(project.slug)}" aria-label="Explore ${e(project.title)} case study">
      <div class="card-media"><img src="${e(project.image)}" alt="${e(project.title)} project image" loading="lazy"><span class="card-index">${String(index + 1).padStart(2,'0')}</span><span class="card-arrow">↗</span></div>
      <div class="card-caption"><h3>${e(project.title)}</h3><span>${e(project.category)}</span></div></a>`;
  }
  function cardGrid(items=projects) {return `<div class="cards">${items.map((p,i)=>projectCard(p,i)).join('')}</div>`;}
  function home() {
    return `<section class="hero wrap"><div class="eyebrow"><span class="orange">//</span> PORTFOLIO / 2026 <span>OPEN FOR MEANINGFUL WORK</span></div>
      <div class="hero-body"><div><h1>DESIGN THAT<br><span class="orange">CONNECTS.</span></h1><p class="hero-lead">I’m Javal Patel. I design UI/UX for websites and digital products, with additional skills in automation and analytics.</p><div class="hero-actions"><a class="button orange-button" href="#/work">EXPLORE WORK <span>↗</span></a><a class="button ghost-button" href="https://github.com/Javal2/Projects/raw/refs/heads/main/Javal_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME ↓</a></div></div>
      <div class="hero-art" aria-label="Animated architectural graphic"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div><div class="hero-monogram">JP<span>.</span></div><small>DESIGN / SYSTEMS / FUNCTION</small></div></div>
    </section><section class="work-section wrap" id="projects"><div class="section-heading"><span>// 01 / MISSION FILES</span><h2>SELECTED <em>PROJECTS</em></h2><strong>08 RECORDS</strong></div>${cardGrid()}</section>
    <section class="statement wrap"><span>// ORIGIN STORY</span><p>Across SaaS, marketplaces, healthcare and B2B, I design digital experiences around real user needs. <em>My UI/UX workflow centers on Figma and Framer,</em> with Dribbble as design inspiration. Separately, I work with <em>n8n, marketing automation, SQL and Power BI</em> for automation and reporting.</p><div class="tagline"><span>DESIGN</span><span>WEB PROJECTS</span><span>AUTOMATION</span><span>DATA & INSIGHTS</span></div></section>`;
  }
  function work() {return `<section class="wrap page-top"><div class="eyebrow"><span class="orange">//</span> PROJECT INDEX / 08 FILES</div><h1>MISSION <span class="orange">FILES.</span></h1><p class="page-intro">Eight website and product experiences across SaaS, food marketplaces, healthcare, pharma, agriculture and B2B commerce.</p>${cardGrid()}</section>`;}
  function about() {return `<section class="wrap page-top"><div class="eyebrow"><span class="orange">//</span> ABOUT / PERSONAL FILE</div><h1>JAVAL <span class="orange">PATEL.</span></h1><div class="about-grid"><div><p class="about-lead">I design interfaces and digital journeys that help people understand products, find what they need and take action.</p><p>My portfolio includes eight projects across SaaS, marketplaces, healthcare and B2B. For design, I work with Figma and Framer and explore visual inspiration on Dribbble. My separate technical skills include n8n, marketing automation, SQL and Power BI.</p><a class="button orange-button" href="https://github.com/Javal2/Projects/raw/refs/heads/main/Javal_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME ↓</a></div><div class="skill-panels"><article><small>01 / DESIGN TOOLS</small><h3>Figma · Framer · Dribbble</h3><p>UI/UX, interface concepts and web design.</p></article><article><small>02 / AUTOMATION</small><h3>n8n · Marketing automation</h3><p>Workflow thinking and connected processes.</p></article><article><small>03 / DATA & REPORTING</small><h3>SQL · Power BI</h3><p>Information and reporting skills.</p></article></div></div></section>`;}
  function contact() {return `<section class="wrap page-top"><div class="eyebrow"><span class="orange">//</span> CONTACT / GET IN TOUCH</div><h1>LET'S <span class="orange">TALK.</span></h1><p class="page-intro">For collaborations and project enquiries, reach out through my verified live contact form or use the direct channels below.</p><div class="contact-grid"><div class="contact-links"><a href="mailto:javal.patel7281@gmail.com">EMAIL <span>javal.patel7281@gmail.com ↗</span></a><a href="tel:+919723350310">PHONE <span>+91 97233 50310 ↗</span></a><a href="https://www.linkedin.com/in/javalpatel21/" target="_blank" rel="noopener noreferrer">LINKEDIN <span>javalpatel21 ↗</span></a><a href="https://www.behance.net/javalpatel21" target="_blank" rel="noopener noreferrer">BEHANCE <span>javalpatel21 ↗</span></a></div><div class="contact-panel"><small>// WORKING INQUIRY FORM</small><h2>SEND AN ENQUIRY</h2><p>The Framer-hosted version of this portfolio has the verified enquiry form. This standalone codebase links to it instead of claiming to provide its email backend.</p><a class="button orange-button" href="https://gentle-grapefruit-887176.framer.app/contact" target="_blank" rel="noopener noreferrer">OPEN CONTACT FORM ↗</a><a class="button ghost-button" href="https://github.com/Javal2/Projects/raw/refs/heads/main/Javal_Patel_Resume.pdf" target="_blank" rel="noopener noreferrer">DOWNLOAD RESUME ↓</a></div></div></section>`;}
  function detail(project) {return `<article class="wrap detail-page"><a class="back" href="#/work">← ALL PROJECTS</a><div class="eyebrow"><span class="orange">//</span> CASE STUDY / ${e(project.year)}</div><h1>${e(project.title)}<span class="orange">.</span></h1><p class="page-intro">${e(project.summary)}</p><div class="detail-meta"><span>SECTOR / ${e(project.category)}</span><span>YEAR / ${e(project.year)}</span></div><div class="detail-image"><img src="${e(project.image)}" alt="${e(project.title)} project visual" /></div><div class="detail-columns"><div><small>// PROJECT CONTEXT</small><h2>THE EXPERIENCE</h2><p>${e(project.details)}</p></div><div><small>// PRIMARY FOCUS</small><h2>CORE JOURNEYS</h2><ul>${project.focus.map(x=>`<li>${e(x)}</li>`).join('')}</ul></div></div><div class="detail-actions"><a class="button orange-button" href="${e(project.preview)}" target="_blank" rel="noopener noreferrer">VIEW LIVE DEMO ↗</a><a class="button ghost-button" href="${e(project.source)}" target="_blank" rel="noopener noreferrer">VIEW SOURCE ↗</a></div><a class="next-case" href="#/work/${e(projects[(projects.indexOf(project)+1)%projects.length].slug)}">NEXT CASE STUDY <span>→</span></a></article>`;}
  function route() {
    const path = decodeURIComponent((location.hash || '#/').slice(1)).replace(/\/+$/, '') || '/';
    if (path === '/') main.innerHTML = home();
    else if (path === '/work') main.innerHTML = work();
    else if (path === '/about') main.innerHTML = about();
    else if (path === '/contact') main.innerHTML = contact();
    else if (path.startsWith('/work/')) {
      const slug = path.split('/')[2]; const project = projects.find(x=>x.slug===slug);
      main.innerHTML = project ? detail(project) : `<section class="wrap page-top"><h1>404 / NOT FOUND</h1><p>This project doesn't exist.</p><a class="button orange-button" href="#/work">BACK TO WORK</a></section>`;
    } else main.innerHTML = `<section class="wrap page-top"><h1>404 / NOT FOUND</h1><a href="#/">BACK HOME</a></section>`;
    document.title = (path.startsWith('/work/') && projects.find(x=>x.slug===path.split('/')[2])?.title || path==='/work' && 'Work' || path==='/about' && 'About' || path==='/contact' && 'Contact' || 'Portfolio')+' | Javal Patel';
    window.scrollTo({top:0,behavior:'instant'});
    nav.classList.remove('open'); menu.setAttribute('aria-expanded','false');
    const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}})}, {threshold:.1});
    main.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  }
  menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
  window.addEventListener('hashchange',route); route();
})();