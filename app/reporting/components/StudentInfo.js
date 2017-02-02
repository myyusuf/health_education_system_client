import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Label from '../../base/components/Label';
import DivisionComboBox from "../../division/components/DivisionComboBox";

export default class StudentInfo {

  constructor(options) {
    this.id = guid();
    this.riwayatMppd = options.riwayatMppd;
    this.onDivisionChange = options.onDivisionChange;
  }

  render(container) {

    var _this = this;

    var bagianBermasalah = this.riwayatMppd.bagian_bermasalah;
    var nameLabel = new Label({text: bagianBermasalah, color: 'red', bold: true});
    var divisionComboBox = new DivisionComboBox({
      onChange: _this.onDivisionChange
    });

    var table = $('<table style="height: 100%; width: 50%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 30px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);
    nameLabel.render(td);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0; height: 30px;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);
    divisionComboBox.render(td);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0; height: 5px;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

  }
}
