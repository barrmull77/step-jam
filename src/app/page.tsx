import Image from 'next/image';
import SequencerProviderWrapper from '@/components/sequencerProviderWrapper';

export default function Home() {

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SequencerProviderWrapper/>
      </main>
    </>
    
  )
}
