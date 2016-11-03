import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import DivisionComboBox from '../../division/components/DivisionComboBox';
import EditScoreWindow from '../../score/components/EditScoreWindow';
import DateRange from '../../base/components/DateRange';

export default class WeeklyScheduleList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/weeklyschedules";

    var source = {
        datatype: "json",
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'stambuk_lama', type: 'string' },
            { name: 'stambuk_baru', type: 'string' },
            { name: 'nama', type: 'string' },
            { name: 'nama_bagian', type: 'string' },
            { name: 'start_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" },
            { name: 'end_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" },
            { name: 'pre_test', type: 'float' },
        ],
        id: "id",
        url: url
    };

    var dateRange = new DateRange({});

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
          data['searchDivision'] = divisionComboBox.getValue();
          data['searchDate'] = dateRange.getValue();
          return data;
    }

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: true,
        groupable: true,
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        altrows: true,
        theme: 'metro',
        columns: [
          { text: 'Stambuk Lama', datafield: 'stambuk_lama', width: '15%' },
          { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: '15%' },
          { text: 'Nama', datafield: 'nama', width: '25%'},
          { text: 'Bagian', datafield: 'nama_bagian', width: '15%'},
          { text: 'Tanggal Mulai', datafield: 'start_date', cellsformat: 'dd-MM-yyyy', width: '10%'},
          { text: 'Tanggal Selesai', datafield: 'end_date', cellsformat: 'dd-MM-yyyy', width: '10%'},
          { text: 'Pre-Test', datafield: 'pre_test', cellsalign: 'right', cellsformat: 'd2', width: '10%'},
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        // var editScoreWindow = new EditScoreWindow({
        //   data: data,
        //   onSaveSuccess: function(){
        //     _this.dataGrid.refresh();
        //   }
        // });
        // editScoreWindow.render($('#dialogWindowContainer'));
        // editScoreWindow.open();
      },
      dataGridOptions: dataGridOptions
    });

    var divisionComboBox = new DivisionComboBox();
    var searchTextBox = new TextBox({placeHolder: 'Stambuk atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      imgSrc:'/ceu_assets/images/search.png',
      theme: 'metro',
      width: 30,
      height: 26,
      onClick: function(){
        _this.dataGrid.refresh();
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
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    dateRange.render(innerTd);

    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    divisionComboBox.render(innerTd);

    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; width: 120px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    searchTextBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%;"></td>');
    var _tempContainer = $('<div style="margin-left: -5px;"></div>')
    _tempContainer.appendTo(innerTd);
    innerTd.appendTo(innerTr);
    searchButton.render(_tempContainer);

    tr = $('<tr></tr>');
    td = $('<td style="padding: 0;"></td>');
    tr.appendTo(table);
    td.appendTo(tr);

    this.dataGrid.render(td);

  }
}
