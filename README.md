# ES Modulesからexportされている関数や変数の一覧を取得する方法

## はじめに

ESModuleを動的にロードして、そのモジュールでexportされた関数や変数の一覧を取得する方法です

`dynamic import`でロードすると、moduleの`key`がexportした名前になっていました

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/import

## 調査対象モジュール

関数、変数、classをexportするだけのモジュールです

```javascript:exports.mjs
// 関数、変数、classをexport(確認用)

export function func1(args) {
  console.log(`called func1(${args})`);
}

export const func2 = (args) => {
  console.log(`called func2(${args})`);
};

export const CONST_VAL = 'const text';

export class export_class {}

let default_value = 123;

export default default_value;
```


## moduleを動的に読み込み、exportされた変数や関数の一覧を表示する

* `dynamic import`を利用して動的にロードする
* moduleのkeyがexportされた変数名や関数名(default exportは`default`という名前になっている)

* classはコンストラクタ関数としてexportされますが、通常の関数と判断する方法がありませんでした(new をつけずに呼び出せば実行時エラーになるので判断できなくはないですが・・・)

```javascript:main.mjs
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

```

## 実行結果

node環境でもブラウザでも同じ結果になります

```
$ node main.mjs
[ 'CONST_VAL', 'default', 'export_class', 'func1', 'func2' ]
CONST_VAL:
  variable(string) const text
default:
  variable(number) 123
export_class:
  constructor
func1:
  function
called func1(func1)
func2:
  function
called func2(func2)
```
