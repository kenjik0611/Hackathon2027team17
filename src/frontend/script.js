const pointPerQuestion = 10;

const modes = {
  moral: {
    label: "モラルチェッカー",
    category: "モラルチェック",
    description: "日常の迷いやすい場面で、相手や周囲に配慮した選択を選びます。"
  },
  insight: {
    label: "男心理解ゲーム",
    category: "男心理解ゲーム",
    description: "恋愛・友人関係・会話で起きやすい受け取り方を、決めつけずに読む練習をします。"
  }
};

const difficultyLabels = {
  all: "ミックス",
  easy: "やさしめ",
  normal: "ふつう",
  hard: "むずかしめ"
};

const questionAngles = [
  {
    label: "基本判断",
    difficulty: "easy",
    prompt: "この場面で、最初に取る対応として最も適切なのはどれですか。"
  },
  {
    label: "トラブル回避",
    difficulty: "normal",
    prompt: "あとから誤解やトラブルになりにくい対応はどれですか。"
  },
  {
    label: "相手目線",
    difficulty: "normal",
    prompt: "相手の立場を一番尊重できる対応はどれですか。"
  },
  {
    label: "説明責任",
    difficulty: "hard",
    prompt: "第三者に説明しても納得されやすい対応はどれですか。"
  }
];

const moralScenarios = [
  {
    title: "SNS写真の投稿",
    situation: "友人の顔がはっきり写った写真をSNSに載せたいと思いました。",
    correct: "投稿してよいか本人に確認してから載せる",
    wrong: ["仲が良いので確認せずに載せる", "顔を少し隠せば確認なしで載せる", "自分のアカウントなので自由に載せる"],
    explanation: "写真の公開範囲は本人にも影響します。投稿前の確認が安全です。"
  },
  {
    title: "グループチャットの陰口",
    situation: "グループチャットで、いない人の失敗を笑う流れになっています。",
    correct: "話題を変えるか、本人が傷つく内容は控えようと伝える",
    wrong: ["空気を壊さないように一緒に笑う", "スクショして別の友人に送る", "もっと面白い言い方で広げる"],
    explanation: "その場にいない人を傷つける会話は広がりやすいため、早めに止めるのが安全です。"
  },
  {
    title: "レポートの共有",
    situation: "友人から、提出前のレポートをそのまま見せてほしいと頼まれました。",
    correct: "考え方や参考資料は共有し、丸写しにならない形で助ける",
    wrong: ["自分のファイルをそのまま渡す", "名前だけ変えればよいと伝える", "提出後なら問題ないので全文を送る"],
    explanation: "学習の助けと不正利用の境界を分けることが大切です。"
  },
  {
    title: "バイトのシフト変更",
    situation: "急用でアルバイトのシフトに入れなくなりました。",
    correct: "早めに責任者へ連絡し、代替案や交代候補を相談する",
    wrong: ["直前まで黙っておく", "友人にだけ伝えて終わりにする", "体調不良とだけ嘘をつく"],
    explanation: "早い共有と代替案の提示が、周囲への負担を減らします。"
  },
  {
    title: "電車の優先席",
    situation: "混んだ電車で優先席に座っていると、近くに高齢の人が立っています。",
    correct: "必要そうなら声をかけて席を譲る",
    wrong: ["スマホを見るふりをして気づかないことにする", "自分も疲れているので絶対に譲らない", "周りの誰かが譲るまで待つ"],
    explanation: "優先席では、必要としている人に気づいた時点で配慮するのが自然です。"
  },
  {
    title: "落とし物を見つけた",
    situation: "教室で誰かの財布を見つけました。",
    correct: "中身を見ずに先生や受付など管理できる人へ届ける",
    wrong: ["誰のものか確認するため中身を細かく見る", "持ち主が来るまで自分で預かる", "現金だけ確認してから届ける"],
    explanation: "落とし物は中身を見ないまま、公的に管理できる場所へ届けるのが安全です。"
  },
  {
    title: "お釣りが多い",
    situation: "買い物後に、お釣りを500円多く受け取っていたことに気づきました。",
    correct: "気づいた時点で店に戻るか連絡する",
    wrong: ["少額なのでそのままにする", "店員側のミスなので自分には関係ない", "次に行ったとき覚えていたら返す"],
    explanation: "自分が得をするミスでも、気づいた時点で返す行動が誠実です。"
  },
  {
    title: "遅刻しそうな待ち合わせ",
    situation: "待ち合わせに10分ほど遅れそうです。",
    correct: "分かった時点で到着見込みと謝罪を伝える",
    wrong: ["着いてから謝ればよいので連絡しない", "数分なら何も言わない", "相手も遅れるかもしれないので放置する"],
    explanation: "相手の時間を尊重するには、早めの連絡が一番効果的です。"
  },
  {
    title: "借りた物を壊した",
    situation: "友人から借りた充電器を壊してしまいました。",
    correct: "すぐに正直に伝え、弁償や交換を相談する",
    wrong: ["元から壊れていたことにする", "黙って似たものを返す", "気づかれなければ言わない"],
    explanation: "借りた物の破損は、早く正直に共有するほど信頼を保ちやすくなります。"
  },
  {
    title: "ゴミの分別",
    situation: "急いでいて、分別が必要なゴミをまとめて捨てそうになりました。",
    correct: "少し手間でもルールどおりに分別する",
    wrong: ["一回くらいならまとめて捨てる", "誰かが直してくれると考える", "見られていなければ問題ないと考える"],
    explanation: "見えにくい場面でもルールを守ることが、公共の負担を減らします。"
  },
  {
    title: "公共Wi-Fiでの作業",
    situation: "カフェの公共Wi-Fiで、友人の個人情報が入った資料を扱う必要があります。",
    correct: "安全な通信環境に移るか、個人情報を開かない形にする",
    wrong: ["急ぎなのでそのまま開く", "画面を明るくしたまま作業する", "周りに見えなければ問題ないと考える"],
    explanation: "個人情報は通信環境や画面の見え方にも配慮が必要です。"
  },
  {
    title: "友人の秘密",
    situation: "友人から他の人には言わないでほしい話を聞きました。",
    correct: "本人の許可なく他人へ話さない",
    wrong: ["信頼できる一人になら話す", "名前を伏せれば話してよい", "面白い話なのでグループで共有する"],
    explanation: "秘密は本人が公開範囲を決めるものです。許可なく広げないことが大切です。"
  },
  {
    title: "共同作業の遅れ",
    situation: "チーム制作で、一人の作業だけ遅れています。",
    correct: "状況を聞き、作業を小さく分けて支援策を考える",
    wrong: ["全体チャットで強く責める", "黙ってその人の担当を全部作り直す", "自分の担当だけ終わらせて関わらない"],
    explanation: "遅れは責めるよりも原因確認と分担調整のほうが解決に近づきます。"
  },
  {
    title: "アルバイト中のミス",
    situation: "アルバイト中に小さなミスをしましたが、まだ誰にも気づかれていません。",
    correct: "早めに責任者へ報告し、対応方法を確認する",
    wrong: ["小さいミスなので隠す", "次から気をつければよいので何もしない", "他の人のせいにする準備をする"],
    explanation: "小さなミスほど早く共有すれば、被害を広げずに済みます。"
  },
  {
    title: "飲み会の会計",
    situation: "飲み会で、自分だけ明らかに多く食べたり飲んだりしました。",
    correct: "多めに払う意思を伝え、会計のバランスを相談する",
    wrong: ["割り勘なので何も言わない", "気づかれないように早く帰る", "年上の人が払うべきだと考える"],
    explanation: "負担の偏りに気づいたら、自分から調整を提案すると公平です。"
  },
  {
    title: "画像の無断転載",
    situation: "ネットで見つけた画像を、発表資料に使いたくなりました。",
    correct: "利用条件を確認し、使える画像か引用方法を確認する",
    wrong: ["検索で出た画像なので自由に使う", "小さく載せれば問題ない", "出典を書かなければ気づかれない"],
    explanation: "画像には権利や利用条件があります。使用前の確認が必要です。"
  },
  {
    title: "試験の過去問",
    situation: "先輩から、非公開らしい試験問題のデータをもらえそうです。",
    correct: "利用してよい資料か確認し、怪しい場合は使わない",
    wrong: ["もらえる人だけ得をすればよい", "友人にも広げて公平にする", "ばれなければ問題ない"],
    explanation: "資料の入手経路が不明な場合は、不公平や規則違反の可能性を確認する必要があります。"
  },
  {
    title: "列への割り込み",
    situation: "急いでいるとき、友人が並んでいる列に入れてくれそうです。",
    correct: "周囲に迷惑がかかるなら最後尾に並ぶ",
    wrong: ["友人がいるので自然に入る", "急いでいる事情があるので割り込む", "誰も注意しなければ問題ない"],
    explanation: "列は並んでいる全員の時間に関わるため、見えない相手への配慮が必要です。"
  },
  {
    title: "備品の持ち帰り",
    situation: "学校や職場の余った備品を、自宅で使えそうだと思いました。",
    correct: "持ち帰ってよいものか管理者に確認する",
    wrong: ["余っているので黙って持ち帰る", "少量なら問題ないと考える", "みんなやっているので同じようにする"],
    explanation: "共有物は所有者や管理ルールを確認してから扱う必要があります。"
  },
  {
    title: "予約のキャンセル",
    situation: "予約した店に行けなくなりました。",
    correct: "分かった時点で店にキャンセル連絡を入れる",
    wrong: ["行かなければ自動でキャンセルになる", "面倒なので連絡しない", "予約時間を過ぎてから謝る"],
    explanation: "予約は店側の準備にも影響します。早めの連絡が最低限の配慮です。"
  },
  {
    title: "飲食店での長居",
    situation: "混んでいる飲食店で、食事後も長く話し続けています。",
    correct: "混雑状況を見て、必要なら席を空ける",
    wrong: ["客なので何時間いてもよい", "追加注文なしで閉店までいる", "待っている人は別の店に行けばよいと考える"],
    explanation: "自分の権利だけでなく、店や待っている人への影響も考える必要があります。"
  },
  {
    title: "夜の生活音",
    situation: "夜遅くに部屋で友人と通話しながら盛り上がっています。",
    correct: "時間帯を考えて声量を下げるか通話を切り上げる",
    wrong: ["自分の部屋なので自由に話す", "注意されるまで続ける", "楽しいので窓を開けたまま話す"],
    explanation: "生活音は周囲に届きます。時間帯に合わせた配慮が必要です。"
  },
  {
    title: "コミュニティのルール",
    situation: "イベント会場で、撮影禁止エリアを見つけました。",
    correct: "撮影禁止の理由を尊重し、その場所では撮らない",
    wrong: ["人が少ないので撮る", "SNSに載せなければ撮ってよい", "スタッフが見ていない間に撮る"],
    explanation: "禁止ルールには安全や権利の理由があります。見られていなくても守るべきです。"
  },
  {
    title: "AI利用の明記",
    situation: "課題作成でAIを使いましたが、提出ルールには利用時の明記が必要と書かれています。",
    correct: "ルールに従い、AIを使った範囲を明記する",
    wrong: ["自分で直したので明記しない", "ばれにくいので書かない", "友人も書いていないので合わせる"],
    explanation: "AI利用はルールに従って透明にすることで、公平性と信頼を保てます。"
  },
  {
    title: "画面のスクショ共有",
    situation: "面白い会話のスクショを友人に見せたくなりましたが、相手の名前が写っています。",
    correct: "相手が特定される情報を消し、必要なら共有許可を取る",
    wrong: ["仲間内だけなのでそのまま送る", "面白さが大事なので名前も残す", "すぐ消すつもりなので問題ない"],
    explanation: "スクショは簡単に広がります。相手が特定される情報は特に注意が必要です。"
  }
];

const insightScenarios = [
  {
    title: "返信が短い",
    situation: "相手からの返信が「了解」だけで、少しそっけなく見えました。",
    correct: "忙しい可能性も考え、必要なら軽く確認する",
    wrong: ["怒っていると決めつける", "同じように冷たく返す", "理由を長文で問い詰める"],
    explanation: "短文返信は忙しさや用件優先の場合もあります。決めつけない対応が安全です。"
  },
  {
    title: "既読が遅い",
    situation: "送ったメッセージがなかなか既読になりません。",
    correct: "相手の予定を考え、急ぎでなければ待つ",
    wrong: ["何度も追いメッセージを送る", "嫌われたと決めつける", "SNSのオンライン状況を細かく監視する"],
    explanation: "既読の速さだけで気持ちは判断できません。急ぎかどうかを分けると落ち着いて対応できます。"
  },
  {
    title: "悩み相談を受けた",
    situation: "相手から悩みを相談されましたが、助言がほしいのか話を聞いてほしいのか分かりません。",
    correct: "まず話を聞き、共感か解決策かを確認する",
    wrong: ["すぐに解決策を押し切る", "自分の経験談を長く話す", "重くならないように冗談で流す"],
    explanation: "相談で求める反応は人によって違います。先に確認するとすれ違いが減ります。"
  },
  {
    title: "予定を決める",
    situation: "遊ぶ予定を決めるとき、相手が「どこでもいいよ」と言いました。",
    correct: "候補を2つ出して、どちらが良いか聞く",
    wrong: ["本当に行きたい場所がないのか責める", "決める気がないと判断してやめる", "相手が具体案を出すまで待ち続ける"],
    explanation: "候補を絞ると、相手が選びやすくなり会話が進みます。"
  },
  {
    title: "プレゼント選び",
    situation: "相手へのプレゼントを選びたいですが、好みがはっきり分かりません。",
    correct: "普段の好みを探り、迷う場合は使いやすいものにする",
    wrong: ["自分が好きなものだけで選ぶ", "高ければ喜ぶと考える", "サプライズ性だけを優先する"],
    explanation: "相手目線で使いやすいかを考えると、外しにくくなります。"
  },
  {
    title: "褒め方",
    situation: "相手を褒めたいと思いましたが、外見だけを強く褒めるか迷っています。",
    correct: "行動や努力など、相手が受け取りやすい点も褒める",
    wrong: ["外見だけを何度も褒める", "照れ隠しでからかう", "褒めると調子に乗るので何も言わない"],
    explanation: "努力や行動への褒め言葉は、相手に圧を与えにくいことが多いです。"
  },
  {
    title: "趣味に誘う",
    situation: "自分の趣味に相手を誘いたいですが、相手が興味を持つか分かりません。",
    correct: "軽く誘い、断りやすい雰囲気も残す",
    wrong: ["絶対楽しいからと強く押す", "興味がないなら合わないと決める", "相手の予定を考えずに予約する"],
    explanation: "誘いは選択肢として出すと、相手が負担なく返事をしやすくなります。"
  },
  {
    title: "会話中の沈黙",
    situation: "会話中に少し沈黙が続きました。",
    correct: "沈黙を悪く捉えすぎず、自然に別の話題を出す",
    wrong: ["気まずいと決めつけて焦る", "相手が楽しんでいないと断定する", "無理に質問攻めにする"],
    explanation: "沈黙は必ずしも悪い意味ではありません。落ち着いて話題を変えるのが自然です。"
  },
  {
    title: "仕事後に疲れている",
    situation: "相手が仕事や授業のあとで疲れていそうです。",
    correct: "無理に話を広げず、休む選択肢も出す",
    wrong: ["テンションが低い理由を問い詰める", "自分との会話がつまらないと決める", "気分を上げようと長時間話す"],
    explanation: "疲れは気持ちとは別の要因です。休める余白を出すと負担が減ります。"
  },
  {
    title: "友人との予定を優先された",
    situation: "相手が先に入っていた友人との予定を優先しました。",
    correct: "先約を尊重し、別の日程を相談する",
    wrong: ["自分より友人が大事だと責める", "機嫌を悪くして連絡を止める", "予定を断らせようとする"],
    explanation: "先約を守る姿勢は誠実さでもあります。別日を相談するほうが関係を保ちやすいです。"
  },
  {
    title: "会った後の連絡",
    situation: "会ったあと、次の連絡をどうするか迷っています。",
    correct: "楽しかったことを短く伝え、相手が返しやすい形にする",
    wrong: ["返事が来るまで何度も送る", "駆け引きとして何日も無視する", "長文で不安を全部送る"],
    explanation: "短く前向きな連絡は、相手が返しやすく重くなりにくいです。"
  },
  {
    title: "悩みを言わない",
    situation: "相手が明らかに元気なさそうですが、理由を話しません。",
    correct: "話したくなったら聞くと伝え、無理に聞き出さない",
    wrong: ["隠し事だと責める", "答えるまで質問を続ける", "自分に関係ないなら放置すると言う"],
    explanation: "話す準備ができていないこともあります。選べる余白を残すと安心しやすいです。"
  },
  {
    title: "落ち込んでいる相手",
    situation: "相手が失敗して落ち込んでいます。",
    correct: "まず気持ちを受け止め、必要なら一緒に次の手を考える",
    wrong: ["すぐ切り替えろと言う", "自分ならそんな失敗しないと言う", "大したことないと決めつける"],
    explanation: "落ち込んでいるときは、正論より先に受け止めが必要な場合があります。"
  },
  {
    title: "忙しい時期",
    situation: "相手が忙しい時期で、会う頻度が減っています。",
    correct: "負担を増やさない形で、落ち着いたら会いたいと伝える",
    wrong: ["会わないなら気持ちがないと決める", "忙しさを疑う", "毎日長電話を求める"],
    explanation: "忙しさと好意は別の可能性があります。相手の負担を考えると関係を保ちやすいです。"
  },
  {
    title: "意見が違う",
    situation: "相手と考え方が違い、少し空気が悪くなりました。",
    correct: "違いを認めたうえで、相手の理由を聞く",
    wrong: ["自分が正しいと押し切る", "価値観が合わないとすぐ切る", "相手の意見を笑う"],
    explanation: "意見の違いは対立ではなく理解の材料にもなります。理由を聞く姿勢が大切です。"
  },
  {
    title: "相手が遅刻した",
    situation: "相手が待ち合わせに遅れて来ました。",
    correct: "事情を聞き、今後の連絡ルールを落ち着いて話す",
    wrong: ["その場で強く責め続ける", "何も言わずに不機嫌でいる", "仕返しで次回わざと遅れる"],
    explanation: "不満を伝える場合も、具体的な改善につながる話し方が有効です。"
  },
  {
    title: "否定された気がする",
    situation: "自分の提案に対して、相手が微妙な反応をしました。",
    correct: "どこが気になるのか確認し、別案も出す",
    wrong: ["自分を否定されたと決めつける", "機嫌を悪くして黙る", "相手の案も全部否定する"],
    explanation: "提案への反応は人格否定とは限りません。気になる点を聞くと前に進みます。"
  },
  {
    title: "一人時間",
    situation: "相手が一人の時間がほしいと言いました。",
    correct: "距離を置きたい理由を責めず、必要な時間を尊重する",
    wrong: ["自分を避けていると決めつける", "一人時間を許さない", "何度も連絡して確認する"],
    explanation: "一人時間は回復や整理のためにも必要です。尊重すると信頼につながります。"
  },
  {
    title: "SNSの反応が少ない",
    situation: "自分の投稿に相手から反応がありません。",
    correct: "SNS反応だけで関係を判断しない",
    wrong: ["見ているはずなのに無視されたと責める", "反応を催促する", "同じように相手の投稿を無視する"],
    explanation: "SNSの反応頻度は人によって違います。関係性の判断材料にしすぎないほうが安全です。"
  },
  {
    title: "会計の分け方",
    situation: "食事の会計で、どう払うか少し迷っています。",
    correct: "相手の希望を聞き、負担が偏らない形で相談する",
    wrong: ["当然相手が払うべきだと考える", "払いたくないので黙る", "金額の話を避けて相手に任せる"],
    explanation: "会計は価値観が出やすいので、自然に確認すると誤解が減ります。"
  },
  {
    title: "何食べたいか聞かれた",
    situation: "相手から「何食べたい？」と聞かれました。",
    correct: "食べたい系統を1つか2つ出して相手にも聞く",
    wrong: ["何でもいいと言い続ける", "相手が決めるべきだと考える", "あとで店に文句を言う"],
    explanation: "候補を少し出すと、相手が決める負担を減らせます。"
  },
  {
    title: "サプライズ",
    situation: "相手にサプライズをしたいですが、驚かされるのが得意か分かりません。",
    correct: "相手の性格や予定への影響を考え、小さめにする",
    wrong: ["大きいほど喜ぶと考える", "人前で派手に驚かせる", "相手の都合より演出を優先する"],
    explanation: "サプライズは相手の好みによって負担にもなります。規模の調整が大切です。"
  },
  {
    title: "連絡頻度",
    situation: "自分は毎日連絡したいですが、相手はそこまで頻繁ではなさそうです。",
    correct: "互いに無理のない頻度を話し合う",
    wrong: ["好きなら毎日返すべきだと言う", "返信速度で愛情を測る", "連絡が少ないなら冷めたと決める"],
    explanation: "心地よい連絡頻度は人によって違います。話し合うほうが安定します。"
  },
  {
    title: "感謝を伝える",
    situation: "相手が小さな手助けをしてくれました。",
    correct: "短くても具体的に感謝を伝える",
    wrong: ["当たり前なので言わない", "照れるので茶化す", "もっと大きなことをしてくれた時だけ言う"],
    explanation: "小さな感謝を言葉にすると、相手の行動を大切に受け取れます。"
  },
  {
    title: "距離感の確認",
    situation: "相手との距離を縮めたいですが、相手のペースが分かりません。",
    correct: "相手の反応を見ながら、無理に急がず少しずつ近づく",
    wrong: ["一気に距離を詰める", "反応が薄くても押し続ける", "自分のペースに合わせてもらう"],
    explanation: "距離感は双方のペースが大切です。急ぎすぎないほうが安心感につながります。"
  }
];

function expandQuestionBank(type, scenarios) {
  return scenarios.flatMap((scenario, scenarioIndex) => {
    return questionAngles.map((angle, angleIndex) => ({
      id: `${type}-${scenarioIndex + 1}-${angleIndex + 1}`,
      type,
      category: modes[type].category,
      difficulty: angle.difficulty,
      title: `${scenario.title}：${angle.label}`,
      text: `${scenario.situation} ${angle.prompt}`,
      correctAnswer: scenario.correct,
      wrongAnswers: scenario.wrong,
      explanation: scenario.explanation
    }));
  });
}

const questionBank = {
  moral: expandQuestionBank("moral", moralScenarios),
  insight: expandQuestionBank("insight", insightScenarios)
};

const elements = {
  totalScore: document.getElementById("total-score"),
  correctCount: document.getElementById("correct-count"),
  progressCount: document.getElementById("progress-count"),
  targetCount: document.getElementById("target-count"),
  startPanel: document.getElementById("start-panel"),
  gamePanel: document.getElementById("game-panel"),
  resultPanel: document.getElementById("result-panel"),
  modeButtons: document.querySelectorAll(".mode-tab"),
  modeDescription: document.getElementById("mode-description"),
  questionCountSelect: document.getElementById("question-count-select"),
  difficultySelect: document.getElementById("difficulty-select"),
  feedbackToggle: document.getElementById("feedback-toggle"),
  shuffleToggle: document.getElementById("shuffle-toggle"),
  startButton: document.getElementById("start-button"),
  quitButton: document.getElementById("quit-button"),
  questionCategory: document.getElementById("question-category"),
  questionCount: document.getElementById("question-count"),
  questionDifficulty: document.getElementById("question-difficulty"),
  progressBar: document.getElementById("progress-bar"),
  questionTitle: document.getElementById("question-title"),
  questionText: document.getElementById("question-text"),
  answerOptions: document.getElementById("answer-options"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  finalScore: document.getElementById("final-score"),
  finalMaxScore: document.getElementById("final-max-score"),
  finalCorrectCount: document.getElementById("final-correct-count"),
  finalQuestionCount: document.getElementById("final-question-count"),
  finalModeName: document.getElementById("final-mode-name"),
  finalDifficulty: document.getElementById("final-difficulty"),
  finalBankSize: document.getElementById("final-bank-size"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list"),
  restartButton: document.getElementById("restart-button"),
  backToStartButton: document.getElementById("back-to-start-button"),
  bankSummary: document.getElementById("bank-summary")
};

const state = {
  selectedMode: "moral",
  selectedDifficulty: "all",
  questionLimit: 10,
  selectedQuestions: [],
  currentIndex: 0,
  selectedIndex: null,
  totalScore: 0,
  correctCount: 0,
  answerLog: [],
  poolSize: 0
};

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function sampleUnique(items, count) {
  return shuffleArray(items).slice(0, count);
}

function prepareQuestion(question) {
  const answers = [
    { text: question.correctAnswer, isCorrect: true },
    ...question.wrongAnswers.map((answer) => ({ text: answer, isCorrect: false }))
  ];

  const preparedAnswers = elements.shuffleToggle.checked ? shuffleArray(answers) : answers;
  return {
    ...question,
    answers: preparedAnswers,
    correctIndex: preparedAnswers.findIndex((answer) => answer.isCorrect)
  };
}

function updateModeUI() {
  const mode = modes[state.selectedMode];
  elements.modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === state.selectedMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  elements.modeDescription.textContent = mode.description;
  elements.modeDescription.classList.toggle("insight", state.selectedMode === "insight");
}

function updateBankSummary() {
  elements.bankSummary.textContent = `各${questionBank.moral.length}問`;
}

function updateHeaderStatus() {
  elements.totalScore.textContent = state.totalScore;
  elements.correctCount.textContent = state.correctCount;
  elements.progressCount.textContent = state.answerLog.length;
  elements.targetCount.textContent = state.questionLimit;
}

function resetScoreState() {
  state.currentIndex = 0;
  state.selectedIndex = null;
  state.totalScore = 0;
  state.correctCount = 0;
  state.answerLog = [];
  updateHeaderStatus();
}

function getPoolForCurrentSettings() {
  const modePool = questionBank[state.selectedMode];
  if (state.selectedDifficulty === "all") {
    return modePool;
  }

  const filteredPool = modePool.filter((question) => question.difficulty === state.selectedDifficulty);
  return filteredPool.length >= state.questionLimit ? filteredPool : modePool;
}

function startGame() {
  state.questionLimit = Number(elements.questionCountSelect.value);
  state.selectedDifficulty = elements.difficultySelect.value;
  resetScoreState();

  const pool = getPoolForCurrentSettings();
  state.poolSize = pool.length;
  state.selectedQuestions = sampleUnique(pool, state.questionLimit).map(prepareQuestion);
  state.questionLimit = state.selectedQuestions.length;

  elements.startPanel.hidden = true;
  elements.resultPanel.hidden = true;
  elements.gamePanel.hidden = false;
  updateHeaderStatus();
  renderQuestion();
}

function renderQuestion() {
  const question = state.selectedQuestions[state.currentIndex];
  const progressPercent = (state.currentIndex / state.selectedQuestions.length) * 100;

  state.selectedIndex = null;
  elements.feedback.hidden = true;
  elements.feedback.className = "feedback";
  elements.feedback.textContent = "";
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = state.currentIndex === state.selectedQuestions.length - 1 ? "結果を見る" : "次の問題へ";

  elements.questionCategory.textContent = question.category;
  elements.questionCategory.className = `category-tag ${question.type === "insight" ? "insight" : ""}`;
  elements.progressBar.className = `progress-bar ${question.type === "insight" ? "insight" : ""}`;
  elements.questionCount.textContent = `${state.currentIndex + 1} / ${state.selectedQuestions.length}`;
  elements.questionDifficulty.textContent = `難易度: ${difficultyLabels[question.difficulty]}`;
  elements.progressBar.style.width = `${progressPercent}%`;
  elements.questionTitle.textContent = question.title;
  elements.questionText.textContent = question.text;

  elements.answerOptions.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index));

    const label = document.createElement("span");
    label.className = "answer-label";
    label.textContent = String.fromCharCode(65 + index);

    const answerText = document.createElement("span");
    answerText.textContent = answer.text;

    button.append(label, answerText);
    elements.answerOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (state.selectedIndex !== null) {
    return;
  }

  const question = state.selectedQuestions[state.currentIndex];
  const selectedAnswer = question.answers[selectedIndex];
  const isCorrect = selectedAnswer.isCorrect;

  state.selectedIndex = selectedIndex;
  if (isCorrect) {
    state.totalScore += pointPerQuestion;
    state.correctCount += 1;
  }

  state.answerLog.push({
    questionTitle: question.title,
    selectedAnswer: selectedAnswer.text,
    correctAnswer: question.correctAnswer,
    isCorrect
  });

  updateHeaderStatus();
  markAnswers(selectedIndex, question.correctIndex);
  showFeedback(isCorrect, question);

  elements.progressBar.style.width = `${((state.currentIndex + 1) / state.selectedQuestions.length) * 100}%`;
  elements.nextButton.disabled = false;
}

function markAnswers(selectedIndex, correctIndex) {
  const buttons = elements.answerOptions.querySelectorAll(".answer-button");

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add("correct");
    }
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      button.classList.add("wrong");
    }
  });
}

function showFeedback(isCorrect, question) {
  if (!elements.feedbackToggle.checked) {
    elements.feedback.hidden = true;
    return;
  }

  elements.feedback.hidden = false;
  elements.feedback.classList.toggle("miss", !isCorrect);

  const title = document.createElement("strong");
  title.textContent = isCorrect ? "正解です。10点加算されました。" : "不正解です。正解はハイライトされた選択肢です。";

  const explanation = document.createElement("span");
  explanation.textContent = question.explanation;

  elements.feedback.replaceChildren(title, explanation);
}

function goNext() {
  if (state.currentIndex < state.selectedQuestions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }

  showResult();
}

function showResult() {
  const maxScore = state.selectedQuestions.length * pointPerQuestion;
  elements.gamePanel.hidden = true;
  elements.resultPanel.hidden = false;

  elements.finalScore.textContent = state.totalScore;
  elements.finalMaxScore.textContent = maxScore;
  elements.finalCorrectCount.textContent = state.correctCount;
  elements.finalQuestionCount.textContent = state.selectedQuestions.length;
  elements.finalModeName.textContent = modes[state.selectedMode].label;
  elements.finalDifficulty.textContent = difficultyLabels[state.selectedDifficulty];
  elements.finalBankSize.textContent = state.poolSize;
  elements.resultMessage.textContent = getResultMessage(state.totalScore, maxScore);
  renderReviewList();
}

function getResultMessage(score, maxScore) {
  const rate = maxScore === 0 ? 0 : score / maxScore;
  if (state.selectedMode === "insight") {
    if (rate >= 0.8) {
      return "かなり安定しています。決めつけずに相手の状況を読む選択ができています。";
    }
    if (rate >= 0.5) {
      return "基本は押さえられています。返信や態度をすぐ悪い意味に決めない意識を増やすとさらに安定します。";
    }
    return "まだ伸ばせます。相手の事情、忙しさ、断りやすさを意識すると点数が上がります。";
  }

  if (rate >= 0.8) {
    return "かなり安定しています。相手・周囲・ルールをバランスよく考えた回答でした。";
  }
  if (rate >= 0.5) {
    return "基本は押さえられています。迷った場面では、確認・共有・許可を取る選択を増やすとさらに安定します。";
  }
  return "まだ伸ばせます。自分に得がある場面ほど、相手の立場や公開範囲を確認する意識が大切です。";
}

function renderReviewList() {
  elements.reviewList.innerHTML = "";
  state.answerLog.forEach((log, index) => {
    const item = document.createElement("div");
    item.className = `review-item ${log.isCorrect ? "correct-review" : "wrong-review"}`;

    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${log.questionTitle}`;

    const selected = document.createElement("span");
    selected.textContent = `あなたの回答: ${log.selectedAnswer}`;

    const correct = document.createElement("span");
    correct.textContent = `正解: ${log.correctAnswer}`;

    item.append(title, selected, correct);
    elements.reviewList.appendChild(item);
  });
}

function backToStart() {
  elements.startPanel.hidden = false;
  elements.gamePanel.hidden = true;
  elements.resultPanel.hidden = true;
  state.selectedQuestions = [];
  resetScoreState();
}

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedMode = button.dataset.mode;
    updateModeUI();
  });
});

elements.questionCountSelect.addEventListener("change", () => {
  state.questionLimit = Number(elements.questionCountSelect.value);
  updateHeaderStatus();
});
elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", goNext);
elements.restartButton.addEventListener("click", startGame);
elements.backToStartButton.addEventListener("click", backToStart);
elements.quitButton.addEventListener("click", backToStart);

updateModeUI();
updateBankSummary();
updateHeaderStatus();
