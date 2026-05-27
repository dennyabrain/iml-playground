import '../unstructured-data-collection/OverviewTab.css'

export default function OverviewTab() {
  return (
    <div className="ov-guide">

      <p className="ov-intro">
        This prototype puts you in the model designer's seat — you decide
        <strong> which features matter and by how much</strong>, then
        immediately see the consequences on real patient data.
      </p>

      <ol className="ov-steps">
        <li>
          <span className="ov-step-label">Set your weights</span>
          <span className="ov-step-desc">
            Use the sliders on the left to assign a weight to each patient feature.
            A <strong>positive weight</strong> makes the model more likely to predict True;
            a <strong>negative weight</strong> pushes it toward False.
            A weight of zero means that feature is ignored entirely.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Commit your model</span>
          <span className="ov-step-desc">
            Click <strong>Use this Model</strong> to lock in your weights.
            A patient will appear on the right alongside the prediction your
            model produces for them.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Assess the prediction</span>
          <span className="ov-step-desc">
            Does the prediction make sense for this patient? Click
            <strong> I agree</strong> or <strong>I disagree</strong>.
            If you disagree, describe what the model seems to be missing.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Revise or continue</span>
          <span className="ov-step-desc">
            Press <strong>Ok</strong> to move to the next patient with the same model.
            At any point, adjust the sliders and click <strong>Use this Model</strong>
            again — the right column will reset with a fresh patient and your new predictions.
          </span>
        </li>
      </ol>

      <p className="ov-note">
        Unlike the other prototypes, here the model is entirely yours.
        What you build reflects your own theory of what makes a good donor.
      </p>

    </div>
  )
}
