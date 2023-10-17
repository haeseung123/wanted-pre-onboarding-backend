<h1>프리온보딩 백엔드 인턴십 선발과제</h1>

기업의 채용을 위한 웹 서비스로 회사는 채용공고를 등록하고 사용자는 공고에 지원할 수 있습니다.

### 개발환경

![typescript](https://img.shields.io/badge/typescript-blue?logo=typescript&logoColor=FFF)
![NodeJS](https://img.shields.io/badge/node.js-v19-green?logo=node.js)
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor={로고 색깔}"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=FFF"/>

### 데이터베이스 설계
<img width="874" alt="스크린샷 2023-10-17 오후 2 18 53" src="https://github.com/haeseung123/wanted-pre-onboarding-backend/assets/106800437/c0a16edc-632f-4405-80eb-b5cac0dde79e">

### 요구사항 및 기능구현
#### 1. 채용공고 등록
1-1. 회사 정보가 있어야만 채용공고를 등록할 수 있기때문에 회사 등록을 우선으로 한다.

- 'POST /companies'
```json
{
  "name": "원티드랩",
  "nation": "한국",
  "location": "서울"
}
```

- 필드값이 하나라도 비어있을 경우 400 Bad Request 응답
```json
{
	"message": [
		"회사명을 입력해주세요.",
		"name must be a string",
	],
	"error": "Bad Request",
	"statusCode": 400
}
```
<br>

1-2. 채용공고 등록

- 'POST /recruits'
- comapny_id는 comapnies 테이블의 company_id(PK)를 FK로 등록하고 1:N 관계를 정의함
```json
{
  "company_id" : 1,
  "position" : "백엔드 주니어 개발자",
  "reward" : 1000000,
  "description" : "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "tech_stack" : "Python"
}
```
<br>

- 회사가 존재하지 않을 경우 404 Not Found 응답
```json
{
  "message": "해당 회사(6)는 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```

<br>

- 필드값이 하나라도 비어있을 경우 400 Bad Request 응답
```json
{
  "message": [
    "채용보상금을 입력해주세요.",
    "reward must be a number conforming to the specified constraints"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

#### 2. 채용공고 수정
2-1. company_id 이외 모두 수정 가능
<br>

- 'PUT /recruits/{:id}'
- 수정할 채용공고의 id(recruit_id)를 파라미터로 받아옴

```json
{
  "position" : "프론트엔드 개발자",
  "reward" : 1500000, #변경됨
  "description" : "원티드코리아에서 프론트엔드 개발자를 채용합니다. 자격요건은..",
  "tech_stack" : "javascript"
}

```
<br>

- 채용공고가 존재하지 않을 경우 404 Not Found 응답
```json
{
  "message": "해당 채용공고(7)는 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```
<br>

- 수정할 필드값이 하나라도 비어있을 경우 400 Bad Request 응답
```json
{
  "message": [
    "채용포지션을 입력해주세요."
  ],
  "error": "Bad Request",
  "statusCode": 400
}

```

#### 3. 채용공고 삭제

- 'DELETE /recruits/{:id}'
- 삭제할 채용공고의 id(recruit_id)를 파라미터로 받아옴

응답코드 200
```json
{
  "mesaage": "채용공고가 삭제되었습니다."
}
```
<br>

- 채용공고가 존재하지 않을 경우 404 Not Found 응답
```json
{
  "message": "해당 채용공고(8)는 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```

#### 4. 채용공고 목록 조회
4-1. 채용공고 전체 조회

- 'GET /recruit'

```json
[
  {
    "채용공고_id": 1,
    "회사명": "원티드랩",
    "국가": "한국",
    "지역": "서울",
    "채용포지션": "백엔드 주니어 개발자",
    "채용보상금": 1000000,
    "사용기술": "Python"
  },
  {
    "채용공고_id": 3,
    "회사명": "네이버",
    "국가": "한국",
    "지역": "판교",
    "채용포지션": "Django 백엔드 개발자",
    "채용보상금": 1000000,
    "사용기술": "Django"
  },
  ...
]
```
<br>

4-2. 채용공고 검색 기능

- 검색 키워드에 따른 검색 결과 반환
- 회사명, 채용포지션, 사용기술 범위 내에서만 검색하도록 구현
- 'GET /recruits/search?keyword=Python'

```json
[
  {
    "채용공고_id": 1,
    "회사명": "원티드랩",
    "국가": "한국",
    "지역": "서울",
    "채용포지션": "백엔드 주니어 개발자",
    "채용보상금": 1000000,
    "사용기술": "Python"
  },
  {
    "채용공고_id": 4,
    "회사명": "카카오",
    "국가": "한국",
    "지역": "판교",
    "채용포지션": "Django 백엔드 개발자",
    "채용보상금": 500000,
    "사용기술": "Python"
  }
]
```
<br>

- 'GET /recruits/search?keyword=네이버'
```json
[
  {
    "채용공고_id": 3,
    "회사명": "네이버",
    "국가": "한국",
    "지역": "판교",
    "채용포지션": "Django 백엔드 개발자",
    "채용보상금": 1000000,
    "사용기술": "Django"
  }
]
```

#### 5. 채용 상세페이지 조회
5-1. 채용내용을 확인할 수 있고 해당 회사가 올린 다른 채용공고 확인

- 'GET /recruits/{:id}
- 상세하게 확인할 채용공고의 id(recruit_id)를 파라미터로 받아옴

```json
{
  "채용공고_id": 1,
  "회사명": "원티드랩",
  "국가": "한국",
  "지역": "서울",
  "채용포지션": "백엔드 주니어 개발자",
  "채용보상금": 1000000,
  "사용기술": "Python",
  "채용내용": "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
  "회사가올린다른채용공고": [6,7]
}
```
<br>

- 채용공고가 존재하지 않을 경우 404 Not Found 응답
```json
{
  "message": "해당 채용공고는 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```


#### 6. 채용공고 지원
6-1. 사용자가 채용공고에 지원하기 위해서 사용자 등록을 우선으로 한다.

- 'POST /users'

```json
{
  "id": "test",
  "password": "test1234"
}

```
<br>

- 필드값이 하나라도 비어있을 경우 400 Bad Request 응답
```json
{
  "message": [
    "아이디를 입력해주세요."
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

6-2. 사용자는 1회만 채용공고에 지원 가능

- 'POST /apply'

```json
{
  "recruit_id": "1",
  "user_id": "1"
}
```
<br>

- 지원하고자 하는 채용공고가 존재하지 않는 경우 404 Not Found 응답
```json
{
  "message": "해당 채용공고(8)는 존재하지 않습니다.",
  "error": "Not Found",
  "statusCode": 404
}
```
<br>

- 사용자의 중복 지원을 관리하기 위해 users 테이블에 status 컬럼을 추가
- status의 default 값을 '0'으로 설정 후 사용자가 지원을 완료하면 status 값이 '1' 변경된다.

  

