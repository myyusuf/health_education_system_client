import { guid } from '../../base/Utils';
import StudentInfo from './StudentInfo';
import ProblemInfo from './ProblemInfo';
import Tabs from "../../base/components/Tabs";

export default class StudentForm {

  constructor(student, options) {
    this.id = guid();
    this.studentInfo = new StudentInfo(student, {});
    this.problemInfo = new ProblemInfo({});
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
        id: 'summary',
        title: 'Summary',
        content: this.problemInfo
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
