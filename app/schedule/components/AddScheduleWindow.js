import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import DateRange from '../../base/components/DateRange';
import StudentComboBox from '../../student/components/StudentComboBox';


export default class AddScheduleWindow {

  constructor() {
    this.id = guid();
    var _this = this;

    var studentComboBox = new StudentComboBox({studentLevel: 1});
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
        name: 'pediatric',
        label: 'Anak',
        content: dateRange1
      },
      {
        name: 'radiology',
        label: 'Radiologi',
        content: dateRange2
      },
      {
        name: 'neurology',
        label: 'Neurologi',
        content: dateRange3
      },
      {
        name: 'dermatology',
        label: 'Kulit dan Kelamin',
        content: dateRange4
      },
      {
        name: 'interna',
        label: 'Interna',
        content: dateRange5
      },
      {
        name: 'kardiology',
        label: 'Kardiologi',
        content: dateRange6
      },
      {
        name: 'psychiatrist',
        label: 'Jiwa',
        content: dateRange7
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        $.ajax({
              method: "POST",
              url: "/schedules",
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
      width: 430,
      height: 360,
      title: 'Tambah Siswa Tingkat 1',
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
