import { guid } from '../../base/Utils';
import Button from '../../base/components/Button';
import Form from '../../base/components/Form';
import AddWindow from '../../base/components/AddWindow';
import DateRange from '../../base/components/DateRange';
import StudentComboBox from '../../student/components/StudentComboBox';


export default class EditParentScheduleLevel2Window {

  constructor(data, onSaveSuccess) {
    this.id = guid();
    var _this = this;

    var schedule = data.schedule;
    var children = data.children;

    var getChildrenByDivisionId = function(bagianId, children){
      for(var i=0; i<children.length; i++){
        if(children[i].bagian_id == bagianId){
          return children[i];
        }
      }

      return null;
    }

    var child1 = getChildrenByDivisionId(8, children);
    var schedule1 = {
      startDate: child1.start_date,
      endDate: child1.end_date,
    }

    var child2 = getChildrenByDivisionId(9, children);
    var schedule2 = {
      startDate: child2.start_date,
      endDate: child2.end_date,
    }

    var child3 = getChildrenByDivisionId(10, children);
    var schedule3 = {
      startDate: child3.start_date,
      endDate: child3.end_date,
    }
    var child4 = getChildrenByDivisionId(11, children);
    var schedule4 = {
      startDate: child4.start_date,
      endDate: child4.end_date,
    }
    var child5 = getChildrenByDivisionId(12, children);
    var schedule5 = {
      startDate: child5.start_date,
      endDate: child5.end_date,
    }
    var child6 = getChildrenByDivisionId(13, children);
    var schedule6 = {
      startDate: child6.start_date,
      endDate: child6.end_date,
    }
    var child7 = getChildrenByDivisionId(14, children);
    var schedule7 = {
      startDate: child7.start_date,
      endDate: child7.end_date,
    }
    var child8 = getChildrenByDivisionId(15, children);
    var schedule8 = {
      startDate: child8.start_date,
      endDate: child8.end_date,
    }
    var child9 = getChildrenByDivisionId(16, children);
    var schedule9 = {
      startDate: child9.start_date,
      endDate: child9.end_date,
    }

    var studentComboBox = new StudentComboBox({
      studentLevel: 2,
      value: schedule.siswa_id
    });
    var dateRange1 = new DateRange({
      value: schedule1,
      width: '100%',
      height: 25
    });
    var dateRange2 = new DateRange({
      value: schedule2,
      width: '100%',
      height: 25
    });
    var dateRange3 = new DateRange({
      value: schedule3,
      width: '100%',
      height: 25
    });
    var dateRange4 = new DateRange({
      value: schedule4,
      width: '100%',
      height: 25
    });
    var dateRange5 = new DateRange({
      value: schedule5,
      width: '100%',
      height: 25
    });
    var dateRange6 = new DateRange({
      value: schedule6,
      width: '100%',
      height: 25
    });
    var dateRange7 = new DateRange({
      value: schedule7,
      width: '100%',
      height: 25
    });
    var dateRange8 = new DateRange({
      value: schedule8,
      width: '100%',
      height: 25
    });
    var dateRange9 = new DateRange({
      value: schedule9,
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
        formValue.mata['dbId'] = child1.id;
        formValue.tht['dbId'] = child2.id;
        formValue.anestesi['dbId'] = child3.id;
        formValue.bedah['dbId'] = child4.id;
        formValue.ikm['dbId'] = child5.id;
        formValue.obgin['dbId'] = child6.id;
        formValue.ortopedi['dbId'] = child7.id;
        formValue.kardiologi['dbId'] = child8.id;
        formValue.forensik['dbId'] = child9.id;

        $.ajax({
              method: "PUT",
              url: "/schedules/parent_update_level_2/" + schedule.id,
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
      height: 430,
      title: 'Edit Siswa Tingkat 2',
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
