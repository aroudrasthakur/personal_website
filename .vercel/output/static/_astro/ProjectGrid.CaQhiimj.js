import{j as r}from"./jsx-runtime.ClP7wGfN.js";import{m as d}from"./proxy.CnPj1haq.js";import"./index.DK-fsZOb.js";function t({items:a}){return r.jsxs("div",{className:"proj-grid stagger-grid",children:[a.map((e,o)=>r.jsxs(d.article,{className:"glass-card proj-grid-card stagger-item",initial:{opacity:0,y:25},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-40px"},transition:{delay:o*.06,duration:.5,ease:[.23,1,.32,1]},children:[r.jsx("div",{className:"proj-grid-icon-area",children:r.jsx("span",{className:"proj-grid-icon",children:e.icon})}),r.jsxs("div",{className:"proj-grid-body",children:[r.jsx("h3",{className:"proj-grid-title",children:e.title}),r.jsx("p",{className:"proj-grid-desc",children:e.description}),r.jsx("div",{className:"proj-grid-tags",children:e.tags.map(i=>r.jsx("span",{className:"tech-tag",children:i},i))}),r.jsxs("div",{className:"proj-grid-links",children:[e.github&&r.jsxs("a",{href:e.github,target:"_blank",rel:"noreferrer",className:"proj-grid-link",children:[r.jsx("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:r.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})}),"GitHub"]}),e.demo&&r.jsxs("a",{href:e.demo,target:"_blank",rel:"noreferrer",className:"proj-grid-link proj-grid-link-demo",children:[r.jsxs("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[r.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),r.jsx("polyline",{points:"15 3 21 3 21 9"}),r.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),"Demo"]})]})]})]},e.id)),r.jsx("style",{children:`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .proj-grid-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .proj-grid-icon-area {
          height: 120px;
          background: linear-gradient(135deg, var(--accent-dim), rgba(0, 204, 255, 0.06));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .proj-grid-icon { font-size: 2.8rem; }

        .proj-grid-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .proj-grid-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .proj-grid-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .proj-grid-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .proj-grid-links { display: flex; gap: 0.75rem; }

        .proj-grid-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.85rem;
          background: var(--accent-dim);
          border: 1px solid rgba(0, 255, 136, 0.2);
          color: var(--accent);
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .proj-grid-link:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }
        .proj-grid-link-demo {
          background: rgba(0, 204, 255, 0.08);
          border-color: rgba(0, 204, 255, 0.2);
          color: var(--accent-secondary);
        }
        .proj-grid-link-demo:hover {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-color: var(--accent-secondary);
        }

        @media (max-width: 768px) {
          .proj-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})}export{t as default};
