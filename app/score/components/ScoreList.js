import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import DivisionComboBox from '../../division/components/DivisionComboBox';
import EditScoreWindow from '../../score/components/EditScoreWindow';

export default class ScoreList {

  constructor() {
    this.id = guid();
  }

  render(container) {

    var _this = this;

    var url = "/scores";

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
            { name: 'rumah_sakit_id', type: 'int'},
            { name: 'rumah_sakit_nama', type: 'string'},
            { name: 'puskesmas_id', type: 'int'},
            { name: 'puskesmas_nama', type: 'string'},
            { name: 'pre_test', type: 'float' },
            { name: 'tugas_ilmiah', type: 'float' },
            { name: 'persentase10', type: 'float' },
            { name: 'persentase20', type: 'float' },
            { name: 'persentase35', type: 'float' },
            { name: 'persentase35b', type: 'float' },
            { name: 'diskusi_mingguan', type: 'float' },
            { name: 'ujian', type: 'float' },
            { name: 'post_test', type: 'float' },
            { name: 'nilai_akhir', type: 'float' },
            { name: 'seminar', type: 'float' },
            { name: 'portofolio', type: 'float' },
            { name: 'rekomendasi_id', type: 'int' },
            { name: 'rekomendasi_nama', type: 'string' },
            { name: 'judul_laporan_kasus', type: 'string' },
        ],
        id: "id",
        url: url
    };

    var onSearch = function(data) {
          data['searchTxt'] = searchTextBox.getValue();
          data['searchDivision'] = divisionComboBox.getValue();
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
          { text: 'Stambuk Lama', datafield: 'stambuk_lama', width: 100 },
          { text: 'Stambuk Baru', datafield: 'stambuk_baru', width: 100 },
          { text: 'Nama', datafield: 'nama', width: 200},
          { text: 'Bagian', datafield: 'nama_bagian', width: 110},
          { text: 'Tanggal Mulai', datafield: 'start_date', cellsformat: 'dd-MM-yyyy', width: 100},
          { text: 'Tanggal Selesai', datafield: 'end_date', cellsformat: 'dd-MM-yyyy', width: 100},
          { text: 'Rumah Sakit', datafield: 'rumah_sakit_nama', width: 110},
          { text: 'Puskesmas', datafield: 'puskesmas_nama', width: 110},
          { text: 'Pre-Test', datafield: 'pre_test', cellsalign: 'right', cellsformat: 'd2', width: 60},
          { text: 'Tugas Ilmiah', datafield: 'tugas_ilmiah', cellsalign: 'right', cellsformat: 'd2', width: 80},
          { text: '10%', datafield: 'persentase10', cellsalign: 'right', cellsformat: 'd2', width: 50},
          { text: 'Diskusi Mingguan', datafield: 'diskusi_mingguan', cellsalign: 'right', cellsformat: 'd2', width: 110},
          { text: '20%', datafield: 'persentase20', cellsalign: 'right', cellsformat: 'd2', width: 50},
          { text: 'Nilai Ujian', datafield: 'ujian', cellsalign: 'right', cellsformat: 'd2', width: 70},
          { text: '35%', datafield: 'persentase35', cellsalign: 'right', cellsformat: 'd2', width: 50},
          { text: 'Post Test (CBT)', datafield: 'post_test', cellsalign: 'right', cellsformat: 'd2', width: 100},
          { text: '35%', datafield: 'persentase35b', cellsalign: 'right', cellsformat: 'd2', width: 50},
          { text: 'Nilai Akhir', datafield: 'nilai_akhir', cellsalign: 'right', cellsformat: 'd2', width: 70},
          { text: 'Seminar', datafield: 'seminar', cellsalign: 'right', cellsformat: 'd2', width: 60},
          { text: 'Portofolio', datafield: 'portofolio', cellsalign: 'right', cellsformat: 'd2', width: 60},
          { text: 'Rekomendasi', datafield: 'rekomendasi_nama', width: 200},
          { text: 'Judul Laporan Kasus', datafield: 'judul_laporan_kasus', width: 200},
        ],
        groups: []
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      onRowDoubleClick: function(data){
        var editScoreWindow = new EditScoreWindow({
          data: data,
          onSaveSuccess: function(){
            _this.dataGrid.refresh();
          }
        });
        editScoreWindow.render($('#dialogWindowContainer'));
        editScoreWindow.open();
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
