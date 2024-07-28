import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null); //useref react HOOK
  const hover = useRef(null);

  // this is a main ArrowFunction which generates a password on every change in length, numAllowed, charAllowd, password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%&_-+=~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()*str.length +1); //will return numaric values
      pass += str.charAt(char); //will return char of str
    }
    setPassword(pass);

  },[length, numAllowed, charAllowed, setPassword]);


  //this is a Arrow FUnction which is called for COPYING the Password from input box 
  const passCopyToClipBord = useCallback((e) => {
    passwordRef.current?.select(); //this is used for selecting text
    passwordRef.current?.setSelectionRange(0, 10); //this sets a range of selection 0 -> 10
    window.navigator.clipboard.writeText(password); //Code which copyies the password to clipboard
  }, [password])  

  //This is a Hook which calles the password generator function on every change on the given array [length...]
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numAllowed, passwordGenerator])


  return (
    <div className='flex justify-center text-lg'>
      <div className='w-full max-w-lg shadow-md rounded my-9 px-5 py-5 max-auto text-lime-500 bg-slate-800 '>
        <h1 className='text-white text-center my-2 text-xl'>Password Generaor</h1>
        <div className='flex shadow rounded overflow-hidden mb-4 '>
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3 font-semibold'
          placeholder='password'
          readOnly
          ref={passwordRef}/>
          <button
          onMouseEnter={() => {hover.current.style.backgroundColor = '#1e40af'}}
          onMouseLeave={() => {hover.current.style.backgroundColor = '#1d4ed8'}}
          onClick={passCopyToClipBord} 
          className='text-white bg-blue-700 px-3 py-1.5 outline-none shrink-0'
          ref={hover}>
            Copy
          </button>
        </div>
        <div className='flex gap-x-5'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min={5} 
            max={100} 
            value={length} 
            onChange={(e) => { setLength(e.target.value) }} 
            className='cursor-pointer w-36 '
            id='range'/>
            <label htmlFor='range'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" className='cursor-pointer' defaultChecked={numAllowed} id="numInput" onChange={() => {setNumAllowed(!numAllowed)}}/>
            <label className='cursor-pointer' htmlFor='numInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" className='cursor-pointer' defaultChecked={charAllowed} id="CharInput" onChange={() => {setCharAllowed((prev) => !prev )}}/>
            <label className='cursor-pointer' htmlFor='CharInput'>Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
