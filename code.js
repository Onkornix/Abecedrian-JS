// Version i1x2 \\ [added info section]

var array = [];
var wordsinput = '';
var concat = '';


onEvent("gobutton", "click", doit);
onEvent('reset', 'click', resetit);

function doit(){
  wordsinput = getText("textbox").toLowerCase(); 
  if (wordsinput != ''){ 
    hideElement('gobutton');
    showElement('reset');
  }
  if (wordsinput == ''){ 
    return;
  }
  for (var i = 0; i < wordsinput.length; i++) {
    var lettervalue = getval(wordsinput[i],'str'); 
    array.splice(wordsinput.length,0,lettervalue); 
    if (lettervalue == 'kill'){ 
      resetit();    
      showalert("please avoid numbers, symbols, accents, and non latin letters");
      return;                   
    }
  }
  var sortedarray = bubbleSort(array);
  for (var j = 0; j < sortedarray.length; j++){   
    var numletter = getval(sortedarray[j], 'int');
    concat = concat + numletter; 
  }
  setText("outputarea", concat); 
}
function resetit(){ 
  array.length = 0;
  wordsinput = '';
  concat = '';
  showElement('gobutton');
  hideElement('reset');
  setText("outputarea", '');
  setText('textbox', '');
}
function getval(input,strOrint){
  var alphabet = [' ','a','b','c','d','e','f','g','h','i','j','k','l',
                  'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  var getcontinue = null;
  if (strOrint == 'str'){
    getcontinue = false;
    for (var getint = 0; getcontinue != true; getint++){
      if (input == alphabet[getint]){ 
        getcontinue = true;           
        return getint;
      }
      if (getint > alphabet.length){ 
        resetit(true);
        return 'kill';
      }
    }
  }
  if (strOrint == 'int'){ 
    getcontinue = false;  
    for (var getstr = 0; getcontinue != true; getstr++){
      if (alphabet[input] == alphabet[getstr]){ 
        getcontinue = true;                   
        return alphabet[getstr];
      }
    }
  }
}
/* https://sortvisualizer.com/bubblesort/ */
function bubbleSort(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < ( arr.length - i -1 ); j++) {
            if(arr[j] > arr[j+1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j+1] = temp;
              
            }
        }
    }
  return arr;
}
function showalert(lert){
  setText("outputarea",lert);
  hideElement('gobutton');
  showElement('reset');
  setTimeout(function(){
    resetit();
  },3000);
}
onEvent("infoB","click",function(){
  setScreen("info");
});
onEvent("back", "click",function(){
  setScreen("main");
});