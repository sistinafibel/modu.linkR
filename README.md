

# modu.link
![q111](https://user-images.githubusercontent.com/36251104/66768705-30364180-eeee-11e9-9f3b-95658dae9d9d.gif)
<br>모든 URL을 단축URL로 만들어주는 귀여운 서비스.<br>
기~~~~인 URL은 싫지만 그렇다고 상용 단축URL은 쓰고싶지 않은 사람에게 적극 추천합니다.

### 바로 서비스 사용해보기
- http://modu.link/ [모두LINK]


### 사용방법

최상위 경로에 .env라는 파일명을 생성해주고 다음과 같은 내용을 복사하여 DB와 연결해줍니다. <br>서비스는 mysql5.7 기준으로 개발되었습니다.

```
# 정상적으로 입력하셨을시 다음과 같은 내용으로 입력됩니다.
#.env
SERVER_URL=서비스할 도메인명
DB_HOST= 디비 아이피
DB_USER=디비 아이디
DB_PASSWORD=디비 패스워드
DB_PORT=디비 포트
DB_TABLE_NAME=디비 테이블명

```
이후 bin/www 폴더에서  서비스 아이피를 변경합니다.
```
# 15라인
var port = normalizePort(process.env.PORT || '서비스아이피');
app.set('port', port);

```
이후 서비스에 필요한 묘듈을 설치한뒤 실행하면 끝!
```
#node가 설치된 상태를 전제로 합니다.
> npm install
### 설치완료
> npm start
```

### 개발 예정  
- URL 삭제 기능
- 브라우저 리프레시하면 생성한 URL 정보들이 사라짐.
-------
### 후기

2019.10.12 ~ 10.13일간 진행한 싱글(?) 해커톤이라고 상상하며 혼자한  프로젝트 .

핵심 기능 위주로 구현한 상태로 업데이트 될때마다 깃 기록에 정리해둘 예정입니다.
이 서비스를 정상적으로 사용하기에는 쪼까 무리가 있으나 필요한건 다 됩니다. 



<img src="https://user-images.githubusercontent.com/36251104/61592932-4779d180-ac14-11e9-95c7-a62f0d0fcc1e.jpg" width="300px"/>
<img src="https://user-images.githubusercontent.com/36251104/61592911-08e41700-ac14-11e9-8f76-b58c1da3abde.jpg" width="300px"/>
