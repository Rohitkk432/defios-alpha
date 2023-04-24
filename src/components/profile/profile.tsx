import { useState, useEffect } from 'react';
import { useCopyToClipboard } from 'react-use';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import ProfileTab from '@/components/profile/profile-tab';
import ToggleBtn from '@/components/ui/button/toggle';
import PortfolioCreator from '@/components/profile/portfolio-creator';

import { useAppSelector } from '@/store/store';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

export default function Profile() {
  const wallet = useWallet();
  const githubInfo = useAppSelector((state) => state.userInfo.githubInfo);

  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    //@ts-ignore
    copyToClipboard(wallet.publicKey?.toString());
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }

  const [portfolioType, setPortfolioType] = useState('Basic');

  const [sidebarData, setSidebarData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const firebase_jwt = useAppSelector(
    (state) => state.firebaseTokens.firebaseTokens.auth_creds
  );

  useEffect(() => {
    if (firebase_jwt === null || firebase_jwt === '') return;
    setIsLoading(true);
    axios
      .get('https://api-v1.defi-os.com/profile/contributions', {
        headers: {
          Authorization: firebase_jwt,
        },
      })
      .then((res) => {
        const issues_solved = res.data.filter(
          (item: any) => item?.contribution_type === 'inbound'
        ).length;
        const issues_rewarded = res.data.filter(
          (item: any) => item?.contribution_type === 'outbound'
        ).length;
        setSidebarData({
          issues_solved,
          issues_rewarded,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [firebase_jwt]);

  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 4xl:pt-12">
      <div className="shrink-0 border-dashed border-gray-700 md:w-72 md:border-r md:pr-7 lg:pr-10 2xl:w-80 4xl:w-96 4xl:pr-14">
        <div className="text-center md:text-left">
          <h2 className="text-xl font-medium tracking-tighter text-white xl:text-2xl">
            {githubInfo?.name}
          </h2>
          <div className="mt-1 text-sm font-medium tracking-tighter text-gray-400 xl:mt-3">
            @{githubInfo?.login}
          </div>
          <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-light-dark shadow-card md:mx-0 xl:mt-6">
            <div className="text truncate text-ellipsis bg-center pl-4 text-xs text-gray-300 sm:text-sm">
              {wallet.publicKey?.toString()}
            </div>
            <div
              title="Copy Address"
              className="ml-auto flex cursor-pointer items-center px-4 text-gray-300 transition hover:text-white"
              onClick={() => handleCopyToClipboard()}
            >
              {copyButtonStatus ? (
                <Check className="h-auto w-3.5 text-new-green" />
              ) : (
                <Copy className="h-auto w-3.5" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-700 py-5 text-center md:justify-start md:text-left xl:mt-12 xl:gap-8 xl:py-6">
          <div>
            <div className="mb-1.5 text-lg font-medium tracking-tighter text-white">
              {sidebarData?.issues_solved}
            </div>
            <div className="text-sm tracking-tighter text-gray-400">
              # issues solved
            </div>
          </div>
          <div>
            <div className="mb-1.5 text-lg font-medium tracking-tighter text-white">
              {sidebarData?.issues_rewarded}
            </div>
            <div className="text-sm tracking-tighter text-gray-400">
              # issues rewarded
            </div>
          </div>
        </div>
        <div className="border-y border-dashed border-gray-700 py-5 text-center md:text-left xl:py-6">
          <div className="mb-2 text-sm font-medium uppercase tracking-wider text-white">
            Top Solves
          </div>
          <div className="flex justify-center md:justify-start">
            {authorData?.coins?.map((item) => (
              <div key={item?.id} className="-ml-1 first:ml-0">
                <div className=" rounded-full border border-gray-500">
                  {item.element}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm tracking-tighter text-gray-400">
            {authorData.totalAmount} USDC
          </div>
          <div className="mt-4 text-sm tracking-tighter text-gray-400">
            Last Synced Date : {authorData.syncDate}
          </div>
        </div>
        <div className="border-y border-dashed border-gray-700 py-5 text-center md:text-left xl:py-6">
          <div className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
            Portfolio
          </div>
          <ToggleBtn
            className="w-24"
            label="Theme"
            option1={'Basic'}
            option2={'Advanced'}
            stateChoosen={portfolioType}
            setStateChoosen={setPortfolioType}
          />
          <PortfolioCreator portfolioType={portfolioType} isGenerated={false} />
        </div>
      </div>
      <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:pl-7 lg:pl-10 4xl:pl-14">
        <ProfileTab />
      </div>
    </div>
  );
}
