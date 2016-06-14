$(function() {
  $('#OutputText_Memo').val("");
  $('#OutputText_Html').val("");

  $("#ConvertButton").click(function(){
    var inputText = $("#InputText").val();

    inputText = inputText.replace(/(.*?)<script(.*?)>(.*?)/gm,"").replace(/(.*?)<\/script(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<html(.*?)>(.*?)/gm,"").replace(/(.*?)<\/html(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<title(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<meta(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<head(.*?)>(.*?)/gm,"").replace(/(.*?)<\/head(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<body(.*?)>(.*?)/gm,"").replace(/(.*?)<\/body(.*?)>(.*?)/gm,"");
    inputText = inputText.replace(/(.*?)<link(.*?)>(.*?)/gm,"");
    circleListTable = inputText;

    $('#ConvertTmp').append(circleListTable);
    var circleInfo = [];
    $('.webcatalog-circle-list-detail').each(function(index, element){
    	var circleId = $(element).attr("data-webcatalog-circle-id");
    	circleInfo.push ( {
    		'id':circleId,
    		'name':$(element).attr("data-webcatalog-circle-name"),
    		'day':$(element).attr("data-webcatalog-circle-day"),
    		'hall':$(element).attr("data-webcatalog-circle-hall"),
    		'block':$(element).attr("data-webcatalog-circle-block"),
    		'space':$(element).attr("data-webcatalog-circle-space"),
            'url':"https://webcatalog-free.circle.ms/Circle/" + circleId,
    	} );
    });

    //ランダム化
    var is_random = $('#is-random').prop('checked');
    if (is_random) {
        circleInfo = shuffle(circleInfo)
    }


	var outputText = "";
	Object.keys(circleInfo).forEach(function (key) {
		var info = circleInfo[key];
		outputText += "○" + info.name + "\n";
		outputText += info.day + "曜日 " + info.hall + info.block + info.space + "\n";
        outputText += info.url + "\n";
        outputText += "\n\n";
	});
    $('#OutputText_Memo').val(outputText);


	var outputText = "";
	Object.keys(circleInfo).forEach(function (key) {
		var info = circleInfo[key];
		outputText += "○<b>" + info.name + "</b><br>\n";
		outputText += info.day + "曜日 " + info.hall + info.block + info.space + "<br>\n";
        outputText += "<a href='" + info.url + "'>カタログ</a>" + "<br>\n";
        outputText += "<br>\n<br>\n";
	});
    $('#OutputText_Html').val(outputText);
  });


  function shuffle(array) {
    var n = array.length, t, i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }
    return array;
  }

});

