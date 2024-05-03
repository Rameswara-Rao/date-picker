const RangeDisplayer = ({
  selectedRange,
  weekendDates,
  predefinedRanges,
  setSelectedRange,
}) => {
  const handlePreRangeSelection = (range) => {
    const today = new Date();
    const endDate = new Date();
    const startDate = new Date(today.setDate(today.getDate() - range));
    setSelectedRange([startDate, endDate]);
  };
  const getFormattedDate = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };
  return (
    <div>
      <div className="selected-range">
        <pre>
          Selected Range: {getFormattedDate(selectedRange[0])} -{" "}
          {getFormattedDate(selectedRange[1])}
        </pre>
      </div>

      <div className="selected-range">
        <pre>
          Weekend Dates:{" "}
          {weekendDates.map((date) => (
            <span key={date.toISOString()}>{getFormattedDate(date)}, </span>
          ))}
        </pre>
      </div>

      <div className="predefined-range">
        {predefinedRanges?.map((e, ind) => {
          return (
            <button
              key={ind}
              className="prerange-btn"
              onClick={() => handlePreRangeSelection(e.value)}
            >
              {e.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RangeDisplayer;
