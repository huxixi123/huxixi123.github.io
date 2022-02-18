var symptomName = last_month_day();

$(function() {
	init();
	init2();
	$("#el-dialog").addClass("hide");
	$(".close").click(function(event) {
		$("#el-dialog").addClass("hide");
	});

	var date = new Date();
	var numble = date.getDate();
	var today = getFormatMonth(new Date());
	$("#date1").html(today);
	$("#date2").html(today);
	$("#date3").html(today);
	$("#date4").html(today);


	lay('.demo-input').each(function() {
		laydate.render({
			type: 'month',
			elem: this,
			trigger: 'click',
			theme: '#95d7fb',
			calendar: true,
			showBottom: true,
			done: function() {
				console.log($("#startDate").val())

			}
		})
	});

})

function init() {
	//地图
	var mapChart = echarts.init(document.getElementById('mapChart'));
	mapChart.setOption({
		bmap: {
			center: [117.17, 30.970185],
			zoom: 12,
			roam: true,

		},
		tooltip: {
			trigger: 'item',
			formatter: function(params, ticket, callback) {
				return params.value[2]
			}
		},
		series: [{
			type: 'scatter',
			coordinateSystem: 'bmap',
			data: []
		}]
	});
	mapChart.on('click', function(params) {
		$("#el-dialog").removeClass('hide');
		$("#reportTitle").html(params.value[2]);
	});

	var bmap = mapChart.getModel().getComponent('bmap').getBMap()
	bmap.addControl(new BMap.MapTypeControl({
		mapTypes: [BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP]
	}));
	bmap.setMapStyle({
		style: 'midnight'
	})

	// 各运营商数据量
	var pieChart1 = echarts.init(document.getElementById('pieChart1'));
	pieChart1.setOption({
		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		legend: {
			y: '260',
			x: 'center',
			textStyle: {
				color: '#ffffff',

			},
			data: ['移动', '电信', '联通'],
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}G ({d}%)"
		},
		calculable: false,
		series: [{
			name: '数据量',
			type: 'pie',
			radius: ['40%', '70%'],
			center: ['50%', '45%'],
			itemStyle: {
				normal: {
					label: {
						show: false
					},
					labelLine: {
						show: false
					}
				},
				emphasis: {
					label: {
						show: true,
						position: 'center',
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				}
			},
			data: [{
					value: 335,
					name: '移动'
				},
				{
					value: 310,
					name: '电信'
				},
				{
					value: 234,
					name: '联通'
				}
			]
		}]
	});

	// 数据采量(当日)
	var lineChart = echarts.init(document.getElementById('lineChart'));
	lineChart.setOption({

		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		legend: {
			y: '260',
			x: 'center',
			textStyle: {
				color: '#ffffff',

			},
			data: ['移动', '电信', '联通'],
		},
		calculable: false,
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}条"
		},
		yAxis: [{
			type: 'value',
			axisLine: {
				onZero: false
			},
			axisLine: {
				lineStyle: {
					color: '#034c6a'
				},
			},

			axisLabel: {
				textStyle: {
					color: '#fff'
				},
				formatter: function(value) {
					return value + "GB"
				},
			},
			splitLine: {
				lineStyle: {
					width: 0,
					type: 'solid'
				}
			}
		}],
		xAxis: [{
			type: 'category',
			data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
			axisLine: {
				lineStyle: {
					color: '#034c6a'
				},
			},
			splitLine: {
				"show": false
			},
			axisLabel: {
				textStyle: {
					color: '#fff'
				},
				formatter: function(value) {
					return value + ""
				},
			},
			splitLine: {
				lineStyle: {
					width: 0,
					type: 'solid'
				}
			},
		}],
		grid: {
			left: '5%',
			right: '5%',
			bottom: '20%',
			containLabel: true
		},
		series: [{
				name: '移动',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [15, 0, 20, 45, 22.1, 25, 70, 55, 76]
			},
			{
				name: '电信',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [25, 10, 30, 55, 32.1, 35, 80, 65, 76]
			},
			{
				name: '联通',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [35, 20, 40, 65, 42.1, 45, 90, 75, 96]
			}
		]
	});

	// 各运营商使用人数
	var histogramChart = echarts.init(document.getElementById('histogramChart'));
	histogramChart.setOption({

		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		legend: {
			y: '250',
			x: 'center',
			data: ['移动', '电信', '联通'],
			textStyle: {
				color: '#ffffff',

			}
		},

		calculable: false,


		grid: {
			left: '5%',
			right: '5%',
			bottom: '20%',
			containLabel: true
		},

		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},

		xAxis: [{
			type: 'value',
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff'
				}
			},
			splitLine: {
				lineStyle: {
					color: ['#f2f2f2'],
					width: 0,
					type: 'solid'
				}
			}

		}],

		yAxis: [{
			type: 'category',
			data: ['总人数(人)', '平均人次(人/年)', '人均套餐费用(元)'],
			axisLabel: {
				show: true,
				textStyle: {
					color: '#fff'
				}
			},
			splitLine: {
				lineStyle: {
					width: 0,
					type: 'solid'
				}
			}
		}],

		series: [{
				name: '移动',
				type: 'bar',
				stack: '总量',
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'insideRight'
						}
					}
				},
				data: [320, 302, 301]
			},
			{
				name: '电信',
				type: 'bar',
				stack: '总量',
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'insideRight'
						}
					}
				},
				data: [120, 132, 101]
			},
			{
				name: '联通',
				type: 'bar',
				stack: '总量',
				itemStyle: {
					normal: {
						label: {
							show: true,
							position: 'insideRight'
						}
					}
				},
				data: [220, 182, 191]
			}
		]
	});
	// 使用人数(当日)
	var lineChart2 = echarts.init(document.getElementById('lineChart2'));
	lineChart2.setOption({

		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		legend: {
			y: '260',
			x: 'center',
			textStyle: {
				color: '#ffffff',

			},
			data: ['移动', '电信', '联通'],
		},
		calculable: false,
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}条"
		},
		yAxis: [{
			type: 'value',
			axisLine: {
				onZero: false
			},
			axisLine: {
				lineStyle: {
					color: '#034c6a'
				},
			},

			axisLabel: {
				textStyle: {
					color: '#fff'
				},
				formatter: function(value) {
					return value + "GB"
				},
			},
			splitLine: {
				lineStyle: {
					width: 0,
					type: 'solid'
				}
			}
		}],
		xAxis: [{
			type: 'category',
			data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
			axisLine: {
				lineStyle: {
					color: '#034c6a'
				},
			},
			splitLine: {
				"show": false
			},
			axisLabel: {
				textStyle: {
					color: '#fff'
				},
				formatter: function(value) {
					return value + ""
				},
			},
			splitLine: {
				lineStyle: {
					width: 0,
					type: 'solid'
				}
			},
		}],
		grid: {
			left: '5%',
			right: '5%',
			bottom: '20%',
			containLabel: true
		},
		series: [{
				name: '移动',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [15, 0, 20, 45, 22.1, 25, ].reverse()
			},
			{
				name: '电信',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [25, 10, 30, 55, 32.1, 35, ].reverse()
			},
			{
				name: '联通',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						lineStyle: {
							shadowColor: 'rgba(0,0,0,0.4)'
						}
					}
				},
				data: [35, 20, 40, 65, 42.1, 45, ].reverse()
			}
		]
	});



}

function init2() {
	
}
