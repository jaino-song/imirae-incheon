import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://dsaqfyzyuzbyldmvsihr.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzYXFmeXp5dXpieWxkbXZzaWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTQxNTAsImV4cCI6MjA1OTU5MDE1MH0.YHFyOHVe5QAOBSIw06Ua6EgAXDR_bu8iiAcwaoV4Izw");

function Test() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    getInstruments();
  }, []);

  async function getInstruments() {
    const { data } = await supabase.from("bankAccountInfo").select('bankName, accNum').eq('area', '남동구')
    setInstruments(data);
  }

  return (
    <p></p>
    // <ul>
    //   {instruments.map((instrument) => (
    //     <li key={instrument.name}>{instrument.name}</li>
    //   ))}
    // </ul>
  );
}

export default Test;