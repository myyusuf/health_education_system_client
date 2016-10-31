import { getMenuData } from './app/base/ApplicationData';
import NavigationBar from "./app/base/components/NavigationBar";
import Splitter from "./app/base/components/Splitter";
import Tree from "./app/base/components/Tree";
import Menu from "./app/base/components/Menu";
import Tabs from "./app/base/components/Tabs";
import Button from "./app/base/components/Button";
import ScheduleView from "./app/schedule/components/ScheduleView";
import ScoreList from "./app/score/components/ScoreList";
import StudentList from "./app/student/components/StudentList";
import HospitalList from "./app/hospital/components/HospitalList";
import HospitalScheduleView from "./app/hospital/components/HospitalScheduleView";
import ClinicScheduleView from "./app/hospital/components/ClinicScheduleView";
import CostUnitReport from "./app/reporting/components/CostUnitReport";

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
        id: 'cost_unit',
        label: "Cost Unit"
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
     }
   }

  }
});

// var menu = new Menu({data: getMenuData()});
// menu.render($('#top-menu'));

var scoreList = new ScoreList();
var studentList = new StudentList();
var hospitalList = new HospitalList();
var costUnitReport = new CostUnitReport();
var hospitalScheduleView = new HospitalScheduleView();
var clinicScheduleView = new ClinicScheduleView();

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
]);

tabs.render($('#right-content'));
