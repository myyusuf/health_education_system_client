import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import ToggleButton from '../../base/components/ToggleButton';
import TextBox from '../../base/components/TextBox';
import DataGrid from '../../base/components/DataGrid';
import AddStudentWindow from '../../student/components/AddStudentWindow';
import EditStudentWindow from '../../student/components/EditStudentWindow';

export default class HospitalDockingGrid {

  constructor(hospitalId, hospitalType, dateRange) {
    this.id = guid();
    this.hospitalId = hospitalId;
    this.hospitalType = hospitalType;
    this.dateRange = dateRange;
  }

  render(container) {

    var _this = this;

    var url = "/hospitals/" + this.hospitalId + "/students"

    var source = {
        datatype: "json",
        datafields: [
          { name: 'id', type: 'int' },
          { name: 'siswa_id', type: 'int' },
          { name: 'bagian_id', type: 'int' },
          { name: 'nama_siswa', type: 'string' },
          { name: 'nama_bagian', type: 'string' },
          { name: 'tingkat', type: 'int' },
        ],
        id: "siswa_id",
        url: url
    };

    var onSearch = function(data) {
          data['searchDate'] = _this.dateRange;
          data['hospitalType'] = _this.hospitalType;
          return data;
    }

    var dataGridOptions = {
        width: '100%',
        height: '100%',
        pageable: false,
        altrows: true,
        theme: 'metro',
        columns: [
          { text: 'Nama', datafield: 'nama_siswa', width: '50%'},
          { text: 'Bagian', datafield: 'nama_bagian', width: '50%'},
        ],
        groupable: true,
        groups:['nama_bagian']
    }

    this.dataGrid = new DataGrid({
      source: source,
      onSearch: onSearch,
      dataGridOptions: dataGridOptions
    });

    var internalContainer = $('<div></div>');
    internalContainer.css('width', '100%');
    internalContainer.css('height', '100%');
    internalContainer.appendTo(container);
    this.dataGrid.render(internalContainer);

  }

  reloadByDateRange(dateRange){
    this.dateRange = dateRange;
    this.dataGrid.refresh();
    this.dataGrid.addGroup('nama_bagian');
  }

}
