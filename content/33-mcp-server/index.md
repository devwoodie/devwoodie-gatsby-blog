---
emoji: 🔌
title: 'MCP 서버란? AI와 외부 시스템을 연결하는 새로운 표준'
date: '2026-01-26'
categories: Dev
---

## MCP(Model Context Protocol)란?

MCP는 **Model Context Protocol**의 약자로, Anthropic에서 만든 오픈 프로토콜이다.<br/>
AI 모델이 외부 도구, 데이터 소스, 시스템과 안전하게 상호작용할 수 있도록 해주는 표준이다.

쉽게 말해, **AI에게 "손과 발"을 달아주는 기술**이라고 생각하면 된다.

<br/>

## 왜 MCP가 필요한가?

### 기존 방식의 한계

기존에 AI에게 외부 기능을 추가하려면 각 서비스마다 개별적으로 연동해야 했다.

```
┌─────────┐     ┌─────────────┐
│   AI    │────▶│  Slack API  │  (개별 연동 필요)
└─────────┘     └─────────────┘
     │
     │          ┌─────────────┐
     └─────────▶│ GitHub API  │  (또 개별 연동)
                └─────────────┘
     │
     │          ┌─────────────┐
     └─────────▶│   DB 연결    │  (또 개별 연동)
                └─────────────┘
```

서비스마다 다른 인증 방식, 다른 데이터 형식, 다른 에러 처리가 필요했다.

### MCP의 해결책

MCP는 **표준화된 인터페이스**를 제공한다.

```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│   AI    │────▶│ MCP 프로토콜 │────▶│  Slack MCP  │
└─────────┘     └─────────────┘     └─────────────┘
                      │             ┌─────────────┐
                      └────────────▶│ GitHub MCP  │
                      │             └─────────────┘
                      │             ┌─────────────┐
                      └────────────▶│   DB MCP    │
                                    └─────────────┘
```

한 번의 표준 연동으로 모든 MCP 서버와 통신할 수 있다.

<br/>

## MCP의 핵심 개념

### 1. MCP 호스트 (Host)

MCP 프로토콜을 사용하는 AI 애플리케이션이다.

- Claude Desktop
- Claude Code (CLI)
- Cursor
- 기타 MCP 지원 앱

### 2. MCP 클라이언트 (Client)

호스트 내부에서 MCP 서버와 통신하는 컴포넌트다.

### 3. MCP 서버 (Server)

외부 기능을 제공하는 서비스다. 세 가지를 제공할 수 있다.

| 기능 | 설명 | 예시 |
|------|------|------|
| **Tools** | AI가 실행할 수 있는 함수 | 파일 생성, API 호출, DB 쿼리 |
| **Resources** | AI가 읽을 수 있는 데이터 | 파일 내용, DB 레코드, 설정 |
| **Prompts** | 재사용 가능한 프롬프트 템플릿 | 코드 리뷰 템플릿, 요약 템플릿 |

<br/>

## Claude에서 MCP 사용하기

### Claude Desktop 설정

Claude Desktop에서 MCP 서버를 사용하려면 설정 파일을 수정한다.

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`<br/>
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/Documents"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

### Claude Code (CLI) 설정

Claude Code에서는 프로젝트별 또는 전역으로 MCP 서버를 설정할 수 있다.

```bash
# MCP 서버 추가
claude mcp add filesystem -s user -- npx -y @modelcontextprotocol/server-filesystem ~/Documents

# MCP 서버 목록 확인
claude mcp list

# MCP 서버 제거
claude mcp remove filesystem -s user
```

<br/>

## 공식 MCP 서버 목록

Anthropic과 커뮤니티에서 제공하는 주요 MCP 서버들이다.

### 파일 시스템

```bash
npx -y @modelcontextprotocol/server-filesystem /path/to/directory
```

- 파일 읽기/쓰기
- 디렉토리 탐색
- 파일 검색

### GitHub

```bash
npx -y @modelcontextprotocol/server-github
```

- 레포지토리 정보 조회
- 이슈/PR 관리
- 코드 검색

### PostgreSQL

```bash
npx -y @modelcontextprotocol/server-postgres postgresql://localhost/mydb
```

- SQL 쿼리 실행
- 스키마 조회
- 데이터 분석

### Slack

```bash
npx -y @modelcontextprotocol/server-slack
```

- 메시지 전송
- 채널 조회
- 사용자 정보 확인

### 그 외

- **Google Drive**: 문서 읽기/쓰기
- **Puppeteer**: 웹 브라우저 자동화
- **Brave Search**: 웹 검색
- **Memory**: 대화 기억 저장

<br/>

## 프론트엔드에서 MCP 활용하기

프론트엔드 개발자가 MCP를 활용할 수 있는 실용적인 시나리오들이다.

### 1. 개발 환경 자동화

**파일 시스템 MCP + Claude**로 개발 작업 자동화.

```
"src/components 폴더에 Button 컴포넌트를 만들어줘.
 - TypeScript로 작성
 - Storybook 파일도 함께 생성
 - 테스트 파일도 추가"
```

Claude가 직접 파일을 생성하고 코드를 작성한다.

### 2. GitHub 연동 워크플로우

**GitHub MCP**로 PR 리뷰 및 이슈 관리.

```
"이 PR의 변경사항을 분석하고 리뷰 코멘트를 달아줘"
"최근 일주일간 생성된 버그 이슈를 요약해줘"
```

### 3. 데이터베이스 분석

**PostgreSQL MCP**로 데이터 기반 의사결정.

```
"users 테이블에서 최근 30일간 가입자 수 추이를 분석해줘"
"느린 쿼리를 찾아서 최적화 방안을 제안해줘"
```

### 4. 디자인 시스템 관리

커스텀 MCP 서버로 Figma 연동.

```
"Figma에서 Button 컴포넌트 스펙을 가져와서
 React 컴포넌트로 변환해줘"
```

<br/>

## 나만의 MCP 서버 만들기

프론트엔드 개발자도 TypeScript로 MCP 서버를 만들 수 있다.

### 프로젝트 설정

```bash
mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node
```

### 기본 구조

```typescript
// src/index.ts
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new Server(
  {
    name: 'my-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Tools 정의
server.setRequestHandler('tools/list', async () => ({
  tools: [
    {
      name: 'get_weather',
      description: '특정 도시의 날씨 정보를 가져옵니다',
      inputSchema: {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            description: '도시 이름',
          },
        },
        required: ['city'],
      },
    },
  ],
}));

// Tool 실행 핸들러
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'get_weather') {
    const weather = await fetchWeather(args.city);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weather),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// 서버 시작
const transport = new StdioServerTransport();
await server.connect(transport);
```

### 빌드 및 실행

```json
// package.json
{
  "type": "module",
  "bin": {
    "my-mcp-server": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

```bash
npm run build
```

### Claude에 연결

```json
// claude_desktop_config.json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/my-mcp-server/dist/index.js"]
    }
  }
}
```

<br/>

## 실전 예제: 컴포넌트 생성기 MCP

프론트엔드 팀에서 사용할 수 있는 컴포넌트 생성기 MCP 서버 예제다.

```typescript
// 컴포넌트 생성 Tool
{
  name: 'create_component',
  description: 'React 컴포넌트를 생성합니다',
  inputSchema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: '컴포넌트 이름' },
      type: {
        type: 'string',
        enum: ['functional', 'class'],
        description: '컴포넌트 타입'
      },
      withTest: { type: 'boolean', description: '테스트 파일 포함 여부' },
      withStory: { type: 'boolean', description: 'Storybook 파일 포함 여부' },
    },
    required: ['name'],
  },
}

// 실행 시
// "Button 컴포넌트를 테스트와 스토리북 파일과 함께 만들어줘"
// → Button.tsx, Button.test.tsx, Button.stories.tsx 생성
```

<br/>

## MCP 보안 고려사항

MCP 서버는 강력한 기능을 제공하는 만큼 보안에 주의해야 한다.

### 1. 권한 최소화

```json
// 필요한 디렉토리만 접근 허용
{
  "command": "npx",
  "args": [
    "@modelcontextprotocol/server-filesystem",
    "/Users/me/projects/my-app"  // 전체 시스템이 아닌 특정 폴더만
  ]
}
```

### 2. 환경 변수 관리

```json
// 토큰은 환경 변수로 분리
{
  "command": "npx",
  "args": ["@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"  // 하드코딩 금지
  }
}
```

### 3. 신뢰할 수 있는 서버만 사용

- 공식 MCP 서버 또는 검증된 커뮤니티 서버 사용
- 직접 만든 서버는 코드 리뷰 필수

<br/>

## MCP의 미래

MCP는 아직 초기 단계지만, AI 생태계의 핵심 인프라가 될 가능성이 높다.

### 예상되는 발전 방향

1. **더 많은 공식 서버**: Jira, Notion, Figma 등
2. **IDE 통합 강화**: VSCode, WebStorm 등에서 네이티브 지원
3. **엔터프라이즈 기능**: 권한 관리, 감사 로그, SSO 연동
4. **멀티 에이전트**: 여러 AI 에이전트가 MCP를 통해 협업

### 프론트엔드 개발자에게 의미

- **개발 생산성 향상**: 반복 작업 자동화
- **AI 네이티브 도구**: AI와 자연스럽게 협업하는 개발 환경
- **새로운 역량**: MCP 서버 개발이 새로운 스킬셋으로 부상

<br/>

## 마무리

MCP는 AI를 "대화만 하는 도구"에서 "실제로 일을 하는 도구"로 바꿔주는 기술이다.<br/>
프론트엔드 개발자도 MCP를 활용하면 개발 워크플로우를 크게 개선할 수 있다.

지금 당장 Claude Desktop에 파일 시스템 MCP 서버를 연결해보자.<br/>
AI가 직접 코드를 작성하고, 파일을 관리하는 경험은 생각보다 강력하다.

<br/>

<small>[참고] [https://modelcontextprotocol.io/](https://modelcontextprotocol.io/)</small><br/>
<small>[참고] [https://github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)</small>

```toc
```
