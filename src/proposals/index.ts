import type { Design } from "../model";
import { classicalProposals } from "./ClassicalProposals";
import { natureProposals } from "./NatureProposals";
import { poeticProposals } from "./PoeticProposals";
import { civicProposals } from "./CivicProposals";
import { makeContext, type FrameLayers } from "./primitives";

export function proposalFrames(
  d: Design,
  id: string,
  w: number,
  h: number,
): FrameLayers | null {
  if (!d.template.startsWith("p_")) return null;
  const ctx = makeContext(d, id, w, h);
  return (
    classicalProposals(ctx) ??
    natureProposals(ctx) ??
    poeticProposals(ctx) ??
    civicProposals(ctx)
  );
}
