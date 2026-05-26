export default function ProgressPage({
  completionCounts,
}) {
  const maxGoal = 3;
  const days = [
    { key: 'upper', label: 'Upper Body' },
    { key: 'core', label: 'Core' },
    { key: 'legs', label: 'Legs' },
  ];

  return (
    <main className="page-shell">
      <section className="progress-panel">
        <div className="progress-panel-header">
          <div>
            <p className="eyebrow">Day Breakdown</p>
            <h3>Every finished day adds to your consistency.</h3>
          </div>
          <span className="progress-panel-pill">Simple weekly tracking</span>
        </div>

        <div className="progress-day-list">
          {days.map(({ key, label }) => {
            const count = completionCounts[key];
            const progress = Math.min((count / maxGoal) * 100, 100);
            const remaining = Math.max(maxGoal - count, 0);

            return (
              <article key={key} className="progress-day-card">
                <div className="progress-day-topline">
                  <div>
                    <h3>{label}</h3>
                    <p>Done {count} times</p>
                  </div>
                  <span className={`progress-badge ${progress >= 100 ? 'complete' : ''}`}>
                    {progress >= 100 ? 'Complete' : 'In progress'}
                  </span>
                </div>

                <div className="progress-day-footer">
                  <span>{count} total completions</span>
                  <span>{progress >= 100 ? 'Day finished' : 'Keep going'}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
