import { guid } from '../../base/Utils';
import StudentInfo from './StudentInfo';
import ScoreInfo from './ScoreInfo';
import ProblemInfo from './ProblemInfo';
import MedicalInfo from './MedicalInfo';
import PermissionInfo from './PermissionInfo';
import LeaveInfo from './LeaveInfo';
import Tabs from "../../base/components/Tabs";

export default class StudentForm {

  constructor(options) {

    var _this = this;
    this.id = guid();
    this.riwayatMppd = options.riwayatMppd;
    this.studentInfo = new StudentInfo({
      riwayatMppd: this.riwayatMppd,
      onDivisionChange: function(value){
        _this.medicalInfo.changeDivision(value);
        _this.permissionInfo.changeDivision(value);
        _this.problemInfo.changeDivision(value);
        _this.scoreInfo.changeDivision(value);
      }
    });
    this.scoreInfo = new ScoreInfo({siswaId: this.riwayatMppd.siswa_id});
    this.problemInfo = new ProblemInfo({riwayatMppdId: this.riwayatMppd.id});
    this.medicalInfo = new MedicalInfo({riwayatMppdId: this.riwayatMppd.id});
    this.permissionInfo = new PermissionInfo({riwayatMppdId: this.riwayatMppd.id});
    this.leaveInfo = new LeaveInfo({riwayatMppdId: this.riwayatMppd.id});
  }

  validate(){
    this.problemInfo.validate();
  }

  render(container) {

    var _this = this;

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);
    this.studentInfo.render(td);

    var tabs = new Tabs([
      {
        id: 'scoreInfo',
        title: 'Nilai',
        content: this.scoreInfo
      },
      {
        id: 'problemInfo',
        title: 'Masalah',
        content: this.problemInfo
      },
      {
        id: 'medicalInfo',
        title: 'Surat Sakit',
        content: this.medicalInfo
      },
      {
        id: 'permissionInfo',
        title: 'Surat Izin',
        content: this.permissionInfo
      },
      {
        id: 'leaveInfo',
        title: 'Surat Cuti',
        content: this.leaveInfo
      }
    ],
    {
      width: 530,
      height: 450
    });

    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);
    tabs.render(td);
  }
}
