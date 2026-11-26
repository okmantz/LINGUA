// The Teacher: a friendly guide who pops up with tips, reminders and advice, and can be quieted in Settings.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGuide } from '../state/hooks';
import { dayKey } from '../core/fsrs';
import { TEACHER, TOUR, tipsFor, type Mood, type Tip } from '../core/teacher';
import { TeacherAvatar } from './Avatar';
import { Btn, cx } from './ui';
import { Icon } from './Icon';

/** Inline Teacher card used inside pages (dashboard, session summaries). */
export function TeacherNote({ mood = 'happy', title, children, action, className }: { mood?: Mood; title?: string; children: React.ReactNode; action?: { label: string; to: string }; className?: string }) {
  return (
    <div className={cx('flex items-start gap-3.5 rounded-2xl border border-line bg-gradient-to-br from-accent/[.08] via-surface to-surface p-4 shadow-[var(--shadow)]', className)}>
      <TeacherAvatar size={48} mood={mood} className="rounded-full ring-2 ring-accent/30" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-accent-strong">{TEACHER.name}</p>
        {title && <p className="mt-0.5 font-bold leading-snug tracking-tight">{title}</p>}
        <div className="mt-0.5 text-[0.93rem] leading-relaxed text-muted">{children}</div>
        {action && <Link to={action.to} className="mt-2.5 inline-flex items-center gap-1 text-sm font-bold text-accent-strong hover:underline">{action.label}<Icon name="arrow" size={15} /></Link>}
      </div>
    </div>
  );
}

export function TeacherDock() {
  const g = useGuide(); const { store, state, next, due, todayMin } = g; const p = store.profile!; const loc = useLocation(); const nav = useNavigate();
  const off = !!p.teacher?.off; const seen = p.teacher?.seen ?? {};
  const [open, setOpen] = useState(false); const [idx, setIdx] = useState(0); const [tour, setTour] = useState(0); const [auto, setAuto] = useState(false);
  const autoFor = useRef('');

  const tips = useMemo<Tip[]>(() => {
    const now = new Date();
    const list = tipsFor({ path: loc.pathname, name: p.username, langName: g.cfg.name, state, stats: store.stats, due, next, todayMin, hour: now.getHours(), today: dayKey(now.getTime()), programme: state.programDay <= 30 && !state.placement?.skipProgram, newcomer: Object.keys(state.programDone).length === 0 && !state.xp && !(store.cards.length) });
    if (loc.pathname !== '/' && loc.pathname !== '/daily' && next.kind !== 'rest') list.push({ id: 'next', mood: 'happy', title: 'Where to next?', text: `${next.title}. ${next.body}`, action: { label: next.cta, to: next.to } });
    return list;
  }, [loc.pathname, p.username, state, store.stats, store.cards.length, due, next, todayMin, g.cfg.name]);
  const unseen = tips.filter((t) => t.id !== 'next' && !seen[t.id]);
  const tip = tips[Math.min(idx, Math.max(0, tips.length - 1))];

  // Navigating never opens the Teacher by itself. She only opens on her own for an `important` tip (the first-run welcome, the
  // 30-day milestone), once ever; everything else waits behind the widget, which shows a dot when she has something new to say.
  useEffect(() => {
    setOpen(false); setTour(0);
    if (off || store.focus || autoFor.current === loc.pathname) return;
    const first = tips.findIndex((t) => t.important && !seen[t.id]);
    if (first < 0) return;
    const id = setTimeout(() => { autoFor.current = loc.pathname; setIdx(first); setAuto(tips[first].id !== 'tour-v1'); setOpen(true); }, 1100);
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, [loc.pathname, off, store.focus]);
  useEffect(() => { if (!open) return; const t = tips[idx]; if (t && t.id !== 'next' && !seen[t.id] && !(t.id === 'tour-v1' && tour < TOUR.length - 1)) store.markTipSeen(t.id); /* eslint-disable-next-line */ }, [open, idx, tour]);
  // A tip that popped up by itself tidies itself away after a while, unless the learner engages with it.
  useEffect(() => { if (!open || !auto) return; const id = setTimeout(() => { const t = tips[idx]; if (t && t.id !== 'next') store.markTipSeen(t.id); setOpen(false); setAuto(false); }, 11000); return () => clearTimeout(id); /* eslint-disable-next-line */ }, [open, auto, idx]);
  useEffect(() => { if (!open) return; const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h); }, [open]);

  if (off || store.focus || !tip) return null;
  const isTour = tip.id === 'tour-v1'; const step = isTour ? TOUR[tour] : null; const last = isTour && tour === TOUR.length - 1;
  const close = () => { if (tip.id !== 'next') store.markTipSeen(tip.id); setOpen(false); };
  const go = (to: string) => { close(); nav(to); };
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-2 px-3 lg:bottom-6 lg:right-6 lg:left-auto lg:px-0 lg:pr-0">
      {open && (
        <div role="dialog" aria-label={`${TEACHER.name} tip`} onPointerDown={() => setAuto(false)} className="pointer-events-auto pop w-[min(21rem,calc(100vw-1.5rem))] rounded-3xl border border-line bg-surface p-4 shadow-[var(--shadow-lg)]">
          <div className="flex items-start gap-3">
            <TeacherAvatar size={46} mood={isTour ? 'wave' : tip.mood} className="rounded-full ring-2 ring-accent/30" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2"><p className="text-xs font-bold text-accent-strong">{TEACHER.name}</p><button onClick={close} aria-label="Close tip" className="-mr-1 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface2"><Icon name="x" size={16} /></button></div>
              {(step || tip.title) && <p className="font-bold leading-snug tracking-tight">{step ? step.title : tip.title}</p>}
              <p className="mt-0.5 text-[0.88rem] leading-relaxed text-muted">{step ? step.text : tip.text}</p>
            </div>
          </div>
          {!(auto && !isTour && !tip.action) && <><div className="mt-3 flex flex-wrap items-center gap-2">
            {isTour ? <>
              <div className="mr-auto flex gap-1" aria-label={`Step ${tour + 1} of ${TOUR.length}`}>{TOUR.map((_, i) => <span key={i} className={cx('h-1.5 w-5 rounded-full', i === tour ? 'bg-accent' : 'bg-surface2')} />)}</div>
              {tour > 0 && <Btn size="sm" variant="ghost" onClick={() => setTour(tour - 1)}>Back</Btn>}
              {last ? <Btn size="sm" onClick={() => go(next.to)}>{next.cta}</Btn> : <Btn size="sm" onClick={() => setTour(tour + 1)}>Next</Btn>}
            </> : <>
              {tip.action && <Btn size="sm" onClick={() => go(tip.action!.to)}>{tip.action.label}</Btn>}
              {tips.length > 1 && <Btn size="sm" variant="ghost" onClick={() => setIdx((idx + 1) % tips.length)}>Another tip ({Math.min(idx, tips.length - 1) + 1}/{tips.length})</Btn>}
            </>}
          </div>
          <button onClick={() => { store.setTeacherOff(true); setOpen(false); }} className="mt-3 text-xs font-medium text-faint underline-offset-2 hover:text-muted hover:underline">Hide Teacher (turn back on in Settings)</button></>}
        </div>
      )}
      <button onClick={() => { setOpen((o) => !o); if (!open && unseen[0]) setIdx(tips.indexOf(unseen[0])); }} aria-expanded={open} aria-label={open ? 'Close Teacher' : 'Ask your Teacher'}
        className="pointer-events-auto relative rounded-full shadow-[var(--shadow-lg)] ring-[3px] ring-surface transition hover:scale-105 active:scale-95">
        <TeacherAvatar size={52} mood={tip.mood} className={cx('rounded-full', !open && unseen.length > 0 && 'bob')} />
        {!open && unseen.length > 0 && <><span className="ping-soft absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-accent" /><span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent" /></>}
      </button>
    </div>
  );
}
