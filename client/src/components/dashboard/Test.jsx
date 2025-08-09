import React , {useEffect , useState} from 'react'


const Test = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count", count);
    if (count > 5) {
      console.log("Count is greater than 5");
    }
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
        console.log("Running timer...");
        console.log("Count value:", count);
    }, 1000);

    return () => {
        clearInterval(interval);
        console.log("Component unmounted, timer cleared");
    };
    }, [count]);

  return (
    <div>
      <h1>This is a test component</h1>
      <input type="text" value={count} onChange={(e) => setCount(e.target.value)} />
    </div>
  )
}

export default Test
