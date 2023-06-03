export function Button({
  classNameButton,
  children,
  handleClickButton,
  disabledButton,
}) {
  const classButton = `btn btn-${classNameButton}`;
  return (
    <button
      className={classButton}
      onClick={handleClickButton}
      disabled={disabledButton}
    >
      {children}
    </button>
  );
}
