//入力データを保管するために、変数resultを設定。初期値をnullとする。
let result = "";
//直前の入力が＝であるかを判別するためのフラグ。数字・小数点・０キー押下時の分岐条件として用いる。初期値をflaseとする。
let is_calc = false;
//小数点をデータに追加可能か判別するためのフラグ。trueなら追加可能。小数点キーの押下時の分岐条件として用いる。
let point = true;
//DOMのレンダリング完了後、変数result、にid="result"を含むドキュメント要素（以後頻繁に使う）を代入する。
//以後は後者と同意味の前者を使用し、コードを見やすくしている。
window.onload = function () {
  result = document.getElementById('result')
};

//cキー押下時の処理
function c_click() {
  is_calc = false;
  point = true;
  result.value = "0";
}

//数字キー押下時の処理。引数valにはhtmlで設定した値が代入される（今回は this.innerHTML　のみ）。
function num_click(val) {
  
  //直前の入力が=であるとき、前データを消去し、"0"を新たなデータとする。
  if(is_calc){
    result.value = val;
    is_calc = false;
  }
  
  //上でない、かつ、前データが"0"の時、前データを消去し、入力値を新たなデータとする
  else if(result.value == "0"){
    result.value = val;
  }
  
  //以上以外の時、前データを保管。それに入力値を加えたものを新たなデータとする
  else {
    result.value = result.value + val;
  }
}

//小数点キー押下時の処理
function point_click(val) {
  if(is_calc) result.value = "0"
  is_calc = false;
  
  //"演算子."という形を禁止
  if(["+", "-", "×", "÷"].includes(result.value.slice(-1))){
    result.value = result.value + "0"
  }
  //小数点フラグが立っているときのみ、新たなデータ = 全データ + ".";とする。
  if(point) {
    result.value = result.value + val;
    point = false;
  }
}

//0キー押下時の処理
function zero_click(val) {
  if (is_calc) result.value = "0";
  is_calc = false;
  
  //"演算子00"という形を禁止。例えば"+00"など
  if (result.value.slice(-1) == "0" && ["+", "-", "×", "÷"].includes(result.value.slice(-2,-1)) ){
    result.value = result.value;
  }
  
  //"00"という形を禁止。"0"の連続を禁止しているわけでない。例えば"100"などは条件を満たさない。
  else if(result.value == "0") {
    result.value = result.value;
  }
  
  //以上以外の時、前データを保管。それに入力値を加えたものを新たなデータとする
  else {
    result.value = result.value + val;
  }
}

//データの末尾が演算子か判別するために設定。演算子キー、＝キー押下の処理の時に用いる。
function is_ope_last() {
  return ["+", "-", "×", "÷"].includes(result.value.slice(-1));
}


//演算子キー押下時の処理
function ope_click(val) {
  is_calc = false;
  point = true;
  
  //データに演算子が連続することを禁止
  if(is_ope_last()){
    result.value = result.value.slice(0, -1) + val;
  }
  else {
    result.value = result.value + val;
  }
}

//=キー押下時の時の処理
function equal_click() {
  //データ末尾の演算子を削除
  if(is_ope_last()) result.value = result.value.slice(0, -1);
  
  let temp = new Function("return " + result.value.replaceAll("×", "*").replaceAll("÷", "/"))();
  if(temp == Infinity || Number.isNaN(temp)){
    result.value = "Error";
  }
  else {
    result.value = temp;　//resultはtype="text"のinput属性であるため、tempを代入しても、その後"temp"に自動変換され、result.value == "temp"となる。
    is_calc = true;
    point = true;
  }
}

