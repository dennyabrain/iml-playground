import '../unstructured-data-collection/OverviewTab.css'

export default function OverviewTab() {
  return (
    <div className="ov-guide">

      <p className="ov-intro">
        This prototype explores a <strong>2 stage decision process</strong> that
        mirrors how humans naturally make judgements — a fast first pass followed
        by a more deliberate second evaluation.
      </p>

      <ol className="ov-steps">
        <li>
          <span className="ov-step-label">Stage 1 — Quick assessment</span>
          <span className="ov-step-desc">
            Review a brief summary of the patient and make an initial gut-level
            verdict: <strong>likely suitable</strong> or <strong>likely unsuitable</strong>.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Stage 2 — Detailed review</span>
          <span className="ov-step-desc">
            Now examine the full patient profile alongside the model's prediction.
            Confirm or revise your stage 1 verdict based on the deeper information.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Compare &amp; reflect</span>
          <span className="ov-step-desc">
            See how your two-stage decision compares to the model's output.
            Where did additional detail change your mind — and where didn't it?
          </span>
        </li>
      </ol>

      <p className="ov-note">
        The goal is to surface the gap between snap judgements and informed decisions,
        and to understand where model predictions align or conflict with each stage.
      </p>

    </div>
  )
}
