import React, { useState } from 'react';
import cn from 'classnames';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button/button';
import axios from 'axios';

interface ComingSoonProps {
  header: string;
  discription: string;
  videoLink: string;
  inputPrompt: string;
  submitPrompt: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  header,
  discription,
  videoLink,
  inputPrompt,
  submitPrompt,
}) => {
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-3 text-3xl">{header}</div>
        <div className="text-md w-[75%] text-center">{discription}</div>
      </div>
      <div className="m-5 h-[24rem] w-[40rem] bg-body">
        <iframe
          width="100%"
          height="100%"
          src={videoLink}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="flex w-full items-center justify-center gap-2">
        <Input
          className="w-[55%]"
          type="email"
          placeholder={inputPrompt}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={onSubmitHandler} shape="rounded">
          {submitPrompt}
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
