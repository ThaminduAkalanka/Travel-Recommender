import { Inter } from 'next/font/google'
import {FormEvent, FormEventHandler, useState} from "react";
import {BarsArrowUpIcon, MapPinIcon} from "@heroicons/react/20/solid";
import styles from './Home.module.css';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [placeName, setPlaceName] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("https://travelcomp.tsapp.dev/comp", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pk_91ce36d034a20710c705c6d2ebefa0e0845293b20f951a60ff22cf8a4496ddab'
      },
      body: JSON.stringify({"variables":{"place":{"value":placeName}}})
    });
        
    setResponseText((await res.json()).result);
    setLoading(false);
  }

  return (
    <div className='flex'>
    <main className={`flex w-full min-h-screen flex-col items-center justify-between p-24 ${inter.className} ${styles.main}`}>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label htmlFor="place" className={`${styles.label}`}>
          Search for Country/City to get Recommendations
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
          <button
            type="submit"
            className={`${styles.button}`}
          >
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Search
          </button>
        </div>
        {loading && <p className={`${styles.loading}`}>Loading...</p>}
      </form>
      <div className="mt-4 w-1/2">
        <div className="mt-2">
        <textarea
          rows={30}
          className={`${styles.textarea}`}
          value={responseText}
          readOnly
        />
        </div>
      </div>
    </main>
    </div>
  )
}
