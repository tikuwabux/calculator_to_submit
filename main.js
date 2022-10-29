//入力データを保管するために、変数resultを設定。初期値をnullとする。
let result = "";
//＝で計算したかを判別するために設定。数字キー押下時の分岐条件として用いる。初期値をflaseとする。
let is_calc = false;
//DOMのレンダリング完了後、変数result、にid="result"を含むドキュメント要素（以後頻繁に使う）を代入する。
//以後は後者と同意味の前者を使用し、コードを見やすくしている。
window.onload = function () {
  result = document.getElementById('result')
};

//cキー押下時の処理
function c_click() {
  is_calc = false;
  result.value = "0";
}

//数字キー押下時の処理。引数valにはhtmlで設定した値が代入される（今回は this.innerHTML　のみ）。
function num_click(val) {
  if(is_calc) result.value = "0"
  is_calc = false;
  
  // 先頭につく0は１つのみにする
  if(result.value == "0" && val == "0"){
    result.value = result.value;
  }
  //"."はデータ中に１つのみとする
  else if(result.value.toString().includes(".") && val == "."){//toStringが不要な気がするのであとで消去して問題ないか調べてみる
    result.value = result.value;
  }
  //前データが"0" かつ直後の入力値が"." の時のみ 前データ("0")を保管。それに入力値（"."）を加えたものを新たなデータとする
  else if(result.value == "0" && val == "."){
    result.value = result.value + val;
  }
  //（上以外で）前データが"0"の時、前データを消去し、入力値を新たなデータとする
  else if(result.value == "0"){
    result.value = val;
  }
  //以上以外の時、前データを保管。それに入力値を加えたものを新たなデータとする
  else {
    result.value = result.value + val;
  }
  
    
}

//データの末尾が演算子か判別するために設定。演算子キー押下の処理の時に用いる。
function is_ope_last() {
  return ["+", "-", "×", "÷"].includes(result.value.toString().slice(-1)); ///toStringが不要な気がするのであとで消去して問題ないか調べて
}


//演算子キー押下時の処理
function ope_click(val) {
  if(is_calc) is_calc = false; //if文つける必要ないと思う。is_calc = falseだけでいけると思うから後で修正
  
  //データに演算子が連続することを防ぐ
  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;
  }
  else {
    result.value = result.value + val;
  }
  
}

