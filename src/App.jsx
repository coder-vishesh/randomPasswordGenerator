import { useState, useCallback, useEffect } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const copyPass = () => {
    navigator.clipboard.writeText(password);
    alert("Password is copied to clipboard");
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0,1,2,3,4,5,6,7,8,9";
    let symbol = "!@#$%^&*()_+-={}[]|:;'<>,.?/~`";
    if (numbers) str += num;
    if (characters) str += symbol;
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, characters]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, characters]);
  return (
    <>
      <div className="main h-screen w-full flex justify-center items-center box-border bg-neutral-900">
        <div className="container h-72 bg-slate-500 border-solid border-black border-2 rounded-lg  box-border p-4  text-white">
          <div className="text-center mb-4 text-lg text-white">
            <h1>Password Generator</h1>
          </div>
          <div className="input-section flex">
            <input
              className="border rounded-lg border-gray-400 p-2 w-4/5 text-black"
              type="text"
              required
              value={password}
            ></input>
            <button
              className="border rounded-lg bg-blue-400 w-20 ml-3"
              type="button"
              onClick={copyPass}
            >
              Copy
            </button>
          </div>
          <div>
            <input
              className="inline"
              type="range"
              min={8}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              id="length"
            ></input>
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div>
            <input
              className=""
              type="checkbox"
              onChange={() => {
                setNumbers((prev) => !prev);
              }}
              id="numbers"
            ></input>
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => setCharacters((prev) => !prev)}
              id="characters"
            ></input>
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
