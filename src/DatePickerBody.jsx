import { useMemo } from "react";

const DatePickerBody = ({
  displayedYear,
  displayedMonth,
  selectedRange,
  setSelectedRange,
}) => {
  const handleDateClick = (date) => {
    const [start, end] = selectedRange;
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend) {
      return;
    }
    if (!start || (start && end)) {
      setSelectedRange([date, null]);
    } else if (date > start) {
      setSelectedRange([start, date]);
    } else {
      setSelectedRange([date, start]);
    }
  };

  const renderDateCells = useMemo(() => {
    const dates = [];
    const currentDate = new Date(displayedYear, displayedMonth, 1);
    const lastDate = new Date(displayedYear, displayedMonth + 1, 0);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.map((date, index) => {
      const isSelected =
        selectedRange[0] &&
        selectedRange[1] &&
        date >= selectedRange[0] &&
        date <= selectedRange[1];
      const isStartOrEnd =
        date.getTime() === selectedRange[0]?.getTime() ||
        date.getTime() === selectedRange[1]?.getTime();
      const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;

      return (
        <div
          key={index}
          onClick={() => handleDateClick(date)}
          className={`date-cell ${
            isSelected || isStartOrEnd ? "selected" : ""
          } ${isWeekday ? "" : "weekend"}`}
        >
          <span>{date.toLocaleDateString("en-US", { weekday: "short" })}</span>
          <br />
          <span>{date.toLocaleDateString("en-US", { day: "numeric" })}</span>
        </div>
      );
    });
  }, [displayedYear, displayedMonth, selectedRange]);

  return (
    <div>
      <div className="date-cells">{renderDateCells}</div>
    </div>
  );
};

export default DatePickerBody;
