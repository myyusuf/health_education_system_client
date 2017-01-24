import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import Button from '../../base/components/Button';
import NumberInput from '../../base/components/NumberInput';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';
import DataGrid from '../../base/components/DataGrid';

export default class Leavelnfo {

  constructor(options) {
    this.id = guid();

    var _this = this;

    var url = "/students";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'medical_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" },
          { name: 'description', type: 'string' },
          { name: 'level', type: 'string' }
        ],
        id: "id",
        url: url
    };

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: true,
        altrows: true,
        theme: 'metro',
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        columns: [
          { text: 'Tanggal', datafield: 'medical_date', width: '33.33%' },
          { text: 'Keterangan', datafield: 'description', width: '33.33%' },
          { text: 'Tingkat', datafield: 'level', width: '33.33%' },
        ],
        groups: []
    }

    var onSearch = function(data) {
          // data['searchTxt'] = searchTextBox.getValue();
          // data['level'] = levelComboBox.getValue();
          return data;
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editStudentWindow = new EditStudentWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editStudentWindow.render($('#dialogWindowContainer'));
        editStudentWindow.open();
      },
      dataGridOptions: dataGridOptions
    });
  }

  render(container) {

    var addMedicalInfo = new Button({
      title:'Tambah Surat Cuti',
      template: 'primary',
      height: 26,
      onClick: function(){
        // var addStudentWindow = new AddStudentWindow({
        //   onSaveSuccess: function(){
        //     _this.dataGrid.refresh();
        //   }
        // });
        // addStudentWindow.render($('#dialogWindowContainer'));
        // addStudentWindow.open();
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
    addMedicalInfo.render(innerTd);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    this.dataGrid.render(td);

  }
}
