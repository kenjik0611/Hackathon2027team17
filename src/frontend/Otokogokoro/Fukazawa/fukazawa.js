const introPanel = document.getElementById("intro-panel");
const quizPanel = document.getElementById("quiz-panel");
const startButton = document.getElementById("start-button");
const backProfileButton = document.getElementById("back-profile-button");
const questionImage = document.getElementById("question-image");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const resultPanel = document.getElementById("result-panel");
const matchResult = document.getElementById("match-result");
const resultMessage = document.getElementById("result-message");
const nextQuestionButton = document.getElementById("next-question-button");
const summaryLink = document.getElementById("summary-link");

const TOTAL_QUESTION_COUNT = 10;

const questionBank = [
  {
    id: "q1",
    image: "assets/q1-drinking-party.png",
    imageAlt: "飲み会で少し静かになった深澤くんのシチュエーション画像",
    text: "飲み会で、相手が別の異性とかなり楽しそうに話していた。その後、深澤くんは普通に笑っているが、さっきより少し口数が減っている。相手はどう振る舞うのが良い？",
    options: [
      {
        label: "A",
        text: "飲み会中は変に深読みせず、全体の会話を楽しみながら、深澤くんにも自然に話題を振る",
        matchScore: 4,
        mbtiScores: { E: 3, S: 3, F: 2, P: 2 },
        loveTypeScores: { F: 3, R: 3, O: 2 },
        message: "場の空気を壊さず自然に戻せる良い対応です。ただ、深澤くん側から見ると「自分の変化に気づいてくれた」という特別感は少し弱めです。"
      },
      {
        label: "B",
        text: "少し時間を置いてから、「さっき話してた内容、深澤くんにも聞きたかった」と会話に入れる",
        matchScore: 10,
        mbtiScores: { E: 3, S: 4, F: 4, J: 3 },
        loveTypeScores: { F: 4, C: 3, R: 4, E: 3 },
        message: "深澤くん的にはかなり刺さる対応です。気にしてくれていた感じがありつつ、重く扱わず自然に会話へ戻してくれるので、安心感と特別感のバランスが強いです。"
      },
      {
        label: "C",
        text: "深澤くんの近くにさりげなく移動して、会話の流れの中でいつもより少しだけ深澤くん寄りに接する",
        matchScore: 8,
        mbtiScores: { E: 2, S: 3, F: 4, P: 3 },
        loveTypeScores: { F: 4, C: 4, P: 3, E: 3 },
        message: "かなり嬉しい対応です。言葉にしすぎず距離感で安心させるのは刺さりやすいですが、深澤くん側が意図を読み切れない可能性も少しあります。"
      },
      {
        label: "D",
        text: "その場ではいつも通りにして、帰り際に「今日あんまり話せなかったから、また話したい」と軽く伝える",
        matchScore: 6,
        mbtiScores: { I: 2, F: 4, J: 2, P: 2 },
        loveTypeScores: { F: 3, C: 4, P: 3, E: 4 },
        message: "個別にフォローしてくれる点はかなり嬉しいです。ただ、その場で少し静かになっている時の不安をすぐほどく対応としては、少しだけ遅めです。"
      }
    ]
  },
  {
    id: "q2",
    image: "assets/q2-compliment.png",
    imageAlt: "待ち合わせで小さな変化に気づいて褒める場面の画像",
    text: "待ち合わせで会った瞬間、深澤くんが「今日いつもと雰囲気違うね、似合ってる」と言ってきた。相手はどう返すと一番嬉しい？",
    options: [
      {
        label: "A",
        text: "「ほんと？気づいてくれたの嬉しい。ちょっと変えてみたんだ」と素直に喜ぶ",
        matchScore: 8,
        mbtiScores: { E: 3, S: 4, F: 4, J: 2 },
        loveTypeScores: { F: 4, C: 3, P: 3, E: 3 },
        message: "素直に喜んでくれるので、褒めた側としてかなり安心できます。気づいたことを受け取ってもらえた感じが強い返しです。"
      },
      {
        label: "B",
        text: "「深澤くんこそ今日いい感じじゃない？」と少し照れながら褒め返す",
        matchScore: 7,
        mbtiScores: { E: 4, S: 3, F: 3, P: 3 },
        loveTypeScores: { F: 3, A: 3, P: 4, E: 2 },
        message: "会話としては楽しく、照れも出ていて良い返しです。ただ、深澤くんが一番欲しいのは『気づいたことを喜んでくれた反応』なので少しだけ遠回りです。"
      },
      {
        label: "C",
        text: "「え、よく気づいたね。そういうところ見てくれてるの嬉しい」と、気づいてくれたこと自体に反応する",
        matchScore: 10,
        mbtiScores: { E: 3, S: 5, F: 5, J: 3 },
        loveTypeScores: { F: 5, C: 4, P: 3, E: 4 },
        message: "深澤くん的には一番刺さる返しです。褒め言葉そのものより、『見てくれていることが嬉しい』と伝わるので、かなり報われた感覚になります。"
      },
      {
        label: "D",
        text: "「ありがとう。でもちょっと恥ずかしいから、あんまり見ないで」と照れながら軽く流す",
        matchScore: 6,
        mbtiScores: { I: 2, S: 3, F: 3, P: 4 },
        loveTypeScores: { F: 3, C: 2, R: 3, O: 3 },
        message: "照れている感じはかわいい返しですが、嬉しかったのか少し分かりにくいです。深澤くん側は『言ってよかったのかな』と少し迷う可能性があります。"
      }
    ]
  },
  {
    id: "q3",
    image: "assets/q3-line-continue.png",
    imageAlt: "夜のLINEで会話を続けたそうにしている場面の画像",
    text: "夜のLINEで会話が一度終わりそうになったが、深澤くんが「そういえば明日って何してるの？」と別の話題を振ってきた。相手はどう返すのが良い？",
    options: [
      {
        label: "A",
        text: "「明日は〇〇する予定！深澤くんは明日忙しい？」と自然に返して、会話をもう少し続ける",
        matchScore: 8,
        mbtiScores: { E: 4, S: 3, F: 3, J: 2 },
        loveTypeScores: { F: 3, C: 3, R: 3, E: 3 },
        message: "自然に会話が続くのでかなり嬉しい返しです。深澤くんが話題を足した意図も拾えていて、安心して会話を続けられます。"
      },
      {
        label: "B",
        text: "「明日は〇〇だよ。そろそろ寝ようとしてたけど、少しだけなら話せる」と、無理のない範囲で続ける",
        matchScore: 6,
        mbtiScores: { I: 2, S: 4, F: 3, J: 4 },
        loveTypeScores: { F: 3, A: 3, R: 5, O: 2 },
        message: "相手の都合が分かるので悪くない返しです。ただ、『少しだけなら』の温度感によっては、深澤くんが早めに引いた方がいいかもと受け取る可能性があります。"
      },
      {
        label: "C",
        text: "「明日は〇〇するけど、今まだ眠くないからもう少し話せるよ」と、自分も続けたい感じを出す",
        matchScore: 10,
        mbtiScores: { E: 3, S: 4, F: 5, P: 2 },
        loveTypeScores: { F: 5, C: 4, P: 3, E: 4 },
        message: "深澤くん的には一番嬉しい返しです。会話を続けたい気持ちを読み取ってくれたうえで、相手側にもその気があると伝わるのでかなり安心します。"
      },
      {
        label: "D",
        text: "「明日は〇〇だよ。そういえば深澤くんって休日いつも何してるの？」と、逆に相手の話を広げる",
        matchScore: 7,
        mbtiScores: { E: 4, N: 2, F: 3, P: 4 },
        loveTypeScores: { F: 4, A: 3, P: 3, E: 3 },
        message: "会話を広げてくれるので嬉しい返しです。ただ、深澤くんが少し探っていた『明日会える余地』までは拾いきれていないかもしれません。"
      }
    ]
  },
  {
    id: "q4",
    image: "assets/q4-date-choice.png",
    imageAlt: "デートの行き先を相談している場面の画像",
    text: "デートの行き先を決める時、深澤くんが「そっちが行きたいところでいいよ」と言った。ただ、調べていたお店のページをまだ見ていて、少し行きたそうにも見える。相手はどうするのが正解？",
    options: [
      {
        label: "A",
        text: "「じゃあ今回は私の行きたいところにして、次は深澤くんが見てたお店行こ」と、希望を拾いつつ次回につなげる",
        matchScore: 10,
        mbtiScores: { E: 2, S: 4, F: 5, J: 4 },
        loveTypeScores: { F: 4, A: 4, R: 4, E: 3 },
        message: "一番バランスが良い返しです。相手の希望も通しつつ、深澤くんの行きたい気持ちも拾ってくれるので、我慢した感じが残りにくいです。"
      },
      {
        label: "B",
        text: "「ほんとにどこでもいい？そのお店ちょっと気になってるなら、そこでも全然いいよ」と、押しつけない温度で確認する",
        matchScore: 6,
        mbtiScores: { I: 2, S: 4, F: 4, P: 3 },
        loveTypeScores: { F: 4, A: 3, R: 3, O: 2 },
        message: "確認してくれるのは嬉しいですが、深澤くん側が遠慮している場合は『大丈夫』と言い続けてしまう可能性があります。"
      },
      {
        label: "C",
        text: "「そのお店、私も気になってきた。せっかくだし今日はそこ行ってみない？」と、深澤くんの希望を“2人の候補”にする",
        matchScore: 8,
        mbtiScores: { E: 3, S: 3, F: 4, P: 4 },
        loveTypeScores: { F: 4, C: 3, P: 4, E: 3 },
        message: "かなり嬉しい返しです。深澤くんの希望を拾ってくれる一方で、相手が本当に行きたい場所を我慢していないかは少し気になります。"
      },
      {
        label: "D",
        text: "「じゃあ今見てるお店と私の候補、どっちが今日の気分に合うか一緒に決めよ」と、どちらかに寄せすぎず相談に戻す",
        matchScore: 7,
        mbtiScores: { S: 5, T: 2, F: 3, J: 3 },
        loveTypeScores: { F: 3, A: 4, R: 4, O: 2 },
        message: "公平で納得感のある返しです。ただ、深澤くん的にはもう少し『見てたお店に気づいてくれた感』があるとさらに刺さります。"
      }
    ]
  },
  {
    id: "q5",
    image: "assets/q5-reaction-check.png",
    imageAlt: "会話中に相手の反応を気にして話題を変えようとする場面の画像",
    text: "カフェで2人で話している時、深澤くんが最近あった出来事を楽しそうに話していた。けれど、相手が少し眠そうに見える反応をしてしまい、深澤くんは「まあ、これはいいや」と言って話題を変えようとした。相手はどう振る舞うのが良い？",
    options: [
      {
        label: "A",
        text: "「ごめん、眠そうに見えたよね。でもちゃんと聞いてたし、今の話もう少し聞きたい」と素直にフォローする",
        matchScore: 6,
        mbtiScores: { E: 2, S: 4, F: 4, J: 3 },
        loveTypeScores: { F: 4, A: 3, R: 3, E: 3 },
        message: "きちんとフォローしてくれるので安心できます。ただ、少し真面目に謝られると深澤くん側も気を使わせたかもと感じる可能性があります。"
      },
      {
        label: "B",
        text: "「今ちょっとぼーっとして見えたかも。でもその話、普通に気になってた」と軽く認めて、話を戻す",
        matchScore: 7,
        mbtiScores: { I: 2, S: 4, F: 3, P: 3 },
        loveTypeScores: { F: 3, A: 3, R: 4, O: 2 },
        message: "重くしすぎず戻せるので良い対応です。ただ、深澤くんのテンションをもう一度上げるには、少しだけ反応の強さが足りないかもしれません。"
      },
      {
        label: "C",
        text: "「え、そこで終わるの？続き気になるんだけど」と明るく食いついて、空気を重くしない",
        matchScore: 8,
        mbtiScores: { E: 4, N: 2, F: 3, P: 4 },
        loveTypeScores: { F: 3, C: 3, P: 4, O: 3 },
        message: "かなり嬉しい返しです。空気が重くならず、話を続けてもいいんだと分かるので、深澤くんも戻りやすくなります。"
      },
      {
        label: "D",
        text: "「話変えなくていいよ。深澤くんが楽しそうに話してるの見るの好きだし」と、興味と好意をまとめて伝える",
        matchScore: 10,
        mbtiScores: { E: 3, S: 4, F: 5, J: 2 },
        loveTypeScores: { F: 5, C: 4, P: 3, E: 4 },
        message: "深澤くん的には一番刺さる返しです。話の内容だけでなく、楽しそうに話している姿ごと受け止めてくれる感じが強いです。"
      }
    ]
  },
  {
    id: "q6",
    image: "assets/q6-teased-concern.png",
    imageAlt: "友達の前でいじられて少し気にしている場面の画像",
    text: "友達数人で話している時、相手が深澤くんに「そういうところ、ほんと分かりやすいよね」と軽くいじった。周りは笑っていて、深澤くんもその場では「やめてよ笑」と笑って返した。でもその後、深澤くんは会話には入っているものの、さっきより少しだけ静かになっている。相手はどう対応するのが良い？",
    options: [
      {
        label: "A",
        text: "その場では空気を崩さず、2人になった時に「さっきの、嫌な感じになってたらごめんね」と軽く確認する",
        matchScore: 10,
        mbtiScores: { I: 2, S: 4, F: 5, J: 3 },
        loveTypeScores: { F: 4, A: 4, R: 4, E: 3 },
        message: "一番安心できる対応です。みんなの前で大げさにせず、後でちゃんと気にしてくれるので、深澤くん的には大事にされている感じがあります。"
      },
      {
        label: "B",
        text: "みんなの前で「今の、深澤くんのいいところでもあるけどね」と明るく補足して、いじりを肯定に戻す",
        matchScore: 7,
        mbtiScores: { E: 4, S: 3, F: 4, P: 3 },
        loveTypeScores: { F: 4, C: 3, P: 3, E: 2 },
        message: "その場で救ってくれる感じがあり、かなり嬉しい返しです。ただ、人前でフォローされること自体が少し照れにつながる可能性もあります。"
      },
      {
        label: "C",
        text: "帰り道で「さっき笑ってたけど、ちょっと気にした？」と聞いて、次から気をつけると伝える",
        matchScore: 8,
        mbtiScores: { S: 4, T: 2, F: 4, J: 4 },
        loveTypeScores: { F: 4, A: 3, R: 4, E: 3 },
        message: "かなり良い対応です。気づいてくれたことは嬉しいですが、『気にした？』と真正面から聞かれると少し答えにくい可能性があります。"
      },
      {
        label: "D",
        text: "その後の会話で深澤くんの話に少し多めに反応して、帰り際に「さっきの、雑に言ったつもりじゃないからね」と伝える",
        matchScore: 6,
        mbtiScores: { I: 2, S: 3, F: 4, P: 4 },
        loveTypeScores: { F: 3, A: 3, R: 3, O: 3 },
        message: "会話中のフォローがあるので悪くない対応です。ただ、言い方によっては『雑に言ったつもりじゃない』が少し弁明っぽく聞こえるかもしれません。"
      }
    ]
  },
  {
    id: "q7",
    image: "assets/q7-private-soft.png",
    imageAlt: "帰り道で2人きりになり距離が近くなる場面の画像",
    text: "みんなでいる時は普通にしていた深澤くんが、帰り道で2人きりになると少し距離を近めにして、いつもより柔らかい話し方になった。相手はどう返すのが刺さる？",
    options: [
      {
        label: "A",
        text: "「さっきよりちょっと雰囲気やわらかいね」と軽く気づいたことを伝えつつ、自然に距離を近めにする",
        matchScore: 6,
        mbtiScores: { E: 3, S: 4, F: 4, P: 3 },
        loveTypeScores: { F: 4, C: 3, P: 3, E: 3 },
        message: "変化に気づいてくれるのは嬉しいです。ただ、言葉にされると少し照れてしまい、深澤くんが逆に普通に戻そうとする可能性があります。"
      },
      {
        label: "B",
        text: "「2人になるとちょっと甘える感じ出るよね」と少し茶化しながら、楽しそうに受け止める",
        matchScore: 6,
        mbtiScores: { E: 4, N: 2, F: 3, P: 4 },
        loveTypeScores: { F: 3, C: 4, P: 4, O: 2 },
        message: "楽しそうに受け止めてくれるのは良いですが、『甘える感じ』と直接言われると少し恥ずかしさが勝つかもしれません。"
      },
      {
        label: "C",
        text: "何も言わずに歩く距離を少し近づけて、深澤くんのペースに合わせて会話を続ける",
        matchScore: 10,
        mbtiScores: { I: 2, S: 4, F: 5, P: 4 },
        loveTypeScores: { F: 5, A: 4, R: 3, E: 4 },
        message: "一番刺さる対応です。言葉でいじらず、距離感と空気で受け止めてくれるので、深澤くんが安心して素を出しやすくなります。"
      },
      {
        label: "D",
        text: "「こういう帰り道、なんか落ち着くね」と、2人の空気が心地いいことを言葉で伝える",
        matchScore: 8,
        mbtiScores: { I: 2, S: 3, F: 5, J: 2 },
        loveTypeScores: { F: 5, C: 3, R: 3, E: 4 },
        message: "かなり嬉しい返しです。2人の空気を肯定してくれるので安心できますが、深澤くん的には少し照れて反応に迷う可能性があります。"
      }
    ]
  },
  {
    id: "q8",
    image: "assets/q8-remembered-song.png",
    imageAlt: "何気なく話した曲を覚えていて話題に出す場面の画像",
    text: "前に相手が「最近この曲よく聴く」と何気なく話した。数日後、深澤くんが「この前言ってた曲、聴いてみたよ」と話題に出してきた。相手はどう反応するのが良い？",
    options: [
      {
        label: "A",
        text: "「え、覚えててくれたの嬉しい。ちゃんと聴いてくれるの優しいね」と、覚えてくれたこと自体を喜ぶ",
        matchScore: 8,
        mbtiScores: { E: 2, S: 5, F: 5, J: 2 },
        loveTypeScores: { F: 5, C: 4, R: 3, E: 3 },
        message: "かなり嬉しい返しです。覚えていたことを喜んでもらえると、深澤くんは『話を拾ってよかった』と感じやすいです。"
      },
      {
        label: "B",
        text: "「どうだった？どの辺が好きだった？」と、深澤くんの感想を聞いて会話を広げる",
        matchScore: 6,
        mbtiScores: { E: 3, S: 4, T: 2, P: 3 },
        loveTypeScores: { F: 3, A: 3, R: 4, O: 2 },
        message: "会話としては広がりやすい返しです。ただ、深澤くん的には『覚えて聴いたこと』への反応がもう少しあるとさらに嬉しいです。"
      },
      {
        label: "C",
        text: "「それ嬉しい。じゃあ今度、深澤くんが好きな曲も教えて」と、相手の話にも自然につなげる",
        matchScore: 10,
        mbtiScores: { E: 3, S: 4, F: 4, P: 3 },
        loveTypeScores: { F: 4, A: 4, P: 3, E: 4 },
        message: "一番バランスが良い返しです。嬉しい気持ちを返しながら、深澤くんの話にも興味を向けてくれるので、会話がかなり続けやすくなります。"
      },
      {
        label: "D",
        text: "「そういう何気ない話を覚えてくれるところ、けっこう好き」と、行動そのものを好意的に伝える",
        matchScore: 10,
        mbtiScores: { E: 3, N: 2, F: 5, J: 2 },
        loveTypeScores: { F: 5, C: 4, P: 4, E: 4 },
        message: "かなり刺さる返しです。行動を好意的に見てくれている感じが強く、深澤くん側のテンションはかなり上がりやすいです。"
      }
    ]
  },
  {
    id: "q9",
    image: "assets/q9-forgot-reply.png",
    imageAlt: "深澤くんが返信を忘れていて謝る場面の画像",
    text: "深澤くんが数日返信を返すのを忘れていた。その後「ごめん、返せてなかった」と連絡が来た。相手はどう返すのが良い？",
    options: [
      {
        label: "A",
        text: "「全然大丈夫！忙しかった？体調とか平気？」と軽く気遣って、自然に会話を戻す",
        matchScore: 8,
        mbtiScores: { S: 3, F: 4, J: 2 },
        loveTypeScores: { F: 3, A: 4, R: 3, E: 2 },
        message: "優しく受け止めてくれるので安心できます。気遣いもあるため、深澤くん側は返信を戻しやすいです。"
      },
      {
        label: "B",
        text: "「返ってきてよかった。ちょっと寂しかったけど、また話せるなら嬉しい」と素直に伝える",
        matchScore: 10,
        mbtiScores: { E: 2, F: 5, P: 2 },
        loveTypeScores: { C: 4, P: 4, E: 3 },
        message: "深澤くん的には一番刺さる返しです。責められている感じよりも、待ってくれていた感じと素直さが強く伝わります。"
      },
      {
        label: "C",
        text: "「大丈夫だけど、次から一言だけでもくれると安心する」と責めずに希望を伝える",
        matchScore: 7,
        mbtiScores: { S: 4, F: 4, J: 3 },
        loveTypeScores: { C: 3, R: 4, E: 3 },
        message: "かなり誠実な返しです。今後の希望が分かるので良いですが、深澤くん側は少し申し訳なさを強く感じるかもしれません。"
      },
      {
        label: "D",
        text: "「忙しいと思って待ってたよ、落ち着いたら話そう」と相手のペースに合わせる",
        matchScore: 6,
        mbtiScores: { I: 2, F: 3, P: 3 },
        loveTypeScores: { F: 5, A: 3, R: 3, O: 2 },
        message: "優しい対応ですが、深澤くん側からすると少し距離を取られたように感じる可能性があります。もう少し話したい気持ちが見えるとより嬉しいです。"
      }
    ]
  },
  {
    id: "q10",
    image: "assets/q10-weekend-plan.png",
    imageAlt: "週末に少し会えるか遠慮しながら誘う場面の画像",
    text: "週末の話になった時、深澤くんが「忙しかったら全然大丈夫だけど、空いてたら少し会う？」と聞いてきた。相手はどう返すのが一番良い？",
    options: [
      {
        label: "A",
        text: "「空いてるよ。私も会えたらいいなと思ってた」と、会いたい気持ちを自然に返す",
        matchScore: 10,
        mbtiScores: { E: 3, S: 4, F: 5, J: 3 },
        loveTypeScores: { F: 5, C: 4, P: 3, E: 4 },
        message: "深澤くん的には一番嬉しい返しです。誘いを受けるだけでなく、相手側も会いたかったと分かるのでかなり安心します。"
      },
      {
        label: "B",
        text: "「会えるよ。深澤くんが誘ってくれるの、普通に嬉しい」と、誘ってくれたこと自体を喜ぶ",
        matchScore: 8,
        mbtiScores: { E: 3, S: 4, F: 4, P: 3 },
        loveTypeScores: { F: 4, C: 4, P: 3, E: 3 },
        message: "かなり嬉しい返しです。誘ったことを肯定してくれるので、深澤くんは次も誘いやすくなります。"
      },
      {
        label: "C",
        text: "「その言い方、気遣ってくれてる感じして嬉しい。私は会いたいよ」と、遠慮して聞いてくれたことも受け取る",
        matchScore: 7,
        mbtiScores: { I: 2, S: 5, F: 5, J: 3 },
        loveTypeScores: { F: 5, A: 4, R: 3, E: 3 },
        message: "深澤くんの遠慮まで拾ってくれるので嬉しい返しです。ただ、少し丁寧すぎて照れが勝つ可能性があります。"
      },
      {
        label: "D",
        text: "「少しでも会えるなら会いたい。深澤くんは何したい気分？」と、会う前提で相手の希望も聞く",
        matchScore: 6,
        mbtiScores: { E: 3, S: 3, F: 4, P: 4 },
        loveTypeScores: { F: 4, A: 4, P: 4, E: 3 },
        message: "前向きで嬉しい返しです。ただ、深澤くん的にはまず『誘ってよかった』と感じられる言葉がもう少しあるとさらに刺さります。"
      }
    ]
  }
];

const state = {
  questions: [],
  currentIndex: 0,
  answeredCount: 0,
  matchScore: 0,
  maxMatchScore: 0,
  mbtiScores: {},
  loveTypeScores: {}
};

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function addScores(target, source) {
  Object.keys(source || {}).forEach((key) => {
    target[key] = (Number(target[key]) || 0) + (Number(source[key]) || 0);
  });
}

function getCurrentQuestion() {
  return state.questions[state.currentIndex];
}

function renderQuestion() {
  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    return;
  }

  questionImage.src = currentQuestion.image;
  questionImage.alt = currentQuestion.imageAlt;
  questionCount.textContent = `Q${state.currentIndex + 1} / ${state.questions.length}`;
  questionText.textContent = currentQuestion.text;
  answerList.innerHTML = "";
  resultPanel.hidden = true;
  nextQuestionButton.hidden = true;
  summaryLink.hidden = true;

  shuffleArray(currentQuestion.options).forEach((option, optionIndex) => {
    const displayLabel = ["A", "B", "C", "D"][optionIndex];
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `
      <span class="answer-mark">${displayLabel}</span>
      <span class="answer-text">${option.text}</span>
    `;
    button.addEventListener("click", () => selectOption(option, button));
    answerList.appendChild(button);
  });
}

function saveProgress(isComplete) {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return false;
  }

  store.saveMemberResult("fukazawa", {
    questionCount: state.questions.length,
    answeredCount: state.answeredCount,
    matchScore: state.matchScore,
    maxMatchScore: state.maxMatchScore,
    mbtiScores: state.mbtiScores,
    loveTypeScores: state.loveTypeScores,
    isComplete,
    completedAt: isComplete ? new Date().toISOString() : ""
  });

  return true;
}

const mbtiTendencyLabels = {
  E: "言葉や態度で分かりやすく返す",
  I: "静かに寄り添って空気を守る",
  S: "目の前の変化や状況を具体的に拾う",
  N: "会話の広がりや含みを作る",
  T: "状況を整理して納得感を作る",
  F: "感情や安心感を丁寧に受け止める",
  J: "次の行動まで見せて不安を残しにくくする",
  P: "自然な流れや余白を大切にする"
};

const loveTypeTendencyLabels = {
  L: "自分から空気を動かす",
  F: "相手の気持ちに合わせて受け止める",
  C: "近い距離感で安心させる",
  A: "相手のペースを尊重して待つ",
  R: "落ち着いた現実的な返しをする",
  P: "素直な好意や熱量を見せる",
  O: "重くしすぎず軽やかに返す",
  E: "特別感や一途さを伝える"
};

function getTopTendencies(scores, labels) {
  return Object.entries(scores || {})
    .filter(([, score]) => Number(score) >= 3)
    .sort((left, right) => Number(right[1]) - Number(left[1]))
    .slice(0, 3)
    .map(([key]) => labels[key])
    .filter(Boolean);
}

function getMatchInterpretation(matchScore) {
  if (matchScore >= 10) {
    return "深澤くん目線ではかなり本命寄りの返しです。気持ちを受け取ってくれている感じが強く、次も素直に動きやすくなります。";
  }

  if (matchScore >= 8) {
    return "かなり良い返しです。大きく外してはいませんが、もう少しだけ好意や気づきを言葉にすると、さらに刺さりやすくなります。";
  }

  if (matchScore >= 6) {
    return "自然で悪くない返しです。ただ、深澤くんは相手の反応を細かく見がちなので、少し物足りなさや迷いが残る可能性があります。";
  }

  return "対応として間違いではありませんが、深澤くん本人の好みから見ると少し遠めです。もう少し気づき・安心感・特別感のどれかが見えると良くなります。";
}

function buildResultMessage(option) {
  const mbtiTendencies = getTopTendencies(option.mbtiScores, mbtiTendencyLabels);
  const loveTypeTendencies = getTopTendencies(option.loveTypeScores, loveTypeTendencyLabels);
  const tendencyText = [...mbtiTendencies, ...loveTypeTendencies].slice(0, 4).join(" / ");

  return [
    option.message,
    `深澤目線のポイント: ${getMatchInterpretation(option.matchScore)}`,
    tendencyText ? `この回答が拾っている要素: ${tendencyText}` : ""
  ].filter(Boolean).join("\n\n");
}

function selectOption(option, selectedButton) {
  const buttons = answerList.querySelectorAll(".answer-button");
  const isLastQuestion = state.currentIndex >= state.questions.length - 1;

  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.toggle("is-selected", button === selectedButton);
  });

  state.answeredCount += 1;
  state.matchScore += option.matchScore;
  addScores(state.mbtiScores, option.mbtiScores);
  addScores(state.loveTypeScores, option.loveTypeScores);

  saveProgress(isLastQuestion);
  matchResult.textContent = `${option.matchScore} / 10`;
  resultMessage.textContent = buildResultMessage(option);

  nextQuestionButton.hidden = isLastQuestion;
  summaryLink.hidden = !isLastQuestion;
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function startGame() {
  state.questions = shuffleArray(questionBank).slice(0, TOTAL_QUESTION_COUNT);
  state.currentIndex = 0;
  state.answeredCount = 0;
  state.matchScore = 0;
  state.maxMatchScore = state.questions.length * 10;
  state.mbtiScores = {};
  state.loveTypeScores = {};

  saveProgress(false);
  renderQuestion();
  showQuiz();
}

function showQuiz() {
  introPanel.hidden = true;
  quizPanel.hidden = false;
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showProfile() {
  quizPanel.hidden = true;
  introPanel.hidden = false;
  introPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToNextQuestion() {
  state.currentIndex += 1;
  renderQuestion();
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderQuestion();
startButton.addEventListener("click", startGame);
nextQuestionButton.addEventListener("click", goToNextQuestion);
backProfileButton.addEventListener("click", showProfile);
