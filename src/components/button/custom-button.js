import { Button } from "./style";

const CustomButton = ({ primary, title, width }) => {
  return (
    <Button primary={primary} width={width}>
      {title}
    </Button>
  );
};

export default CustomButton;
