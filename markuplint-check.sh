#!/bin/bash

# markuplint を実行して結果を一時ファイルに保存
# sed を使用して最初の4行を削除
npm run markup | sed '1,4d' > temp_results.json

# 結果ファイルが空でないかつ、"[]" ではない場合、エラーがあると見なす
if [ -s temp_results.json ] && [ "$(cat temp_results.json)" != "[]" ]; then
    echo "Error: markuplint found issues."
    # エラー詳細をログに出力
    cat temp_results.json | jq '.[] | "\(.filePath):\(.line):\(.message)"' | while read line; do
        echo "Error: $line"
    done
    # 一時ファイルを削除
    rm temp_results.json
    # 非ゼロの終了コードでスクリプトを終了
    exit 1
else
    echo "Success: No issues found by markuplint."
    # 一時ファイルを削除
    rm temp_results.json
    # スクリプトを正常終了
    exit 0
fi
