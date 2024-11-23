import React from "react";
import DatePicker from "react-datepicker";
import { Form, InputGroup } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  error?: string;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  selected,
  onChange,
  label,
  minDate,
  maxDate,
  required,
  error,
}) => {
  const CustomInput = React.forwardRef<
    HTMLInputElement,
    { value?: string; onClick?: () => void }
  >(({ value, onClick }, ref) => (
    <InputGroup>
      <InputGroup.Text>
        <i className="bi bi-calendar"></i>
      </InputGroup.Text>
      <Form.Control
        ref={ref}
        value={value}
        onClick={onClick}
        readOnly
        style={{ backgroundColor: "white" }}
        isInvalid={!!error}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </InputGroup>
  ));

  return (
    <div>
      {label && (
        <Form.Label className="small text-muted mb-1">
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
      )}
      <DatePicker
        selected={selected}
        onChange={onChange}
        customInput={<CustomInput />}
        dateFormat="MMM d, yyyy"
        minDate={minDate}
        maxDate={maxDate}
        required={required}
        calendarClassName="bootstrap-datepicker"
      />
    </div>
  );
};

export default DatePickerInput;
