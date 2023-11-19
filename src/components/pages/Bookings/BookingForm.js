import { useState } from "react";
import FormField from "./FormField";

const BookingForm = ({ availableTimes, dispatchOnDateChange, submitData }) => {
  const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const minimumDate = new Date().toISOString().split("T")[0];
  const defaultTime = availableTimes[0];
  const minimumNumberOfGuests = 1;
  const maximumNumberOfGuests = 10;
  const occasions = ["Birthday", "Anniversary"];
  const invalidDateErrorMessage = "Please choose a valid date";
  const invalidTimeErrorMessage = "Please choose a valid time";
  const invalidOccasionErrorMessage = "Please choose a valid occasion";
  const invalidNumberOfGuestsErrorMessage =
    "Please enter a number between 1 and 10";

  const [date, setDate] = useState(minimumDate);
  const [time, setTime] = useState(defaultTime);
  const [numberOfGuests, setNumberGuests] = useState(minimumNumberOfGuests);
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState(occasions[0]);

  const isDateValid = () => date !== "";
  const isTimeValid = () => time !== "";
  const isNumberOfGuestsValid = () => numberOfGuests !== "";
  const isOccasionValid = () => occasion !== "";
  const isValidEmail = () => email.match(validEmailRegex);

  const areAllFieldsValid = () =>
    isDateValid() &&
    isTimeValid() &&
    isNumberOfGuestsValid() &&
    isOccasionValid() &&
    isValidEmail();

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatchOnDateChange(e.target.value);
  };

  const handleTimeChange = (e) => setTime(e.target.value);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitData({ date, time, numberOfGuests, occasion });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormField
        label="Date"
        htmlFor="booking-date"
        hasError={!isDateValid()}
        errorMessage={invalidDateErrorMessage}
      >
        <input
          type="date"
          id="booking-date"
          name="booking-date"
          min={minimumDate}
          value={date}
          required={true}
          onChange={handleDateChange}
        />
      </FormField>
      <FormField
        label="Time"
        htmlFor="booking-time"
        hasError={!isTimeValid()}
        errorMessage={invalidTimeErrorMessage}
      >
        <select
          id="booking-time"
          name="booking-time"
          value={time}
          required={true}
          onChange={handleTimeChange}
        >
          {availableTimes.map((times) => (
            <option data-testid="booking-time-option" key={times}>
              {times}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label="Number of guests"
        htmlFor="booking-number-guests"
        hasError={!isNumberOfGuestsValid()}
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input
          type="number"
          id="booking-number-guests"
          name="booking-number-guests"
          value={numberOfGuests}
          min={minimumNumberOfGuests}
          max={maximumNumberOfGuests}
          required={true}
          onChange={(e) => setNumberGuests(e.target.value)}
        />
      </FormField>
      <FormField
        label="Occasion"
        htmlFor="booking-occasion"
        hasError={!isOccasionValid()}
        errorMessage={invalidOccasionErrorMessage}
      >
        <select
          id="booking-occasion"
          name="booking-occasion"
          value={occasion}
          required={true}
          onChange={(e) => setOccasion(e.target.value)}
        >
          {occasions.map((occasion) => (
            <option data-testid="booking-occasion-option" key={occasion}>
              {occasion}
            </option>
          ))}
        </select>
      </FormField>
      <FormField
        label="Email"
        htmlFor="booking-email"
        hasError={!isNumberOfGuestsValid()}
        errorMessage={invalidNumberOfGuestsErrorMessage}
      >
        <input
          type="text"
          id="booking-email"
          name="booking-email"
          value={email}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>
      <button
        className="button-primary"
        type="submit"
        disabled={!areAllFieldsValid()}
      >
        Make your reservation
      </button>
    </form>
  );
};

export default BookingForm;
