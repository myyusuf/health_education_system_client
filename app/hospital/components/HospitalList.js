import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import AddHospitalWindow from '../../hospital/components/AddHospitalWindow';
import EditHospitalWindow from '../../hospital/components/EditHospitalWindow';

export default class HospitalList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/hospitals";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'kode', type: 'string' },
          { name: 'nama', type: 'string' },
          { name: 'tipe', type: 'string' },
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
        altrows: true,
        theme: 'metro',
        virtualmode: true,
        rendergridrows: function (params) {
                    return params.data;
                },
        columns: [
          { text: 'Kode', datafield: 'kode', width: '33.33%' },
          { text: 'Nama', datafield: 'nama', width: '33.33%' },
          { text: 'Tipe', datafield: 'tipe', width: '33.33%',
          cellsrenderer: function(row, columnfield, value, defaulthtml, columnproperties){
            if(value == 1){
              return '<div style="margin-top: 5px;">Rumah Sakit</div>';
            }else if(value == 2){
              return '<div style="margin-top: 5px;">Puskesmas</div>';
            }else{
              return '';
            }
          }},
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editHospitalWindow = new EditHospitalWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editHospitalWindow.render($('#dialogWindowContainer'));
        editHospitalWindow.open();
      },
      dataGridOptions: dataGridOptions
    });

    var searchTextBox = new TextBox({placeHolder: 'Kode atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      imgSrc:'/ceu_assets/images/search.png',
      theme: 'metro',
      width: 30,
      height: 26,
      onClick: function(){
        _this.dataGrid.refresh();
      }
    });

    var addHospitalButton = new Button({
      title:'Tambah RS',
      template: 'primary',
      height: 26,
      onClick: function(){
        var addHospitalWindow = new AddHospitalWindow({
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        addHospitalWindow.render($('#dialogWindowContainer'));
        addHospitalWindow.open();
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
    addHospitalButton.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    searchTextBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; height: 100%; "></td>');
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
