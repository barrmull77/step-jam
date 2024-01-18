// import React, { createContext, useContext, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import React, { createContext, useContext, useState } from 'react';

export type SequenceType = {
    id: number | string;
};
export type SequencerContextType = {
    sequencerArray: SequenceType[];
    setSequencerArray: React.Dispatch<React.SetStateAction<SequenceType[]>>;
};

type SequencerProviderProps = {
    children: React.ReactNode;
};

// // Create a context
// export const SequencerContext = createContext({
//     sequencerArray: [],
//     setSequencerArray: () => {},
// });

// // Create a provider component
// export const SequencerProvider: React.FC<SequencerProviderProps> = ({ children }) => {
//   const [sequencerArray, setSequencerArray] = useState<SequencerContextType | null>(null)

//   return (
//     <SequencerContext.Provider value={{ sequencerArray, setSequencerArray }}>
//       {children}
//     </SequencerContext.Provider>
//   );
// };

// // Export a custom hook to use the context
// export const useSequencerContext = () => {
//   return useContext(SequencerContext);
// };

 
export const SequencerContext = createContext<SequencerContextType>({
        sequencerArray: [],
        setSequencerArray: () => {},
    });
export const SequencerProvider: React.FC<SequencerProviderProps> = ({ children }) => {
  const [sequencerArray, setSequencerArray] = useState<SequenceType[]>([]);
 
    return (
        <SequencerContext.Provider value={{ sequencerArray, setSequencerArray }}>
            {children}
        </SequencerContext.Provider>
    );
};