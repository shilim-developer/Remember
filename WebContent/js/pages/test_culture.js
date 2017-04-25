$(function() {
	var culture; //文化程度
	var testContent = ""; //测试显示数据
	var currentIndex = 0; //当前观察个数
	var answer = ""; //回答
	var groupCount = 3; //实验组数
	var testCount = 10; //实验次数
	var oneResult = new Array; //一次实验结果数组
	var allResult = []; //所有实验结果数组
	var numberCount = 4; //初始数字个数

	//文化程度选择
	//初中点击事件监听
	$(".main").on("click", ".junior", function() {
		$(".culture-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		culture = "初中";
	});
	//高中点击事件监听
	$(".main").on("click", ".high", function() {
		$(".culture-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		culture = "高中";
	});
	//大学点击事件监听
	$(".main").on("click", ".university", function() {
		$(".culture-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		culture = "大学";
	});

	//准备
	$(".main").on("click", ".start", function() {
		$(".prepare").addClass("hidden");
		setTimeout(function() {
			start();
		}, 700);
	});

	//开始
	function start() {
		//获取随机数
		testContent = getDifRandomNumberStr(numberCount + allResult.length);
		$(".test-count").text("第" + (allResult.length + 1) + "次实验");
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
		//最后一个
		if(currentIndex == testContent.length) {
			//复原currentIndex
			currentIndex = 0;
			//进入输入
			if((oneResult.length + 1) == groupCount) {
				$(".submit-btn").text("本次实验结束");
			} else {
				$(".submit-btn").text("进入下一组实验");
			}
			$(".test-borad").addClass("hidden");
			$(".test-submit").removeClass("hidden");
			return;
		} else {
			//显示一个数字或者字母
			$(".content").text(testContent.charAt(currentIndex));
			currentIndex++;
		}
		setTimeout(rememberTimeTask, 700);
	}

	//保存数据
	function saveDatas() {
		showLoading();
		var url = getBaseUrl() + "TestServlet";
		var datas = {
			method: "saveCultureRecord",
			culture: culture,
			result: getMemorySpan(numberCount, allResult)
		}
		$.post(url, datas)
			.success(function(data) {
				closeLoading();
				//清除实验次数提示
				$(".test-count").text("");
				$(".test-submit").addClass("hidden");
				$(".test-end").removeClass("hidden");
			})
			.error(function() {
				closeLoading();
				alert("网络错误，请确保你的网络开启");
			});
	}

	//提交
	$(".main").on("click", ".submit-btn", function() {
		oneResult.push(getCheckResult(testContent, $(".submit-in").val()));
		//清空输入框
		$(".submit-in").val("");
		if(oneResult.length == groupCount) {
			//隐藏时间
			allResult.push(oneResult);
			if(allResult.length == testCount) {
				//实验结束
				//数据处理
				saveDatas();
			} else {
				//进入第二次实验
				$(".test-submit").addClass("hidden");
				$(".test-next").removeClass("hidden");
			}
		} else {
			$(".test-submit").addClass("hidden");
			setTimeout(function() {
				start();
			}, 700);
		}
	});

});