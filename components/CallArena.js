import { useEffect, useRef, useState } from 'react';

/*
  CallArena
  - Starts unfrozen (isFleeingEnabled = true).
  - Clicking the Call Me button when the game is running: PAUSES the game, FREEZES the button (keeps it where it was)
    and immediately opens the contact popup so information is accessible.
  - While frozen the button keeps the .frozen class (visual frosting), pointer/keyboard/touch won't move it.
    The button still accepts clicks to open the popup.
  - The separate Pause/Resume control (toggle) mirrors the paused state and can resume the game.
  - When resumed the .frozen class is removed and normal fleeing resumes when the pointer moves inside the arena.
*/

export default function CallArena() {
  const arenaRef = useRef(null);
  const btnRef = useRef(null);

  const [showCallPopup, setShowCallPopup] = useState(false);
  const [callHint, setCallHint] = useState('Move your mouse inside the circle to try and catch the button');
  const [isFleeingEnabled, setIsFleeingEnabled] = useState(true); // start unfrozen

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mutable refs used for animation and geometry
  const centerRef = useRef({ x: 0, y: 0 });
  const radiusRef = useRef(0);
  const btnHalfRef = useRef({ w: 0, h: 0 });
  const posRef = useRef({ x: 0, y: 0 }); // button center relative to arena center
  const pointerRef = useRef({ x: 0, y: 0, active: false }); // last known pointer
  const rafRef = useRef(null);
  const edgeWindowRef = useRef(false);
  const detailsShownRef = useRef(false);

  // Recalculate geometry and immediately apply the current posRef transform
  function recalcGeometryImmediate() {
    const arena = arenaRef.current;
    const callBtn = btnRef.current;
    if (!arena || !callBtn) return;

    const rect = arena.getBoundingClientRect();
    const cx = rect.left + rect.width / 2 + window.scrollX;
    const cy = rect.top + rect.height / 2 + window.scrollY;
    centerRef.current = { x: cx, y: cy };

    const btnRect = callBtn.getBoundingClientRect();
    btnHalfRef.current.w = btnRect.width / 2;
    btnHalfRef.current.h = btnRect.height / 2;

    const rawRadius = Math.min(rect.width, rect.height) / 2;
    radiusRef.current = rawRadius - Math.max(btnHalfRef.current.w, btnHalfRef.current.h) - 4;

    // clamp current pos
    const p = posRef.current;
    const d = Math.hypot(p.x, p.y);
    const r = radiusRef.current;
    if (d > r) {
      p.x = (p.x * r) / d;
      p.y = (p.y * r) / d;
    }

    // ensure the button visual is exactly at posRef
    callBtn.style.transform = `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`;
  }

  useEffect(() => {
    const arena = arenaRef.current;
    const callBtn = btnRef.current;
    if (!arena || !callBtn) return;

    function clampPosition() {
      const p = posRef.current;
      const d = Math.hypot(p.x, p.y);
      const r = radiusRef.current;
      if (d > r) {
        p.x = (p.x * r) / d;
        p.y = (p.y * r) / d;
      }
    }

    function applyTransform() {
      const p = posRef.current;
      callBtn.style.transform = `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`;
    }

    function openEdgeWindow() {
      if (detailsShownRef.current) return;
      edgeWindowRef.current = true;
      callBtn.classList.add('edge', 'pulse');
      setCallHint('Nice. Click now to reveal my contact details');
      clearTimeout(openEdgeWindow._t || 0);
      openEdgeWindow._t = setTimeout(() => {
        edgeWindowRef.current = false;
        callBtn.classList.remove('pulse');
        setCallHint('Try pushing me to the edge again');
      }, 1500);
    }

    function endEdgeWindow() {
      edgeWindowRef.current = false;
      callBtn.classList.remove('edge', 'pulse');
    }

    // Main flee tick
    function tick() {
      rafRef.current = null;
      if (!pointerRef.current.active) return;

      const center = centerRef.current;
      const p = posRef.current;
      const btnCenterPage = { x: center.x + p.x, y: center.y + p.y };
      const vx = btnCenterPage.x - pointerRef.current.x;
      const vy = btnCenterPage.y - pointerRef.current.y;
      const dist = Math.hypot(vx, vy);

      // If cursor is not inside arena, do nothing
      const fromArenaCenter = Math.hypot(pointerRef.current.x - center.x, pointerRef.current.y - center.y);
      if (fromArenaCenter > radiusRef.current + Math.max(btnHalfRef.current.w, btnHalfRef.current.h) + 6) {
        setCallHint('Move inside the circle to chase the button');
        return;
      } else {
        setCallHint('Try to catch me!');
      }

      const fleeStrength = Math.min(1, 120 / Math.max(1, dist));
      const speed = 0.18;
      const stepX = vx * fleeStrength * speed;
      const stepY = vy * fleeStrength * speed;

      p.x += stepX;
      p.y += stepY;

      const d = Math.hypot(p.x, p.y);
      if (d >= radiusRef.current) {
        p.x = (p.x * radiusRef.current) / d;
        p.y = (p.y * radiusRef.current) / d;
        if (!edgeWindowRef.current) openEdgeWindow();
      } else if (edgeWindowRef.current) {
        callBtn.classList.remove('pulse');
      }

      applyTransform();

      if (pointerRef.current.active) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function onPointerMove(e) {
      // Always store the last pointer location
      pointerRef.current.x = e.pageX;
      pointerRef.current.y = e.pageY;

      if (prefersReducedMotion) {
        pointerRef.current.active = false;
        return;
      }

      if (e.pointerType === 'touch') {
        pointerRef.current.active = false;
        return;
      }

      // Only activate movement if not paused
      if (isFleeingEnabled) {
        pointerRef.current.active = true;
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }
    }

    function handleEnterArena() {
      if (!prefersReducedMotion) setCallHint('Catch me at the edge to click');
    }

    function handleLeaveArena() {
      pointerRef.current.active = false;
      if (!detailsShownRef.current) {
        endEdgeWindow();
        setCallHint('Move back inside the circle to chase the button');
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }

    // Click behavior on the Call Me button:
    // - If running: clicking PAUSES and freezes where it is, and opens the contact popup (the user asked the info be accessible).
    // - If already paused: clicking opens the contact popup (it does NOT resume; resume happens via the toggle control).
    function onClick() {
      // If details were already shown, open popup normally
      if (detailsShownRef.current) {
        setShowCallPopup(true);
        return;
      }

      if (isFleeingEnabled) {
        // freeze the game in place
        // ensure geometry is up to date and the visual remains exactly where it was
        recalcGeometryImmediate();

        // stop the RAF loop and mark frozen
        pointerRef.current.active = false;
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }

        // set frozen classes and open popup so user can access info while frozen
        callBtn.classList.add('frozen');
        arena.classList.add('frozen');

        // update state authoritative: pause
        setIsFleeingEnabled(false);

        // open the popup immediately so info is accessible
        detailsShownRef.current = true;
        setShowCallPopup(true);
        setCallHint('Game paused — the button is frozen');
        return;
      }

      // if already paused but details not shown, show info
      detailsShownRef.current = true;
      setShowCallPopup(true);
    }

    // Keyboard nudging; disabled while paused
    function onKeyDown(e) {
      if (!isFleeingEnabled) return;
      const step = 14;
      let moved = false;
      if (e.key === 'ArrowUp') {
        posRef.current.y -= step; moved = true;
      } else if (e.key === 'ArrowDown') {
        posRef.current.y += step; moved = true;
      } else if (e.key === 'ArrowLeft') {
        posRef.current.x -= step; moved = true;
      } else if (e.key === 'ArrowRight') {
        posRef.current.x += step; moved = true;
      }
      if (moved) {
        clampPosition();
        applyTransform();
        const d = Math.hypot(posRef.current.x, posRef.current.y);
        if (d >= radiusRef.current - 1) openEdgeWindow();
        else endEdgeWindow();
        e.preventDefault();
      }
      if (e.key === 'Enter' || e.key === ' ') {
        if (edgeWindowRef.current || prefersReducedMotion) {
          detailsShownRef.current = true;
          endEdgeWindow();
          setShowCallPopup(true);
        } else {
          setCallHint('Nudge me to the edge with arrows, then press Enter');
        }
        e.preventDefault();
      }
    }

    // Touch behavior: two taps -> open details (keeps same behavior)
    let touchTapCount = 0;
    function onTouchEnd() {
      touchTapCount += 1;
      if (touchTapCount === 1) {
        callBtn.classList.add('pulse');
        setTimeout(() => callBtn.classList.remove('pulse'), 800);
        setCallHint('Tap again to see contact details');
      } else {
        detailsShownRef.current = true;
        setShowCallPopup(true);
        setCallHint('Contact details opened');
        touchTapCount = 0;
      }
    }

    // Initialize geometry and listeners
    recalcGeometryImmediate();
    window.addEventListener('resize', recalcGeometryImmediate);
    arena.addEventListener('pointermove', onPointerMove);
    arena.addEventListener('pointerenter', handleEnterArena);
    arena.addEventListener('pointerleave', handleLeaveArena);

    callBtn.addEventListener('click', onClick);
    callBtn.addEventListener('keydown', onKeyDown);
    callBtn.addEventListener('touchend', onTouchEnd, { passive: true });

    // cleanup
    return () => {
      window.removeEventListener('resize', recalcGeometryImmediate);
      arena.removeEventListener('pointermove', onPointerMove);
      arena.removeEventListener('pointerenter', handleEnterArena);
      arena.removeEventListener('pointerleave', handleLeaveArena);

      callBtn.removeEventListener('click', onClick);
      callBtn.removeEventListener('keydown', onKeyDown);
      callBtn.removeEventListener('touchend', onTouchEnd);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(openEdgeWindow._t);
    };
  }, [prefersReducedMotion, isFleeingEnabled]);

  // Effect to handle toggling via the separate pause/resume control.
  // When resuming, remove frozen visuals and, if pointer is inside the arena, restart movement.
  useEffect(() => {
    const callBtn = btnRef.current;
    const arena = arenaRef.current;
    if (!callBtn || !arena) return;

    // Ensure geometry up-to-date and visual locked before toggling visuals
    recalcGeometryImmediate();

    if (!isFleeingEnabled) {
      // We are paused: authoritative freeze
      pointerRef.current.active = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      edgeWindowRef.current = false;
      callBtn.classList.add('frozen');
      arena.classList.add('frozen');
      setCallHint('Game paused — the button is frozen');
      // details may already be shown (we open popup when paused via click)
    } else {
      // We are resuming - the pointerMove handler will reactivate movement naturally
      callBtn.classList.remove('frozen');
      arena.classList.remove('frozen');
      setCallHint('Game resumed — move your mouse inside the circle!');
      // do not automatically clear detailsShownRef; opening/closing popup remains user's action
    }
  }, [isFleeingEnabled]);

  // helper to copy phone
  function copyPhone(text, el) {
    navigator.clipboard.writeText(text).then(() => {
      const original = el.textContent;
      el.textContent = '✓ Copied';
      setTimeout(() => {
        el.textContent = original;
      }, 1500);
    });
  }

  return (
    <>
      <div className="call-row">
        <div className="call-arena" id="callArena" ref={arenaRef} aria-label="Catch the Call Me button arena">
          <button
            id="callMe"
            ref={btnRef}
            aria-describedby="callHint"
            aria-label="Call Me — click to pause and view contact"
            // keep button keyboard focusable
          >
            📞 Call Me
          </button>
        </div>

        <div className="toggle-control">
          <button
            id="toggleFlee"
            aria-pressed={String(isFleeingEnabled)}
            onClick={() => {
              // Toggle via control (this resumes/unpauses or pauses)
              setIsFleeingEnabled(prev => !prev);
              // if user resumes, clear the popup/details flag so subsequent click logic works consistently
              if (!isFleeingEnabled) {
                // we are about to RESUME
                detailsShownRef.current = false;
                setShowCallPopup(false);
              }
            }}
          >
            {isFleeingEnabled ? '⏸️ Pause Game' : '▶️ Resume Game'}
          </button>
          <small>Toggle the chase</small>
        </div>
      </div>

      <div id="callHint" className="call-hint">{callHint}</div>

      {/* Call popup (simple) */}
      {showCallPopup && (
        <div className="email-popup call-popup show" id="callPopup" role="dialog" aria-modal="true" aria-labelledby="callTitle" onClick={(e) => { if (e.target === e.currentTarget) setShowCallPopup(false); }}>
          <div className="popup-content">
            <h3 id="callTitle">📞 Contact Aroudra</h3>
            <div className="contact-lines">
              <div className="contact-line"><span>Phone</span><strong>+1 682 406 7019</strong></div>
            </div>
            <div className="contact-actions">
              <a className="popup-button copy-button" href="tel:+16824067019">Call now</a>
              <button className="popup-button copy-button" onClick={(e) => copyPhone('+1 682 406 7019', e.currentTarget)}>Copy phone</button>
              <button className="popup-button close-button" onClick={() => setShowCallPopup(false)}>Close</button>
            </div>
            <div className="tiny">Tip: click Resume to unfreeze the button and continue the game</div>
          </div>
        </div>
      )}
    </>
  );
}