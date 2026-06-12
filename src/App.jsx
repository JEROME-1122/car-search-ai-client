import axios from "axios";
import React, { use, useState } from "react";

function App() {
  const [budget, setBudget] = useState("");
  const [fuel, setFuel] = useState("Petrol");
  const [priority, setPriority] = useState("Mileage");
  const [cars, setCars] = useState([]);
  const onHandlerSubmit = (e) => {
    e.preventDefault();
     setBudget("");
    setFuel("Petrol");
    setPriority("Mileage");
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
    <div className="container mx-auto md:w-[90%] w-[90%] h-[100vh]">
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
              className=" bg-white p-5 drop-shadow-2xl w-[30%] h-auto rounded-3xl"
              key={cars.id}
            >
              <div className="h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white">
                  🚗 {cars.name}
                </h2>
              </div>

              <div className="p-6 bg-white">
                <div className="flex justify-between items-center mb-5">
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
                    {cars.fuel}
                  </span>

                  <span className="text-yellow-500 text-lg">
                    ⭐ {cars.safety}/5
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between bg-slate-100 p-3 rounded-xl">
                    <span>💰 Price</span>
                    <span className="font-bold text-green-600">
                      ₹{cars.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between bg-slate-100 p-3 rounded-xl">
                    <span>⛽ Mileage</span>
                    <span className="font-bold text-blue-600">
                      {cars.mileage} km/l
                    </span>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 transition-all">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
