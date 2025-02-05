'use client'

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import articles from "../../../content/articles.json";
import styles from "./article.module.css";
import Logo from "@/modules/icons/Logo";

interface ArticleContent {
  title: string;
  content: {
    paragraph?: string;
    intro?: string;
    header?: string;
  }[];
}

interface Articles {
  tr: Record<string, ArticleContent>;
}

const articlesData: Articles = articles;

export default function Article() {
  const params = useParams() as { title: string }; // Type assertion to ensure correct structure
  const router = useRouter();
  const pathname = usePathname();

  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [readTime, setReadTime] = useState(5);
  const [whatsapp, setWhatsapp] = useState(-1);
  const [selectedText, setSelectedText] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const articleData = articlesData.tr[params?.title];
    if (articleData) {
      setArticle(articleData);
    } else {
      router.push("/404");
    }
  }, [params?.title]);

  useEffect(() => {
    const letterCount = article?.content.reduce(
      (acc, block) => acc + (block.intro ?? "" + block.paragraph ?? "").length,
      0
    );
    setReadTime(Math.ceil((letterCount ?? 400) / 250));
  }, [article]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView", { page_path: window.location.pathname });
    }

    document.addEventListener("mouseup", () => {
      let selectedText = window.getSelection()?.toString();
      if (selectedText) {
        setSelectedText(selectedText);
      } else setSelectedText(undefined);
    });

    return () => {
      document.removeEventListener("mouseup", () => {});
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          window.scrollTo({
            top: (element?.offsetTop ?? 1000) - 100,
            behavior: "smooth",
          });
          if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(element);
            if (selection) {
              selection.removeAllRanges();
              selection.addRange(range);
            }
          }
        }
      }, 1000);
    }
    setWhatsapp(parseInt(hash.split("paragraph")[1]));
  }, []);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.page}>
      <div
        style={{ position: "fixed", right: 20, top: 30, zIndex: 1000 }}
        onClick={() => router.push("/")}
      >
        <Logo type="" />
      </div>

      <div className={styles.title}>
        <div className={styles.wrap}>
          {article.title ?? ""}
          <br />
          <span className={styles.subnote}>{readTime} dk'lik okuma</span>
        </div>
      </div>

      {article.content.map((section, index) => (
        <div
          key={"paragraph" + (index + 1)}
          className={styles.block}
          id={"paragraph" + (index + 1)}
        >
          <div className={styles.wrap}>
            {section.header && <h2 className={styles.subtitle}>{section.header}</h2>}

            {section.paragraph && (
              <div
                className={styles.paragraph}
                onClick={() => setWhatsapp(whatsapp == index + 1 ? -1 : index + 1)}
                style={
                  whatsapp == index + 1
                    ? { color: "#fff", padding: "3rem 0rem 2rem 0rem" }
                    : {}
                }
              >
                {section.intro && <strong className={styles.intro}>{section.intro}</strong>}
                {section.paragraph}

                <a
                  id="whatsapp"
                  style={whatsapp == index + 1 ? { display: "flex", opacity: 1 } : {}}
                  className={styles.whatsapp}
                  href={
                    "https://wa.me/905102200282?text=" +
                    (selectedText ?? (section.intro ?? "" + section.paragraph ?? "")) +
                    " https://duhabum.com/article/" +
                    params.title +
                    "%23paragraph" +
                    (index + 1)
                  }
                >
                  <svg
                    width="38"
                    height="38"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Content */}
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      ))}

      <div
        className={styles.block}
        style={{ width: "100%", margin: 0, paddingTop: "8rem", fontSize: "1rem", opacity: 0.6 }}
      >
        <div className={styles.wrap}>
          +90 545 470 82 86
          <br />
          Merkez Mah. Hacı Alı Sk. NO:22 KAPI NO:5
          <br />
          DALAMAN/ MUĞLA
        </div>
      </div>
    </main>
  );
}
