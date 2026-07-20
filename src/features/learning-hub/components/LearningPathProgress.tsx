interface LearningPathProgressProps {
  position: number;
  total: number;
}

export const LearningPathProgress = ({ position, total }: LearningPathProgressProps) => {
  const percent = Math.round((position / total) * 100);

  return (
    <div className="learning-path-progress">
      <span>
        Article {position} of {total}
      </span>
      <div className="learning-path-progress-bar">
        <div className="learning-path-progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span>{percent}%</span>
    </div>
  );
};
