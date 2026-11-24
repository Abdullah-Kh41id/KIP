"use client";

import type { CampaignStage } from "@/types/campaign";
import { StageInteraction } from "./StageInteraction";

interface StageContentProps {
  stage: CampaignStage;
  alreadyCompleted: boolean;
  isFinalStage: boolean;
  onComplete: () => void;
  onContinue: () => void;
}

export function StageContent({
  stage,
  alreadyCompleted,
  isFinalStage,
  onComplete,
  onContinue,
}: StageContentProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-8 md:px-10 md:py-12">
      <p className="text-[10px] uppercase tracking-[0.35em] text-kip-amber">
        Stage {stage.order}
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-kip-cream md:text-4xl">
        {stage.title}
      </h1>
      <p className="mt-2 text-base text-kip-gold/80">{stage.subtitle}</p>

      <div className="mt-8 space-y-6 border-l border-kip-gold/20 pl-5 md:pl-6">
        {stage.passages.map((passage) => (
          <p
            key={passage.slice(0, 48)}
            className="font-display text-lg leading-relaxed text-kip-cream/90 md:text-xl md:leading-relaxed"
          >
            {passage}
          </p>
        ))}
      </div>

      <aside className="mt-10 rounded-lg border border-kip-border bg-kip-elevated/50 px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-kip-muted">
          Key idea
        </p>
        <p className="mt-2 text-sm leading-relaxed text-kip-cream/85">
          {stage.keyIdea}
        </p>
      </aside>

      <StageInteraction
        key={stage.id}
        stage={stage}
        alreadyCompleted={alreadyCompleted}
        isFinalStage={isFinalStage}
        onComplete={onComplete}
        onContinue={onContinue}
      />
    </article>
  );
}
