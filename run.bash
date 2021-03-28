#!/usr/bin/env bash

# && はAND制御演算子「コマンド1が成功したらコマンド2を実行する」
# https://eng-entrance.com/linux-basic-and
# コマンドをバックグランドジョブとして使うためのコマンド
# https://eng-entrance.com/linux-basic-background
# server/index.jsの実行
(cd client && ./run.bash) &
(cd server && npm run start) &

# 現在のシェルが実行している全てのジョブが終了するのを待つ
# https://www.atmarkit.co.jp/ait/articles/1906/28/news025.html
wait
