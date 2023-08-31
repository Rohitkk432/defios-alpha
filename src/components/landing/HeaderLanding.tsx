import React, { useState } from 'react';
import SigninBtn from '@/components/landing/SigninBtn';
import axios from '@/lib/axiosClient';
import Input from '@/components/ui/forms/input';

interface HeaderLandingProps {}

export const HeaderLanding: React.FC<HeaderLandingProps> = ({}) => {
  const [email, setEmail] = useState('');
  const onSubmitHandler = () => {
    if (email === '' || !email.includes('@')) return;
    axios
      .post(
        `https://api-v1.defi-os.com/waitlist/jobs?email=${email}&wl_type=jobs`
      )
      .then((res) => {
        setEmail('');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="z-[20] mt-16 flex w-screen flex-col items-center">
      <div className="text-center text-5xl font-black text-white 2xl:text-6xl">
        like uber, but for <br />
        open source software
      </div>
      <div className="mt-10 text-center text-lg font-medium text-gray-400 xl:text-xl 3xl:text-2xl">
        defiOS helps you pay developers directly in tokens and stablecoins for
        their contributions.
        <br />
        tokenize any repository, stake tokens on issues and effectively
        incentivize any open source project. <br />
      </div>
      <div className="mt-12">
        {/* <SigninBtn /> */}
        <div className="flex gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[30rem]"
            inputClassName="!border-body drop-shadow-xl"
          />
          <div
            className="text-newdark flex w-fit cursor-pointer items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold xl:text-base 3xl:text-lg"
            onClick={onSubmitHandler}
          >
            Join Waitlist
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLanding;
