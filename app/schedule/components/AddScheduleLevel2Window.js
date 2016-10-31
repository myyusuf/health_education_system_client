import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import DateRange from '../../base/components/DateRange';
import StudentComboBox from '../../student/components/StudentComboBox';


export default class AddScheduleLevel2Window {

  constructor() {
    this.id = guid();
    var _this = this;

    var studentComboBox = new StudentComboBox({studentLevel: 2});
    var dateRange1 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange2 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange3 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange4 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange5 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange6 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange7 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange8 = new DateRange({
      width: '100%',
      height: 25
    });
    var dateRange9 = new DateRange({
      width: '100%',
      height: 25
    });

    var formItems = [
      {
        name: 'student',
        label: 'Siswa',
        content: studentComboBox,
        validation: {
          type: 'COMBOBOX',
          rule: 'required'
        }
      },
      {
        name: 'mata',
        label: 'Mata',
        content: dateRange1
      },
      {
        name: 'tht',
        label: 'THT',
        content: dateRange2
      },
      {
        name: 'anestesi',
        label: 'Anestesi',
        content: dateRange3
      },
      {
        name: 'bedah',
        label: 'Bedah',
        content: dateRange4
      },
      {
        name: 'ikm',
        label: 'IKM / IKK',
        content: dateRange5
      },
      {
        name: 'obgin',
        label: 'Obgin',
        content: dateRange6
      },
      {
        name: 'ortopedi',
        label: 'Ortopedi',
        content: dateRange7
      },
      {
        name: 'kardiologi',
        label: 'Kardiologi',
        content: dateRange8
      },
      {
        name: 'forensik',
        label: 'Forensik',
        content: dateRange9
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "POST",
              url: "/schedules_addlevel2",
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                // $("#searchBtn").trigger('click');
            }).fail(function( jqXHR, textStatus, errorThrown) {
                var errorMessage = 'Proses gagal. Status : ' + jqXHR.status + ' [' + jqXHR.statusText + '] : ' + jqXHR.responseText;
                $("#errorNotification").html('<div>' + errorMessage + '</div>');
                $("#errorNotification").jqxNotification("open");
            });
      }
    }

    var form = new Form(formOptions);

    this.window = new AddWindow({
      width: 330,
      height: 430,
      title: 'Tambah Siswa Tingkat 2',
      content: form,
      onSave: function(){
        form.validate();
      },
      onCancel: function(){
        _this.window.close();
      }
    });

  }

  render(container) {

    var _this = this;

    // var table = $('<table style="height: 100%; width: 100%;"></table>');
    // var tr = $('<tr></tr>');
    // var td = $('<td></td>');
    // table.appendTo(container);
    // tr.appendTo(table);
    // td.appendTo(tr);

    this.window.render(container);

  }

  open(){
    this.window.open();
  }
}
