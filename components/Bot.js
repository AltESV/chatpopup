import Image from "next/image";
import troy from './images/troy.png'
import thinkingtroy from './images/thinkingtroy.png'
import { useState } from "react";
import Typewriter from 'typewriter-effect';

export default function Bot(props) {
  const { prompt, setPrompt, answer, loading, handleSubmit } = props;

  return (
    <div className="flex-col m-6">
      {loading ? (
        <Image src={thinkingtroy} height={100} width={100} />
      ) : (
        <Image src={troy} height={100} width={100} />
      )}
      <form className="m-6" onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder="message"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      
        <button type="submit" className="bg-sky-600 tracking-wider w-full text-center text-white font-bold cursor-pointer uppercase px-4 py-2 rounded-md hover:bg-sky-700 transition-colors block">Send</button>
      </form>
      {loading ? (
        <div className="flex justify-center my-6">
          <div className="w-6 h-6 border-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <h1 className="mt-6 text-center"><Typewriter
          options={{
            delay: 50,
          }}
          onInit={(typewriter) => {
            typewriter.typeString(answer)
              .start();
          }}
        /></h1>
      )}
    </div>
  );
}

  