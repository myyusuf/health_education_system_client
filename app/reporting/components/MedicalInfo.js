import { guid } from '../../base/Utils';
import Form from '../../base/components/Form';
import NumberInput from '../../base/components/NumberInput';
import CheckBox from '../../base/components/CheckBox';
import Label from '../../base/components/Label';
import DataGrid from '../../base/components/DataGrid';

export default class Medicalnfo {

  constructor(options) {
    this.id = guid();

    var _this = this;

    var url = "/students";

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'medical_date', type: 'date', format: "yyyy-MM-ddTHH:mm:ss-HH:mm" },
          { name: 'description', type: 'string' }
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
          { text: 'Tanggal', datafield: 'stambuk_lama', width: '50%' },
          { text: 'Keterangan', datafield: 'stambuk_baru', width: '50%' },
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
    this.dataGrid.render(container);
  }
}
