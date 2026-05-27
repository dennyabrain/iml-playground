import '../unstructured-data-collection/OverviewTab.css'

export default function OverviewTab() {
  return (
    <div className="ov-guide">

      <p className="ov-intro">
        This prototype asks you to build a decision process from scratch —
        by <strong>choosing the order in which patient features are evaluated</strong>.
      </p>

      <ol className="ov-steps">
        <li>
          <span className="ov-step-label">Drag features into steps</span>
          <span className="ov-step-desc">
            The parameter blocks at the top represent five patient features.
            Drag them into the numbered boxes to define the <strong>sequence of decisions</strong>
            the model should follow.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Set a threshold for each step</span>
          <span className="ov-step-desc">
            Once a feature is placed, choose an operator and enter a threshold value.
            For example: <strong>Age &lt; 50</strong>. If the condition is met, the model
            moves to the next step. If not, the patient is rejected.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Read the outcomes</span>
          <span className="ov-step-desc">
            A patient that passes <strong>all five steps</strong> is approved.
            Failing any single step leads to rejection. The order of your steps
            determines which features act as early filters.
          </span>
        </li>
        <li>
          <span className="ov-step-label">Rearrange and experiment</span>
          <span className="ov-step-desc">
            Click <strong>×</strong> on any step to remove a feature and try a different
            arrangement. There is no single correct tree — the choices you make
            reveal your clinical priorities.
          </span>
        </li>
      </ol>

      <p className="ov-note">
        Pay attention to which feature you place first. The earliest steps
        act as the strongest filters and will reject the most patients.
      </p>

    </div>
  )
}
