import Image from 'next/image';
import Script from 'next/script';
import SequencerProviderWrapper from '@/components/sequencerProviderWrapper';

export default function Home() {

  return (
    <>
     <Script
        src="/tuneScript/tune.js"
        strategy='beforeInteractive'
      />
      <Script
        src="/qwertyhancock/qwertyhancock.min.js"
        strategy='beforeInteractive'
      />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SequencerProviderWrapper/>
      </main>
    </>
    
  )
}
