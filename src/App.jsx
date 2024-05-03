import { useState, useEffect, useMemo } from "react";
import "./App.css";

const App = ({ predefinedRanges }) => {
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [weekendDates, setWeekendDates] = useState([]);

  useEffect(() => {
    calculateWeekendDates();
  }, [selectedRange]);

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

  const handlePreRangeSelection = (range) => {
    const today = new Date();
    const endDate = new Date();
    const startDate = new Date(today.setDate(today.getDate() - range));
    setSelectedRange([startDate, endDate]);
  };

  const calculateWeekendDates = () => {
    const [start, end] = selectedRange;
    if (start && end) {
      const weekendDatesInRange = [];
      const currentDate = new Date(start);
      while (currentDate <= end) {
        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          weekendDatesInRange.push(new Date(currentDate));
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
      setWeekendDates(weekendDatesInRange);
    } else {
      setWeekendDates([]);
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

  const getFormattedDate = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };

  return (
    <div className="weekday-picker">
      <p className="heading">Date Picker</p>
      <div className="calendar">
        <div className="calendar-header">
          <select
            className="month-selector"
            value={displayedMonth}
            onChange={handleMonthChange}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
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
        <div className="date-cells">{renderDateCells}</div>
      </div>
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
    </div>
  );
};

export default App;