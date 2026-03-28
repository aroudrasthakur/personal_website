import{j as e}from"./jsx-runtime.ClP7wGfN.js";import{r as s}from"./index.DK-fsZOb.js";import{m as u}from"./proxy.CnPj1haq.js";function g({items:n}){const t=s.useRef(null),[c,d]=s.useState(!1),[p,m]=s.useState(!1);function i(){const r=t.current;if(!r)return;const o=Math.round(r.scrollLeft),a=r.scrollWidth-r.clientWidth;d(o>5),m(o<a-5)}s.useEffect(()=>{const r=t.current;if(r)return i(),r.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{r.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[n]);function x(){const r=t.current;if(!r)return 0;const o=r.querySelector(".proj-card-item");if(!o)return r.clientWidth;const a=getComputedStyle(r),h=parseFloat(a.gap)||24;return o.offsetWidth+h}function l(r){t.current?.scrollBy({left:r*x(),behavior:"smooth"})}return e.jsxs("div",{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{className:"carousel-arrow carousel-arrow-prev",onClick:()=>l(-1),disabled:!c,"aria-label":"Previous project",children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})})}),e.jsx("div",{ref:t,className:"proj-carousel",children:n.map((r,o)=>e.jsx(u.div,{className:"proj-card-item",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:o*.1,duration:.5,ease:[.23,1,.32,1]},children:e.jsxs("div",{className:"glass-card proj-card",children:[e.jsx("div",{className:"proj-icon-area",children:e.jsx("span",{className:"proj-icon",children:r.icon})}),e.jsxs("div",{className:"proj-body",children:[e.jsx("h3",{className:"proj-title",children:r.title}),e.jsx("p",{className:"proj-desc",children:r.description}),e.jsx("div",{className:"proj-tags",children:r.tags.map(a=>e.jsx("span",{className:"tech-tag",children:a},a))}),e.jsxs("div",{className:"proj-links",children:[r.github&&e.jsxs("a",{href:r.github,target:"_blank",rel:"noreferrer",className:"proj-link",children:[e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})}),"GitHub"]}),r.demo&&e.jsxs("a",{href:r.demo,target:"_blank",rel:"noreferrer",className:"proj-link proj-link-demo",children:[e.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}),e.jsx("polyline",{points:"15 3 21 3 21 9"}),e.jsx("line",{x1:"10",y1:"14",x2:"21",y2:"3"})]}),"Demo"]})]})]})]})},r.id))}),e.jsx("button",{className:"carousel-arrow carousel-arrow-next",onClick:()=>l(1),disabled:!p,"aria-label":"Next project",children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),e.jsx("div",{style:{textAlign:"center",marginTop:"2rem"},children:e.jsx("a",{href:"/projects",className:"outline-button",children:"View All Projects"})}),e.jsx("style",{children:`
        .proj-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 3rem;
          -ms-overflow-style: none;
        }
        .proj-carousel::-webkit-scrollbar { display: none; }

        .proj-card-item {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }
        @media (min-width: 640px) {
          .proj-card-item { flex: 0 0 calc(50% - 0.75rem); }
        }
        @media (min-width: 1024px) {
          .proj-card-item { flex: 0 0 calc(33.333% - 1rem); }
        }

        .proj-card {
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .proj-icon-area {
          height: 140px;
          background: linear-gradient(135deg, var(--accent-dim), rgba(0, 204, 255, 0.06));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .proj-icon { font-size: 3rem; }

        .proj-body {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .proj-title {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .proj-desc {
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex: 1;
        }

        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .proj-links {
          display: flex;
          gap: 0.75rem;
        }

        .proj-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.9rem;
          background: var(--accent-dim);
          border: 1px solid rgba(0, 255, 136, 0.2);
          color: var(--accent);
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .proj-link:hover {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
        }

        .proj-link-demo {
          background: rgba(0, 204, 255, 0.08);
          border-color: rgba(0, 204, 255, 0.2);
          color: var(--accent-secondary);
        }

        .proj-link-demo:hover {
          background: var(--accent-secondary);
          color: var(--bg-primary);
          border-color: var(--accent-secondary);
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .carousel-arrow:hover:not(:disabled) {
          background: var(--accent);
          color: var(--bg-primary);
          border-color: var(--accent);
          box-shadow: 0 4px 15px var(--accent-dim);
        }
        .carousel-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .carousel-arrow-prev { left: 0; }
        .carousel-arrow-next { right: 0; }
      `})]})}export{g as default};
