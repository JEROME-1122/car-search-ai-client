import axios from "axios";
import React, { use, useState } from "react";

function App() {
  const [budget, setBudget] = useState("");
  const [fuel, setFuel] = useState("Petrol");
  const [priority, setPriority] = useState("Mileage");
  const [cars, setCars] = useState([]);
  const onHandlerSubmit = (e) => {
    e.preventDefault();
    console.log(budget, fuel, priority);
  };

  const getCars = async () => {
    try {
      const res = await axios.post("https://car-search-ai-server-1.onrender.com/recommend", {
        budget,
        fuel,
        priority,
      });
      console.log(res.data);
      setCars(res.data);
    } catch (error) {
      res.status(400).json(error);
    }
  };
  return (
    <div className="container mx-auto md:w-[90%] w-[90%]">
      <h1 className="py-20 text-3xl font-bold text-center">
        Car ShortList Assistant
      </h1>

      <form
        onSubmit={onHandlerSubmit}
        className="flex flex-wrap items-center justify-center gap-5 drop-shadow-2xl p-5 bg-white rounded-2xl"
      >
        <input
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          type="number"
          placeholder="Enter Your Budget"
          className="w-100 border p-2 rounded-lg  focus:outline-none"
        />

        <select
          className=" w-100 border p-2 rounded-lg  focus:outline-none"
          value={fuel}
          onChange={(e) => setfuel(e.target.value)}
        >
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
        <select
          className="w-100 border p-2 rounded-lg  focus:outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Mileage">Mileage</option>
          <option value="Safety">Safety</option>
        </select>

        <button
          type="submit"
          onClick={getCars}
          className="w-[30%] bg-blue-200 hover:bg-blue-400 py-2 rounded-lg"
        >
          Search Car
        </button>
      </form>

      <div className="flex flex-wrap mt-6 gap-10 items-center justify-between">
        {cars.map((cars) => {
          return (
            <div
              className=" bg-white p-5 drop-shadow-2xl w-[30%] h-auto rounded"
              key={cars.id}
            >
              <h3 className="font-bold text-lg">{cars.name}</h3>
              <p>Price : {cars.price}</p>
              <p>Mileage : {cars.mileage}</p>
              <p>Safety : {cars.safety}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
