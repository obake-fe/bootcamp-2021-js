#!/usr/bin/env bash

#エラーが起こった場合、即終了する
#https://inokara.hateblo.jp/entry/2020/06/27/084149
#https://www.atmarkit.co.jp/ait/articles/1805/18/news038.html
set -eu

#sleep - 指定した時間だけ処理を遅延 - Linuxコマンド
#https://webkaru.net/linux/sleep-command/
sleep 3

#ウェブサーバーの起動
#https://www.php.net/manual/ja/features.commandline.webserver.php
php -S localhost:1234
