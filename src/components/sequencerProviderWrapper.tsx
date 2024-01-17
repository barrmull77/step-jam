'use client'
import React from 'react'
import SequencerList from '@/components/sequencerList';
import { SequencerProvider } from '@/context/sequencerContext';

const SequencerProviderWrapper = () => {
  return (
    <SequencerProvider>
        <SequencerList />   
    </SequencerProvider>
  )
}

export default SequencerProviderWrapper