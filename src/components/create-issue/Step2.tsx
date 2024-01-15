import React, { useEffect } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { GithubOutlineIcon } from '../icons/github-outline';
import Image from '@/components/ui/image';
import { useAppSelector } from '@/store/store';
import Button from '@/components/ui/button/ButtonNew';

interface Step2Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export const Step2: React.FC<Step2Props> = ({ setStep }) => {
  const step1Data = useAppSelector((state) => state.issueCreate.step1);

  return (
    <div className="absolute z-[40] flex h-full w-full flex-col justify-between rounded-xl bg-newdark p-8 text-sm xl:text-base 3xl:text-lg">
      <div className="flex items-center gap-3 text-lg font-semibold xl:text-xl 3xl:text-2xl">
        <div className=" ">final preview</div>
        <QuestionMarkCircleIcon className="h-5 w-5 " />
      </div>
      <div className="flex w-full flex-col items-center gap-12 px-2 text-xs xl:text-sm 3xl:text-base">
        <div className="lineGradientHorizontalGray h-0.5 w-full"></div>
        <div className="flex w-full items-center justify-between">
          <div className="mr-2 whitespace-pre text-primary">project -</div>
          <div className="flex items-center gap-2">
            <GithubOutlineIcon className="h-6 w-6" />
            <div>{step1Data.projectName}</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="mr-2 whitespace-pre text-primary">token -</div>
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={step1Data.tokenImgLink}
                alt="icon"
                fill
                className="object-cover"
              />
            </div>
            <div>
              {step1Data.tokenName} ({step1Data.tokenSymbol})
            </div>
          </div>
        </div>
        <div className="flex w-full items-start justify-between">
          <div className="mr-2 whitespace-pre text-primary">
            first defiOS issue -
          </div>
          <div className="text-wrap text-end">{step1Data.issueTitle}</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="mr-2 whitespace-pre text-primary">
            issue incentives -
          </div>
          <div className="flex items-center gap-2">
            <div>{step1Data.tokenIncentive}</div>
            <div className="relative h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={step1Data.tokenImgLink}
                alt="icon"
                fill
                className="object-cover"
              />
            </div>
            <div>
              {step1Data.tokenSymbol}
            </div>
          </div>
        </div>
        <div className="lineGradientHorizontalGray h-0.5 w-full"></div>
      </div>

      <div className="px-6 text-center text-xs xl:text-sm 3xl:text-base">
        make sure you have some $SOL in your Solana wallet to pay for the
        transaction fees on the blockchain. defiOS does not charge any fees for
        creating projects and issues.
      </div>

      <div className="flex w-full items-center justify-end gap-2">
        <Button color="PrimaryOutline" onClick={() => setStep(1)}>
          back
        </Button>
        <Button color="PrimarySolid" onClick={() => setStep(3)}>
          create
        </Button>
      </div>
    </div>
  );
};

export default Step2;
