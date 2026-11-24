"use client";

import { FormEvent, useState } from "react";
import type { CampaignStage } from "@/types/campaign";

interface StageInteractionProps {
  stage: CampaignStage;
  alreadyCompleted: boolean;
  isFinalStage: boolean;
  onComplete: () => void;
  onContinue: () => void;
}

export function StageInteraction({
  stage,
  alreadyCompleted,
  isFinalStage,
  onComplete,
  onContinue,
}: StageInteractionProps) {
  const { interaction } = stage;
  const [selected, setSelected] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passed, setPassed] = useState(alreadyCompleted);
  const [successNote, setSuccessNote] = useState(
    alreadyCompleted ? interaction.successMessage : null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (interaction.type === "multiple_choice") {
      if (selected === null) {
        setError("Choose an answer to continue.");
        return;
      }
      if (selected !== interaction.correctOptionIndex) {
        setError(interaction.hint ?? "Not quite — try again.");
        return;
      }
    }

    if (interaction.type === "short_answer") {
      const trimmed = answer.trim();
      if (trimmed.length < 2) {
        setError("Write a short response to continue.");
        return;
      }
      const keywords = interaction.acceptedKeywords ?? [];
      if (keywords.length > 0) {
        const lower = trimmed.toLowerCase();
        const ok = keywords.some((k) => lower.includes(k.toLowerCase()));
        if (!ok) {
          setError(interaction.hint ?? "Try again with a clearer answer.");
          return;
        }
      }
    }

    setPassed(true);
    setSuccessNote(interaction.successMessage);
    onComplete();
  };

  if (passed) {
    return (
      <div className="mt-10 border-t border-kip-border pt-8">
        <p className="text-[10px] uppercase tracking-[0.3em] text-kip-gold">
          Stage complete
        </p>
        <p className="mt-3 max-w-xl font-display text-xl leading-relaxed text-kip-cream">
          {successNote}
        </p>
        <p className="mt-4 text-sm text-kip-muted">
          Progress saved
          {isFinalStage
            ? ". You have finished this campaign."
            : ". The next stage is unlocked on your campaign map."}
        </p>
        {!isFinalStage && (
          <button
            type="button"
            onClick={onContinue}
            className="mt-6 rounded-lg border border-kip-gold/40 bg-kip-gold/10 px-5 py-2.5 text-sm text-kip-gold transition hover:bg-kip-gold/20"
          >
            Continue to next stage →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-10 border-t border-kip-border pt-8">
      <p className="text-[10px] uppercase tracking-[0.3em] text-kip-amber">
        Required to advance
      </p>
      <h3 className="mt-3 font-display text-2xl text-kip-cream">
        Prove you understood
      </h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-kip-muted">
        {interaction.prompt}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
        {interaction.type === "multiple_choice" && interaction.options && (
          <fieldset className="space-y-2">
            <legend className="sr-only">Choose an answer</legend>
            {interaction.options.map((option, index) => {
              const active = selected === index;
              return (
                <label
                  key={option}
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition-colors",
                    active
                      ? "border-kip-gold/50 bg-kip-gold/5"
                      : "border-kip-border bg-kip-elevated/40 hover:border-kip-gold/30",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name={`stage-${stage.id}`}
                    className="mt-1 accent-amber-500"
                    checked={active}
                    onChange={() => setSelected(index)}
                  />
                  <span className="text-sm leading-snug text-kip-cream/90">
                    {option}
                  </span>
                </label>
              );
            })}
          </fieldset>
        )}

        {interaction.type === "short_answer" && (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            placeholder="Your answer…"
            className="w-full resize-none rounded-lg border border-kip-border bg-kip-elevated/60 px-3 py-3 text-sm text-kip-cream placeholder:text-kip-muted/60 focus:border-kip-gold/40 focus:outline-none focus:ring-1 focus:ring-kip-gold/30"
          />
        )}

        {error && (
          <p className="text-sm text-red-300/90" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-kip-amber to-kip-gold px-5 py-2.5 text-sm font-medium text-kip-ink transition hover:brightness-110"
        >
          Complete Stage
        </button>
      </form>
    </div>
  );
}
