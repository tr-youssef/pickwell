import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDays, format, isSameDay, isAfter } from "date-fns";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  { name: "Calgary Food Bank", lat: 51.01, lng: -114.04 },
  { name: "Satellite 1", lat: 51.05, lng: -114.07 },
  { name: "Satellite 2", lat: 51.03, lng: -114.05 },
  { name: "Satellite 3", lat: 51.08, lng: -114.12 },
  { name: "Satellite 4", lat: 51.00, lng: -114.10 },
  { name: "Satellite 5", lat: 51.02, lng: -113.98 },
  { name: "Satellite 6", lat: 51.06, lng: -114.00 },
  { name: "Satellite 7", lat: 51.04, lng: -114.15 },
];

const center = [51.00978043808604, -114.03610224868947];

export default function PickupMap() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  // Date logic: only allow +2 days to +14 days from today
  const today = new Date();
  const minDate = addDays(today, 2);
  const maxDate = addDays(today, 14);

  // Dates that are completely full (entire date disabled, all times unavailable)
  const fullDates = [addDays(today, 3), addDays(today, 10)];
  
  // Times that are full for specific dates (date is selectable, but these specific times are disabled)
  const fullTimes = {
    [format(addDays(today, 5), "yyyy-MM-dd")]: ["10:00", "11:00"],
    [format(addDays(today, 7), "yyyy-MM-dd")]: ["09:00", "16:00"],
    [format(addDays(today, 12), "yyyy-MM-dd")]: ["12:00", "14:00"],
  };

  // Generate available dates
  const dateOptions = [];
  for (let d = minDate; !isAfter(d, maxDate); d = addDays(d, 1)) {
    dateOptions.push(new Date(d));
  }

  // Generate available times (every hour 9-17)
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-4 sm:p-6 mt-4 sm:mt-8">
      <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Pickup Locations</h2>
      <div className="mb-3 sm:mb-4 text-sm sm:text-base text-gray-600">Select a location to pick up your order.</div>
      <div className="mb-3 sm:mb-4">
        <label htmlFor="location-select" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Choose a location:</label>
        <select
          id="location-select"
          className="border rounded px-3 py-2 w-full text-sm sm:text-base"
          value={selectedIdx}
          onChange={e => setSelectedIdx(Number(e.target.value))}
        >
          {locations.map((loc, idx) => (
            <option key={idx} value={idx}>{loc.name} ({loc.lat.toFixed(2)}, {loc.lng.toFixed(2)})</option>
          ))}
        </select>
      </div>
      <div className="mb-3 sm:mb-4">
        <label htmlFor="date-select" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Pick a date:</label>
        <select
          id="date-select"
          className="border rounded px-3 py-2 w-full text-sm sm:text-base"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        >
          <option value="">Select a date</option>
          {dateOptions.map((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            const isFull = fullDates.some(fd => isSameDay(fd, date));
            return (
              <option key={dateStr} value={dateStr} disabled={isFull}>
                {format(date, "EEE, MMM d yyyy")}{isFull ? " (Full)" : ""}
              </option>
            );
          })}
        </select>
      </div>
      {selectedDate && (
        <div className="mb-3 sm:mb-4">
          <label htmlFor="time-select" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Pick a time:</label>
          <select
            id="time-select"
            className="border rounded px-3 py-2 w-full text-sm sm:text-base"
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
          >
            <option value="">Select a time</option>
            {timeSlots.map((slot) => {
              // Check if this specific time is full for the selected date
              const isFull = fullTimes[selectedDate]?.includes(slot);
              return (
                <option key={slot} value={slot} disabled={isFull}>
                  {slot}{isFull ? " (Full)" : ""}
                </option>
              );
            })}
          </select>
            <button
              className="mt-4 sm:mt-6 w-full px-4 sm:px-6 py-2 text-sm sm:text-base bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 transition"
              disabled={!selectedDate || !selectedTime}
              onClick={() => {
                navigate("/barcode", {
                  state: {
                    pickupDate: selectedDate,
                    pickupTime: selectedTime,
                    pickupLocation: locations[selectedIdx].name
                  }
                });
              }}
            >
              Validate
            </button>
        </div>
      )}
      <div className="w-full h-64 sm:h-80 md:h-96 rounded overflow-hidden border">
        <MapContainer center={center} zoom={13} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc, idx) => (
            <Marker key={idx} position={[loc.lat, loc.lng]} eventHandlers={{
              click: () => setSelectedIdx(idx)
            }}>
              <Popup>
                <span className="font-semibold text-green-700">{loc.name}</span><br />
                <span className="text-xs text-gray-500">({loc.lat.toFixed(2)}, {loc.lng.toFixed(2)})</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
