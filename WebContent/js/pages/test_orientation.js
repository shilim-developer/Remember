$(function() {
	var orientation;//排布方式
	var testContent = "";//测试显示数据
	var timeCount = 31; //时间
	var rememberTimeOut = false; //观察是否超时
	var inputTimeOut = false; //输入是否超时
	var answer = ""; //回答
	var groupCount = 3; //实验组数
	var testCount = 20; //实验次数
	var oneResult = new Array; //一次实验结果数组
	var allResult = []; //所有实验结果数组
	var hResult = -1;//水平记忆广度
	var vResult = -1;//垂直记忆广度
	var numberCount = 4;//初始数字个数
	
	//排布方式选择
	//水平点击事件监听
	$(".main").on("click", ".horizontal", function() {
		$(".orientation-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		//设置显示水平的内容
		$(".content-horizontal").removeClass("hidden");
		$(".content-vertical").addClass("hidden");
		orientation = "水平";
	});
	//垂直点击事件监听
	$(".main").on("click", ".vertical", function() {
		$(".orientation-selector").addClass("hidden");
		$(".prepare").removeClass("hidden");
		//设置显示垂直内容
		$(".content-horizontal").addClass("hidden");
		$(".content-vertical").removeClass("hidden");
		orientation = "垂直";
	});
	
	//准备
	$(".main").on("click", ".start", function() {
		//设置显示水平的内容
		$(".content-horizontal").removeClass("hidden");
		$(".content-vertical").addClass("hidden");
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
				//如果到达一半，更换显示方式，保存数据
				if(allResult.length == (testCount/2)) {
					//保存数据
					if(hResult == -1) {
						hResult = getMemorySpan(numberCount,allResult);
						//清空本来的数据
						allResult = [];
						//设置显示垂直内容
						$(".content-horizontal").addClass("hidden");
						$(".content-vertical").removeClass("hidden");
					} else {
						vResult = getMemorySpan(numberCount,allResult);
						//数据处理
						saveDatas();
						//实验结束
						//清楚实验次数提示
						$(".test-count").text("");
						$(".test-submit").addClass("hidden");
						$(".test-end").removeClass("hidden");
					}
				}  else {
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
			method:"saveOrientationRecord",
			h_result:hResult,
			v_result:vResult
		}
		$.post(url,datas,function() {
			
		},function() {
			
		});
		console.log(datas)
	}
});
