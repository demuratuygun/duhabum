'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import MakeOffer from "@/modules/components/dialogue/MakeOffer";
import Checkout from "@/modules/components/dialogue/Checkout";
import Payment from "@/modules/components/Payment";
import packages from '../../../../content/package.json';
import AskText from "@/modules/components/dialogue/AskText";

const useLink = false;

export default function Form() {

  const router = useRouter();
  const params = useParams(); // Fetch params asynchronously
  const [data, setData] = useState<any>({});
  const [page, setPage] = useState(0);

  const packageId = parseInt(params.packageId as string);
  const monthParam = params.month;
  const month = Array.isArray(monthParam) ? monthParam[0] : monthParam ?? "";


  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const setObject = (theObj: any, direction: number) => {
    setData((prevData: any) => {
      let d = { ...prevData };
      for (const [key, value] of Object.entries(theObj)) d[key] = value;
      return d;
    });
    setPage((prevPage) => prevPage + direction);
  };

  const generateLink = async () => {
    if (
      !data?.checkout?.option?.duration ||
      !data?.checkout?.option?.plan ||
      !data?.checkout?.option?.price
    ) {
      return 'paket tanimli degil';
    }

    var amount = Math.floor(
      (data.discounts ?? []).reduce(
        (a: number, b: any) => a * (100 - b.rate) / 100,
        data.checkout.option.price
      )
    );

    const response = await fetch('/api/GenerateLink', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Duhabum ${data.checkout.option.duration} aylık ${data.checkout.option.plan} Plan`,
        price: amount * 100,
        email: data.email,
      }),
    });
    let generateLinkRespond = await response.json();
    console.log(generateLinkRespond);
    router.push(generateLinkRespond.link);
  };

  useEffect(() => {
    if (page < 0) router.back();
    if (useLink && page === 2) {
      generateLink();
    } else if (page >= questions.length) router.push("/");
  }, [page]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView', { page_path: window.location.pathname });

      // Track AddToCart event
      let trackobj = {
        content_name: month + ' Aylık Duhabum ' + packages.tr[packageId].plan + ' Paketi',
        content_ids: packageId,
        content_type: 'product',
        value: packages.tr[packageId].prices[packages.tr[packageId].duration.indexOf(parseInt(month))],
        currency: 'TL',
      };
      console.log(trackobj);
      window.fbq('track', 'AddToCart', trackobj);
    }

    let d: any = JSON.parse(localStorage.getItem('data') ?? '{}');
    setData({ ...data, ...d, package_id: packageId });
  }, []);

  const questions = [
    <MakeOffer
      plan={packages.tr[packageId]}
      months={parseInt(month)}
      setObject={(theList, direction) => setObject(theList, direction)}
    />,
    <Checkout
      setObject={(theList, direction) => setObject(theList, direction)}
      data={data.checkout ?? {}}
    />,
    useLink ? (
      <div>Ödeme sayfasına yönlendiriliyorsunuz</div>
    ) : (
      <AskText
        setObject={(theList, direction) => setObject(theList, direction)}
        key="name"
        question="iletişim bilgileri"
        entries={[
          { value: data["name"] ?? "", key: "name", example: ['isim soyisim', 'duha duman'], verify: "^[a-zA-ZçÇüÜğĞİiıIşŞöÖ ]{3,100}$" },
          { value: data["email"] ?? "", key: "email", example: ['eposta girin'], verify: "^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
          { value: data["phone"] ?? "", key: "phone", example: ['telefon girin', '0 555 555 55 55'], verify: '^[0-9 ()-]{5,24}$' },
        ]}
      />
    ),
    <Payment
      data={data}
      setObject={(theList, direction) => setObject(theList, direction)}
      name={data["name"] ?? ""}
    />,
  ];

  return (
    <main className={"center flex-col md:flex-row"} style={{ fontSize: "1.1rem" }}>
      {questions[page]}
    </main>
  );
}
