const DatePickerHeader = ({
  displayedMonth,
  displayedYear,
  setDisplayedMonth,
  setDisplayedYear,
}) => {
  const handleMonthChange = (event) => {
    const month = parseInt(event.target.value);
    if (!isNaN(month) && month >= 0 && month <= 11) {
      setDisplayedMonth(month);
    }
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    if (!isNaN(year) && year >= 1000 && year <= 9999) {
      setDisplayedYear(year);
    }
  };
  return (
    <div>
      <div className="calendar-header">
        <select
          className="month-selector"
          value={displayedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option className="selector-option" key={i} value={i}>
              {new Date(2000, i).toLocaleDateString("en-US", {
                month: "long",
              })}
            </option>
          ))}
        </select>
        <input
          className="date-input"
          type="number"
          value={displayedYear}
          onChange={handleYearChange}
          min="1000"
          max="9999"
        />
      </div>
    </div>
  );
};

export default DatePickerHeader;
