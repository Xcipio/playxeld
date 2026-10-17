import Link from "./LocalizedLink";
import { memore } from "../data/memore";
import { memoreJapanese } from "../data/memore.ja";
import { useI18n } from "../hooks/useI18n";

function MemoReShowcase() {
  const { locale, t } = useI18n();
  const content = locale === "ja" ? memoreJapanese : memore;
  return (
    <section id="memore" className="section memore-home-section">
      <div className="section-header memore-home-heading">
        <div>
          <p className="section-label">{t("Current project · iOS app")}</p>
          <h2 className="section-title memore-home-section-title">MemoRe</h2>
        </div>
        <div className="section-meta">
          <Link to="/memore">{locale === "ja" ? "詳しく見る →" : "完整介绍 →"}</Link>
        </div>
      </div>

      <article className="memore-home-card">
        <div className="memore-home-copy">
          <div className="memore-home-identity">
            <img
              className="memore-home-icon"
              src={content.iconSrc}
              alt={locale === "ja" ? "MemoRe アプリアイコン" : "MemoRe App 图标"}
              width="1024"
              height="1024"
            />
            <div>
              <p className="memore-home-status">
                <span aria-hidden="true" />{t("开发中")}
              </p>
              <p className="memore-home-chinese-name">{locale === "ja" ? "記憶を集め、つなぐ" : `中文名：${memore.chineseName}`}</p>
            </div>
          </div>

          <h3 className="memore-home-tagline">{content.tagline}</h3>
          <p className="memore-home-question">“{content.question}”</p>
          <p className="memore-home-summary">{content.introduction}</p>

          <div className="memore-home-actions">
            <Link to="/memore" className="memore-primary-link">
              {locale === "ja" ? "MemoRe を知る" : "走进 MemoRe"} <span aria-hidden="true">→</span>
            </Link>
            <span>{locale === "ja" ? "集める · つなぐ · 大切にする" : "采摘 · 连通 · 珍藏"}</span>
          </div>
        </div>

        <div className="memore-home-visual" aria-label={locale === "ja" ? "MemoRe の画面プレビュー" : "MemoRe 界面预览"}>
          <figure
            className="memore-home-screen memore-home-screen-primary"
            style={{ aspectRatio: `${memore.screenshots[0].width} / ${memore.screenshots[0].height}` }}
          >
            <img
              src={content.screenshots[0].src}
              alt={content.screenshots[0].alt}
              width={memore.screenshots[0].width}
              height={memore.screenshots[0].height}
              loading="lazy"
            />
          </figure>
          <figure
            className="memore-home-screen memore-home-screen-secondary"
            style={{ aspectRatio: `${memore.screenshots[10].width} / ${memore.screenshots[10].height}` }}
          >
            <img
              src={content.screenshots[10].src}
              alt={content.screenshots[10].alt}
              width={memore.screenshots[10].width}
              height={memore.screenshots[10].height}
              loading="lazy"
            />
          </figure>
        </div>
      </article>
    </section>
  );
}

export default MemoReShowcase;
