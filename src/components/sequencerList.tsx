'use client'
import React, { useState,useEffect, useContext } from 'react'
import * as Tone from "tone";
import { v4 as uuidv4 } from 'uuid';
import SequencerContainer from './sequencerContainer';
import { SequencerContext, SequencerProvider } from '@/context/sequencerContext';

// const SequencerContext = createContext({
//     sequencerArray: '',
//     setSequencerArray: () => {},
//   });

const SequencerList = () => {
    const {sequencerArray, setSequencerArray} = useContext(SequencerContext);

    const [isPlaying, setIsPlaying] = useState(false);

    const handleAddTrack = () => {
        setSequencerArray([...sequencerArray, { 
            id: uuidv4()
        }])
    }


    const handleStartClick = async () => {
        await Tone.start();
        if (Tone.Transport.state === "started") {
          Tone.Transport.pause();
          setIsPlaying(false);
        } else {
          await Tone.start();
          Tone.Transport.start();
          setIsPlaying(true);
        }
    };

    const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Tone.Transport.bpm.value = Number(e.target.value);
    };
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value));
    };

    useEffect(() => {
        setSequencerArray([{
            id: uuidv4()
        }]);
    }, [])
    

    return (
        <div className="sequencerList">
            <div className="flex flex-col items-center">
                <div className='sequencerControls mt-8 flex flex-row items-center justify-center'>
                    <button onClick={handleStartClick} className='bg-[#dc2f02] hover:bg-[#8338ec] text-white font-bold py-2 px-4 w-32 rounded mx-10'>
                        {isPlaying ? "Pause" : "Start"}
                    </button>
                    <div className='w-30 mx-10'>
                    <label className='fader'>
                        <span>BPM</span>
                        <input
                            type="range"
                            min={30}
                            max={300}
                            step={1}
                            onChange={handleBpmChange}
                            defaultValue={120}
                            className='w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">'
                        />
                    </label>
                    </div>
                    <div className='w-30 mx-10'>
                    <label className='fader'>
                        <span>Volume</span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={handleVolumeChange}
                            defaultValue={1}
                            className='w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">'
                        />
                    </label>
                    </div>
                
                </div>

                <div className="flex items-center p-4">
                        <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                        onClick={handleAddTrack}
                        >
                            Add Track
                        </button>
                
                </div>
            </div>
            
            { sequencerArray.length !== 0 && sequencerArray.map((sequencer) => (<SequencerContainer SequencerId={sequencer.id} key ={sequencer.id}/>))}
            
        </div>
    )
}

export default SequencerList