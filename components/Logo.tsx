import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Link href="/" passHref>
      <div className="flex items-center space-x-2 cursor-pointer">
        <Image
          src="/Fairform.png"
          alt="FairForm logo"
          width={size}
          height={size}
          priority
        />
        <span className="font-semibold text-xl text-black">FairForm.</span>
      </div>
    </Link>
  );
}
