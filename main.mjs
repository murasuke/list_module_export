// 動的に読み込んだmoduleから、exportされた変数や関数を抜き出すサンプル
const module = await import('./exports.mjs');

function isConstructor(func) {
  // コンストラクタ関数か、通常の関数か？を判断する方法がないので'class'という文字があるかでチェックしている
  return /\bclass\s/.test(func.toString());
}

// exportされた名前がmoduleのキーになっている
console.log(Object.keys(module));

// キーを使いexportされた各種値を取り出して型を確認する
for (const key of Object.keys(module)) {
  const obj = module[key];
  console.log(`${key}:`);

  if (typeof obj == 'function') {
    if (isConstructor(obj)) {
      console.log(`  constructor`);
    } else {
      console.log(`  function`);
      obj(key); // 関数を呼び出す
    }
  } else {
    // 値の表示
    console.log(`  variable(${typeof obj}) ${obj}`);
  }
}
