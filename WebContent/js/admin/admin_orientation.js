$(function() {
	$('#tablelist').bootstrapTable({
		url: getBaseUrl() + "TestServlet",
		method: 'post',
		dataType: "json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		queryParams: queryParams,
		showRefresh: true,
		showExport: true,
		exportDataType: "basic",
		exportTypes: ["excel"],
		columns: [{
			field: 'index',
			title: '序号',
			formatter: function(value, row, index) {
				return index + 1;
			}
		}]
	});

	//请求参数
	function queryParams(params) { 
		var temp = { 
			method: "getRecordByTypeId",
			typeId: 2
		};
		return temp;
	}
});