import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { Candidate, ElectionData } from '../interfaces/election.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor() { }
  taiwanCities: string[] = ['臺北市', '新北市', '基隆市', '新竹市', '桃園市', '新竹縣', '宜蘭縣', '臺中市', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '高雄市', '臺南市', '嘉義市', '嘉義縣', '屏東縣', '澎湖縣', '花蓮縣', '臺東縣'];

  ngOnInit(): void {
    this.drawPieChart();
    this.electionData.forEach(data => {
      if (data.selected) {
        this.session = data.session
        this.voteYear = data.date
        this.candidate = data.candidate
        this.candidate.forEach(candidate => {
          this.totalVotes += candidate.vote;
          const point = Math.round((parseFloat(candidate.point)))
          const party = candidate.party
          for (let step = 0; step < point; step++) {
            this.pointArr.push(party)
          }
        });
      }
    })
  }

  electionData: ElectionData[] = [
    {
      date: '1996',
      session: '9',
      selected: false,
      candidate: []

    },
    {
      date: '2000',
      session: '10',
      selected: false,
      candidate: []
    },
    {
      date: '2004',
      session: '11',
      selected: false,
      candidate: []
    },
    {
      date: '2008',
      session: '12',
      selected: false,
      candidate: []
    },
    {
      date: '2012',
      session: '13',
      selected: false,
      candidate: []
    },
    {
      date: '2016',
      selected: true,
      session: '14',
      candidate: [
        {
          president: '蔡英文',
          vicePresident: '陳建仁',
          vote: 6894744,
          party: 'DPP',
          partyName: '民主進步黨',
          point: '56.12%'
        }, {
          president: '朱立倫',
          vicePresident: '王如玄',
          vote: 3813365,
          party: 'KMT',
          partyName: '中國國民黨',
          point: '31.04%'
        }, {
          president: '宋楚瑜',
          vicePresident: '徐欣瑩',
          vote: 1576861,
          party: 'PFP',
          partyName: '親民黨',
          point: '12.84%'
        }
      ]
    },
    {
      date: '2020',
      selected: false,
      session: '15',
      candidate: [
        {
          president: '蔡英文',
          vicePresident: '賴清德',
          vote: 8170231,
          party: 'DPP',
          partyName: '民主進步黨',
          point: '57.13%'

        }, {
          president: '韓國瑜',
          vicePresident: '張善政',
          vote: 5522119,
          party: 'KMT',
          partyName: '中國國民黨',
          point: '38.61%'
        }, {
          president: '宋楚瑜',
          vicePresident: '余湘',
          vote: 608590,
          party: 'PFP',
          partyName: '親民黨',
          point: '04.26%'
        }
      ]
    }
  ]
  session: string = ''
  voteYear: string = ''
  candidate!: Candidate[]
  totalVotes: number = 0
  pointArr: any[] = []

  changeYear(item: ElectionData): void {
    this.pointArr = []
    this.electionData.forEach(data => {
      data.selected = false
    })
    console.log(item);
    this.session = item.session
    this.voteYear = item.date
    this.candidate = item.candidate
    item.selected = !item.selected
    item.candidate.forEach((x) => {
      const point = Math.round((parseFloat(x.point)))
      const party = x.party
      for (let step = 0; step < point; step++) {
        this.pointArr.push(party)
      }
    });
  }

  // 新增一個方法來繪製圓餅圖
  drawPieChart(): void {
    const chartElement = document.getElementById('pie-chart');
    const myChart = echarts.init(chartElement);

    const option = {
      title: {
        text: '選舉結果圓餅圖',
        subtext: '總票數: ' + this.totalVotes,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: this.pointArr,
      },
      series: [
        {
          name: '得票率',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.pointArr.map((party) => ({
            name: party,
            value: this.pointArr.filter((p) => p === party).length,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);
  }

}
