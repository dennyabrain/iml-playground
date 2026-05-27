import './OverviewTab.css'

export default function OverviewTab() {
  return (
    <div className="ov-guide">

      <p className="ov-intro">
        This prototype explores how clinicians interact with a model's decision —
        and what happens when they <strong>push back</strong>.
      </p>

      <ol className="ov-steps">
        <li>
          <span className="ov-step-label">Review the patient</span>
          <span className="ov-step-desc">
            Each screen shows a set of patient data alongside the model's prediction
            — either <strong>Approved</strong> or <strong>Rejected</strong>.
            Read through the details before responding.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Give your assessment</span>
          <span className="ov-step-desc">
            Do you agree with the model? Hit <strong>I agree</strong> or <strong>I disagree</strong>.
            If you disagree, you'll be asked to briefly explain why in your own words.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Submit and continue</span>
          <span className="ov-step-desc">
            Press <strong>Ok</strong> to log your response and move to the next patient.
            You can also skip ahead at any time using <strong>See New Patient</strong>.
          </span>
        </li>
      </ol>

      <p className="ov-note">
        There are no right or wrong answers. Your disagreements are the most
        valuable part of this dataset.
      </p>

    </div>
  )
}
