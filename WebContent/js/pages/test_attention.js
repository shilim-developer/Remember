$(function() {
	var testContent = ""; //测试显示数据
	var currentIndex = 1; //当前实验数
	var groupCount = 5; //实验组数
	var testCount = 40; //实验次数
	var chartArr = ["","","",""]//图表数组

	//测试数据点数数组
	var testContentArr = (function(m, n, count) {
		var arr = [];
		for(var i = m; i <= n; i++) {
			for(var j = 0; j < count; j++) {
				arr.push(i);
			}
		}
		arr.sort(function(a, b) {
			return Math.random() > .5 ? -1 : 1;
		});
		return arr;
	})(5, 12, groupCount);
	var answerArr = [];//答案数组
	//结果数组
	var resultArr = (function(m, n) {
		var arr = new Array();
		for(var i = m; i <= n; i++) {
			var item = {
				aNumber: i,
				showCount: groupCount,
				correctNumber: 0,
				correctPercentage: 0
			}
			arr.push(item);
		}
		return arr;
	})(5, 12);

	//准备
	$(".main").on("click", ".start", function() {
		$(".prepare").addClass("hidden");
		setTimeout(function() {
			start();
		}, 700);
	});

	//开始
	function start() {
		$(".test-count").text("第" + currentIndex + "次实验");
		//显示测试
		$(".test-borad").removeClass("hidden");
		//开始显示测试内容
		rememberTimeTask();
	}

	//下一次实验
	$(".main").on("click", ".next", function() {
		//初始化数据
		oneResult = [];
		$(".content").text("");
		$(".test-next").addClass("hidden");
		setTimeout(function() {
			start();
		}, 700);
	});

	//观察计时器
	function rememberTimeTask() {
		//显示点数
		testContent = "";
		var randomArr = getRandomPointIndexArr(400, testContentArr[currentIndex - 1]);
//		console.log(testContentArr[currentIndex - 1])
		for(var i = 0; i < 400; i++) {
			if(randomArr.indexOf(i) >= 0) {
				testContent += "<div class='circle'></div>";
			} else {
				testContent += "<div class='no-circle'></div>";
			}
		}
		$(".content").append(testContent);
		//0.25后结束
		setTimeout(function() {
			if(currentIndex == testCount) {
				$(".submit-btn").text("实验结束");
			} else {
				$(".submit-btn").text("进入下一次实验");
			}
			$(".content").empty();
			$(".test-borad").addClass("hidden");
			$(".test-submit").removeClass("hidden");
		}, 250);
	}

	//提交
	$(".main").on("click", ".submit-btn", function() {
		answerArr.push($(".submit-in").val());
		//清空输入框
		$(".submit-in").val("");
		$(".test-submit").addClass("hidden");
		if(currentIndex == testCount) {
			$(".test-count").text("");
			countResult();
			$(".test-end").removeClass("hidden");
		} else {
			currentIndex++;
			setTimeout(function() {
				start();
			}, 700);
		}
	});

	//查看实验结果
	$(".main").on("click", ".show-result", function() {
		$(".test-end").addClass("hidden");
		$(".test-result").removeClass("hidden");
		initChart();
	});

	//计算结果
	function countResult() {
		var resultView = "";
		for(var i = 0; i < testContentArr.length; i++) {
			if(testContentArr[i] == answerArr[i]) {
				resultArr[testContentArr[i] - 5].correctNumber++;
			}
		}
		for(var j = 0; j < resultArr.length; j++) {
			resultArr[j].correctPercentage = resultArr[j].correctNumber /
				resultArr[j].showCount * 100;
			chartArr.push(resultArr[j].correctPercentage);
			resultView += "<tr>" +
				"<td>" + resultArr[j].aNumber + "</td>" +
				"<td>" + resultArr[j].showCount + "</td>" +
				"<td>" + resultArr[j].correctNumber + "</td>" +
				"<td>" + resultArr[j].correctPercentage + "</td>" +
				"</tr>";
		}
		$(".test-result tbody").append(resultView);
		console.log(resultArr);
	}
	
	//初始化图表
	function initChart() {
		var chart = echarts.init(document.getElementById("resultChart"));
		var option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'none' }
			},
			grid: {
				y:40,
				y2:20,
				x2:70
			},
			xAxis: {
				name: '目标个数',
				type: 'category',
				boundaryGap: false,
				data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
			},
			yAxis: {
				name: '正确率',
				type: 'value',
				max: 100,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			series: [{
					name: '正确百分率',
					type: 'line',
					data: chartArr,
					markLine: {
						data: [{
							name: '50%',
							yAxis: 50
						}]
					}
				}
			]
		};
		chart.setOption(option);
	}
});