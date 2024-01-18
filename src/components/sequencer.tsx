import React, { useState, useEffect, useRef, useContext } from 'react'
import { SequencerContext, SequencerContextType } from '../context/sequencerContext';
import styles from './sequencer.module.css'
import * as Tone from "tone";

const NOTE = "C2";

type Track = {
  id: string;
  note: Tone.Synth;
};

type Props = {
  id: string | number
  notes: Array<string | number>;
  numOfSteps?: number;
};

const Sequencer = ({ id, notes, numOfSteps = 16, }: Props) => {
    const {sequencerArray, setSequencerArray} = useContext<SequencerContextType>(SequencerContext);
    
    const [isPlaying, setIsPlaying] = useState(false);

    const tracksRef = useRef<Track[]>([]);
    const stepsRef = useRef<HTMLInputElement[][]>([[]]);
    const lampsRef = useRef<HTMLInputElement[]>([]);
    const seqRef = useRef<Tone.Sequence | null>(null);
    const buffersLoadedRef = useRef(false);
  
    const trackIds = [...Object.keys(notes)] as const;
    const stepIds = [...Array(numOfSteps).keys()] as const;

    const handleDeleteSequencer = () => {

      const newSequencerArray = sequencerArray.filter(sequence => sequence.id !== id);

      setSequencerArray(newSequencerArray);
    }

    useEffect(() => {
      const synth = new Tone.AMSynth({
        oscillator: {
          type: "sine"
        },
        envelope: {
          attack: 0.1
        }
      }).toDestination();
      // const piano = new Tone.Sampler({
            
      //   "C4":"samples/c4.mp3"
      // });
      const pitchShift = new Tone.PitchShift().toDestination();
      //piano.connect(pitchShift);

      seqRef.current = new Tone.Sequence(
        (time, step) => {
          notes.map((note: any,index) => {
              if (stepsRef.current[index]?.[step]?.checked) {
                synth.triggerAttackRelease(note, '16n');

                // const midi = 69 + 12*Math.log(note/440)/Math.log(2)
  
                // synth.triggerAttackRelease('C4', '16n');
                // // Detune each piano sample 
                // pitchShift.pitch = tune.note(midi-tune.scale.length);
                
              }
              if (lampsRef.current[step]) {
                lampsRef.current[step].checked = true;
              }
          });
        },
        [...stepIds],
        "16n"
      );  
      seqRef.current.start(0);

      return () => {
        seqRef.current?.dispose();
        synth.dispose();
        //piano.dispose();
      };
    }, [notes, numOfSteps]);

    return (
        <div className='container mx-auto mt-8 w-[600px]'>
             <div className='grid grid-cols-16 gap-1'>
                {stepIds.map((stepId) => (
                  <label key={stepId} className='flex items-center justify-center h-full py-4'>
                    <input
                        type="radio"
                        name="lamp"
                        id={"lamp" + "-" + stepId}
                        disabled
                        ref={(elm) => {
                          if (!elm) return;
                          lampsRef.current[stepId] = elm;
                        }}
                        className={`${styles.lampInput} ${styles.hiddenInput}`}
                    />
                    <div className={styles.lampContent} />
                  </label>
                ))}
            </div>
            <div className='cellList grid gap-4'>
                {trackIds.map((trackId) => (
                    <div key={trackId} className='grid grid-cols-16 gap-1 rounded-lg text-center font-mono text-sm font-bold leading-6 text-white cellRows' >
                        {stepIds.map((stepId) => {
                            const id = trackId + "-" + stepId;
                            const trackIndex = Number(trackId);
                            return (
                                <label key={id} className='cell'>
                                    <input
                                        id={id}
                                        type="checkbox"
                                        ref={(elm) => {
                                  
                                            if (!elm) return;
                                            if (!stepsRef.current[trackIndex]) {
                                              stepsRef.current[trackIndex] = [];
                                            }
                                            stepsRef.current[trackIndex][stepId] = elm;
                                        }}
                                        className={`${styles.hiddenInput} ${styles.cellInput}`}
                                    />
                                    <div className={`${styles.cellContent} rounded-lg p-4 shadow-lg`} />
                                </label>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className='mt-8 flex flex-row items-center justify-center'>
                <button onClick={handleDeleteSequencer} className='bg-[#dc2f02] hover:bg-[#8338ec] text-white font-bold py-2 px-4 w-32 rounded mx-10'>
                    Delete
                </button>
            </div>
            
        </div>
    )
}

export default Sequencer