import { getMenuData } from './app/base/ApplicationData';
import NavigationBar from "./app/base/components/NavigationBar";
import Splitter from "./app/base/components/Splitter";
import Tree from "./app/base/components/Tree";
import Menu from "./app/base/components/Menu";
import Tabs from "./app/base/components/Tabs";
import Button from "./app/base/components/Button";
import ScheduleView from "./app/schedule/components/ScheduleView";
import ScoreList from "./app/score/components/ScoreList";
import WeeklyScheduleList from "./app/schedule/components/WeeklyScheduleList";
import StudentList from "./app/student/components/StudentList";
import HospitalList from "./app/hospital/components/HospitalList";
import HospitalScheduleView from "./app/hospital/components/HospitalScheduleView";
import ClinicScheduleView from "./app/hospital/components/ClinicScheduleView";
import CostUnitReport from "./app/reporting/components/CostUnitReport";
import RiwayatMPPDList from "./app/reporting/components/RiwayatMPPDList";
import CompreExamList from "./app/reporting/score_report/CompreExamList";

var splitter = new Splitter();
splitter.render($('#content-inside'));

var data = [
  {
    label: "Jadwal",
    expanded: true,
    items: [
      {
        id: 'jadwal_umum',
        label: "Jadwal Umum",
        selected: true
      }, {
        id: 'jadwal_mingguan',
        label: "Jadwal Rotasi Mingguan"
      }, {
        id: 'jadwal_rs',
        label: "Jadwal Rumah Sakit",
      }, {
        id: 'jadwal_ps',
        label: "Jadwal Puskesmas",
      }
    ]
  },
  {
    label: "Siswa",
    expanded: true,
    items: [
      {
        id: 'data_siswa',
        label: "Data Siswa"
      }, {
        id: 'data_nilai',
        label: "Data Nilai",
      }
    ]
  },
  {
    label: "Rumah Sakit",
    expanded: true,
    items: [
      {
        id: 'data_rs',
        label: "Data Rumah Sakit"
      }
    ]
  },
  {
    label: "Laporan",
    expanded: true,
    items: [
      {
        id: 'riwayat_mppd',
        label: "Riwayat MPPD"
      },
      {
        id: 'cost_unit',
        label: "Cost Unit"
      },
      {
        id: 'nilai',
        label: "Nilai",
        expanded: true,
        items: [
          {
            id: 'nilai_kepanitraan_klinik',
            label: "Nilai Kepanitraan Klinik"
          }, {
            id: 'ujian_komprehensif',
            label: "Ujian Komprehensif"
          },
          {
            id: 'ujian_ukmppd',
            label: "Ujian UKMPPD"
          }
        ]
      }
    ]
  }
];

var tree = new Tree({
  data: data,
  onClick: function(item){

   if(!tabs.selectTabByTitle(item.label)){
     if(item.id == 'jadwal_umum'){
         tabs.add(item.id, item.label, scheduleView);
     }else if(item.id == 'jadwal_mingguan'){
         tabs.add(item.id, item.label, weeklyScheduleList);
     }else if(item.id == 'data_nilai'){
         tabs.add(item.id, item.label, scoreList);
     }else if(item.id == 'data_siswa'){
         tabs.add(item.id, item.label, studentList);
     }else if(item.id == 'jadwal_rs'){
         tabs.add(item.id, item.label, hospitalScheduleView);
     }else if(item.id == 'jadwal_ps'){
         tabs.add(item.id, item.label, clinicScheduleView);
     }else if(item.id == 'cost_unit'){
         tabs.add(item.id, item.label, costUnitReport);
     }else if(item.id == 'data_rs'){
         tabs.add(item.id, item.label, hospitalList);
     }else if(item.id == 'riwayat_mppd'){
         tabs.add(item.id, item.label, riwayatMPPDList);
     }else if(item.id == 'ujian_komprehensif'){
         tabs.add(item.id, item.label, compreExamList);
     }
   }

  }
});

// var menu = new Menu({data: getMenuData()});
// menu.render($('#top-menu'));

var scoreList = new ScoreList();
var weeklyScheduleList = new WeeklyScheduleList();
var studentList = new StudentList();
var hospitalList = new HospitalList();
var costUnitReport = new CostUnitReport();
var hospitalScheduleView = new HospitalScheduleView();
var clinicScheduleView = new ClinicScheduleView();
var riwayatMPPDList = new RiwayatMPPDList();
var compreExamList = new CompreExamList();

var navigationBar = new NavigationBar([{
  title: 'Application',
  content: tree
}, {
  title: 'Settings'
}]);
navigationBar.render($('#left-content'));

var scheduleView = new ScheduleView();

var tabs = new Tabs([
  {
    id: 'jadwal_umum',
    title: 'Jadwal Umum',
    content: scheduleView
  }
],
{});

tabs.render($('#right-content'));
