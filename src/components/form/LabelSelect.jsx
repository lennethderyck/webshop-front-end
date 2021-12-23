import { useFormContext } from 'react-hook-form';

const LabelSelect = ({label, options, validation, ...rest}) => {
  options.sort();
    const { register, formState: { errors } } = useFormContext();
    return (
      <div className="col-span-6 sm:col-span-3">
        <label htmlFor={label}>{label}</label>
        <select
          {...register(label, validation)}
          {...rest}
          id={label}
          name={label}>
          <option value="">--choose a {label}--</option>
          {options.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors[label] && <p className="text-red-500">{errors[label].message}</p>}
      </div>
    );
  };

export default LabelSelect;