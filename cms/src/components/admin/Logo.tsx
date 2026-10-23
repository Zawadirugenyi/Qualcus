import Image from 'next/image'

export default function Logo() {
  return (
    <span className="qualcus-logo">
      <Image src="/QUALCUS.png" alt="Qualcus" width={63} height={84} unoptimized priority />
    </span>
  )
}
