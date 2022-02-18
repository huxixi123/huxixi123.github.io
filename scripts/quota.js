$(function() {
	init();
})

function init() {
	var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];

	//各区数据量(月)
	var histogramChart1 = echarts.init(document.getElementById('histogramChart1'));
	histogramChart1.setOption({
		grid: {
			top: '20%',
			left: '32%'
		},
		xAxis: {
			show: false
		},
		yAxis: [{
			show: true,
			data: ['一区', '二区', '三区'],
			inverse: true,
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#fff',
				formatter: (value, index) => {
					return [
						`{lg|${index+1}}  ` + '{title|' + value + '} '
					].join('\n')
				},
				rich: {
					lg: {
						backgroundColor: '#339911',
						color: '#fff',
						borderRadius: 15,
						// padding: 5,
						align: 'center',
						width: 15,
						height: 15
					},
				}
			},
		}, {
			show: true,
			inverse: true,
			data: [5000, 3000, 2000],
			axisLabel: {
				textStyle: {
					fontSize: 12,
					color: '#fff',
				},
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
		}],
		series: [{
			name: '条',
			type: 'bar',
			yAxisIndex: 0,
			data: [40, 30, 20],
			barWidth: 10,
			itemStyle: {
				normal: {
					barBorderRadius: 20,
					color: function(params) {
						var num = myColor.length;
						return myColor[params.dataIndex % num]
					},
				}
			},
			label: {
				normal: {
					show: true,
					position: 'inside',
					formatter: '{c}%'
				}
			},
		}, {
			name: '框',
			type: 'bar',
			yAxisIndex: 1,
			barGap: '-100%',
			data: [100, 100, 100],
			barWidth: 15,
			itemStyle: {
				normal: {
					color: 'none',
					borderColor: '#00c1de',
					borderWidth: 3,
					barBorderRadius: 15,
				}
			}
		}, ]
	})

	//各区使用人次(月)
	var histogramChart2 = echarts.init(document.getElementById('histogramChart2'));
	histogramChart2.setOption({

		grid: {
			top: '20%',
			left: '32%'
		},
		xAxis: {
			show: false
		},
		yAxis: [{
			show: true,
			data: ['一区', '二区', '三区'],
			inverse: true,
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#fff',
				formatter: (value, index) => {
					return [

						`{lg|${index+1}}  ` + '{title|' + value + '} '
					].join('\n')
				},
				rich: {
					lg: {
						backgroundColor: '#339911',
						color: '#fff',
						borderRadius: 15,
						// padding: 5,
						align: 'center',
						width: 15,
						height: 15
					},
				}
			},


		}, {
			show: true,
			inverse: true,
			data: [2200, 2400, 2600],
			axisLabel: {
				textStyle: {
					fontSize: 12,
					color: '#fff',
				},
			},
			axisLine: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisTick: {
				show: false
			},

		}],
		series: [{
			name: '条',
			type: 'bar',
			yAxisIndex: 0,
			data: [22, 24, 26],
			barWidth: 10,
			itemStyle: {
				normal: {
					barBorderRadius: 20,
					color: function(params) {
						var num = myColor.length;
						return myColor[params.dataIndex % num]
					},
				}
			},
			label: {
				normal: {
					show: true,
					position: 'inside',
					formatter: '{c}%'
				}
			},
		}, {
			name: '框',
			type: 'bar',
			yAxisIndex: 1,
			barGap: '-100%',
			data: [100, 100, 100],
			barWidth: 15,
			itemStyle: {
				normal: {
					color: 'none',
					borderColor: '#00c1de',
					borderWidth: 3,
					barBorderRadius: 15,
				}
			}
		}, ]
	})

	//接入师生比
	var pieChart1 = echarts.init(document.getElementById('pieChart1'));
	pieChart1.setOption({
		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}台"
		},
		calculable: true,
		series: [{
			name: '接入师生比',
			type: 'pie',
			radius: [30, 110],
			center: ['50%', '50%'],
			x: '50%',
			max: 40,
			sort: 'ascending',
			data: [{
					value: 2391,
					name: '教师'
				},
				{
					value: 30921,
					name: '学生'
				}
			]
		}]
	})

	//各区数据量(周)
	var lineChart1 = echarts.init(document.getElementById('lineChart1'));
	lineChart1.setOption({
		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}GB"
		},
		legend: {
			data: ['一区', '二区', '三区'],
			y: 'bottom',
			x: 'center',
			textStyle: {
				color: '#fff',
				fontSize: 12
			}
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '10%',
			containLabel: true
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			axisLine: {
				lineStyle: {
					color: '#87cefa'
				},
			},
			axisLabel: {
				interval: 0,
				rotate: 40,

				textStyle: {
					color: '#fff',
					fontSize: 13
				}
			}
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#87cefa'
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
					return value + "GB"
				},
			},
		}],
		series: [{
				name: '一区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [10, 12, 21, 54, 260, 830, 710]
			},
			{
				name: '二区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [30, 182, 434, 791, 390, 30, 10]
			},
			{
				name: '三区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [1320, 1132, 601, 234, 120, 90, 20]
			}
		]

	})

	//各区使用人次(周)
	var lineChart2 = echarts.init(document.getElementById('lineChart2'));
	lineChart2.setOption({
		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}GB"
		},
		legend: {
			data: ['一区', '二区', '三区'],
			y: 'bottom',
			x: 'center',
			textStyle: {
				color: '#fff',
				fontSize: 12
			}
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '10%',
			containLabel: true
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			axisLine: {
				lineStyle: {
					color: '#87cefa'
				},
			},
			axisLabel: {
				interval: 0,
				rotate: 40,

				textStyle: {
					color: '#fff',
					fontSize: 13
				}
			}
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#87cefa'
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
					return value + "GBs"
				},
			},
		}],
		series: [{
				name: '一区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [120, 122, 221, 524, 460, 530, 610]
			},
			{
				name: '二区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [130, 682, 534, 691, 490, 130, 110]
			},
			{
				name: '三区',
				type: 'line',
				smooth: true,
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data: [320, 132, 161, 134, 112, 190, 120]
			}
		]

	})

	//接入学生年级占比
	var pieChart2 = echarts.init(document.getElementById('pieChart2'));
	pieChart2.setOption({
		color: ["#87cefa", "#ff7f50", "#32cd32", "#da70d6", ],
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}人"
		},
		calculable: true,
		series: [{
			name: '接入学生年级占比',
			type: 'pie',
			radius: [30, 110],
			center: ['45%', '50%'],
			roseType: 'area',
			x: '50%',
			max: 40,
			sort: 'ascending',
			data: [{
					value: 700,
					name: '20级'
				},
				{
					value: 500,
					name: '19级'
				},
				{
					value: 105,
					name: '18级'
				},
				{
					value: 250,
					name: '17级'
				},
			]
		}]
	})

	//流量/近三个月
	var histogramChart3 = echarts.init(document.getElementById('histogramChart3'));
	histogramChart3.setOption({

		color: ['#87cefa'],
		grid: {
			left: '5%',
			right: '5%',
			bottom: '5%',
			containLabel: true
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}GB"
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: ['三月', '四月', '五月'],
			axisLine: {
				lineStyle: {
					color: '#87cefa'
				},
			},
			axisLabel: {
				interval: 0,
				rotate: 40,

				textStyle: {
					color: '#fff',
					fontSize: 13
				}
			}
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#87cefa'
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
					return value 
				},
			},
		}],
		series: [{
			name: '流量/近三个月',
			type: 'bar',
			barWidth: 30,
			data: [60, 80, 70],
		}, ]
	});

	//流量/近一个小时
	var histogramChart4 = echarts.init(document.getElementById('histogramChart4'));
	histogramChart4.setOption({
		color: ['#ff7f50'],
		grid: {
			left: '5%',
			right: '5%',
			bottom: '5%',
			containLabel: true
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a}<br/>{b}<br/>{c}GB"
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: ['10:20', '10:40', '11:00' ],
			axisLine: {
				lineStyle: {
					color: '#ff7f50'
				},
			},
			axisLabel: {
				interval: 0,
				rotate: 40,

				textStyle: {
					color: '#fff',
					fontSize: 13
				}
			}
		}],
		yAxis: [{
			type: 'value',
			axisLine: {
				lineStyle: {
					color: '#ff7f50'
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
					return value + "GB"
				},
			},
		}],
		series: [{
			name: '流量/近一个小时',
			type: 'bar',
			barWidth: 30,
			data: [6, 8, 7],
		}, ]
	});

}
