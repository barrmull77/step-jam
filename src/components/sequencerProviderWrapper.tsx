'use client'
import React from 'react'
import Script from 'next/script';
import SequencerList from '@/components/sequencerList';
import { SequencerProvider } from '@/context/sequencerContext';

declare global {
  interface Window {
      tune:any;
  }
}
declare var Tune: any

const SequencerProviderWrapper = () => {
  return (
    <SequencerProvider>
        <Script
          src="/tuneScript/tune.js"
          onLoad={() => {

            if (Tune ) {
              window.tune = new Tune();
            }
          }}
        />
        <SequencerList />   
    </SequencerProvider>
  )
}

export default SequencerProviderWrapper