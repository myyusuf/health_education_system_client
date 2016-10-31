import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import DateRange from '../../base/components/DateRange';
import HospitalComboBox from '../../hospital/components/HospitalComboBox';

export default class CostUnitReport {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/reporting/costunit";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'bagian_id', type: 'int' },
          { name: 'nama_bagian', type: 'string' },
          { name: 'nama_siswa', type: 'string' },
          { name: 'lama', type: 'int' },
          { name: 'fee1', type: 'float' },
          { name: 'fee2', type: 'float' },
          { name: 'fee3', type: 'float' },
          { name: 'fee4', type: 'float' },
          { name: 'fee5', type: 'float' },
          { name: 'fee6', type: 'float' },
          { name: 'fee7', type: 'float' },
          { name: 'total', type: 'float' },
        ],
        id: "id",
        url: url
    };

    var onSearch = function(data) {
        data['hospital'] = hospitalComboBox.getValue();
        data['searchDate'] = dateRange.getValue();
        return data;
    }

    var _columnWidth = (100/11) + '%';

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: true,
        altrows: true,
        theme: 'metro',
        showstatusbar: true,
        statusbarheight: 30,
        showaggregates: true,
        columns: [
          { text: 'Bagian', datafield: 'nama_bagian', width: _columnWidth },
          { text: 'Lama (MGG)', datafield: 'lama', width: _columnWidth },
          { text: 'Nama', datafield: 'nama_siswa', width: _columnWidth},
          { text: 'NST. Fee / MGG (75rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee1', aggregates: ['sum'], width: _columnWidth},
          { text: 'DIR (20rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee2', aggregates: ['sum'], width: _columnWidth},
          { text: 'BKD (20rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee3', aggregates: ['sum'], width: _columnWidth},
          { text: 'KDI (5rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee4', aggregates: ['sum'], width: _columnWidth},
          { text: 'DPK (50rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee5', aggregates: ['sum'], width: _columnWidth},
          { text: 'PEMBBG (50rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee6', aggregates: ['sum'], width: _columnWidth},
          { text: 'Penguji (100rb)', cellsalign:'right', cellsformat: 'd2', datafield: 'fee7', aggregates: ['sum'], width: _columnWidth},
          { text: 'Total', cellsalign:'right', cellsformat: 'd2', datafield: 'total', aggregates: ['sum'], width: _columnWidth},
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){

      },
      dataGridOptions: dataGridOptions
    });

    var searchTextBox = new TextBox({placeHolder: 'Stambuk atau Nama', width: 250, height: 24});
    var searchButton = new Button({
      imgSrc:'/ceu_assets/images/search.png',
      theme: 'metro',
      width: 30,
      height: 27,
      onClick: function(){
        var hospital = hospitalComboBox.getValue();
        if(hospital){
          _this.dataGrid.refresh();
        }else{
          alert('Rumah sakit harus diisi');
        }

      }
    });

    var hospitalComboBox = new HospitalComboBox({});
    var dateRange = new DateRange({});

    var table = $('<table style="height: 100%; width: 100%; margin: -3px; "></table>');
    var tr = $('<tr></tr>');
    var td = $('<td style="padding: 0; height: 40px;"></td>');
    table.appendTo(container);
    tr.appendTo(table);
    td.appendTo(tr);

    var innerTable = $('<table style="height: 100%; width: 100%;"></table>');
    var innerTr = $('<tr></tr>');
    var innerTd = $('<td style="padding-top: 6px; padding-left: 10px; padding-right: 8px; width: 200px; height: 100%;"></td>');
    innerTable.appendTo(td);
    innerTr.appendTo(innerTable);
    innerTd.appendTo(innerTr);
    hospitalComboBox.render(innerTd);

    innerTd = $('<td style="padding-top: 6px; width: 200px; height: 100%;"></td>');
    innerTd.appendTo(innerTr);
    dateRange.render(innerTd);

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
