import { useFormContext } from "react-hook-form";

const LabelInput = ({ label, type, defaultValue, validation, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        {...register(label, validation)}
        defaultValue={defaultValue}
        placeholder={label}
        type={type}
        id={label.toLowerCase()}
        name={label}
        className="form-control"
        {...rest}
      />
      {errors[label] && (
        <small className="form-text text-danger">{errors[label].message}</small>
      )}
    </div>
  );
};

export default LabelInput;
