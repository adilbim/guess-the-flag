//import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [answer, setAnswer] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setAnswer(null);

    const result = await axios('http://localhost:4000/countries');
    const allCountries = result.data;

    setCountries(allCountries);
    setSelectedCountry(allCountries.find(e => e.selected));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const checkAnswer = () => {
    if (selectedCountry.code === answer) {
      alert('Correct!');
    }
    else {
      alert('Wrong, Try again!');
    }
    return fetchData();
  }

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div className="relative h-full text-lg max-w-prose mx-auto" aria-hidden="true">
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
          </svg>
        </div>
      </div>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
              Introducing
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Guess The Flag!
            </span>
          </h1>
          <br />
          <figure>
            { 
              isLoading
              ?
                <div className="flex justify-center items-center">
                  <div
                    className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"
                  ></div>
                </div>
              :
                <img
                  className="w-full rounded-lg border-2 border-black"
                  src={selectedCountry ? selectedCountry.flag : ''}
                  alt=""
                  width={1310}
                  height={873}
                />
            }
            <br />
            <span className="relative z-0 shadow-sm rounded-md flex justify-around">
              { !isLoading  ? countries.map((elm, i) => (
                <button
                  key={elm.code}
                  type="button"
                  onClick={() => setAnswer(elm.code)}
                  className={(answer === elm.code ? 'bg-blue-500' : '') + ' relative inline-flex items-center px-4 py-2 rounded border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none'}
                >
                 {elm.name}
                </button>
                )
              ) : ''
              }
            </span>
            </figure>
            { answer ?
              <div className="flex justify-center mt-5">
                <button
                  className="inline-flex items-center px-6 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => checkAnswer()}
                >
                  Submit
                </button>
              </div>
              : ''
            }
        </div>
      </div>
    </div>
  )
}

export default App;
