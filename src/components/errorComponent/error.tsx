interface ErrorComponentProps {
  informationText: string;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  informationText,
}) => {
  return (
    <div className="d-grid gap-2 mt-3">
      <div>
        <h6>{informationText}</h6>
      </div>
    </div>
  );
};
