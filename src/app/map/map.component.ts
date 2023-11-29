import { Component, ElementRef } from '@angular/core';
import * as echarts from 'echarts';
import { MapService } from '../service/map.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private chartDom!: HTMLDivElement;
  private myChart: any;
  private option: any;


  constructor(private mapService: MapService) { }
  ngOnInit(): void {
    const DPP = '#02CC53'
    const KMT = '#137FE3'
    const PFP = '#FF9636'

    this.chartDom = document.getElementById('map') as HTMLDivElement;
    this.myChart = echarts.init(this.chartDom);

    this.myChart.on('click', (params: any) => {
      if (params.componentType === 'series') {
        const clickedRegion = params.name;
        console.log(`Clicked on region: ${clickedRegion}`);
        // 獲取點擊位置的經緯度
        const clickedCoords = params.event.target.getData().getCoord(params.dataIndex);
        this.zoomIn(clickedCoords);
      }
    });

    this.mapService.getMapData().subscribe((json: any) => {
      console.log(json);

      echarts.registerMap('TW', json, {
        '金門縣': { left: 119.5, top: 24.5, width: 0.3, },
        '連江縣': { left: 119.5, top: 25, width: 0.2 },
      });

      this.option = {
        tooltip: false,
        series: [
          {
            aspectScale: 0.9,
            name: '台灣',
            type: 'map',
            roam: false,
            map: 'TW',

            emphasis: {
              label: {
                show: false
              }
            },
            layoutCenter: ['45%', '55%'],
            layoutSize: 600,
            itemStyle: {
              normal: {
                borderColor: 'white',
                borderWidth: 2,
                color: "#fff"
              },
              emphasis: {}
            },
            select: {
              label: {
                show: false
              }
            },
            data: [
              {
                name: '連江縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '宜蘭縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '彰化縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '南投縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '雲林縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '基隆市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '臺北市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP },
                }
              },
              {
                name: '新北市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '臺中市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '臺南市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '桃園市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '苗栗縣', value: 'KMT', itemStyle: {
                  normal: { areaColor: KMT }
                }
              },
              {
                name: '嘉義市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '嘉義縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '金門縣', value: 'KMT', itemStyle: {
                  normal: { areaColor: KMT }
                }
              },
              {
                name: '高雄市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '臺東縣', value: 'KMT', itemStyle: {
                  normal: { areaColor: KMT }
                }
              },
              {
                name: '花蓮縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '澎湖縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '新竹市', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
              {
                name: '新竹縣', value: 'KMT', itemStyle: {
                  normal: { areaColor: KMT }
                }
              },
              {
                name: '屏東縣', value: 'DPP', itemStyle: {
                  normal: { areaColor: DPP }
                }
              },
            ]
          }
        ]
      };

      this.myChart.setOption(this.option, true);

      this.myChart.on('click', (args: any) => {
        const path = args.name
        console.log(args);

      })
    });
  }

  ngAfterViewInit(): void {
    this.option && this.myChart.setOption(this.option, true);
  }

  zoomIn(coords: number[]) {
    // coords 是點擊位置的經緯度
    const newOption = {
      series: [
        {
          center: this.myChart.convertToPixel('geo', coords), // 將經緯度轉換為像素
          zoom: 5, // 這裡可以調整放大的層級
          itemStyle: {
            emphasis: {
              borderWidth: 5, // 這裡可以調整邊框寬度
              borderColor: 'rgba(255, 255, 255, 0.5)',
              shadowBlur: 20, // 這裡可以調整模糊程度
              shadowColor: 'rgba(255, 255, 255, 0.5)',
            },
          },
        },
      ],
    };

    this.myChart.setOption(newOption);
  }


}
