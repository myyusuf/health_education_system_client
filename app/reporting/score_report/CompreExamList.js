import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import EditCompreExamWindow from './EditCompreExamWindow';

export default class CompreExamList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/compreexams";

    var source = {
        datatype: "json",
        datafields: [
            { name: 'id', type: 'int' },
            { name: 'stambuk_lama', type: 'string' },
            { name: 'stambuk_baru', type: 'string' },
            { name: 'nama', type: 'string' },
            { name: 'pre_kompre', type: 'float' },
            { name: 'mid_kompre', type: 'float' },
            { name: 'final_kompre', type: 'float' }
        ],
        id: "id",
        url: url
    };

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
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
          { text: 'Pre Kompre', datafield: 'pre_kompre', cellsalign: 'right', cellsformat: 'd2', width: '15%'},
          { text: 'Mid Kompre', datafield: 'mid_kompre', cellsalign: 'right', cellsformat: 'd2', width: '15%'},
          { text: 'Final Kompre', datafield: 'final_kompre', cellsalign: 'right', cellsformat: 'd2', width: '15%'}
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editCompreExamWindow = new EditCompreExamWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editCompreExamWindow.render($('#dialogWindowContainer'));
        editCompreExamWindow.open();
      },
      dataGridOptions: dataGridOptions
    });

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
