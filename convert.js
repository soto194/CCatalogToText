﻿$(function() {
  $('#OutputText_Memo').val("");
  $('#OutputText_Html').val("");

  $("#ConvertButton").click(function(){
    var inputText = $("#InputText").val();

    circleListJson = inputText.match(/id=\"TheModel\">(.*?)<\/script>/g).map(function(s) {return s.substring(14, s.length - 9)});
    circleListTableList = circleListJson.map(function(s) {return JSON.parse(s)["Circles"]} );
    circleListTable = [].concat(...circleListTableList);
    var circleInfo = [];

    circleListTable.forEach(function(object) {
        console.log(object.Name);
        id = object.Id;
        circleId = object.CircleId
        circleInfo.push ( {
            'id':id,
            'circleId':circleId,
            'name':option(object.Name),
            'day':option(object.Day),
            'hall':option(object.Hall),
            'block':option(object.Block),
            'space':option(object.Space),
            'url':"https://webcatalog-free.circle.ms/Circle/" + id,
            'urlCircle':"https://webcatalog.circle.ms/Perma/Circle/" + circleId,
        } );
    });

    var is_random = $('#is-random').prop('checked');
    if (is_random) {
        circleInfo = shuffle(circleInfo)
    }

    var is_remove_undefined = $('#is-remove-undefined').prop('checked');
    if (is_remove_undefined) {
        tmpcircleInfo = circleInfo.concat();
        offset = 0;
        Object.keys(tmpcircleInfo).forEach(function (key) {
            var info = tmpcircleInfo[key];
            if (info.hall == "" || info.hall == "×") {
                circleInfo.splice(key-offset,1);
                offset++;
            }
        });
    }

	var outputText = "";
	Object.keys(circleInfo).forEach(function (key) {
		var info = circleInfo[key];
		outputText += "○" + info.name + "\n";
        if (info.day == "") {
            outputText += "スペース記載無し<br>\n";
        } else {
            outputText += info.day + "曜日 " + info.hall + info.block + info.space + "\n";
        }
        outputText += info.url + "\n";
        outputText += info.urlCircle + "\n";
        outputText += "\n\n";
	});
    $('#OutputText_Memo').val(outputText);


	var outputText = "";
	Object.keys(circleInfo).forEach(function (key) {
		var info = circleInfo[key];
		outputText += "○<b>" + info.name + "</b><br>\n";
        if (info.day == "") {
            outputText += "スペース記載無し<br>\n";
        } else {
	       	outputText += info.day + "曜日 " + info.hall + info.block + info.space + "<br>\n";
        }
        outputText += "<a href='" + info.url + "'>カタログ</a>" + " \n";
        outputText += "(<a href='" + info.urlCircle + "'>サークル固定リンク</a>)" + "<br>\n";
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

  function option(str) {
    return (typeof str === "undefined") ? "" : str
  }

});

