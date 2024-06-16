import css from "./RigthModalButton.module.css";

const RigthModalButton = ({text,callback}) => {
  return (
    <div className={css.btnSave} onClick={callback}>
      {text}
    </div>
  );
};

export default RigthModalButton;
