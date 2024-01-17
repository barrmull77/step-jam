'use client';
import React, { useEffect, useState } from 'react';
import Sequencer from './sequencer';


const SequencerContainer: React.FC = ({SequencerId}) => {
    const [selectedScaleOption, setSelectedScaleOption] = useState('default');
    const [originalNoteTrack, setOriginalNoteTrack] = useState(null);
    const [tune, setTune] = useState(null);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedScaleOption(event.target.value);
    };

    useEffect(() =>{
        setTune(new Tune());
    },[])

    useEffect(() => {
        if (tune) {
            if (selectedScaleOption !== 'default') {
                tune.loadScale(selectedScaleOption);
            }

            tune.mode.output = 'MIDI';

            if (tune.scale.length === 0) {
                setOriginalNoteTrack(tune.etmajor)
            } else {
                const scaleNotes: string[] = tune.scale.map((note: string, index: number) => tune.note(index + 1));
                setOriginalNoteTrack(scaleNotes);
            }
            console.log('tune---', tune.key);
        }

    }, [selectedScaleOption, tune])

    return (
        <div>
            <div>
            <label htmlFor="underline_select" className="sr-only">Underline select</label>
                <select id="underline_select" value={selectedScaleOption} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                    <option value='default'>Choose a scale</option>
                    <option value="ji_12">Just Intonation</option>
                    <option value="harm30">First 30 harmonics and subharmonics</option>
                    <option value="pyth_31">31-tone Pythagorean scale</option>
                    <option value="ptolemy">Intense Diatonic Syntonon, also Zarlino's scale</option>
                    <option value="couperin">Couperin modified meantone</option>
                    <option value="helmholtz_pure">Helmholtz</option>
                    <option value="partch_43">Harry Partch's 43-tone pure scale</option>
                    <option value="johnston_81">Ben Johnston's 81-note 5-limit scale of Sonata for Microtonal Piano</option>
                    <option value="young-lm_piano">LaMonte Young's Well-Tempered Piano</option>
                    <option value="xenakis_chrom">Xenakis's Byzantine Liturgical mode</option>
                    <option value="slendro">Observed Javanese Slendro scale</option>
                    <option value="harrison_5">Lou Harrison</option>
                    <option value="malkauns">Indian Raga</option>
                </select>
            </div>
            { originalNoteTrack && tune && <Sequencer 
                id={SequencerId}
                notes={originalNoteTrack}
                tune={tune}
            /> }
        </div>
    )
}

export default SequencerContainer