import '../unstructured-data-collection/OverviewTab.css'

export default function OverviewTab() {
  return (
    <div className="ov-guide">

      <p className="ov-intro">
        This prototype lets you explore how a linear model makes decisions — and
        what happens when you <strong>change what it values</strong>.
      </p>

      <ol className="ov-steps">
        <li>
          <span className="ov-step-label">Read the model's prediction</span>
          <span className="ov-step-desc">
            The left column shows a patient's data and the model's prediction
            using its <strong>default weights</strong>. These weights reflect the
            model's built-in assumptions about which features matter most.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Agree or disagree</span>
          <span className="ov-step-desc">
            If you think the prediction is reasonable, click <strong>I agree</strong>.
            If something feels off, click <strong>I disagree</strong> to open the weight sliders.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Tweak the weights</span>
          <span className="ov-step-desc">
            Each slider controls how much the model weighs a single feature.
            Drag them left or right and watch the <strong>new prediction update in real time</strong>.
            A weight near zero means the feature is largely ignored.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Submit and move on</span>
          <span className="ov-step-desc">
            Press <strong>Ok</strong> to log your response and load a new patient.
            The sliders reset to the model's defaults each time.
          </span>
        </li>
      </ol>

      <p className="ov-note">
        The goal is not to find the "correct" weights — it's to surface
        your intuitions about which features should drive this decision.
      </p>

    </div>
  )
}
