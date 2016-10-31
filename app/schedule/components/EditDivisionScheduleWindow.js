import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import DateRange from '../../base/components/DateRange';

export default class EditDivisionScheduleWindow {

  constructor(data, onSaveSuccess) {
    this.id = guid();
    var _this = this;

    var schedule = data.schedule;
    var schedule1 = {
      startDate: schedule.start_date,
      endDate: schedule.end_date,
    }

    var dateRange1 = new DateRange({
      value: schedule1,
      width: '100%',
      height: 25
    });


    var formItems = [
      {
        name: 'scheduleDateRange',
        label: 'Tanggal',
        content: dateRange1
      }
    ];
    var formOptions = {
      items: formItems,
      labelColumnWidth: '120px',
      onValidationSuccess: function(formValue){
        formValue.scheduleDateRange['dbId'] = schedule.id;
        $.ajax({
              method: "PUT",
              url: "/schedules/division_update/" + schedule.id,
              data: formValue
            }).done(function() {
                $("#successNotification").jqxNotification("open");
                _this.window.close();
                if(onSaveSuccess){
                  onSaveSuccess();
                }
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
      height: 120,
      title: 'Edit Jadwal Bagian',
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
