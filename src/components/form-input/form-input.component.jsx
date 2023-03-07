import './form-input.styles.scss';

const FormInput = ({label,...otherPops}) => {
  return (
    <div className="group">
      <input className="form-input" {...otherPops} />
      {label && (
        <label
          className={`&{otherProps.value.length ? 'shrink':''} form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};


export default FormInput;