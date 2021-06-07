import { h, Fragment } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import cn from "classnames";
import Select from "react-select";

import "./SelectTabs.scss";

const colourStyles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      color: isSelected && "#1A55F6",
      backgroundColor: "none",
    };
  },
};

const SelectTabs = ({ values, defaultValue, onSelect }) => {
  const tabHandler = (event) => {
    const { value } = event;
    onSelect(value);
  };

  const desktopHandler = (value) => onSelect(value);

  const defValue = useMemo(() => {
    return values.find((el) => el.value === defaultValue);
  }, [values, defaultValue]);

  const isActive = useCallback(
    (value) => {
      if (defValue) {
        return value === defValue.value;
      }
    },
    [defValue]
  );

  const desktopView = () => (
    <div className='learning-lang'>
      <ul className='learning-lang__list'>
        {values &&
          values.length > 0 &&
          values.map(({ label, value }) => (
            <li className='learning-lang__item'>
              <span
                className={cn(
                  {
                    "learning-lang__item--active": isActive(value),
                  },
                  {
                    [`learning-lang__item--active--${value}`]: isActive(value),
                  }
                )}
                onClick={() => desktopHandler(value)}
              >
                {label}
                <span className="learning-lang__item--hidden" />

              </span>
            </li>
          ))}
      </ul>
    </div>
  );
  const mobileView = () => (
    <div className='learning-lang-mob'>
      <Select
        options={values}
        defaultValue={defValue}
        styles={colourStyles}
        key={defValue}
        className='selectTab'
        classNamePrefix='selectTab'
        onChange={(event) => tabHandler(event)}
      />
    </div>
  );
  
  return (
    <>
      {desktopView()}
      {mobileView()}
    </>
  );
};

export default SelectTabs;
