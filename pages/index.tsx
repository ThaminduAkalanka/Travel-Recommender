import { useState, useEffect } from "react";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { Search } from 'lucide-react';
import { Loader } from 'lucide-react';
import styles from './Home.module.css';
import logo from './AIlogo.png';
import Image from 'next/image';

export default function Home() {
  const [placeName, setPlaceName] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!loading) {
      // Simulate typing effect
      const displayInterval = setInterval(() => {
        if (displayText.length < responseText.length) {
          setDisplayText(responseText.substring(0, displayText.length + 1));
        } else {
          clearInterval(displayInterval);
        }
      },10); // Faster typing effect

      return () => clearInterval(displayInterval);
    }
  }, [loading, responseText, displayText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("https://travel1.tsapp.dev/rec", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pk_d3880bcd61e367615db442bad901eb9e62d476ca274fdafbccb230c6bdcb59f0'
      },
      body: JSON.stringify({ "variables": { "place": { "value": placeName } } })
    });
        
    setResponseText((await res.json()).result);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <main className={`flex w-full min-h-screen flex-col items-center justify-between p-32 ${styles.main}`}>
        <div className="flex "><Image src={logo} alt="AI Logo" className="absolute top-0 left-0 h-48 m-4 w-72 -top-18" />
        </div><label htmlFor="place" className={`${styles.label} mb-2`} style={{ whiteSpace: 'nowrap' }}>
          Search for Country/City to get Recommendations
        </label>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <MapPinIcon className="w-5 h-5 ml-5 text-gray-400 "  />
              </div>
              <input
                type="text"
                name="place"
                id="place"
                className={`${styles.input}`}
                placeholder="Example: Sri Lanka"
                value={placeName}
                onChange={(e) => setPlaceName(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className={`${styles.button}  flex items-center justify-center`}
            disabled={loading}
          >
            <Search className="-ml-0.5 h-5 w-5 text-gray-300" aria-hidden="true" />
            Search
          </button>
          {loading && <Loader className="w-6 h-6 ml-2 text-blue-800" />} {/* Display loading icon if loading is true */}
        </form>
        <div className="w-full mt-4">
          <textarea
            rows={10}
            className={`${styles.textarea}`}
            value={displayText}
            readOnly
          />
        </div>
      </main>
    </div>
  )
}
