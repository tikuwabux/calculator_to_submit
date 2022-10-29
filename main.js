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
  result.value = "0";
  is_calc = false;
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
  //（上以外で）前データが"0"の時、前データを消去し、入力値を新たなデータ
  else if(result.value == "0"){
    result.value = val;
  }
  //以上以外の時、前データを保管。それに入力値を加えたものを新たなデータとする
  else {
    result.value = result.value + val;
  }
  
    
}

//演算子キー押下時の処理