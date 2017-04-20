function getBaseUrl() {
	return "/Remember/";
}

//自动生成15位数字加15位字符随机数
function getRandomTestContent() {
	var letterArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];
	var numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var result = [];
	for(var i = 0; i < 15; i++) {
		//随机获取字母
		result.push(letterArr[Math.floor(Math.random() * letterArr.length)]);
		//随机获取数字
		result.push(numberArr[Math.floor(Math.random() * numberArr.length)])
	}
	//数组数据随机打乱
	result.sort(function(a, b) {
		return Math.random() > .5 ? -1 : 1;
	});
	//遍历数组生成字符串
	var randomResult = "";
	for(var j = 0; j < result.length; j++) {
		randomResult += result[j];
	}
	return randomResult;
}

//自动生成n位数字随机排列字符串
function getRandomNumberStr(count) {
	var result = [];
	var numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	for(var i = 0; i < count; i++) {
		//随机获取数字
		result.push(numberArr[Math.floor(Math.random() * numberArr.length)]);
	}
	//数组数据随机打乱
	result.sort(function(a, b) {
		return Math.random() > .5 ? -1 : 1;
	});
	//遍历数组生成字符串
	var randomResult = "";
	for(var j = 0; j < result.length; j++) {
		randomResult += result[j];
	}
	return randomResult;
}

//自动生成n位相邻不重复的数字字符串
function getDifRandomNumberStr(n) {
	var randomResult = "";
	for(var i=0;i<n;i++) {
		var numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		if(i>0) {
			numberArr.splice(numberArr.indexOf(parseInt(randomResult.charAt(i-1))),1);
		}
		randomResult += numberArr[Math.floor(Math.random() * numberArr.length)];
	}
	return randomResult;
}

//自动生成n位相邻不重复的字母字符串
function getDifRandomLetterStr(n) {
	var randomResult = "";
	for(var i=0;i<n;i++) {
		var numberArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
		'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
	];
		if(i>0) {
			numberArr.splice(numberArr.indexOf(randomResult.charAt(i-1)),1);
		}
		randomResult += numberArr[Math.floor(Math.random() * numberArr.length)];
	}
	return randomResult;
}

//生成相应颜色的排列
function getColorBackground(testContent, color) {
	var colorArr;
	switch(color) {
		case "RB":
			colorArr = ["red", "blue"];
			break;
		case "RG":
			colorArr = ["red", "green"];
			break;
		case "GB":
			colorArr = ["green", "blue"];
			break;
	}
	//生成html背景代码
	var result = "";
//	console.log(colorArr);
	for(var i = 0; i < testContent.length; i++) {
		result += "<div class='" +
			(Math.random() > .5 ? colorArr[0] : colorArr[1]) +
		"'>" + testContent.charAt(i) + "</div>";
	}
	return result;
}

//测试方法
function hello(color) {
	var testColor = "红蓝";
	var paramColor = color;
	console.log(color == testColor);
	console.log(color == "红蓝");
	console.log(paramColor == testColor);
	console.log(paramColor == "红蓝");
}

//计算正确是否
function getCheckResult(answer, yanswer) {
	var alen = answer.length;
	var yalen = yanswer.length;
	var correctCount = 0;
	if(alen == yalen) {
		for(var i = 0; i < yalen; i++) {
			if(answer.charAt(i) != yanswer.charAt(i)) {
				return false;
			}
		}
		return true;
	}
	return false;
}

//计算正确数
function getCorrectCount(answer, yanswer) {
	var alen = answer.length;
	var yalen = yanswer.length;
	var correctCount = 0;
	if(alen >= yalen) {
		for(var i = 0; i < yalen; i++) {
			if(answer.charAt(i) == yanswer.charAt(i)) {
				correctCount++;
			}
		}
	} else {
		for(var i = 0; i < alen; i++) {
			if(answer.charAt(i) == yanswer.charAt(i)) {
				correctCount++;
			}
		}
	}
	return correctCount;
}

//计算平均值
function getAvgFromArr(arr) {
	var result = [];
	if(arr[0] && arr[0].length > 0) {
		for(var i = 0; i < arr[0].length; i++) {
			var avg = 0;
			for(var j = 0; j < arr.length; j++) {
				avg += arr[i][j];
			}
			avg = (avg / arr.length).toFixed(2);
			result.push(avg);
		}
	}
	return result;
}

//计算记忆广度
function getMemorySpan(beginNum, arr) {
	var base = 0; //基数
	var noBase = 0; //非基数的和
	var result = 0;
	for(var i = 0; i < arr.length; i++) {
		var trueCount = 0;
		for(var j = 0; j < arr[i].length; j++) {
			if(arr[i][j] == true) {
				trueCount++;
			}
		}
		var dif = trueCount / arr[i].length;
		if(dif == 1) {
			base = i + beginNum;
			noBase = 0;
		} else {
			noBase += dif;
		}
	}
	result = base + noBase;
	return result.toFixed(2);
}