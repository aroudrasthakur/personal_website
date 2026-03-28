import{j as r}from"./jsx-runtime.ClP7wGfN.js";import{r as s}from"./index.DK-fsZOb.js";import{f as c}from"./data.DUMeCS_L.js";import{m as f}from"./proxy.CnPj1haq.js";function y({items:n}){const a=s.useRef(null),[d,p]=s.useState(!1),[m,x]=s.useState(!1);function i(){const e=a.current;if(!e)return;const t=Math.round(e.scrollLeft),o=e.scrollWidth-e.clientWidth;p(t>5),x(t<o-5)}s.useEffect(()=>{const e=a.current;if(e)return i(),e.addEventListener("scroll",i,{passive:!0}),window.addEventListener("resize",i),()=>{e.removeEventListener("scroll",i),window.removeEventListener("resize",i)}},[n]);function u(){const e=a.current;if(!e)return 0;const t=e.querySelector(".exp-card-item");if(!t)return e.clientWidth;const o=getComputedStyle(e),h=parseFloat(o.gap)||24;return t.offsetWidth+h}function l(e){a.current?.scrollBy({left:e*u(),behavior:"smooth"})}return r.jsxs("div",{children:[r.jsxs("div",{style:{position:"relative"},children:[r.jsx("button",{className:"carousel-arrow carousel-arrow-prev",onClick:()=>l(-1),disabled:!d,"aria-label":"Previous experience",children:r.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("polyline",{points:"15 18 9 12 15 6"})})}),r.jsx("div",{ref:a,className:"exp-carousel",children:n.map((e,t)=>r.jsx(f.div,{className:"exp-card-item",initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{delay:t*.1,duration:.5,ease:[.23,1,.32,1]},children:r.jsxs("div",{className:"glass-card exp-card",children:[r.jsx("div",{className:"exp-card-accent"}),r.jsx("h3",{className:"exp-title",children:e.title}),r.jsx("div",{className:"exp-company",children:e.company}),r.jsxs("div",{className:"exp-date",children:[c(e.startDate)," — ",c(e.endDate)]}),r.jsx("p",{className:"exp-desc",children:e.description}),r.jsx("div",{className:"exp-tech",children:e.technologies.map(o=>r.jsx("span",{className:"tech-tag",children:o},o))})]})},e.id))}),r.jsx("button",{className:"carousel-arrow carousel-arrow-next",onClick:()=>l(1),disabled:!m,"aria-label":"Next experience",children:r.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:r.jsx("polyline",{points:"9 18 15 12 9 6"})})})]}),r.jsx("div",{style:{textAlign:"center",marginTop:"2rem"},children:r.jsx("a",{href:"/experiences",className:"outline-button",children:"View All Experiences"})}),r.jsx("style",{children:`
        .exp-carousel {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0.5rem 3rem;
          -ms-overflow-style: none;
        }
        .exp-carousel::-webkit-scrollbar { display: none; }

        .exp-card-item {
          flex: 0 0 100%;
          scroll-snap-align: start;
        }

        @media (min-width: 640px) {
          .exp-card-item { flex: 0 0 calc(50% - 0.75rem); }
        }
        @media (min-width: 1024px) {
          .exp-card-item { flex: 0 0 calc(33.333% - 1rem); }
        }

        .exp-card {
          padding: 1.75rem;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .exp-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #00ff88, #00ccff);
          border-radius: 0 2px 2px 0;
        }

        .exp-title {
          font-size: 1.15rem;
          margin-bottom: 0.4rem;
          padding-left: 0.75rem;
          color: var(--text-primary);
        }

        .exp-company {
          font-weight: 600;
          color: var(--accent);
          font-size: 0.95rem;
          margin-bottom: 0.3rem;
          padding-left: 0.75rem;
        }

        .exp-date {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          padding-left: 0.75rem;
        }

        .exp-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          padding-left: 0.75rem;
        }

        .exp-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          padding-left: 0.75rem;
        }

        /* Carousel arrows */
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
      `})]})}export{y as default};
