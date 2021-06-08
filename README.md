# my-calendar-front
## アプリ開発手順（記録用）
- GitHub上で当リポジトリ`my-calendar-front`を作成
- リポジトリを落としてくる
  - `git clone https://github.com/s-udaka/my-calendar-front.git`
- アプリケーションを作成する
  - `cd my-calendar-front`
  - `npx create-react-app my-calendar --typescript`
- Storybookを追加する
  - `cd my-calendar`
  - `npx -p @storybook/cli sb init`
- プロジェクトのルートフォルダーに.envファイルを作成し、以下記載
  - `SKIP_PREFLIGHT_CHECK=true`
- react-router-domをインストールします
  - `npm install react-router-dom @types/react-router-dom`
- ターミナルでテストランナー (Jest) を開始する
  - `yarn test --watchAll`
- ポート 6006 でコンポーネントエクスプローラーを起動する
  - `yarn storybook`
- ポート 3000 でフロントエンドアプリケーションを起動する
  - `yarn start`
- Reactアプリをコンテナで動かすためのDockerfileを作成する
- GithubActionsでAWS ECRへイメージをプッシュするためのymlファイルを作成する
  - `.github/workflows/ecr_push.yml`
- ActionsでECRへイメージがプッシュされたことを確認する
- AWS App Runnerを用いて、ECRのイメージを自動的にデプロイするように設定（↓の記事の*デプロイ*からやっただけ）
  - `https://qiita.com/Kouichi_Itagaki/items/4aa174a2993e8cc87ebe`
- `v`から始まるタグ付きでコミットすると自動的にActionsが動いてECRにイメージがプッシュされる

## 参考にした記事
- `https://www.seeds-std.co.jp/blog/creators/2021-01-28-183934/`
  - 主にGithubActionsを使ったAWS ECRへのイメージプッシュの工程を参考にした
- `https://casualdevelopers.com/tech-tips/how-to-deploy-dockerized-react-application-to-aws-with-ecr-and-ecs-ec2/`
  - 主にReactアプリをコンテナイメージにビルドする工程を参考にした
- `https://docs.microsoft.com/ja-jp/windows/dev-environment/javascript/nodejs-on-wsl`
  - 主にWSL2でnodeの環境を構築する工程を参考にした
- `https://qiita.com/Dragon-taro/items/03f322dee15b19c33613`
  - 主にカレンダーアプリの作成工程を参考にした
- `https://qiita.com/growsic/items/ed67e03fda5ab7ef9d08`
  - コミットにタグを付ける方法を参考にした
