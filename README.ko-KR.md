# 🧬 Evolver

[![GitHub stars](https://img.shields.io/github/stars/EvoMap/evolver?style=social)](https://github.com/EvoMap/evolver/stargazers)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
[![Node.js >= 18](https://img.shields.io/badge/Node.js-%3E%3D%2018-green.svg)](https://nodejs.org/)
[![GitHub last commit](https://img.shields.io/github/last-commit/EvoMap/evolver)](https://github.com/EvoMap/evolver/commits/main)
[![GitHub issues](https://img.shields.io/github/issues/EvoMap/evolver)](https://github.com/EvoMap/evolver/issues)
[![arXiv](https://img.shields.io/badge/arXiv-2604.15097-b31b1b.svg)](https://arxiv.org/abs/2604.15097)

![Evolver Cover](assets/cover.png)

**[evomap.ai](https://evomap.ai)** | [문서](https://evomap.ai/wiki) | [English](README.md) | [Chinese / 中文文档](README.zh-CN.md) | [Japanese / 日本語ドキュメント](README.ja-JP.md) | [GitHub](https://github.com/EvoMap/evolver) | [릴리스](https://github.com/EvoMap/evolver/releases)

> **개인 포크 메모**: 이 저장소는 개인 학습 및 실험 목적으로 포크한 것입니다. GEP 기반 진화 메커니즘을 공부하고 있으며, 특히 Gene 표현 방식과 Capsule 인코딩 부분을 집중적으로 살펴보고 있습니다. 원본 프로젝트는 [EvoMap/evolver](https://github.com/EvoMap/evolver)를 참고하세요.

---

> **안내 -- 소스 공개(Source-Available)로의 전환**
>
> Evolver는 2026-02-01 최초 릴리스 이래 완전한 오픈소스로 공개되어 왔습니다(초기 MIT, 2026-04-09부터 GPL-3.0-or-later). 2026년 3월, 같은 영역의 다른 프로젝트가 Evolver에 대한 어떠한 귀속 표시 없이 메모리, 스킬, 진화 에셋 설계가 놀라울 정도로 유사한 시스템을 릴리스했습니다. 상세 분석: [Hermes Agent Self-Evolution vs. Evolver: A Detailed Similarity Analysis](https://evomap.ai/en/blog/hermes-agent-evolver-similarity-analysis).
>
> 작업의 무결성을 보호하고 이 방향에 지속적으로 투자하기 위해, 향후 Evolver 릴리스는 완전한 오픈소스에서 소스 공개(source-available)로 전환됩니다. **사용자에 대한 약속은 변하지 않습니다**: 업계 최고의 에이전트 자기 진화 기능을 계속 제공하겠습니다 -- 더 빠른 반복, 더 깊은 GEP 통합, 더 강력한 메모리 및 스킬 시스템. 이미 공개된 MIT 및 GPL-3.0 버전은 원래 라이선스 조건에 따라 자유롭게 사용할 수 있습니다. `npm install @evomap/evolver` 또는 이 저장소 클론은 계속 가능하며, 기존 워크플로에는 영향이 없습니다.
>
> 질문이나 의견: issue를 열거나 [evomap.ai](https://evomap.ai)로 연락해 주세요.

---

> **연구 논문 — Evolver의 이론적 기반**
>
> **From Procedural Skills to Strategy Genes: Towards Experience-Driven Test-Time Evolution** · [arXiv:2604.15097](https://arxiv.org/abs/2604.15097) · [PDF](https://arxiv.org/pdf/2604.15097)
>
> 45개의 과학 코드 풀이 시나리오에서 진행된 4,590회의 통제 실험을 통해, 본 논문은 문서 중심의 **Skill** 패키지가 희소하고 불안정한 제어 신호만 제공하는 반면, 컴팩트한 **Gene** 표현은 가장 강력한 전체 성능을 보이고 상당한 구조적 섭동에서도 경쟁력을 유지하며 경험의 반복적 축적을 담는 더 나은 매개체라는 것을 보여줍니다. CritPt에서 gene-evolved 시스템은 짝을 이룬 기본 모델을 9.1%에서 18.57%로, 17.7%에서 27.14%로 끌어올렸습니다.
>
> Evolver는 이 결과를 실제로 구현하는 오픈소스 엔진입니다. GEP 프로토콜 아래 에이전트의 경험을 임시 프롬프트나 스킬 문서가 아니라 Gene과 Capsule로 인코딩합니다. *왜* Evolver가 더 긴 스킬 문서 대신 Gene을 고집하는지 궁금했다면, 바로 이 논문을 읽어야 합니다.
>
> 적용 사례가 궁금하신가요? [OpenClaw x EvoMap: CritPt 평가 보고서](https://evomap.ai/blog/openclaw-critpt-report)는 동일한 Gene 기반 진화 루프가 OpenClaw 에이전트를 CritPt Physics Solver의 5개 버전(Beta → v2.2)에 걸쳐 0.00%에서 18.57%까지 끌어올리는 과정을, 전체 토큰 비용 궤적, 유전자 활성화 매핑, 그리고 추론이 재사용 가능한 Gene으로 압축될 때 나타나는 "토큰이 먼저 상승한 뒤 하강하는" 시그니처와 함께 단계별로 보여줍니다.

---

> **"진화는 선택이 아니다. 적응하거나, 도태되거나."**

**한 줄 요약**
- **무엇인가**: AI 에이전트를 위한 [GEP](https://evomap.ai/wiki) 기반 자기 진화 엔진.
- **어떤 문제를 해결하는가**: 즉흥적인 프롬프트 수정을 감사 가능하고 재사용 가능한 진화 에셋으로 전환.
- **30초 만에 시작**: `npm install -g @evoma
