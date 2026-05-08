import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const DEFAULT_DATA = {
  hero: {
    titleEn: "Modern Physiotherapy for a Better Life",
    titleAr: "علاج طبيعي حديث لحياة أفضل",
    titleTr: "Daha İyi Bir Yaşam İçin Modern Fizyoterapi",
    subtitleEn: "Helping you recover, move better, and live pain-free with expert care and personalized treatments.",
    subtitleAr: "نساعدك على التعافي، التحرك بشكل أفضل، والعيش بدون ألم مع رعاية خبيرة وعلاجات مخصصة.",
    subtitleTr: "Uzman bakımı ve kişiselleştirilmiş tedavilerle iyileşmenize, daha iyi hareket etmenize ve ağrısız yaşamanize yardımcı oluyoruz.",
  },
  about: {
    contentEn: "Dr. Mohamed Tamer is a highly skilled physiotherapist specializing in sports injuries and rehabilitation. With years of experience, he has helped hundreds of patients regain their mobility.",
    contentAr: "د. محمد تامر هو أخصائي علاج طبيعي ماهر متخصص في الإصابات الرياضية والتأهيل. مع سنوات من الخبرة، ساعد مئات المرضى على استعادة حركتهم.",
    contentTr: "Dr. Mohamed Tamer, spor yaralanmaları ve rehabilitasyon konusunda uzmanlaşmış oldukça yetenekli bir fizyoterapisttir. Yılların deneyimiyle yüzlerce hastanın hareket kabiliyetini geri kazanmasına yardımcı olmuştur.",
  },
  certificates: [
    { id: 1, title: "Doctor of Physical Therapy", year: "2020" },
    { id: 2, title: "Manual Therapy Specialist", year: "2021" },
  ],
  accomplishments: [
    { id: 1, title: "1000+ Successful Rehabilitations" },
    { id: 2, title: "Best Physiotherapist Award 2023" },
  ],
  socials: {
    instagram: "",
    facebook: "",
    linkedin: "",
    whatsapp: "",
  },
  contact: {
    email: "dr.mohamed.tamer@example.com",
    phone: "",
  }
};

export const useLandingData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'landing', 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          await setDoc(docRef, DEFAULT_DATA);
          setData(DEFAULT_DATA);
        }
      } catch (error) {
        console.error("Error fetching landing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateData = async (newData) => {
    try {
      const docRef = doc(db, 'landing', 'data');
      await setDoc(docRef, newData);
      setData(newData);
      return true;
    } catch (error) {
      console.error("Error updating landing data:", error);
      return false;
    }
  };

  return { data, loading, updateData };
};
