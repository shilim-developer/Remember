$(function() {
	var sex; //性别
	var testContent = ""; //测试显示数据
	var timeCount = 31; //时间
	var rememberTimeOut = false; //观察是否超时
	var inputTimeOut = false; //输入是否超时
	var answer = ""; //回答
	var groupCount = 3; //实验组数
	var testCount = 10; //实验次数
	var oneResult = new Array; //一次实验结果数组
	var allResult = []; //所有实验结果数组
	var numberCount = 4;//初始数字个数

	//测试类型选择
	//性别点击监听
//	$(".main").on("click", ".sex", function() {
//		$(".type-box").addClass("hidden");
//		$(".sex-selector").removeClass("hidden");
//	});

	//性别选择
	//男点击事件监听
	$(".main").on("click", ".man", function() {
		$(".sex-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		sex = "男";
	});
	//女点击事件监听
	$(".main").on("click", ".woman", function() {
		$(".sex-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		sex = "女";
	});

	//准备
	$(".main").on("click", ".start", function() {
		start();
	});

	//开始
	function start() {
		$(".prepare").addClass("hidden");
		testContent = getRandomNumberStr(numberCount+allResult.length);
		$(".content").text(testContent);
		$(".test-count").text("第" + (allResult.length + 1) + "次实验");
		$(".time").removeClass("hidden");
		$(".test-borad").removeClass("hidden");
		//设置超时时间
		$(".time").text(11);
		//设置超时标志
		rememberTimeOut = false;
		rememberTimeTask();
	}

	//下一次实验
	$(".main").on("click", ".next", function() {
		//初始化数据
		oneResult = [];
		$(".test-next").addClass("hidden");
		start();
	});

	//观察计时器
	function rememberTimeTask() {
		if(rememberTimeOut) return;
		timeCount = $(".time").text() * 1 - 1;
		if(timeCount == 0) {
			rememberTimeOut = true;
			//时间到跳转提交页
			$(".test-borad").addClass("hidden");
			$(".test-submit").removeClass("hidden");
			var nextGroup = oneResult.length + 2;
			$(".submit-tips").text(nextGroup > groupCount ? "本次实验结束" : "即将进入第" + nextGroup + "组实验");
			//重置时间
			$(".time").text(11);
			//设置超时标志
			inputTimeOut = false;
			//开启输入计时器
			inputTimeTask();
		} else {
			$(".time").text(timeCount);
		}
		setTimeout(rememberTimeTask, 1000);
	}

	//输入计时器
	function inputTimeTask() {
		if(inputTimeOut) return;
		timeCount = $(".time").text() * 1 - 1;
		if(timeCount == 0) {
			inputTimeOut = true;
			//时间到，收集数据
			oneResult.push(getCheckResult(testContent, $(".submit-in").val()));
			//清空输入框
			$(".submit-in").val("");
			if(oneResult.length == groupCount) {
				//隐藏时间
				$(".time").addClass("hidden");
				allResult.push(oneResult);
				if(allResult.length == testCount) {
					//实验结束
					//数据处理
					saveDatas();
					//清楚实验次数提示
					$(".test-count").text("");
					$(".test-submit").addClass("hidden");
					$(".test-end").removeClass("hidden");
				} else {
					//进入第二次实验
					$(".test-submit").addClass("hidden");
					$(".test-next").removeClass("hidden");
				}
			} else {
				$(".test-submit").addClass("hidden");
				start();
			}
		} else {
			$(".time").text(timeCount);
		}
		setTimeout(inputTimeTask, 1000);
	}
	
	function saveDatas() {
		var url = getBaseUrl()+"TestServlet";
		var datas = {
			method:"saveRecord",
			typeId:1,
			difference:sex,
			correctCount:getMemorySpan(numberCount,allResult)
		}
		$.post(url,datas,function() {
			
		},function() {
			
		});
		console.log(datas)
	}

	//提交
	$(".main").on("click", ".submit-btn", function() {
		$(".test-submit").addClass("hidden");
		$(".ysex").text(sex);
		$(".answer").text(testContent);
		answer = $(".submit-in").val();
		$(".yanswer").text(answer);
		$(".correct-count").text(getCorrectCount(testContent, answer));
		$(".result").removeClass("hidden");
	});

});