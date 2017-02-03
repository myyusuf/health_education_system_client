import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import Button from '../../base/components/Button';
import NumberInput from '../../base/components/NumberInput';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';
import DataGrid from '../../base/components/DataGrid';
import AddLeaveInfoWindow from './AddLeaveInfoWindow';
import EditLeaveInfoWindow from './EditLeaveInfoWindow';

export default class Leavelnfo {

  constructor(options) {
    this.id = guid();

    this.riwayatMppdId = options.riwayatMppdId;

    var _this = this;

    var url = "/leaveinfo/" + this.riwayatMppdId;

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'tanggal', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" },
          { name: 'keterangan', type: 'string' },
          { name: 'jumlah_hari', type: 'string' },
          { name: 'tingkat', type: 'int' }
        ],
        id: "id",
        url: url
    };

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: false,
        altrows: true,
        theme: 'metro',
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        columns: [
          { text: 'Tanggal', datafield: 'tanggal', cellsformat: 'dd-MM-yyyy', width: '20%' },
          { text: 'Keterangan', datafield: 'keterangan', width: '40%' },
          { text: 'Jumlah Hari', datafield: 'jumlah_hari', cellsalign: 'right', cellsformat: 'd', width: '15%' },
          { text: 'Tingkat', datafield: 'tingkat', width: '25%' },
        ],
        groups: []
    }

    var onSearch = function(data) {

          return data;
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editLeaveInfoWindow = new EditLeaveInfoWindow({
          leaveInfo: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editLeaveInfoWindow.render($('#dialogWindowContainer'));
        editLeaveInfoWindow.open();
      },
      dataGridOptions: dataGridOptions
    });
  }

  render(container) {

    var _this = this;

    var addLeaveInfo = new Button({
      title:'Tambah Surat Cuti',
      template: 'primary',
      height: 26,
      onClick: function(){
        var addLeaveInfoWindow = new AddLeaveInfoWindow({
          riwayatMppdId: _this.riwayatMppdId,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        addLeaveInfoWindow.render($('#dialogWindowContainer'));
        addLeaveInfoWindow.open();
      }
    });

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 50px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    addLeaveInfo.render(innerTd);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    this.dataGrid.render(td);

  }

}
