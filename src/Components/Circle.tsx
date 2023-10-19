import { Checkmark20Regular } from "@fluentui/react-icons";

interface CircleProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export const Circle: React.FC<CircleProps> = ({ color, selected, onClick }) => {
  const circleStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div style={circleStyle} onClick={onClick}>
      {selected && <Checkmark20Regular style={{ color: "#fff" }} />}
    </div>
  );
};