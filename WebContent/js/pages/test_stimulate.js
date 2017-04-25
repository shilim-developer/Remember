$(function() {
	var testContent = ""; //测试显示数据
	var currentIndex = 0; //当前观察个数
	var answer = ""; //回答
	var groupCount = 3; //实验组数
	var testCount = 10; //实验次数
	var oneResult = new Array; //一次实验结果数组
	var allResult = []; //所有实验结果数组
	var numberResult = -1; //数字记忆广度
	var letterResult = -1; //字母记忆广度
	var numberCount = 4; //初始数字个数

	//准备
	$(".main").on("click", ".start", function() {
		$(".prepare").addClass("hidden");
		setTimeout(function() {
			start();
		}, 700);
	});

	//开始
	function start() {
		if(numberResult == -1) {
			//获取随机数
			testContent = getDifRandomNumberStr(numberCount + allResult.length);
			$(".test-count").text("数字类型第" + (allResult.length + 1) + "次实验");
		} else {
			//获取随机字母
			testContent = getDifRandomLetterStr(numberCount + allResult.length);
			$(".test-count").text("字母类型第" + (allResult.length + 1) + "次实验");
		}
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
			method: "saveStimulateRecord",
			number_result: numberResult,
			letter_result: letterResult
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
				if(numberResult == -1) {
					//计算结果
					numberResult = getMemorySpan(numberCount, allResult);
					//清空allResut
					allResult = [];
					//进入第二次实验
					$(".test-submit").addClass("hidden");
					$(".change-tips").text("数字类型实验结束，将进入字母类型实验，准备好请点击下面按钮开始");
					$(".test-next").removeClass("hidden");
				} else {
					letterResult = getMemorySpan(numberCount, allResult);
					//实验结束
					//数据处理
					saveDatas();
				}
			} else {
				//进入第二次实验
				$(".test-submit").addClass("hidden");
				$(".change-tips").text("准备好点击下面按钮进入下一次实验")
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