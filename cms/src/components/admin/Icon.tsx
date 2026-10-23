import Image from 'next/image'

export default function Icon() {
  return (
    <span className="qualcus-icon">
      <Image src="/QUALCUS.png" alt="" width={22} height={30} unoptimized />
    </span>
  )
}
