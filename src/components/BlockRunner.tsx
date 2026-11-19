import type { Block } from '../core/session';
import type { LangState } from '../core/types';
import { ReviewBlock, NewVocabBlock, GrammarBlock, ReadingBlock, ListeningBlock } from './blocksA';
import { ConversationBlock, PronBlock, WritingBlock, type ConvMode } from './blocksB';

export function convModeFor(s: LangState): ConvMode {
  if (s.programDay <= 30 && !s.placement?.skipProgram) return s.programDay <= 12 ? 'guided' : s.programDay <= 22 ? 'semi' : 'open';
  return s.pathLevel === 'A1' ? 'guided' : s.pathLevel === 'A2' ? 'semi' : 'open';
}

export function BlockView({ block, convMode, onDone }: { block: Block; convMode: ConvMode; onDone: (score: number) => void }) {
  const id = block.ids[0];
  switch (block.type) {
    case 'review': return <ReviewBlock key={block.key} ids={block.ids} onDone={onDone} />;
    case 'newvocab': return <NewVocabBlock key={block.key} ids={block.ids} onDone={onDone} />;
    case 'grammar': return <GrammarBlock key={block.key} id={id} onDone={onDone} />;
    case 'conversation': return <ConversationBlock key={block.key} id={id} mode={convMode} onDone={onDone} />;
    case 'reading': return <ReadingBlock key={block.key} id={id} onDone={onDone} />;
    case 'listening': return <ListeningBlock key={block.key} id={id} onDone={onDone} />;
    case 'pronunciation': return <PronBlock key={block.key} id={id} onDone={onDone} />;
    case 'writing': return <WritingBlock key={block.key} id={id} onDone={onDone} />;
    default: return null;
  }
}
