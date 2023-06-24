import React from "react";
import Input from "./components/input/Input";

function App() {
  return (
    <div className="w-auto h-100v bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 ">
      {/* Header */}
      <h1 className="text-center text-4xl bg-blue-950 py-2 text-white">
        Ja<span className="text-purple-700 z-50 ">mm</span>ing
      </h1>
      {/* Input */}
      <div className="">
        <Input />
      </div>
    </div>
  );
}

export default App;
