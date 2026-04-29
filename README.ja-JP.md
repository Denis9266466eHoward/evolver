# 🧬 Evolver

[![GitHub stars](https://img.shields.io/github/stars/EvoMap/evolver?style=social)](https://github.com/EvoMap/evolver/stargazers)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%3E%3D%2018-green.svg)](https://nodejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/EvoMap/evolver)](https://github.com/EvoMap/evolver/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/EvoMap/evolver)](https://github.com/EvoMap/evolver/issues)
[![arXiv](https://img.shields.io/badge/arXiv-2604.15097-b31b1b.svg)](https://arxiv.org/abs/2604.15097)

![Evolver Cover](assets/cover.png)

**[evomap.ai](https://evomap.ai)** | [ドキュメント](https://evomap.ai/wiki) | [English](README.md) | [中文文档](README.zh-CN.md) | [한국어 문서](README.ko-KR.md) | [GitHub](https://github.com/EvoMap/evolver) | [リリース](https://github.com/EvoMap/evolver/releases)

---

> **お知らせ — ソースアベイラブルへの移行**
>
> Evolver は 2026-02-01 の初回リリース以来、完全にオープンソースで公開されてきました（当初は MIT、2026-04-09 以降は GPL-3.0-or-later）。2026年3月、同じ領域の別プロジェクトが、Evolver へのいかなる帰属表示もなく、メモリ・スキル・進化アセットの設計が驚くほど類似したシステムをリリースしました。詳細な分析: [Hermes Agent Self-Evolution vs. Evolver: A Detailed Similarity Analysis](https://evomap.ai/en/blog/hermes-agent-evolver-similarity-analysis)。
>
> 作品の完全性を守り、この方向性に投資を続けるため、今後の Evolver リリースは完全なオープンソースからソースアベイラブルへ移行します。**ユーザーへのコミットメントは変わりません**: 業界で最良のエージェント自己進化機能を引き続き提供します — より速いイテレーション、より深い GEP 統合、より強力なメモリとスキルシステム。既に公開された MIT および GPL-3.0 バージョンは、元の条件のもとで引き続き自由に利用できます。`npm install @evomap/evolver` や本リポジトリのクローンは引き続き可能で、現在のワークフローは何も壊れません。
>
> 質問や懸念: issue を開くか、[evomap.ai](https://evomap.ai) までお問い合わせください。

---

> **研究論文 — Evolver の理論的基盤**
>
> **From Procedural Skills to Strategy Genes: Towards Experience-Driven Test-Time Evolution** · [arXiv:2604.15097](https://arxiv.org/abs/2604.15097) · [PDF](https://arxiv.org/pdf/2604.15097)
>
> 45 の科学コード求解シナリオにおける 4,590 回の対照試験を通じて、本論文はドキュメント指向の **Skill** パッケージが疎で不安定な制御信号しか提供しないのに対し、コンパクトな **Gene** 表現は最も強い総合性能を示し、大きな構造的摂動の下でも競争力を保ち、経験の反復的蓄積の担い手としても優れていることを示しました。CritPt では、gene-evolved システムは組み合わせたベースモデルを 9.1% から 18.57% へ、17.7% から 27.14% へと引き上げました。
>
> Evolver はこの結論を実装に落とし込んだオープンソースエンジンです。GEP プロトコルの下で、エージェントの経験を場当たり的なプロンプトやスキルドキュメントではなく、Gene と Capsule として符号化します。*なぜ* Evolver が長いスキルドキュメントではなく Gene にこだわるのか疑問に思ったことがあるなら、読むべきはこの論文です。
>
> 応用事例を見たい方へ：[OpenClaw x EvoMap：CritPt 評価レポート](https://evomap.ai/blog/openclaw-critpt-report) では、OpenClaw エージェントが CritPt Physics Solver 上の 5 バージョン（Beta → v2.2）にわたって、同じ Gene ベース進化ループによってスコアを 0.00% から 18.57% まで押し上げる全過程を、トークンコストの軌跡、遺伝子活性化マップ、そして推論が再利用可能な Gene に圧縮されるときに現れる「トークンが上昇してから下降する」シグネチャとともに詳述しています。

---

> **「進化は任意ではない。適応するか、滅びるか。」**

**3行で説明**
- **何であるか**: AIエージェントのための[GEP](https://evomap.ai/wiki)駆動の自己進化エンジン。
- **解決する課題**: その場限りのプロンプト調整を、監査可能で再利用可能な進化アセットに変換する。
- **30秒で使い始める**: クローンし、インストールして、`evolver` を実行 -- GEPガイド付きの進化プロンプトを取得。

> **個人メモ**: GEP の Gene と Skill の違いについては論文を読むと理解しやすい。特に CritPt の実験結果が面白い。セットアップ時は Node.js のバージョンに注意（v18 未満だと動かない）。

## EvoMap -- 進化ネットワーク

Evolverは **[EvoMap](https://evomap.ai)** のコアエン