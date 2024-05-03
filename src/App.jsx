import { useState, useEffect } from "react";
import "./App.css";
import DatePickerHeader from "./DatePickerHeader";
import DatePickerBody from "./DatePickerBody";
import RangeDisplayer from "./RangeDisplayer";

const App = () => {
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [weekendDates, setWeekendDates] = useState([]);

  useEffect(() => {
    calculateWeekendDates();
  }, [selectedRange]);

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

  const predefinedRanges = [
    { label: "Last 7 Days", value: 7 },
    { label: "Last 30 Days", value: 30 },
  ];

  return (
    <div className="weekday-picker">
      <p className="heading">Date Picker</p>
      <div className="calendar">
        <DatePickerHeader
          displayedMonth={displayedMonth}
          displayedYear={displayedYear}
          setDisplayedYear={setDisplayedYear}
          setDisplayedMonth={setDisplayedMonth}
        />
        <DatePickerBody
          displayedYear={displayedYear}
          displayedMonth={displayedMonth}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
      </div>
      <RangeDisplayer
        selectedRange={selectedRange}
        weekendDates={weekendDates}
        predefinedRanges={predefinedRanges}
        setSelectedRange={setSelectedRange}
      />
    </div>
  );
};

export default App;
