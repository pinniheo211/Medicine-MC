import { forwardRef } from 'react';
import { NumericFormat } from 'react-number-format';
export const CurrencyNumericFormat = forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue
          }
        });
      }}
      thousandSeparator=","
      prefix=""
      valueIsNumericString
    />
  );
});
