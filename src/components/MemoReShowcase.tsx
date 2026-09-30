import { Link } from "react-router-dom";
import { memore } from "../data/memore";

function MemoReShowcase() {
  return (
    <section id="memore" className="section memore-home-section">
      <div className="section-header memore-home-heading">
        <div>
          <p className="section-label">CURRENT PROJECT · IOS APP</p>
          <h2 className="section-title memore-home-section-title">MemoRe</h2>
        </div>
        <div className="section-meta">
          <Link to="/memore">完整介绍 →</Link>
        </div>
      </div>

      <article className="memore-home-card">
        <div className="memore-home-copy">
          <div className="memore-home-identity">
            <img
              className="memore-home-icon"
              src={memore.iconSrc}
              alt="MemoRe App 图标"
              width="1024"
              height="1024"
            />
            <div>
              <p className="memore-home-status">
                <span aria-hidden="true" />开发中
              </p>
              <p className="memore-home-chinese-name">中文名：{memore.chineseName}</p>
            </div>
          </div>

          <h3 className="memore-home-tagline">{memore.tagline}</h3>
          <p className="memore-home-question">“{memore.question}”</p>
          <p className="memore-home-summary">{memore.introduction}</p>

          <div className="memore-home-actions">
            <Link to="/memore" className="memore-primary-link">
              走进 MemoRe <span aria-hidden="true">→</span>
            </Link>
            <span>采摘 · 连通 · 珍藏</span>
          </div>
        </div>

        <div className="memore-home-visual" aria-label="MemoRe 界面预览">
          <figure className="memore-home-screen memore-home-screen-primary">
            <img
              src={memore.screenshots[0].src}
              alt={memore.screenshots[0].alt}
              width="1172"
              height="1564"
              loading="lazy"
            />
          </figure>
          <figure className="memore-home-screen memore-home-screen-secondary">
            <img
              src={memore.screenshots[3].src}
              alt={memore.screenshots[3].alt}
              width="1172"
              height="1564"
              loading="lazy"
            />
          </figure>
        </div>
      </article>
    </section>
  );
}

export default MemoReShowcase;
