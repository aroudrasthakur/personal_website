import{j as e}from"./jsx-runtime.ClP7wGfN.js";import{f as i}from"./data.DUMeCS_L.js";import{m as s}from"./proxy.CnPj1haq.js";import"./index.DK-fsZOb.js";function d({items:t}){return e.jsxs("div",{className:"exp-grid stagger-grid",children:[t.map((a,r)=>e.jsxs(s.article,{className:"glass-card exp-full-card stagger-item",initial:{opacity:0,y:25},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{delay:r*.06,duration:.5,ease:[.23,1,.32,1]},children:[e.jsx("div",{className:"exp-full-accent"}),e.jsxs("div",{className:"exp-full-content",children:[e.jsx("h3",{className:"exp-full-title",children:a.title}),e.jsx("div",{className:"exp-full-company",children:a.company}),e.jsxs("div",{className:"exp-full-date",children:[i(a.startDate)," — ",i(a.endDate)]}),e.jsx("p",{className:"exp-full-desc",children:a.description}),e.jsx("div",{className:"exp-full-tech",children:a.technologies.map(l=>e.jsx("span",{className:"tech-tag",children:l},l))})]})]},a.id)),e.jsx("style",{children:`
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.5rem;
        }

        .exp-full-card {
          position: relative;
          overflow: hidden;
          padding: 0;
          display: flex;
        }

        .exp-full-accent {
          width: 4px;
          min-height: 100%;
          background: linear-gradient(180deg, #00ff88, #00ccff);
          flex-shrink: 0;
        }

        .exp-full-content {
          padding: 1.5rem;
          flex: 1;
        }

        .exp-full-title {
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
          color: var(--text-primary);
        }

        .exp-full-company {
          font-weight: 600;
          color: var(--accent);
          font-size: 0.95rem;
          margin-bottom: 0.25rem;
        }

        .exp-full-date {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
        }

        .exp-full-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .exp-full-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}export{d as default};
