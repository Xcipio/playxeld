import { memoreEnglish } from "./memore";
import { memoreStoriesEnglish } from "./memoreStories.en";

const screenshotLabels = [
  "記憶にもう一度出会う", "手がかりから記憶をたどる", "丸い写真で記憶を眺める", "写真の中から手がかりを探す",
  "種類ごとに記憶を整理する", "テーマからつながりを見つける", "時間をたどって思い出す", "色から記憶を探す",
  "名前をつけて記憶を残す", "その瞬間に合った方法で記録する", "記憶を自分だけの物語にする", "時間の流れに沿って物語を読む",
  "あの瞬間にもう一度戻る", "写真の向こうにある物語を残す", "細部を残し、その後の物語をつなぐ", "さまざまな場所から記憶に出会う",
  "心に残る作品を集める", "記憶の色を探す", "色の名前や情報から探す", "音でその時の空気を残す",
];

export const memoreJapanese = {
  ...memoreEnglish,
  tagline: "記憶を集め、つなぎ、大切にするアプリ",
  question: "写真だけでなく、記憶そのものを残せるアプリがあったら？",
  introduction: "そんな問いから、記憶にもう一度出会うためのアプリをつくりました。名前は MemoRe です。",
  memoryIngredients: "一つの記憶には、写真や動画だけでなく、言葉、人、場所、時間、色、音、音楽、そしてほんの小さな手がかりも残せます。",
  playfulFeatures: [
    "昔の記憶が、ある日ふと現れる",
    "写真の中の色を保存できる",
    "一つの記憶に、音や光を添えられる",
    "いくつかの記憶が、少しずつ一冊の物語になる",
    "しばらく会っていなかった記憶が、さまざまなかたちで戻ってくる",
  ],
  originStory: [
    "このアプリをつくるきっかけは、祖母のことを思い出したことでした。祖母は物静かな人で、家で一人過ごすことが多く、人づきあいや楽しみもあまりありませんでした。私が一年か二年に一度、中国へ帰って会いに行くと、普段は口にしないような気持ちを話してくれました。",
    "ある年、日本から花札とけん玉をお土産に持っていきました。祖母は子どものように喜んで遊び、その姿を見て、私は花札の遊び方を教えることにしました。覚える絵柄やルールは多かったのですが、80歳だった祖母は、一緒に遊びたいと一生懸命に覚えてくれました。あんなに楽しそうな姿を見るのは久しぶりでした。祖母が亡くなって何年も経ちますが、今でも花札を見るたびに祖母を思い出します。",
    "一つの物が、一人の人との記憶を呼び起こす。たくさんの物は、たくさんの人との記憶を連れ戻してくれるのかもしれません。そこには出来事や人物だけでなく、奥にしまわれた気持ちもあります。それらがつながって自分の過去になり、いまを静かにかたちづくり、次の一歩にぬくもりや慰めを与えてくれるのだと思います。",
    "MemoRe は、記憶の残し方を探るための試みです。物だけでなく、面白かった断片、忘れられない体験、残しておきたい出来事も記録しています。それらを通して当時の気持ちに触れ、暮らしに足跡を残してくれた人たちとのつながりを感じられたらと思っています。",
  ],
  screenshots: memoreEnglish.screenshots.map((image, index) => ({
    ...image,
    label: screenshotLabels[index],
    alt: `MemoRe の画面：${screenshotLabels[index]}（英語 UI）`,
  })),
};

const storyCopy: Record<string, { title: string; summary: string; feature: string }> = {
  "memory-colors": { title: "記憶を色で彩る", summary: "細かな記憶が薄れても、色はその時の気持ちを連れ戻してくれます。", feature: "カラーギャラリー" },
  echoes: { title: "あの人の言葉を、もう一度", summary: "そばにいなくなっても、その人の言葉がぬくもりや力をくれることがあります。", feature: "エコー" },
  "color-capture": { title: "記憶の色を集める", summary: "時間を止めるのではなく、色が消える前に、そっとすくい取る。", feature: "色の採集" },
  "fruit-moods": { title: "フルーツで気持ちを表す", summary: "今日の気持ちは、明日の記憶。感情を表す言葉より、一つの果物のほうが近いこともあります。", feature: "フルーツで気分を記録" },
};

// Only the introduction is localized. Story bodies and their original images are unchanged.
export const memoreStoriesJapanese = memoreStoriesEnglish.map((story) => ({
  ...story,
  ...storyCopy[story.slug],
  category: story.category === "Connect" ? "つなぐ" : story.category === "Cherish" ? "大切にする" : "集める",
  kind: story.kind === "Design Experiment" ? "デザインの試み" : "機能のストーリー",
}));
