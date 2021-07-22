# my-calendar-front

## アプリ開発準備手順（記録用）

- GitHub 上で当リポジトリ`my-calendar-front`を作成
- リポジトリを落としてくる
  - `git clone https://github.com/s-udaka/my-calendar-front.git`
- アプリケーションを作成する
  - `cd my-calendar-front`
  - `npx create-react-app my-calendar --template typescript`
- Storybook を追加する
  - `cd my-calendar`
  - `npx -p @storybook/cli sb init`
- プロジェクトのルートフォルダーに.env ファイルを作成し、以下記載
  - `SKIP_PREFLIGHT_CHECK=true`
- react-router-dom をインストールします
  - `yarn add react-router-dom`
  - `yarn add -D @types/react-router-dom`
- ターミナルでテストランナー (Jest) を開始する（typescript にしてから動かない → 要調査）
  - `yarn test --watchAll`
- ポート 6006 でコンポーネントエクスプローラーを起動する
  - `yarn storybook`
- ポート 3000 でフロントエンドアプリケーションを起動する
  - `yarn start`
- React アプリをコンテナで動かすための Dockerfile を作成する
- GithubActions で AWS ECR へイメージをプッシュするための yml ファイルを作成する
  - `.github/workflows/ecr_push.yml`
- Actions で ECR へイメージがプッシュされたことを確認する
- AWS App Runner を用いて、ECR のイメージを自動的にデプロイするように設定（↓ の記事の*デプロイ*からやっただけ）
  - `https://qiita.com/Kouichi_Itagaki/items/4aa174a2993e8cc87ebe`
- `v`から始まるタグ付きでコミットすると自動的に Actions が動いて ECR にイメージがプッシュされる
- dynamodb_local のセットアップ

## アプリ開発実装手順（記録用）

### Material-UI インストール

- `yarn add @material-ui/core @material-ui/icons`

### ログイン画面とアカウント作成画面を作成

- ここからテンプレートを持ってきて呼び出すようにしただけ →`https://material-ui.com/ja/getting-started/templates/`

### ルーター機能を作成

- `App.tsx`でルーティングするようにした

### env ファイル切り替え

- `yarn add -D dotenv-cli`
- 環境ごとの env ファイルを作成し、package.json のスクリプト改修

### React から dynamodb に接続

- `yarn add @aws-sdk/client-dynamodb`

### React-hook-form によるバリデーション実装

- `yarn add react-hook-form`

### eslint、prettier の設定

- `yarn add -D eslint husky lint-staged prettier eslint-config-prettier`
- `yarn add -D @typescript-eslint/{parser,eslint-plugin}`
- `yarn add -D eslint-plugin-{react,react-hooks}`
- .eslintrc.json、.prettierrc.json、.eslintignore ファイル作成
- package.json にスクリプト等追記
- yarn lint でエラーが出たところをつぶす

### AWS CDK のインストール

- `yarn global add aws-cdk`
- yarn で global にインストールした場合はパスを通す必要があるので、.bashrc の末尾に以下の行を挿入
  - `export PATH="$(yarn global bin):$PATH"`
- `cdk --version`でバージョンが表示されれば OK
- `mkdir aws-cdk`←awscdk のコードは別ディレクトリで管理する必要があるため
- `cd aws-cdk`
- `cdk init app --language typescript`←typescript を使うプロジェクトができる
- `yarn add @aws-cdk/aws-iam`← 今回は IAM ロールを作成したいので追加でインストール
- `/lib/aws-cdk-stack.ts`にコードを書く
- `npm run build`
- `cdk deploy`
- 失敗したので`bin/aws-cdk.ts`の env 行のコメントを外して aws アカウントの情報を指定
- もう一度`npm run build`と`cdk deploy`を実行

### IAM ロールによる DynamoDB へのアクセス認証ができなかったため、Dockerfile からアクセスキーとシークレットキーを環境変数にセットすることで解決

- GitHub のシークレットキーに DynamoDB のフルアクセス権限を持つ AWS アクセスキーとシークレットキーをセット
- GitHubActions の yml と Dockerfile を改修し、環境変数を React アプリで呼び出せるようにした
- React アプリからは AWS SDK のクレデンシャルの設定時に環境変数のアクセスキーとシークレットキーを使用して認証するように変更
- ローカル環境で動作確認
  - `docker build -t my-calendar-front:0.0.1 . --build-arg aws_access_key=*** --build-arg aws_secret_key=***`
  - `docker run --rm -d -p 80:80 my-calendar-front:0.0.1`
  - コンソールログにアクセスキーとシークレットキーが表示されていれば環境変数が呼び出せてるので OK

### Material-UIを使用してカレンダーを作成する

#### 各種ライブラリのインストール
- `yarn add @fullcalendar/react @fullcalendar/timegrid @fullcalendar/interaction react-datepicker date-fns`
- `yarn add -D @types/react-datepicker` ※型定義は開発環境のみに入れたいため

## 参考にした記事

- `https://www.seeds-std.co.jp/blog/creators/2021-01-28-183934/`
  - 主に GithubActions を使った AWS ECR へのイメージプッシュの工程を参考にした
- `https://casualdevelopers.com/tech-tips/how-to-deploy-dockerized-react-application-to-aws-with-ecr-and-ecs-ec2/`
  - 主に React アプリをコンテナイメージにビルドする工程を参考にした
- `https://docs.microsoft.com/ja-jp/windows/dev-environment/javascript/nodejs-on-wsl`
  - 主に WSL2 で node の環境を構築する工程を参考にした
- `https://qiita.com/Dragon-taro/items/03f322dee15b19c33613`
  - 主にカレンダーアプリの作成工程を参考にした
- `https://qiita.com/growsic/items/ed67e03fda5ab7ef9d08`
  - コミットにタグを付ける方法を参考にした
- `https://hackers-high.com/aws/dynamodb-local-development/`
  - dynamodb_local のセットアップを参考にした
- `https://dev.classmethod.jp/articles/react-dotenv-cli/`
  - env ファイルの環境ごとの切り替えで参考にした
- `https://www.wakuwakubank.com/posts/670-nodejs-dynamodb/`
  - DynamoDB へのアクセスについて参考にした
- `https://qiita.com/mikan3rd/items/2576c2f993d9c28d744c`
  - typescript の React でルーティングするところらへんまで参考にした
- `https://dev.classmethod.jp/articles/react-material-ui/`
  - typescript の React で Material-UI を使うところを参考にした
- `https://qiita.com/sunnyG/items/05c2e9381d6ba2d9fccf`
  - typescript の React 環境構築で参考にした
- `https://react-hook-form.com/jp/get-started`
  - React-hook-form の公式ページ
- `https://levelup.gitconnected.com/using-react-hook-form-with-material-ui-components-ba42ace9507a`
  - Material-UI と React-hook-form を合わせ込むところを参考にした
- ESLint、Prettier 周りの設定で参考にした記事は以下
  - `https://qiita.com/sprout2000/items/ee4fc97f83f45ba1d227`
  - `https://qiita.com/sho-t/items/c9fe6d382636bd3402f8`
- react で画面遷移する際に nginx で 404 エラーが発生する問題を解決するために参考にした記事
  - `https://patrickjamesoneill.medium.com/404-not-found-with-docker-react-router-and-nginx-21fdce02c5`
- AWS CDK を使って IAM ロールを作成するところを参考にした記事
  - `https://docs.aws.amazon.com/ja_jp/cdk/latest/guide/getting_started.html`
  - `https://zenn.dev/waddy/articles/app-runner-nextjs-dynamodb`
  - `https://dev.classmethod.jp/articles/cdk-practice-15-iam-role/`
  - `https://docs.aws.amazon.com/ja_jp/cdk/latest/guide/environments.html`
- React アプリを本番環境で Docker 導入する
  - `https://qiita.com/suzuki0430/items/225eb66223298d704241`
- Material-UIを使用してカレンダーアプリを作成するところで参考にした
  - `https://katsuya-place.com/react-fullcalendar/`
- Material-UIを使用してヘッダーを作成するところで参考にした
  - `https://teech-lab.com/react-js-materialui-header/1297/`
