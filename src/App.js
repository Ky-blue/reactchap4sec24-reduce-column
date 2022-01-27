import React, { useState } from "react";
import "./styles.css";

const values = [
  { id: 1, item: "マウス" },
  { id: 2, item: "モニター" },
  { id: 3, item: "キーボード" }
];

//親コンポーネントからonChange属性とchecked属性の値を受け取る
//メソッドとそれに引き渡す引数があるなら単一行なのか？
const CheckBtnItems = ({ onChange, checked }) =>
  //valuesをmapで繰り返し処理
  //取り出す中身はvalueで受け取る
  //単一業だから？波括弧とreturnが省略
  //return省略されてるけどコールバッグ関数の中身を返す
  //mapメソッド自体が値を返すからreturnが省略されているっぽい？
  values.map((value) => {
    return (
      //map処理はkey属性を割り当てる必要がある
      <label key={value.id}>
        <input
          type="checkbox"
          value={value.item}
          onChange={onChange}
          //ここのせいで動かなかった
          //checked=checkedValues、オブジェクト
          //そこにアクセスしてブール値を得るためにはブラケット記法（変数を用いてのアクセスだし？をする必要があったんですね。
          checked={checked[value.item]}
        />
        {value.item}
      </label>
    );
  });

const InputCheckBox = () => {
  //状態管理変数とそれを変更する関数
  //checkedValuesは空のオブジェクト
  //reduceメソッドでvaluesのitemの値をプロパティ名にしてる
  //つまり後々のinputのchecked属性の操作に必要
  //accに存在しないプロパティを作り、それを返すことで
  //疑似的なpushメソッドみたいになってる
  const [checkedValues, setCheckedValues] = useState(
    values.reduce((acc, cur) => {
      acc[cur.item] = false;
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setCheckedValues({ ...checkedValues, [e.target.value]: e.target.checked });
  };

  const stateOfCheckedValues = Object.entries(checkedValues).reduce(
    (pre, [key, value]) => {
      value && pre.push(key);
      return pre;
    },
    []
  );

  return (
    <div className="App">
      <p>
        {/* チェックボックスはonChangeでcheckedValuesが更新されるためstateOfCheckedValuesも更新される */}
        現在選択されている値:
        <b>{stateOfCheckedValues.join("、")}</b>
      </p>
      <CheckBtnItems onChange={handleChange} checked={checkedValues} />
    </div>
  );
};

export default function App() {
  return <InputCheckBox />;
}
