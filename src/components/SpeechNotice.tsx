// Shown (once, at the bottom of the screen) when the browser could not play audio, so a silent speaker button is never a mystery.
import { useState } from 'react';
import { LANGUAGES } from '../content/registry';
import { clearSpeechFailure, onlineVoiceEnabled, retrySpeech, setOnlineVoice, useSpeechState } from '../core/speech';
import { Btn } from './ui';
import { Icon } from './Icon';

/** Step-by-step instructions for installing a voice, shown in the notice and on the Settings page. */
export function VoiceHelp({ lang }: { lang?: string }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-[0.82rem] leading-relaxed text-muted marker:text-faint">
      <li><b className="text-ink">Check the volume.</b> Raise the <i>media</i> volume (not just ringer), and turn off silent mode.</li>
      <li><b className="text-ink">Android:</b> Settings → General management → Language → Text-to-speech → ⚙ next to your engine → Install voice data{lang ? ` (${lang})` : ''}. If you can, choose “Speech Services by Google” as the engine.</li>
      <li><b className="text-ink">iPhone / iPad:</b> Settings → Accessibility → Spoken Content → Voices → pick the language and download a voice.</li>
      <li><b className="text-ink">Computer:</b> Chrome and Edge include voices. On Windows add the language under Settings → Time &amp; language → Speech.</li>
      <li>Then fully close and reopen LINGUA so the browser finds the new voice.</li>
    </ul>
  );
}

export function SpeechNotice() {
  const { failure } = useSpeechState(); const [more, setMore] = useState(false);
  if (!failure) return null;
  const name = LANGUAGES.find((l) => l.tts === failure.lang)?.name ?? failure.lang;
  const online = onlineVoiceEnabled();
  return (
    <div role="alert" className="pointer-events-none fixed inset-x-0 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-[65] flex justify-center px-3 lg:bottom-6">
      <div className="pop pointer-events-auto max-h-[70dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-warn/40 bg-surface p-4 shadow-[var(--shadow-lg)]">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-warn/15 text-warn"><Icon name="volume" size={18} /></span>
          <div className="min-w-0 flex-1">
            <p className="font-bold leading-snug">{failure.reason === 'no-voice' ? `This device has no ${name} voice` : `The ${name} audio did not play`}</p>
            <p className="mt-0.5 text-sm text-muted">{failure.reason === 'no-voice' ? 'Listening questions need a voice to read the text aloud. You can install one, or turn on the online voice.' : 'Try again, check your media volume, or turn on the online voice as a backup.'}</p>
          </div>
          <button onClick={() => { clearSpeechFailure(); setMore(false); }} aria-label="Dismiss" className="-mr-1 -mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted hover:bg-surface2"><Icon name="x" size={16} /></button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {!online && <Btn size="sm" onClick={() => { setOnlineVoice(true); void retrySpeech(); }}>Use online voice</Btn>}
          <Btn size="sm" variant="ghost" onClick={() => { void retrySpeech(); }}>Try again</Btn>
          <Btn size="sm" variant="quiet" onClick={() => setMore((m) => !m)}>{more ? 'Hide help' : 'How to fix'}</Btn>
        </div>
        {!online && <p className="mt-2 text-xs text-faint">The online voice sends the sentence to Google's text-to-speech service. It is off by default; everything else stays on your device.</p>}
        {more && <div className="mt-3 border-t border-line pt-3"><VoiceHelp lang={name} /></div>}
      </div>
    </div>
  );
}
